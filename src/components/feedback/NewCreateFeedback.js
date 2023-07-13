import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { getAllFeedbackQuestions, getfeedbackCategory } from '../../getdata/getdata';
import { headers } from '../../headers';
import { addFeedbackQuestion, createFeedback, deleteAllFeedbackQuestions, deleteFeedbackQuestion } from '../../postdata/postdata';
import { toast } from "react-toastify";
import EditFeedbackQuestion from './EditFeedbackQuestion';
import { BallTriangle } from 'react-loader-spinner';
import Pagination from '../pagination/Pagination';
import FeedbackIcon from '../../assets/FeedbackIcon.png';

const NewCreateFeedback = () => {
    const [question, setFeedbackQuestion] = useState('');
    const [feedbackcategorylist, setFeedbackCategoryList] = useState([]);
    const [questionlist, setQuestionList] = useState([]);
    const [feedbackmodal, setfeebackModal] = useState(false);
    const [editfeedbackmodal, setEditfeebackModal] = useState(false);
    const [feedbackdata, setFeedbackData] = useState({
        name: "",
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
    

    useEffect(() => {
        setLoader(true);
        getfeedbackCategory(headers)
            .then((response) => {
                setFeedbackCategoryList(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

        getAllFeedbackQuestions(headers)
            .then((response) => {
                setQuestionList(response.data.FeedbackQuestions);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);


    const OpenFeedbackModal = () => {
        setfeebackModal(true);
    }

    const CloseFeedbackModal = () => {
        setfeebackModal(false);
    }

    const OpenEditFeedbackModal = (id) => {
        setEditfeebackModal(id);
    }

    const CloseEditFeedbackModal = () => {
        setEditfeebackModal(false);
    }

    const handleEditClose = () => setEditfeebackModal(false);

    const handleChange = (event) => {
        setFeedbackData({
            ...feedbackdata,
            [event.target.name]: event.target.value
        })
    }

    const AddFeedbackQuestion = (event) => {
        event.preventDefault();
        const payload = {
            question: question
        }
        addFeedbackQuestion(payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                CloseFeedbackModal();
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    const AddFeedback = (event) => {
        event.preventDefault();
        const payload = {
            ...feedbackdata,
            questionslist: questionlist
        }
        console.log(payload);
        createFeedback(payload)
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
            deleteAllFeedbackQuestions()
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

    const DeleteQuestion = (id) => {
        deleteFeedbackQuestion(id)
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
                    <p className='ps-2 studentlist-card-text'>Create Feedback Form
                        <img className='studentlist-icon' src={FeedbackIcon} alt="FeedbackIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button' onClick={OpenFeedbackModal}>
                        <p className='add-student-button-text'>Add Question + </p>
                    </button>
                    <Modal show={feedbackmodal ? true : false} onHide={CloseFeedbackModal}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-black">
                                <p className='view-expense-details-modal-heading'>
                                    Add Question
                                </p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={AddFeedbackQuestion}>
                                <p className='make-payment-email-address'>Feedback Question</p>
                                <input className='student-name-input-field form-control' type="text"
                                    id="question"
                                    name="question"
                                    onChange={(event) => setFeedbackQuestion(event.target.value)}
                                    required />
                                <div className="text-center">
                                    <button type="submit" className="mt-3 mb-3 btn btn-primary">Add Question</button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            {questionlist.length > 0
                ?
                <form onSubmit={AddFeedback}>
                    <div className='row ps-2'>
                        <div className='col-sm-4'>
                            <p className="text-start">Feedback Name</p>
                            <input type="text" className="add-batch-input w-100"
                                id="name" name="name"
                                onChange={handleChange} required />
                        </div>
                        <div className='col-sm-4'>
                            <p className="text-start">Feedback Category</p>
                            <select className="add-batch-input mt-1 w-100"
                                id="category" name="category"
                                onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {feedbackcategorylist.map((category) => {
                                    return (
                                        <option value={category.categoryName}>{category.categoryName}</option>
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
                        <th scope="col">Feedback Questions</th>
                        <th className='ps-3' scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questionlist.map((item) => {
                        return (
                            <tr>
                                <td>
                                    <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center' style={{ marginTop: 5 }}>
                                        <button className='details-button'
                                            onClick={() => OpenEditFeedbackModal(item._id)}>
                                            <p className='details-button-text'>Update</p></button>
                                        <button className='ms-2 details-button'
                                            onClick={() => DeleteQuestion(item._id)}>
                                            <p className='details-button-text'>Delete</p>
                                        </button>
                                        <Modal show={editfeedbackmodal === item._id ? true : false} onHide={handleEditClose}>
                                            <EditFeedbackQuestion data={item} id={item._id} CloseEditFeedbackModal={CloseEditFeedbackModal}/>
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
                    <p className='fs-4'>No Feedback Found</p>
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

export default NewCreateFeedback;