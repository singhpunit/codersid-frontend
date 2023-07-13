import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAssessmentQuestion } from '../../postdata/postdata';
import { toast } from "react-toastify";
import Pagination from '../pagination/Pagination';

const QuestionDetails = () => {
    const data = JSON.parse(localStorage.getItem('item'))
    const id = data._id;
    const questionlist = JSON.parse(localStorage.getItem('questionlist'))
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionlist.length / recordsPerPage);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/all-tests');
        localStorage.removeItem('questionlist');
        localStorage.removeItem('item');
    }

    console.log(id);


    const DeleteAssessmentQuestion = (id) => {
        deleteAssessmentQuestion(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                navigate("/all-tests")
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    const handleAddQuestionModal = (id) => {
        navigate('/add-assessment-question', {state: {id}})
    };

    const handleEditQuestionModal = (item) => {
        navigate('/edit-assessment-question', { state: { item } })
    };

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>{data.testname}</p>
                </div>
                <div className="d-flex justify-content-end">
                     <button className='feedback-question-details-add-button me-2' onClick={() => handleAddQuestionModal(id)}>
                        <p className='view-student-details-back-button-text'>Add New Question</p>
                    </button>
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
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
                                        <ul>
                                            <li>{item.option1}</li>
                                            <li>{item.option2}</li>
                                            <li>{item.option3}</li>
                                            <li>{item.option4}</li>
                                        </ul>
                                        <p>Answer : {item.answer}</p>
                                    </td>
                                    <td>
                                        <button className='test-link-button me-2' onClick={() => handleEditQuestionModal(item)}>
                                            <p className='test-link-button-text'>Update</p>
                                        </button>
                                        <button className='test-link-button me-2' onClick={() => DeleteAssessmentQuestion(item._id)}>
                                            <p className='test-link-button-text'>Delete</p>
                                        </button>
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

export default QuestionDetails;