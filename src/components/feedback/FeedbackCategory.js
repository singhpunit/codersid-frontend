
import { useState, useEffect } from 'react';
import { getfeedbackCategory } from '../../getdata/getdata';
import { addFeedbackCategory, deleteFeedbackCategory } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { BallTriangle } from 'react-loader-spinner';
import { headers } from '../../headers';
import Pagination from '../pagination/Pagination';
import ExpenseLogo from '../../assets/ExpenseIcon.png';
import '../../styles/expense/expense.css';

const FeedbackCategory = () => {
    const [assessmentcategorylist, setAssessmentCategoryList] = useState([]);
    const [assessmentcategorydata, setAssessmentCategorydata] = useState({
        categoryName: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = assessmentcategorylist.length>10?assessmentcategorylist.slice(indexOfFirstRecord, indexOfLastRecord):assessmentcategorylist;
    const nPages = Math.ceil(assessmentcategorylist.length / recordsPerPage);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        getfeedbackCategory(headers)
            .then((response) => {
                setAssessmentCategoryList(response.data);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

   

    const handleChange = (event) => {
        setAssessmentCategorydata({
            ...assessmentcategorydata,
            [event.target.name]: event.target.value
        })
    }

    const handleAddAssessmentCategory = (event) => {
        event.preventDefault();
        addFeedbackCategory(assessmentcategorydata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                window.location.reload(false);
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    const DeleteFeedbackCategory = (id) => {
        deleteFeedbackCategory(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="card">
            <div className='d-flex'>
                <p className='ps-2 expense-card-text'>Add Feedback Category</p>
                <img className='expense-card-icon' src={ExpenseLogo} alt="ExpenseLogo" />
            </div>

            <form onSubmit={handleAddAssessmentCategory}>
                <div className='d-flex ps-2'>
                    <div>
                        <p className="text-start">Feedback Category Name</p>
                        <input type="text" className="add-expense-input"
                            id="assessmentcategoryName" name="categoryName"
                            onChange={handleChange} required />
                    </div>
                    <div>
                        <button className='add-expense-category-button' type='submit'>
                            <p className='add-expense-category-button-text'>Submit</p>
                        </button>
                    </div>
                </div>
            </form >

            <table className="table batch-table">
                <thead>
                    <tr>
                        <th scope="col">Feedback Category Name</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td className='ps-5'>{item.categoryName}</td>
                                <td>
                                    <button className='delete-button' onClick={() => DeleteFeedbackCategory(item._id)}>
                                        <p className='delete-button-text'>Delete</p>
                                    </button></td>
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

            {currentRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null
            }
        </div >
    );
}

export default FeedbackCategory;

