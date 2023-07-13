import { useState } from "react";
import { Modal } from "react-bootstrap";
import { updateNewFeedbackQuestion } from "../../postdata/postdata";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewEditFeedbackQuestion = ({data, id, index, CloseEditFeedbackQuestionModal}) => {
    const [editfeedbackQuestion, setEditFeedbackQuestion] = useState(data.question);
    const navigate = useNavigate();

    const UpdateFeedbackQuestion = (event) => {
        event.preventDefault();
        const payload = {
            question: editfeedbackQuestion,
            _id: id,
            id: index
        }
        console.log(payload);
        updateNewFeedbackQuestion(id, payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                CloseEditFeedbackQuestionModal();
                navigate("/all-feedback")
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Edit Feedback Question
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={UpdateFeedbackQuestion}>
                    <p className='make-payment-email-address'>Feedback Question</p>
                    <input className='student-name-input-field form-control' type="text"
                        id="feedbackQuestion"
                        name="feedbackQuestion"
                        value={editfeedbackQuestion}
                        onChange={(event) => setEditFeedbackQuestion(event.target.value)}
                        required />
                    <div className="text-center">
                        <button type="submit" className="mt-3 mb-3 btn btn-primary">Update Feeback</button>
                    </div>
                </form>
            </Modal.Body>
        </>
    );
}

export default NewEditFeedbackQuestion;