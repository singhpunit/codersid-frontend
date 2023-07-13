import StudentIcon from '../../assets/Studentlist.png';
import { useNavigate } from 'react-router-dom';
import '../../styles/student/studentlist.css';
import '../../styles/studentperformance/studentperformance.css';

const StudentTestRecord = () => {
    const data = JSON.parse(localStorage.getItem('testRecords'))
    const testRecords = data.testRecords;
    const navigate = useNavigate();

    const handleDetails = (item) => {
        const data = item.testResponse;
        console.log(data);
        localStorage.setItem('testResponse', JSON.stringify(data));
        navigate('/student-response', { state: { data } })
    }

    const handleBack = () => {
        navigate('/performance');
    }



    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>Student Test Records<img className='studentlist-icon' src={StudentIcon} alt="StudentIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                </div>
            </div>


            <div className='scroll'>
                {testRecords.length > 0 ?
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Assessment Name</th>
                            <th scope="col">Assessment Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody className='text-center'>
                        {testRecords.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.testname}</td>
                                    <td>{item.category}</td>
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
                : <div className='text-center'>
                    <p className='fs-4'>No Data Found!</p>
                </div>}
            </div>
        </div>
    );
}

export default StudentTestRecord;
