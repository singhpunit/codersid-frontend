import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../postdata/postdata';
import { toast } from "react-toastify";
import '../../styles/student/addstudent.css';
import '../../styles/dashboard/dashboard.css';

const AddUser = () => {
    const [userdata, setUserdata] = useState({
        name: "",
        email: "",
        password: "",
        permission: ""
    });
    const [permission, setPermission] = useState([]);
    const navigate = useNavigate();

    const permissionlist = ['CodersID Students', 'Master', 'Leads', 'Payment', 'Manage Expense', 'Finance', 'Assessment', 'Feedbacks']

    const handleChange = (event) => {
        setUserdata({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }

    const handlePermission = (event) => {
        var permissionlist = [...permission]
        if (event.target.checked) {
            permissionlist = [...permission, event.target.value]

        }
        else {
            permissionlist.splice(permission.indexOf(event.target.value), 1);
        }
        setPermission(permissionlist)
    }

    const handleBack = () => {
        navigate("/user-list");
    }

    const AddUser = (event) => {
        event.preventDefault();
        const payload = {
            ...userdata,
            permission: permission
        }
        addUser(payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 3000
                })
                navigate("/user-list");
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
        <div className="card">
            <p className='ps-2 add-user-card-text'>Add User</p>

            <form onSubmit={AddUser}>
                <div className='mt-2 ps-2 row'>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Name</p>
                        <input type="text" className="input-box-width w-100" id="name" name="name"
                            onChange={handleChange} required />
                    </div>

                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Email Address</p>
                        <input type="email" className="input-box-width w-100" id="email" name="email"
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Password</p>
                        <input type="password" className="input-box-width w-100" id="password" name="password"
                            onChange={handleChange} required />
                    </div>
                    
                </div>
                {permissionlist.map((item) => {
                    return (
                        <>
                            <input className='ms-2' type="checkbox" id="permission" name="permission" value={item} onChange={handlePermission}/>
                            <label className='ms-2 me-4 text-start fs-6' for="permission">{item}</label>
                        </>
                    )
                })}<br/>
                <button className='add-student-form-button me-2' type='button' onClick={handleBack}>
                    <p className='add-student-form-button-text'>Back</p>
                </button>
                <button className='add-student-form-button' type='submit'>
                    <p className='add-student-form-button-text'>Submit</p>
                </button>
            </form>

        </div>


    );
}

export default AddUser;
