import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import { deleteNewFeedbackQuestion, addNewFeedbackQuestion } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import NewEditFeedbackQuestion from './NewEditFeedbackQuestion';

const QuestionDetail = () => {
    const data = JSON.parse(localStorage.getItem('item'));
    const id = data._id;
    const questionlist = JSON.parse(localStorage.getItem('questionlist'))
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionlist.length / recordsPerPage);
    const [addfeedbackquestionmodal, setAddfeebackQuestionModal] = useState(false);
    const [editfeedbackquestionmodal, setEditfeebackQuestionModal] = useState(false);
    const [question, setFeedbackQuestion] = useState('');
    const navigate = useNavigate();


    const OpenAddFeedbackQuestionModal = (id) => {
        setAddfeebackQuestionModal(true);
    }

    const CloseAddFeedbackQuestionModal = () => {
        setAddfeebackQuestionModal(false);
    }

    const OpenEditFeedbackQuestionModal = (id) => {
        setEditfeebackQuestionModal(id);
    }

    const CloseEditFeedbackQuestionModal = () => {
        setEditfeebackQuestionModal(false);
    }

    const handleBack = () => {
        navigate('/all-feedback');
        localStorage.removeItem('questionlist');
        localStorage.removeItem('item');
    }

    const DeleteFeedbackQuestion = (id) => {
        deleteNewFeedbackQuestion(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                navigate("/all-feedback")
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    const AddNewFeedbackQuestion = (event) => {
        event.preventDefault();
        const data = questionlist.filter((item) => {
            return item.question === question
        })

        console.log(data);
        if (data.length > 0) {
            toast.error("Question Already exists", {
                position: "top-center",
                autoClose: 1000
            })
        }
        else {
        const payload = {
            question: question,
            id: questionlist.length + 1,
        }
        console.log(payload)
        addNewFeedbackQuestion(id, payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                CloseAddFeedbackQuestionModal();
                navigate("/all-feedback");
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
        }
    }


    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>{data.name}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='feedback-question-details-add-button me-2' onClick={() => OpenAddFeedbackQuestionModal(id)}>
                        <p className='view-student-details-back-button-text'>Add New Question</p>
                    </button>
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                    <Modal show={addfeedbackquestionmodal ? true : false} onHide={CloseAddFeedbackQuestionModal}>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-black">
                                <p className='view-expense-details-modal-heading'>
                                    Add Question
                                </p>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={AddNewFeedbackQuestion}>
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
                <table className="table batch-table">
                    <thead>
                        <tr>
                            <th scope="col">Feedback Questions</th>
                            <th className='ps-3' scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentRecords.map((item) => {
                            return (
                                <tr>

                                    <td>
                                        <p className='fw-bold'>Q{item.id}. {item.question}</p>
                                    </td>
                                    <td>
                                        <button className='test-link-button me-2' onClick={() => OpenEditFeedbackQuestionModal(item._id)}>
                                            <p className='test-link-button-text'>Update</p>
                                        </button>
                                        <button className='test-link-button me-2' onClick={() => DeleteFeedbackQuestion(item._id)}>
                                            <p className='test-link-button-text'>Delete</p>
                                        </button>
                                        <Modal show={editfeedbackquestionmodal === item._id ? true : false} onHide={CloseEditFeedbackQuestionModal}>
                                            <NewEditFeedbackQuestion data={item} id={item._id} index={item.id} CloseEditFeedbackQuestionModal={CloseEditFeedbackQuestionModal} />
                                        </Modal>
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
                : <div>
                    <p className='text-center fs-4'>No Question Found!</p>
                </div>}
            {currentRecords.length > 0 ?
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

export default QuestionDetail;