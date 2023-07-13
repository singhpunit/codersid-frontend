import React, { useEffect, useState } from 'react';
import { headers } from '../../headers';
import '../../styles/dashboard/dashboard.css';
import { getAllBatches, getAllCourses } from '../../getdata/getdata';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateStudent } from '../../postdata/postdata';
import { toast } from "react-toastify";
import '../../styles/student/addstudent.css';

const UpdateStudent = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = data._id

    const [studentdata, setStudentdata] = useState({
        studentname: data.studentname,
        batchname: data.batchname,
        course: data.course,
        emailid: data.emailid,
        contactdetails: data.contactdetails,
        address: data.address,
        totalfees: data.totalfees,
        registration: {
            registrationfees: data.registration.registrationfees,
            registrationDate: data.registration.registrationDate,
            registrationPaymentStatus: data.registration.registrationPaymentStatus
        },
        secondInstallment: {
            secondInstallmentfees: data.secondInstallment.secondInstallmentfees,
            secondInstallmentDate: data.secondInstallment.secondInstallmentDate,
            secondInstallmentPaymentStatus: data.secondInstallment.secondInstallmentPaymentStatus
        },
        thirdInstallment: {
            thirdInstallmentfees: data.thirdInstallment.thirdInstallmentfees,
            thirdInstallmentDate: data.thirdInstallment.thirdInstallmentDate,
            thirdInstallmentPaymentStatus: data.thirdInstallment.thirdInstallmentPaymentStatus
        },
        fourthInstallment: {
            fourthInstallmentfees: data.fourthInstallment.fourthInstallmentfees,
            fourthInstallmentDate: "",
            fourthInstallmentPaymentStatus: data.fourthInstallment.fourthInstallmentPaymentStatus
        },
        BalanceAmount: data.BalanceAmount
    });
    const [batchlist, setBatchList] = useState([]);
    const [courselist, setCourseList] = useState([]);
    const [mindate, setMinimumDate] = useState();
    const [totalfees, setTotalfees] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        disableDates();
        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
            })
            .catch((error) => {
                console.log(error);
            })
        getAllCourses(headers)
            .then((response) => {
                setCourseList(response.data.Courses);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const handleBack = () => {
        navigate("/students-list");
    }

    const handleCourse = (event) => {
        const course = event.target.value;
        if (course === 'Select Course') {
            window.location.reload(false);
        }
        else {
            let data = courselist.filter((item, i) => {
                return item.courseName === course;
            })
            studentdata.totalfees = data[0].coursePrice
            let registrationfees = (studentdata.totalfees * 25) / 100
            let secondfees = (studentdata.totalfees * 75 / 2) / 100
            let thirdfees = (studentdata.totalfees * 75 / 2) / 100
            studentdata.registration.registrationfees = registrationfees
            studentdata.secondInstallment.secondInstallmentfees = secondfees
            studentdata.thirdInstallment.thirdInstallmentfees = thirdfees
            setStudentdata({
                ...studentdata,
                [event.target.name]: course
            })
        }
    }

    const handleTotalFees = (event) => {
        const totalfees = event.target.value
        setTotalfees(totalfees)
        let registrationfees = (totalfees * 25) / 100
        let secondfees = (totalfees * 75 / 2) / 100
        let thirdfees = (totalfees * 75 / 2) / 100
        studentdata.registration.registrationfees = registrationfees
        studentdata.secondInstallment.secondInstallmentfees = secondfees
        studentdata.thirdInstallment.thirdInstallmentfees = thirdfees
        setStudentdata({
            ...studentdata,
            [event.target.name]: totalfees
        })
    }



    const handleChange = (event) => {
        setStudentdata({
            ...studentdata,
            [event.target.name]: event.target.value
        })
    }

    const AddStudent = (event) => {
        event.preventDefault();
        updateStudent(id, studentdata)
            .then((response) => {
                toast.success("Student Details Updated Successfully", {
                    position: "top-center",
                    autoClose: 3000
                })
                navigate("/students-list");
            }
            )
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })

    }


    const handleRegistrationFees = (event) => {
        const registrationfee = event.target.value;
        const difference = (studentdata.registration.registrationfees - registrationfee);
        studentdata.secondInstallment.secondInstallmentfees += difference
        setStudentdata({
            ...studentdata,
            registration: {
                ...studentdata.registration,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSecondInstallmentFees = (event) => {
        const secondInstallmentFees = event.target.value;
        const difference = (studentdata.secondInstallment.secondInstallmentfees - secondInstallmentFees);
        studentdata.thirdInstallment.thirdInstallmentfees += difference
        setStudentdata({
            ...studentdata,
            secondInstallment: {
                ...studentdata.secondInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleThirdInstallmentFees = (event) => {
        const thirdInstallmentFees = event.target.value;
        const difference = (studentdata.thirdInstallment.thirdInstallmentfees - thirdInstallmentFees);
        studentdata.fourthInstallment.fourthInstallmentfees += difference
        setStudentdata({
            ...studentdata,
            thirdInstallment: {
                ...studentdata.thirdInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleFourthInstallmentFees = (event) => {
        setStudentdata({
            ...studentdata,
            fourthInstallment: {
                ...studentdata.fourthInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleRegistrationDate = (event) => {
        setStudentdata({
            ...studentdata,
            registration: {
                ...studentdata.registration,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSecondInstallmentDate = (event) => {
        setStudentdata({
            ...studentdata,
            secondInstallment: {
                ...studentdata.secondInstallment,
                [event.target.name]: event.target.value
            }
        })

    }

    const handleThirdInstallmentDate = (event) => {
        setStudentdata({
            ...studentdata,
            thirdInstallment: {
                ...studentdata.thirdInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleFourthInstallmentDate = (event) => {
        setStudentdata({
            ...studentdata,
            fourthInstallment: {
                ...studentdata.fourthInstallment,
                [event.target.name]: event.target.value
            }
        })
    }


    const disableDates = () => {
        var today, dd, mm, yyyy;
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        if (dd < 10) {
            setMinimumDate(`${yyyy}-0${mm}-0${dd}`);
        }
        else {
            setMinimumDate(`${yyyy}-0${mm}-${dd}`);
        }
    }

    return (
        <div className="card">
            <p className='ps-2 add-user-card-text'>CodersID Students</p>

            <form onSubmit={AddStudent}>
                <div className='mt-3 row ps-2'>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Student Name</p>
                        <input type="text" className="input-box-width w-100" id="studentname" name="studentname"
                            value={studentdata.studentname}
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start select-field-label">Select Batch</p>
                        <select className="input-box-width w-100" name="batchname" value={studentdata.batchname}
                            onChange={handleChange} required>
                            <option value="">Select Batch</option>
                            {batchlist.map((item) => {
                                return (
                                    <option value={item.batchName}>{item.batchName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start select-field-label">Course Name</p>
                        <select className="input-box-width w-100" name="course" value={studentdata.course} onChange={handleCourse} required>
                            <option value="Select Course">Select Course</option>
                            {courselist.map((item) => {
                                return (
                                    <option value={item.courseName}>{item.courseName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter Email Address</p>
                        <input type="email" className="input-box-width w-100" id="emailid" name="emailid"
                            value={studentdata.emailid}
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter Contact Number</p>
                        <input type="tel" className="input-box-width w-100" id="contactdetails" name="contactdetails"
                            value={studentdata.contactdetails}
                            pattern="[0-9]{3}[0-9]{4}[0-9]{3}" onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter Address</p>
                        <input type="text" className="input-box-width w-100" id="address" name="address"
                            value={studentdata.address}
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter Total Fees</p>
                        <input type="number" className="input-box-width w-100" min={1} max={studentdata.totalfees}
                            id="totalfees" name="totalfees"
                            value={studentdata.totalfees}
                            onChange={handleTotalFees} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.registration.registrationPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.secondInstallment.secondInstallmentPaymentStatus === "Paid")} />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter Registration Fees</p>
                        <input type="number" className="input-box-width w-100"
                            value={studentdata.registration.registrationfees} max={studentdata.totalfees}
                            id="registrationfees" name="registrationfees"
                            onChange={handleRegistrationFees} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.registration.registrationPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.secondInstallment.secondInstallmentPaymentStatus === "Paid")} />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter Registration Date</p>
                        <input type="date" className="input-box-width w-100" min={mindate} id="registrationDate"
                            name="registrationDate"
                            value={studentdata.registration.registrationDate}
                            onChange={handleRegistrationDate} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.registration.registrationPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.secondInstallment.secondInstallmentPaymentStatus === "Paid")} />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter 1st Installment Fees</p>
                        <input type="number" className="input-box-width w-100"
                            value={studentdata.secondInstallment.secondInstallmentfees}
                            min={studentdata.registration.registrationfees}
                            max={studentdata.totalfees} id="secondInstallmentfees" name="secondInstallmentfees"
                            onChange={handleSecondInstallmentFees} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.secondInstallment.secondInstallmentPaymentStatus === "Paid")} />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter 1st Installment Date</p>
                        <input type="date" className="input-box-width w-100" min={mindate} id="secondInstallmentDate"
                            name="secondInstallmentDate"
                            value={studentdata.secondInstallment.secondInstallmentDate}
                            onChange={handleSecondInstallmentDate} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                || (data.BalanceAmount === false && data.secondInstallment.secondInstallmentPaymentStatus === "Paid")} />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter 2nd Installment Fees</p>
                        <input type="number" className="input-box-width w-100"
                            value={studentdata.thirdInstallment.thirdInstallmentfees}
                            min={studentdata.registration.registrationfees}
                            max={studentdata.totalfees} id="thirdInstallmentfees" name="thirdInstallmentfees"
                            onChange={handleThirdInstallmentFees} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                            } />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <p className="text-start input-field-label">Enter 2nd Installment Date</p>
                        <input type="date" className="input-box-width w-100" min={mindate} id="thirdInstallmentDate"
                            name="thirdInstallmentDate"
                            value={studentdata.thirdInstallment.thirdInstallmentDate}
                            onChange={handleThirdInstallmentDate} required
                            readOnly={(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                            } />
                    </div>
                    {studentdata.BalanceAmount ?
                        <>
                            <div className="col-sm-4 mb-3">
                                <p className='text-start input-field-label'>3rd Installment Fees</p>
                                <input className='input-box-width w-100' type="text"
                                    onChange={handleFourthInstallmentFees} value={studentdata.fourthInstallment.fourthInstallmentfees} min={data.registration.registrationfees}
                                    max={data.totalfees} id="fourthInstallmentfees" name="fourthInstallmentfees"
                                    placeholder='Enter 4th Installment Fees' required
                                    readOnly />
                            </div>
                            <div className="col-sm-4 mb-3">
                                <p className='text-start input-field-label'>3rd Installment Date</p>
                                <input className='input-box-width w-100' type="date"
                                    min={mindate}
                                    id="fourthInstallmentDate" name="fourthInstallmentDate"
                                    onChange={handleFourthInstallmentDate} required
                                    value={data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ?
                                        data.fourthInstallment.fourthInstallmentDate :
                                        studentdata.fourthInstallment.fourthInstallmentDate}
                                    readOnly={data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ? true : false} />
                            </div>
                        </>
                        : null}
                </div>
                <button className='add-student-form-button me-2' type='button' onClick={handleBack}>
                    <p className='add-student-form-button-text'>Back</p>
                </button>
                <button className='add-student-form-button' type='submit'>
                    <p className='add-student-form-button-text'>Update</p>
                </button>
            </form>

        </div>


    );
}

export default UpdateStudent;
