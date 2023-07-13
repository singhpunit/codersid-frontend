import React, { useState, useEffect } from 'react';
import { addUser } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { getAllUsers } from '../../getdata/getdata';
import Pagination from '../pagination/Pagination';
import { BallTriangle } from 'react-loader-spinner';
import { headers } from '../../headers';
import { deleteUser } from '../../postdata/postdata';
import AddUserLogo from '../../assets/AddUser.png'
import '../../styles/user/user.css';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [userlist, setUserList] = useState([])
    const [userdata, setUserdata] = useState({
        name: "",
        email: "",
        password: "",
        permission: ""
    });

    const [permission, setPermission] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = userlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(userlist.length / recordsPerPage)
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    const permissionlist = ['Master', 'Leads', 'Payment', 'Manage Expense', 'Finance']

    useEffect(() => {
        setLoader(true);
        getAllUsers(headers)
            .then((response) => {
                setUserList(response.data.Users);
                setLoader(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleAddUser = () => {
        navigate("/add-user")
    }

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

    // console.log(permission)

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

    const DeleteUser = (id) => {
        deleteUser(id)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
    }

    return (
        <div className="card">
            {/* <div className='d-flex'>
                <p className='add-user-card-text'>Add User</p>
                <img className='add-user-icon' src={AddUserLogo} alt="AddUserLogo" />
                div
            </div> */}
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 add-user-card-text'>Users List
                        <img className='add-user-icon' src={AddUserLogo} alt="AddUserLogo" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button' onClick={handleAddUser}>
                        <p className='add-student-button-text'>Add User + </p>
                    </button>
                </div>
            </div>

            <div className="mt-2 scroll">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {currentRecords.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>
                                        <button className='delete-button' onClick={() => DeleteUser(item._id)}>
                                            <p className='delete-button-text'>Delete</p>
                                        </button></td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                {loader ?
                    <div className="d-flex justify-content-center">
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
                    </div> : null}

                {!loader && currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <p className='fs-4'>No Data Found</p>
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

export default AddUser;
