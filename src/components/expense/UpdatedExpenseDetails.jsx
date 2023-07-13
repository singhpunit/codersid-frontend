import { Modal } from "react-bootstrap";
import { secondbaseUrl } from "../../baseurl";
import '../../styles/expense/expensedetails.css';

const UpdatedExpenseDetails = ({ data }) => {

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Expense Details
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex ">
                    <div className='view-expense-details-modal-box'>
                        <div className="d-flex justify-content-between">
                            <p className='view-student-details-list-heading-1'>
                                Expense Category</p>
                            <div className='view-line1'></div>
                            <p className='studentid-value'>{data.categoryName}</p>
                        </div>
                        <div className='student-details-horizontal-line'></div>
                        <div className="d-flex justify-content-between">
                            <p className='view-student-details-list-heading-1'>Name of Expense</p>
                            <div className='view-line1'></div>
                            <p className='studentid-value'>{data.expenseName}</p>

                        </div>
                        <div className='student-details-horizontal-line'></div>
                        <div className="d-flex justify-content-between">
                            <p className='view-student-details-list-heading-1'>Vendor</p>
                            <div className='view-line1'></div>
                            <p className='studentid-value'>{data.vendor}</p>

                        </div>
                        <div className='student-details-horizontal-line'></div>
                        <div className="d-flex justify-content-between">
                            <p className='view-student-details-list-heading-1'>Amount</p>
                            <div className='view-line1'></div>
                            <p className='studentid-value'>{data.Amount}/-</p>

                        </div>
                        <div className='student-details-horizontal-line'></div>
                        <div className="d-flex justify-content-between">
                            <p className='view-student-details-list-heading-1'>Bill</p>
                            <div className='view-line1'></div>
                            <p className='studentid-value'>
                                <a className='text-decoration-none' href={`${secondbaseUrl}${data.bill}`}
                                    download="Expense_Bill" target="_blank"
                                    rel="noreferrer">View Expense</a>
                            </p>

                        </div>
                    </div>
                </div>

            </Modal.Body>
        </>
    );
}

export default UpdatedExpenseDetails;