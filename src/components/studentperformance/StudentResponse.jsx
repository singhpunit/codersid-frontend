import { useNavigate } from 'react-router-dom';


const StudentResponse = () => {
    const data = JSON.parse(localStorage.getItem('testResponse'))
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/test-records');
    }

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>Student Test Response</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='view-student-details-back-button me-2' onClick={handleBack}>
                        <p className='view-student-details-back-button-text'>Back</p>
                    </button>
                </div>
            </div>
            {data.length > 0
                ?
                <div className="ms-2 mt-2 mb-2" >
                    {data.map((item) =>
                        <>
                            <p className='fw-bold'>Q. {item.question}</p>
                            <p >{item.response}</p>
                        </>
                    )}

                </div>
                : <div className='text-center'>
                    <p className='fs-4'>No Data Found</p>
                </div>}
        </div>
    );
}

export default StudentResponse;