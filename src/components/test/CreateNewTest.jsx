import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { getAllQuestions } from '../../getdata/getdata';
import { headers } from '../../headers';
import AddQuestion from '../test/AddQuestion';
import { addTest, deleteAllQuestions, deleteQuestion } from '../../postdata/postdata';
import { getAllAssessmentCategory } from '../../getdata/getdata';
import { toast } from "react-toastify";
import EditQuestion from './EditQuestion';
import { BallTriangle } from 'react-loader-spinner';
import Pagination from '../pagination/Pagination';
import StudentIcon from '../../assets/Studentlist.png';
import AssessmentIcon from '../../assets/AssessmentIcon.png';
import { useNavigate } from 'react-router-dom';

const CreateNewTest = () => {
    const [assessmentcategorylist, setAssessmentCategoryList] = useState([]);
    const [questionlist, setQuestionList] = useState([]);
    const [testmodal, setTestModal] = useState(false);
    const [editquestionmodal, setEditQuestionModal] = useState(false);
    const [testdata, setTestData] = useState({
        testname: "",
        category: "",
        questionslist: [],
        expiryDate: "",
    })
    const [loader, setLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionlist.length / recordsPerPage);
    const navigate = useNavigate();

    useEffect(() => {
        setLoader(true);
        getAllAssessmentCategory(headers)
            .then((response) => {
                setAssessmentCategoryList(response.data.AssessmentCategories);
            })
            .catch((error) => {
                console.log(error);
            })

        getAllQuestions(headers)
            .then((response) => {
                setQuestionList(response.data.Questions);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);


    const OpenTestModal = () => {
        setTestModal(true);
    }

    const CloseTestModal = () => {
        setTestModal(false);
    }

    const handleQuestionModal = (item) => {
        navigate('/edit-question', { state: { item } })
    };

    const handleClose = () => setEditQuestionModal(false);

    const handleChange = (event) => {
        setTestData({
            ...testdata,
            [event.target.name]: event.target.value
        })
    }

    const AddTest = (event) => {
        event.preventDefault();
        const payload = {
            ...testdata,
            questionslist: questionlist
        }
        console.log(payload);
        addTest(payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })

            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
        setTimeout(() => {
            deleteAllQuestions()
                .then((response) => {
                    window.location.reload(false);
                })
                .catch((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })
                })
        }, 1000);
    }

    const NewQuestion = () => {
        navigate('/create-question')
    }



    const DeleteQuestion = (id) => {
        deleteQuestion(id)
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
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>Create Assessment
                    <img className='studentlist-icon' src={AssessmentIcon} alt="AssessmentIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button' onClick={NewQuestion}>
                        <p className='add-student-button-text'>Add Question + </p>
                    </button>
                    <Modal show={testmodal ? true : false} onHide={CloseTestModal}>
                        <AddQuestion CloseTestModal={CloseTestModal} setQuestionList={setQuestionList} questionlist={questionlist} />
                    </Modal>
                </div>
            </div>
            {questionlist.length > 0
                ?
                <form onSubmit={AddTest}>
                    <div className='row ps-2'>
                        <div className='col-sm-4'>
                            <p className="text-start">Assessment Name</p>
                            <input type="text" className="add-batch-input w-100"
                                id="testname" name="testname"
                                onChange={handleChange} required />
                        </div>
                        <div className='col-sm-4'>
                            <p className="text-start">Assessment Category</p>
                            <select className="add-batch-input mt-1 w-100"
                                id="category" name="category"
                                onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {assessmentcategorylist.map((category) => {
                                    return (
                                        <option value={category.assessmentcategoryName}>{category.assessmentcategoryName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='col-sm-4'>
                            <button className='add-batch-button' type='submit'>
                                <p className='add-batch-button-text'>Submit</p>
                            </button>
                        </div>
                    </div>
                </form>
                : null
            }


            <table className="table batch-table">
                <thead>
                    <tr>
                        <th scope="col">Questions</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questionlist.map((item) => {
                        return (
                            <tr>
                                <td>
                                    <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                    <ul>
                                        <li>{item.option1}</li>
                                        <li>{item.option2}</li>
                                        <li>{item.option3}</li>
                                        <li>{item.option4}</li>
                                    </ul>
                                    <p>Answer : {item.answer}</p>

                                </td>
                                <td>
                                    <div className='d-flex align-items-center' >
                                        <button className='test-link-button me-2'
                                            onClick={() => handleQuestionModal(item)}>
                                            <p className='test-link-button-text'>Update</p></button>
                                        <button className='test-link-button me-2'
                                            onClick={() => DeleteQuestion(item._id)}>
                                            <p className='test-link-button-text'>Delete</p>
                                        </button>
                                        <Modal show={editquestionmodal === item._id ? true : false} onHide={handleClose}>
                                            <EditQuestion data={item} handleClose={handleClose} questionlist={questionlist} />
                                        </Modal>
                                    </div>
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
                    <p className='fs-4'>No Question Found</p>
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
        </div>
    );
}

export default CreateNewTest;