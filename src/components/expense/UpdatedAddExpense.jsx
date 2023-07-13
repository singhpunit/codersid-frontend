import { useState, useEffect } from 'react';
import { getAllCategories } from '../../getdata/getdata';
import { addNewExpense } from '../../postdata/postdata';
import { headers } from '../../headers';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const UpdatedAddExpense = () => {
    const [categorydata, setCategoryData] = useState([]);
    const [expensedata, setExpenseData] = useState({
        categoryName: "",
        expenseName: "",
        vendor: "",
        Amount: "",
        bill: ""
    })
    const navigate = useNavigate();
    const formdata = new FormData();

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

    const handleImage = (event) => {
        const file = event.target.files[0];
        setExpenseData({
            ...expensedata,
            [event.target.name]: file
          })
    }


    const AddExpense = (event) => {
        event.preventDefault();
        formdata.append('categoryName', expensedata.categoryName)
        formdata.append('expenseName', expensedata.expenseName)
        formdata.append('vendor', expensedata.vendor)
        formdata.append('Amount', expensedata.Amount)
        formdata.append('bill', expensedata.bill)
        addNewExpense(formdata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
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
            <p className='make-payment-title'>Add Expense</p>
            <form onSubmit={AddExpense}>
                <div className="row">
                    <div className="col-sm-6">
                        <p className='make-payment-student-name'>Expense Category</p>
                        <select className="student-name-input-field form-select" name="categoryName" required
                            onChange={handleChange}>
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
                            placeholder='Enter Expense Name' onChange={handleChange} required />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Vendor</p>
                        <input className='student-name-input-field form-control' type="email" name="vendor" required
                            placeholder='Enter Vendor Email' onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Amount</p>
                        <input className='student-name-input-field form-control' min={1} type="number" name="Amount" required
                            placeholder='Enter Amount' onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Upload Bill</p>
                        <input className='student-name-input-field form-control'accept="application/pdf" type="file" name="bill" required
                             onChange={handleImage} />
                    </div>
                </div>
                <button className='add-expense-submit-button me-2' type='button' onClick={handleBack}>
                    <p className='add-student-form-button-text'>Back</p>
                </button>
                <button className='add-expense-submit-button' type='submit'>
                    <p className='add-student-form-button-text'>Submit</p>
                </button>
            </form>
        </div>
    );
}

export default UpdatedAddExpense;