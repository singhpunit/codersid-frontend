import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFeedback, getAllStudentFeedback, getfeedbackCategory } from '../../getdata/getdata';
import { headers } from '../../headers';
import Pagination from '../pagination/Pagination';
import FeedbackIcon from '../../assets/FeedbackIcon.png'
import { BallTriangle } from 'react-loader-spinner';
import '../../styles/assessment/assessmentlist.css';
import '../../styles/feedback/feedback.css';

const StudentFeedback = () => {
    const [alltestlist, setAllTestList] = useState([]);
    const [testlist, setTestList] = useState([]);
    const [feedbackcategorylist, setFeedbackCategoryList] = useState([]);
    const [feedbackName, setSearchFeedbackName] = useState('');
    const [studentfeedbacklist, setStudentFeedbackList] = useState([]);
    const [allCategory, setAllCategory] = useState([])
    const [loader, setLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(testlist.length / recordsPerPage);
    const currentRecords = testlist?.length > 0 ? testlist.slice(indexOfFirstRecord, indexOfLastRecord) : [];
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        getAllFeedback(headers)
            .then((response) => {
                setAllTestList(response.data);
                setTestList(response.data);
                let allcategory = response.data.map(v => (v.category))
                setAllCategory([...new Set(allcategory)])

            })
        getAllStudentFeedback(headers)
            .then((response) => {
                setStudentFeedbackList(response.data.StudentFeedbacks);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })

        getfeedbackCategory(headers)
            .then((response) => {
                setFeedbackCategoryList(response.data);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const handleStudentDetails = (id) => {
        console.log(id);
        const data = studentfeedbacklist.filter((item) => {
            return item.feedbackid === id
        })
        console.log(data);
        localStorage.setItem('studentFeedbackRecords', JSON.stringify(data));
        navigate('/student-feedbacks', { state: { data } })
    }

    const handleCategorySelect = (event) => {
        const category = event.target.value;
        console.log(category)
        if (category === 'All Category') {
            setTestList(alltestlist);
        }
        else {
            let data = alltestlist.filter((item, i) => {
                return item.category === category;
            })
            console.log(data);
            if (data.length > 0) {
                setTestList(data);
            }
            else {
                setTestList([])
            }
        }
    }

    return (
        <div className="card">

            <div className="d-flex justify-content-start">
                <p className='ps-2 studentlist-card-text'>All Feedback
                    <img className='studentlist-icon' src={FeedbackIcon} alt="FeedbackIcon" /></p>
            </div>

            <div className="row mt-3 ps-2">
                <div className="col-sm-6">
                    <p className="text-start select-field-label">Select Feedback Category</p>
                    <select className="student-list-input-width mb-2 w-100" name="category" id="category" onChange={handleCategorySelect}>
                        <option value="All Category">All Category</option>
                        {feedbackcategorylist.map((item) => {
                            return (
                                <option value={item.categoryName} >{item.categoryName}</option>
                            )

                        })}
                    </select>
                </div>
                <div className="col-sm-6">
                    <p className="text-start input-field-label">Feedback Name</p>
                    <input type="text" className="student-list-input-width w-100" id="name" name="name"
                        onChange={(e) => setSearchFeedbackName(e.target.value)} />
                </div>
            </div>

            <table className="table">
                <thead className='text-center'>
                    <tr>
                        <th scope="col">Feedback Name</th>
                        <th scope="col">Feedback Category</th>
                        <th scope="col">Action</th>
                    </tr>

                </thead>
                <tbody className='text-center'>
                    {currentRecords.filter((val) => {
                        if (feedbackName === "") {
                            return val;
                        }
                        else if (val.name.toLowerCase().includes(feedbackName.toLowerCase())) {
                            return val;
                        }
                    }).map((item) => {
                        return (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td><button className='feedback-link-button me-2' onClick={() => handleStudentDetails(item._id)}>
                                    <p className='feedback-link-button-text'>View Records</p>
                                </button>

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


            {loader ?
                <div className="d-flex justify-content-center">
                    <BallTriangle
                        height={250}
                        width={300}
                        radius={5}
                        color="#10D1E3"
                        ariaLabel="ball-triangle-loading"
                        wrapperClassName=''
                        wrapperStyle=""
                        visible={true}
                    />
                </div> : null}

            {!loader && currentRecords.length === 0 ?
                <div className='d-flex justify-content-center'>
                    <p className='fs-4'>No Data Found</p>
                </div>
                : null}

            {allCategory && currentRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
        </div>
    );
}

export default StudentFeedback;
