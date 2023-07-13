import { useNavigate } from "react-router-dom";
const FeedbackResponse = () => {
    const navigate = useNavigate();
    const data =  JSON.parse(localStorage.getItem('feedbackResponse'));

    const handleBack = () => {
        navigate('/student-feedbacks');
    }


    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>Feedbacks Response</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                </div>
            </div>
            {
                data.map((item) => {
                    return (
                        <>
                            <p className="fw-bold">Q.{item.question}</p>
                            <p>Rating : {item.rating}</p>
                            <p>Feedback : {item.comment}</p>
                        </>
                    )
                })
            }
        </div>
    );
}

export default FeedbackResponse;