import { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { getAllStudents } from '../../getdata/getdata';
import { headers } from '../../headers';
import { getAllBatches } from '../../getdata/getdata';
import StudentIcon from '../../assets/Studentlist.png';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { CSVLink } from "react-csv";
import '../../styles/student/studentlist.css';

const StudentList = () => {
    const [studentlist, setStudentList] = useState([]);
    const [allstudentlist, setAllStudentList] = useState([]);
    const [batchlist, setBatchList] = useState([]);
    const [studentName, setSearchStudentName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = studentlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(studentlist.length / recordsPerPage)
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [loader, setLoader] = useState(false);

    const handleDetails = (item) => {
        navigate('/students-details', { state: { item } })
    }

    const handleUpdate = (item) => {
        navigate('/update-student', { state: { item } })
    }

    useEffect(() => {
        setLoader(true);
        getAllStudents(headers)
            .then((response) => {
                setStudentList(response.data.Students);
                setAllStudentList(response.data.Students)
            })
            .catch((error) => {
                console.log(error);
            })
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
                setLoader(false)
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const handleBatchSelect = (event) => {
        const batchName = event.target.value;
        console.log(batchName)
        if (batchName === 'All Batch') {
            setStudentList(allstudentlist);
        }
        else {
            let data = allstudentlist.filter((item, i) => {
                return item.batchname === batchName;
            })
            console.log(data);
            if (data.length > 0) {
                setStudentList(data);
            }
            else {
                setStudentList([])
            }
        }
    }

    const handleStudent = () => {
        navigate("/add-student")
    }

    const headers1 = [
        { label: "Student ID", key: 'id' },
        { label: "Student Name", key: 'studentname' },
        { label: "Batch", key: 'batchname' },
        { label: "Course", key: 'course' },
        { label: "Email Address", key: 'emailid' },
        { label: "Contact Details", key: 'contactdetails' },
        { label: "Address", key: 'address' },
        // {label: "Admission Date", key: 'createdAt'},
        { label: "Registration Fees", key: 'registration.registrationfees' },
        { label: "Registration Payment Status", key: 'registration.registrationPaymentStatus' },
        { label: "Registration Date", key: 'registration.registrationDate' },
        { label: "1st Installment Fees", key: 'secondInstallment.secondInstallmentfees' },
        { label: "1st Installment Payment Status", key: 'secondInstallment.secondInstallmentPaymentStatus' },
        { label: "1st Installment Date", key: 'secondInstallment.secondInstallmentDate' },
        { label: "2nd Installment Fees", key: 'thirdInstallment.thirdInstallmentfees' },
        { label: "2nd Installment Payment Status", key: 'thirdInstallment.thirdInstallmentPaymentStatus' },
        { label: "2nd Installment Payment Status", key: 'thirdInstallment.thirdInstallmentDate' },
        { label: "3rd Installment Fees", key: 'fourthInstallment.fourthInstallmentfees' },
        { label: "3rd Installment Payment Status", key: 'fourthInstallment.fourthInstallmentPaymentStatus' },
        { label: "3rd Installment Date", key: 'fourthInstallment.fourthInstallmentDate' },
    ]

    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='ps-2 studentlist-card-text'>CodersID Student<img className='studentlist-icon' src={StudentIcon} alt="StudentIcon" /></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button me-1'>
                        <CSVLink data={studentlist} headers={headers1} filename='Student_Records.csv'
                            className='add-student-button-text text-decoration-none'>Export Data</CSVLink>
                    </button>
                    <button className='add-student-button' onClick={handleStudent}>
                        <p className='add-student-button-text'>Add Student + </p>
                    </button>
                </div>
            </div>

            <div className="row mt-3 ps-2">
                <div className="col-sm-6">
                    <p className="text-start select-field-label">Select Batch</p>
                    <select className="student-list-input-width mb-2 w-100" name="batchName" id="batchName" onChange={handleBatchSelect}>
                        <option value="All Batch">All Batch</option>
                        {batchlist.map((item) => {
                            return (
                                <option value={item.batchName} >{item.batchName}</option>
                            )

                        })}
                    </select>
                </div>
                <div className="col-sm-6">
                    <p className="text-start input-field-label">Student Name</p>
                    <input type="text" className="student-list-input-width w-100" id="studentname" name="studentname"
                        onChange={(e) => setSearchStudentName(e.target.value)} />
                </div>

            </div>

            <div className='scroll'>

                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">StudentID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Batch Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Contact Details</th>
                            <th scope="col">Admission Date</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.filter((val) => {
                            if (studentName === "") {
                                return val;
                            }
                            else if (val.studentname.toLowerCase().includes(studentName.toLowerCase())) {
                                return val;
                            }
                        }).map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{`CODERSID-${item.id}`}</td>
                                    <td>{item.studentname}</td>
                                    <td>{item.batchname}</td>
                                    <td>{item.course}</td>
                                    <td>{item.emailid}</td>
                                    <td>{item.contactdetails}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td><button className='details-button' onClick={() => {
                                        handleDetails(item)
                                    }}>
                                        <p className='details-button-text'>Details</p>
                                    </button>
                                        {role === "admin" ? <button className='ms-2 details-button' onClick={() => {
                                            handleUpdate(item)
                                        }}>
                                            <p className='details-button-text'>Update</p>
                                        </button> : null}
                                    </td>
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

export default StudentList;
