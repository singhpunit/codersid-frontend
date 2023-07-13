import FeedbackIcon from '../../assets/FeedbackIcon.png';
import { useNavigate } from 'react-router-dom';
import '../../styles/student/studentlist.css';
import '../../styles/studentperformance/studentperformance.css';

const StudentFeedbackResponse = () => {
    const data = JSON.parse(localStorage.getItem('studentFeedbackRecords'))
    const navigate = useNavigate();

    const handleDetails = (item) => {
        const data = item.feedbackResponse;
        localStorage.setItem('feedbackResponse', JSON.stringify(data));
        navigate('/feedback-response', { state: { data } })
    }

    const handleBack = () => {
        navigate('/feedbacks');
    }

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>Student Feedbacks
                    <img className='studentlist-icon' src={FeedbackIcon} alt="FeedbackIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                </div>
            </div>


            <div className='scroll'>
            {data.length > 0 ?

                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Student Name</th>
                            <th scope="col">Batch Name</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>
                    
                        <tbody className='text-center'>
                            {data.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.studentname}</td>
                                        <td>{item.batchname}</td>
                                        <td><button className='score-card-button' onClick={() => {
                                            handleDetails(item)
                                        }}>
                                            <p className='score-card-button-text'>View Response</p>
                                        </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        
                </table>
                : <div className='d-flex justify-content-center'>
                <p className='text-center fs-4'>No Data found!</p>
            </div>}
            </div>
        </div>
    );
}

export default StudentFeedbackResponse;
