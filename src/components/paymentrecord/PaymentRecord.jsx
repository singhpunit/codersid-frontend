import React, { useEffect, useState } from 'react';
import Pagination from '../pagination/Pagination';
import { getAllPayments } from '../../getdata/getdata';
import { headers } from '../../headers';
import { getAllBatches } from '../../getdata/getdata';
import PaymentRecordLogo from '../../assets/PaymentRecordLogo.png';
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";
import '../../styles/paymentrecords/paymentrecords.css';

const PaymentRecord = () => {
    const [studentlist, setStudentList] = useState([]);
    const [allstudentlist, setAllStudentList] = useState([]);
    const [batchlist, setBatchList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = studentlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(studentlist.length / recordsPerPage)
    const [studentName, setSearchStudentName] = useState('');
    const [fromdate, setfromDate] = useState();
    const navigate = useNavigate();
    let total = 0;
    const totalsum = studentlist.map((item) => {
        return total = total + parseInt(item.Amount);

    })
    const grandtotal = totalsum[studentlist.length - 1]


    const handleNavigate = (item) => {
        navigate('/payment-receipt', { state: { item } })
    }


    useEffect(() => {
        getAllPayments(headers)
            .then((response) => {
                setStudentList(response.data.Payments);
                setAllStudentList(response.data.Payments);
            })
            .catch((error) => {
                console.log(error);
            })

        getAllBatches(headers)
            .then((response) => {
                setBatchList(response.data.Batches);
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

    const handleFromDate = (event) => {
        const fromDate = event.target.value
        setfromDate(fromDate)
        let data = allstudentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromDate;
        })
        setStudentList(data);
    }

    const handleToDate = (event) => {
        const toDate = event.target.value
        let data = allstudentlist.filter((item, i) => {
            return item.createdAt.substring(0, 10) >= fromdate && item.createdAt.substring(0, 10) <= toDate;
        })
        setStudentList(data);
    }

    const headers1 = [
        { label: "Student ID", key: 'id' },
        { label: "Student Name", key: 'StudentName' },
        { label: "Batch", key: 'batchname' },
        { label: "Course", key: 'course' },
        { label: "Amount", key: 'Amount' },
        { label: "Email Address", key: 'Email' },
        { label: "Contact Details", key: 'contactdetails' },
        { label: "Payment Type", key: 'PaymentType' },
        { label: "Payment Mode", key: 'PaymentMode' },
    ]

    return (
        <div className="card">
            <div className='d-flex justify-content-between'>
                <p className='ps-2 payment-records-card-text'>Payment Records
                    <img className='payment-records-icon' src={PaymentRecordLogo} alt="PaymentRecordLogo" />
                </p>
                <button className='add-student-button'><CSVLink headers={headers1} data={studentlist} filename='Payment_Records.csv'
                        className='add-student-button-text text-decoration-none'>Export Data</CSVLink></button>
            </div>
            <div className="row mt-2 ps-2">
                <div className="col-sm-3">
                    <p className="text-start select-field-label">Select Batch</p>
                    <select className="payment-records-input-width mb-2 w-100" name="batchName" id="batchName" onChange={handleBatchSelect}>
                        <option value="All Batch">All Batch</option>
                        {batchlist.map((item) => {
                            return (
                                <option value={item.batchName} >{item.batchName}</option>
                            )

                        })}
                    </select>
                </div>
                <div className="col-sm-3">
                    <p className="text-start input-field-label">Enter Student Name</p>
                    <input type="text" className="payment-records-input-width w-100" id="studentname" name="studentname"
                        placeholder=""
                        onChange={(e) => setSearchStudentName(e.target.value)} />
                </div>
                <div className="col-sm-3">
                    <p className="text-start select-field-label">Select From Date</p>
                    <input type="date" className="payment-records-input-width w-100" id="fromDate" name="fromDate"
                        onChange={handleFromDate} />
                </div>
                <div className="col-sm-3">
                    <p className="text-start select-field-label">Select To Date</p>
                    <input type="date" className="payment-records-input-width w-100" id="toDate" name="toDate"
                        onChange={handleToDate} />
                </div>
            </div>

            <div className="scroll">
                <table className="table">
                    <thead className='text-center'>
                        <tr>
                            <th scope="col">Receipt No.</th>
                            <th scope="col">Receipt Date</th>
                            <th scope="col">StudentID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Batch Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Amount</th>
                            <th scope="col">GST - 18%</th>
                            <th scope="col">Total Amount</th>
                            <th scope="col">Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>
                        {currentRecords.filter((val) => {
                            if (studentName === "") {
                                return val;
                            }
                            else if (val.StudentName.toLowerCase().includes(studentName.toLowerCase())) {
                                return val;
                            }
                        }).map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{`CI/${item._id.slice(-3, -1)}`}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td>{`CODERSID-${item.id}`}</td>
                                    <td>{item.StudentName}</td>
                                    <td>{item.batchname}</td>
                                    <td>{item.course}</td>
                                    <td>{item.Amount - (item.Amount * 18) / 100}</td>
                                    <td>{(item.Amount * 18) / 100}</td>
                                    <td>{item.Amount}</td>
                                    <td><button className='details-button' onClick={() => {
                                        handleNavigate(item)
                                    }}>
                                        <p className='details-button-text'>Details</p>
                                    </button></td>
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
                        {allstudentlist.length !== 0 ?
                            <p className='fs-4'>No Data Found</p>
                            :
                            <BallTriangle
                                height={250}
                                width={300}
                                radius={5}
                                color="#10D1E3"
                                ariaLabel="ball-triangle-loading"
                                wrapperClassName=''
                                wrapperStyle=""
                                visible={true}
                            />}
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

export default PaymentRecord;
