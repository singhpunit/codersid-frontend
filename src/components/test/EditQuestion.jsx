import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { editQuestion } from "../../postdata/postdata";

const EditQuestion = ({ handleClose, data, questionlist }) => {
    const [editquestiondata, setEditQuestionData] = useState({
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        answer: data.answer
    })

    const handleChange = (event) => {
        setEditQuestionData({
            ...editquestiondata,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
            editQuestion(data._id, editquestiondata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                handleClose();
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
        
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='ps-2 view-expense-details-modal-heading'>
                        Edit Question
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='make-payment-email-address'>Question</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="question"
                            name="question" 
                            value={editquestiondata.question} 
                            onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 1</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option1"
                            name="option1" 
                            value={editquestiondata.option1} 
                            onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 2</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option2"
                            name="option2" 
                            value={editquestiondata.option2} 
                            onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 3</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option3"
                            name="option3" 
                            value={editquestiondata.option3} 
                            onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 4</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option4"
                            name="option4"
                            value={editquestiondata.option4} 
                            onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Answer</p>

                        <select className="student-name-input-field form-control w-100" name="answer" 
                        value={editquestiondata.answer} 
                        onChange={handleChange} required>
                            <option value="">Select Answer</option>
                            {editquestiondata.option1 === '' || editquestiondata.option2 === '' || editquestiondata.option3 === '' ||
                                editquestiondata.option4 === '' ?
                                <option value="No answer found">No Answer Found</option>
                                :
                                <>
                                    <option value={editquestiondata.option1}>{editquestiondata.option1}</option>
                                    <option value={editquestiondata.option2}>{editquestiondata.option2}</option>
                                    <option value={editquestiondata.option3}>{editquestiondata.option3}</option>
                                    <option value={editquestiondata.option4}>{editquestiondata.option4}</option>
                                </>
                            }
                        </select>
                        <div className="text-center">
                            <button type="submit" className="mt-3 mb-3 btn btn-primary">Update Question</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </>
    );
}

export default EditQuestion;