import { useState, useEffect } from 'react';
import { getAllCategories } from '../../getdata/getdata';
import { updateExpense } from '../../postdata/postdata';
import { headers } from '../../headers';
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';


const UpdateExpense = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = data._id

    const [categorydata, setCategoryData] = useState([]);
    const [expensedata, setExpenseData] = useState({
        categoryName: data.categoryName,
        expenseName: data.expenseName,
        vendor: data.vendor,
        Amount: data.Amount,
        invoiceNumber: data.invoiceNumber,
    })
    const navigate = useNavigate();
    

    useEffect(() => {
        getAllCategories(headers)
            .then((response) => {
                setCategoryData(response.data.Categories)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleChange = (event) => {
        setExpenseData({
            ...expensedata,
            [event.target.name]: event.target.value
        })
    }

    const handleBack = () => {
        navigate('/manage-expense')
    }

    const AddExpense = (event) => {
        event.preventDefault();
        updateExpense(id, expensedata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                navigate('/manage-expense')
                window.location.reload(false);
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className='card'>
            <p className='ps-2 add-user-card-text'>Update Expense</p>
            <form onSubmit={AddExpense}>
                <div className="row ps-2">
                    <div className="col-sm-6">
                        <p className='make-payment-student-name'>Expense Category</p>
                        <select className="student-name-input-field form-select" name="categoryName" required
                            value={expensedata.categoryName} onChange={handleChange}>
                            <option value="">Select Category</option>
                            {categorydata.map((item) => {
                                return (
                                    <option value={item.categoryName}>{item.categoryName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-student-name'>Name of Expense</p>
                        <input className='student-name-input-field form-control' type="text" name="expenseName"
                            placeholder='Enter Expense Name' value={expensedata.expenseName} onChange={handleChange} required />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Vendor</p>
                        <input className='student-name-input-field form-control' type="email" name="vendor" required
                            placeholder='Enter Vendor Email' value={expensedata.vendor} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Amount</p>
                        <input className='student-name-input-field form-control' min={1} type="number" name="Amount" required
                            placeholder='Enter Amount' value={expensedata.Amount} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Invoice Number</p>
                        <input className='student-name-input-field form-control' min={1} type="text" name="invoiceNumber" required
                            placeholder='Enter Invoice Number' value={expensedata.invoiceNumber} onChange={handleChange} />
                    </div>
                </div>
                <button className='add-expense-submit-button me-2' type='button' onClick={handleBack}>
                    <p className='add-student-form-button-text'>Back</p>
                </button>
                <button className='add-expense-submit-button' type='submit'>
                    <p className='add-student-form-button-text'>Update</p>
                </button>
            </form>
        </div>
    );
}

export default UpdateExpense;