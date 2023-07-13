import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { addQuestion } from "../../postdata/postdata";

const AddQuestion = ({ CloseTestModal, setQuestionList, questionlist }) => {
    const [questiondata, setQuestionData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    })

    const handleChange = (event) => {
        setQuestionData({
            ...questiondata,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (questionlist.some(item => item.question === questiondata.question)) {
            toast.error("Question already exists", {
                position: "top-center",
                autoClose: 1000
            })
        }
        else {
            // setQuestionList(prev => [...prev, questiondata])
            // toast.success("Question created successfully", {
            //                 position: "top-center",
            //                 autoClose: 1000
            //             })
            addQuestion(questiondata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                CloseTestModal();
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
            
        }
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='ps-2 view-expense-details-modal-heading'>
                        Add Question
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p className='make-payment-email-address'>Question</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="question"
                            name="question" onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 1</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option1"
                            name="option1" onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 2</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option2"
                            name="option2" onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 3</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option3"
                            name="option3" onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Option 4</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="option4"
                            name="option4" onChange={handleChange}
                            required />
                        <p className='make-payment-email-address'>Answer</p>

                        <select className="student-name-input-field form-control w-100" name="answer" onChange={handleChange} required>
                            <option value="">Select Answer</option>
                            {questiondata.option1 === '' || questiondata.option2 === '' || questiondata.option3 === '' ||
                                questiondata.option4 === '' ?
                                <option value="No answer found">No Answer Found</option>
                                :
                                <>
                                    <option value={questiondata.option1}>{questiondata.option1}</option>
                                    <option value={questiondata.option2}>{questiondata.option2}</option>
                                    <option value={questiondata.option3}>{questiondata.option3}</option>
                                    <option value={questiondata.option4}>{questiondata.option4}</option>
                                </>
                            }
                        </select>
                        <div className="text-center">
                            <button type="submit" className="mt-3 mb-3 btn btn-primary">Add Question</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </>
    );
}

export default AddQuestion;