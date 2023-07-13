import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BallTriangle } from 'react-loader-spinner';
import { getAllNewExpenses } from '../../getdata/getdata';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import UpdatedExpenseDetails from '../../components/expense/UpdatedExpenseDetails';
import ExpenseManageIcon from '../../assets/ExpenseManageIcon.png';
import '../../styles/expense/expensemanagement.css';

const UpdatedExpenseManagement = () => {
    const [expensedata, setExpenseData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [modal, setModal] = useState(false);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = expensedata.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(expensedata.length / recordsPerPage)
    let total = 0;
    const totalsum = expensedata.map((item, i) => {
        return total = total + parseInt(item.Amount);

    })
    const grandtotal = totalsum[expensedata.length - 1]
    const role = localStorage.getItem('role');


    const navigate = useNavigate();

    const handleModal = (id) => {
        setModal(id)
    };


    const handleClose = () => setModal(false);

    useEffect(() => {
        getAllNewExpenses()
            .then((response) => {
                setExpenseData(response.data.Expenses)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleAddExpense = () => {
        navigate("/add-expense")
    }

    const handleUpdateExpense = (item) => {
        navigate('/update-expense', { state: { item } })
    }

    return (
        <div className='card'>
            <div className='d-flex justify-content-between'>
                <p className='expense-management-text'>Expense Management
                    <img className='expense-manage-icon' src={ExpenseManageIcon} alt="ExpenseManageIcon" /></p>
                <button className='add-expense-button ml-auto' onClick={handleAddExpense}>
                    <p className='add-expense-button-text'>Add Expense + </p>
                </button>
            </div>
            <div className='expense-line-1'></div>
            <div className="scroll">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Expense Category</th>
                            <th scope="col">Name of Expense</th>
                            <th scope="col">Vendor</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>
                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.categoryName}</td>
                                    <td>{item.expenseName}</td>
                                    <td>{item.vendor}</td>
                                    <td>{item.Amount}</td>
                                    <td><button className='details-button' onClick={() => {
                                        handleModal(item._id)
                                    }}>
                                        <p className='details-button-text'>Details</p>
                                    </button>
                                        {role === "admin" ? <button className='ms-2 details-button' onClick={() => {
                                            handleUpdateExpense(item)
                                        }}>
                                            <p className='details-button-text'>Update</p>
                                        </button> : null}
                                    </td>
                                    <Modal show={modal === item._id ? true : false} onHide={handleClose}>
                                        <UpdatedExpenseDetails data={item} />
                                    </Modal>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {currentRecords.length === 0 ? null :
                    <div className='d-flex justify-content-between'>
                        <p className='ps-4'>Total Amount</p>
                        <p className='pe-4'>{grandtotal}/-</p>
                    </div>
                }
                {currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <BallTriangle
                            height={250}
                            width={300}
                            radius={5}
                            color="#10D1E3"
                            ariaLabel="ball-triangle-loading"
                            wrapperClassName=''
                            wrapperStyle=""
                            visible={true}
                        />
                    </div>
                    : null}

            </div>
            {currentRecords.length > 0 ?
                <div className="text-center">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                : null}
        </div>
    );
}

export default UpdatedExpenseManagement;