import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTests, getAllAssessmentCategory } from '../../getdata/getdata';
import { headers } from '../../headers';
import { BallTriangle } from 'react-loader-spinner';
import { toast } from "react-toastify";
import { primaryUrl } from '../../baseurl';
import { addExpiryDate } from '../../postdata/postdata';
import { Switch } from 'antd';
import MernLogo from '../../assets/MernLogo.png';
import '../../styles/assessment/assessmentlist.css';

const Assessment = () => {
    const [assessmentcategorylist, setAssessmentCategoryList] = useState([]);
    const [alltestlist, setAllTestList] = useState([]);
    const [alltests, setAllTests] = useState(true);
    const [loader, setLoader] = useState(false);
    const [active, setIsActive] = useState(false);
    const navigate = useNavigate();
    const [testlist, setTestlist] = useState([]);
    const [allcategory, setAllCategory] = useState(true);
    const [category, setCategory] = useState(false);
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const expiryDate = date.toString()
    

    const handleActive = (categoryname) => {
        setAllTests(false);
        const testlist = alltestlist.filter((item) => {
            return item.category === categoryname
        })
        setTestlist(testlist);
        setIsActive(true);
    }

    const handleCategory = (id) => {
        setCategory(id)
    };

    useEffect(() => {
        setLoader(true);
        getAllTests(headers)
            .then((response) => {
                setAllTestList(response.data.Tests);
                setLoader(false)
            })
        getAllAssessmentCategory(headers)
            .then((response) => {
                setAssessmentCategoryList(response.data.AssessmentCategories);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const handleQuestionDetails = (item) => {
        // console.log(item);
        // console.log(item.questionslist)
        localStorage.setItem('item', JSON.stringify(item));
        localStorage.setItem('questionlist', JSON.stringify(item.questionslist))
        navigate('/question-details', { state: { item } })

    }

    const copy = async (id) => {
        await navigator.clipboard.writeText(`${primaryUrl}/assessment-test/${id}`);
        // await navigator.clipboard.writeText(`http://localhost:3000/assessment-test/${id}`);
        toast.success("Test Link Copied", {
            position: "top-center",
            autoClose: 1000
        })
    }

    const enableLink = (id) => {
        const payload = {
            expiryDate: expiryDate
        }
        addExpiryDate(id, payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                // setShowEnable(true);
                window.location.reload(false);
            })
            .catch((error) => {
                toast.success(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    return (
        <div className="card">
            <div className="d-flex">
                <div className="assessment-category-card pointer" style={allcategory ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                    onClick={() => {
                        setAllTests(true);
                        setIsActive(false);
                        setCategory(false);
                        setAllCategory(true);
                    }}>
                    <div className="card-body">
                        <p className="fs-5 fw-bold text-center">All Assessments</p>
                        <div className='text-center'><img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} /></div>
                    </div>
                </div>
                {assessmentcategorylist.map((item) => {
                    return (
                        <div className="assessment-category-card pointer" style={category === item._id ? { backgroundColor: "#00B8C9", cursor: 'pointer' } : { cursor: 'pointer' }}
                            onClick={() => {
                                handleActive(item.assessmentcategoryName)
                                handleCategory(item._id);
                                setAllCategory(false);
                            }}>
                            <div className="card-body">
                                <p className="fs-5 fw-bold text-center">{item.assessmentcategoryName} </p>
                                <div className='text-center'>
                                    <img src={MernLogo} alt="MernLogo" style={{ width: 70, borderRadius: "50%" }} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {alltests ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>
                            {alltestlist.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td><button className='test-link-button me-2' onClick={() => {
                                            copy(item._id)
                                        }}>
                                            <p className='test-link-button-text'>Test Link</p>
                                        </button>
                                            {item.hasOwnProperty('expiryDate') ? <Switch checked onChange={() => enableLink(item._id)} />
                                                : <Switch onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}


            {active ?
                <>
                    <table className="table">
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">Assessment Name</th>
                                <th scope="col">Assessment Category</th>
                                <th scope="col">Action</th>
                            </tr>

                        </thead>
                        <tbody className='text-center'>

                            {testlist.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td className='pointer' onClick={() => handleQuestionDetails(item)}>{item.testname}</td>
                                        <td>{item.category}</td>
                                        <td><button className='test-link-button me-2' onClick={() => {
                                            copy(item._id)
                                        }}>
                                            <p className='test-link-button-text'>Test Link</p>
                                        </button>
                                        {item.hasOwnProperty('expiryDate') ? <Switch checked onChange={() => enableLink(item._id)} />
                                                : <Switch onChange={() => enableLink(item._id)} />}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
                : null}

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

            {active && testlist.length === 0 ?
                <div className='text-center'>
                    <p className='mt-4 fs-4'>No Assessment Found</p>
                </div>
                : null}
        </div>
    );
}

export default Assessment;