import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/student/studentdetails.css';


const StudentDetails = () => {
    const location = useLocation();
    const data = location.state.item;
    const navigate = useNavigate();
    const [date, setDate] = useState();
    const disableDates = () => {
        var today, dd, mm, yyyy;
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        if (dd < 10) {
            setDate(`${yyyy}-0${mm}-0${dd}`);
        }
        else {
            setDate(`${yyyy}-0${mm}-${dd}`);
        }
    }


    useEffect(() => {
        disableDates()
    }, [])

    const handleBack = () => {
        navigate('/students-list');
    }



    return (
        <div className="card">
            <div className="d-flex justify-content-between">
                <p className='add-user-card-text ps-2'>CodersID Students Details</p>
                <button className='view-student-details-back-button me-2' onClick={handleBack}>
                    <p className='view-student-details-back-button-text'>Back</p>
                </button>
            </div>

            <div className="d-flex scroll">
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Student ID</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{`CODERSID-${data.id}`}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Batch Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.batchname}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Email Address</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.emailid}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Address</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.address}</p>

                    </div>
                </div>
                <div className='view-student-details-primary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Student Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.studentname}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Course Name</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.course}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Contact Details</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.contactdetails}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Admission Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.createdAt.substring(0, 10)}</p>
                    </div>
                </div>
            </div>

            <div className="view-student-details-middle-box">
                <div className="d-flex justify-content-center mt-2">
                    <p className='view-student-details-middle-heading me-4 '>Total Fees</p>
                    <div className='view-line1'></div>
                    <p className='ms-2 studentid-value'>{data.totalfees}/-</p>
                </div>
            </div>

            {/* <div className="d-flex scroll">
                <div className='view-student-details-secondary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Registration Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.registration.registrationfees}/-</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>1st Installment Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.secondInstallment.secondInstallmentfees}/-</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>2nd Installment Fees</p>
                        <div className='view-line1'></div>
                        <div className='d-flex justify-content-end'>
                            <p className='studentid-value'>{data.thirdInstallment.thirdInstallmentfees}/-</p></div>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>3rd Installment Fees</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.BalanceAmount ? `${data.fourthInstallment.fourthInstallmentfees}/-` : "NA"}</p>
                    </div>
                    
                </div>
                <div className='view-student-details-secondary-box'>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Registration Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.registration.registrationDate}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>1st Installment Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.secondInstallment.secondInstallmentDate}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>2nd Installment Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.thirdInstallment.thirdInstallmentDate}</p>

                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>3rd Installment Date</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentDate : "NA"}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    

                </div>
                <div className='view-student-details-secondary-box'>
                <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>Registration Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.registration.registrationPaymentStatus}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>1st Installment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.secondInstallment.secondInstallmentPaymentStatus}</p>
                    </div>
                    
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>2nd Installment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.thirdInstallment.thirdInstallmentPaymentStatus}</p>
                    </div>
                    <div className='student-details-horizontal-line'></div>
                    <div className="d-flex justify-content-between">
                        <p className='view-student-details-list-heading-1'>3rd Installment Status</p>
                        <div className='view-line1'></div>
                        <p className='studentid-value'>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentPaymentStatus : "NA"}</p>
                    </div>

                </div>
            </div> */}

            <div className="scroll view-student-details-table-box">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        <tr>
                            <td>Registration Fees</td>
                            {(data.registration.registrationDate < date && data.registration.registrationPaymentStatus === "Not Paid") ?
                                <td style={{ backgroundColor: "orange" }}>{data.registration.registrationDate}
                                    <span className='fs-6 fw-bold ms-2'>(Overdue)</span></td>
                                : <td>{data.registration.registrationDate}</td>}
                            <td>{data.registration.registrationPaymentStatus}</td>
                            <td>{data.registration.registrationfees}/-</td>
                        </tr>
                        <tr>
                            <td>1st Installment Fees</td>
                            {(data.secondInstallment.secondInstallmentDate < date && data.secondInstallment.secondInstallmentPaymentStatus === "Not Paid") ?
                                <td style={{ backgroundColor: "orange" }}>{data.secondInstallment.secondInstallmentDate}
                                    <span className='fs-6 fw-bold ms-2'>(Overdue)</span></td>
                                : <td>{data.secondInstallment.secondInstallmentDate}</td>}
                            <td>{data.secondInstallment.secondInstallmentPaymentStatus}</td>
                            <td>{data.secondInstallment.secondInstallmentfees}/-</td>
                        </tr>
                        <tr>
                            <td>2nd Installment Fees</td>
                            {(data.thirdInstallment.thirdInstallmentDate < date && data.thirdInstallment.thirdInstallmentPaymentStatus === "Not Paid") ?
                                <td style={{ backgroundColor: "orange" }}>{data.thirdInstallment.thirdInstallmentDate}
                                    <span className='fs-6 fw-bold ms-2'>(Overdue)</span></td>
                                : <td>{data.thirdInstallment.thirdInstallmentDate}</td>}
                            <td>{data.thirdInstallment.thirdInstallmentPaymentStatus}</td>
                            <td>{data.thirdInstallment.thirdInstallmentfees}/-</td>
                        </tr>
                        <tr>
                            <td>3rd Installment Fees</td>
                            {(data.BalanceAmount && data.fourthInstallment.fourthInstallmentDate < date && data.fourthInstallment.fourthInstallmentPaymentStatus === "Not Paid") ?
                                <td style={{ backgroundColor: "orange" }}>
                                    {data.BalanceAmount ? data.fourthInstallment.fourthInstallmentDate : "NA"}
                                    <span className='fs-6 fw-bold ms-2'>(Overdue)</span></td>
                                : <td>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentDate : "NA"}</td>}
                            <td>{data.BalanceAmount ? data.fourthInstallment.fourthInstallmentPaymentStatus : "NA"}</td>
                            <td>{data.BalanceAmount ? `${data.fourthInstallment.fourthInstallmentfees}/-` : "NA"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default StudentDetails;