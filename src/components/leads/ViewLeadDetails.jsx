import { useLocation, useNavigate } from 'react-router-dom';
import { TfiComments } from 'react-icons/tfi';
import '../../styles/expense/expensedetails.css';

const ViewLeadDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state.item;

    const handleBack = () => {
        navigate(-1);
    }

    return (

        <div className="card">
            <div className="d-flex justify-content-between">
                <p className='studentlist-card-text ps-2'>Lead Details</p>
                <button className='view-student-details-back-button me-2' onClick={handleBack}>
                    <p className='view-student-details-back-button-text'>Back</p>
                </button>
            </div>
            <div className="d-flex scroll">
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Lead ID</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{`LEAD-${data.id}`}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.name}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Email Address</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.emailid}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Contact</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.contactdetails}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>City</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.city}</p>
                    </div>
                </div>
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Address</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.address}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Education</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.education}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Employment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.employementStatus}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.status}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Source</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.source}</p>
                    </div>
                </div>
            </div>

            <div className="mt-3 view-student-details-middle-box">
                <div className="d-flex justify-content-between mt-2">
                    <p className='view-student-details-middle-heading me-4 '>Comments</p>
                    <div className='view-line1'></div>
                    <div className='d-flex flex-column studentid-value'>
                        {data.comments.map((item) => {
                            return (
                                <>
                                    <div className="d-flex">
                                        <TfiComments style={{ width: 40, height: 20, marginTop: 15 }} />
                                        <p>{item.comment}</p>
                                        <p className="ms-2">{item.commentAt}</p>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ViewLeadDetails;