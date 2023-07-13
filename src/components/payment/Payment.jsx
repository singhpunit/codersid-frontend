import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Pagination from '../pagination/Pagination';
import { headers } from '../../headers';
import { getAllBatches, getAllStudents } from '../../getdata/getdata';
import { BallTriangle } from 'react-loader-spinner';
import PayFee from '../../assets/PayFee.png';
import '../../styles/payfee/payfee.css';
import ModalMakePayment from './ModalMakePayment';
import Tippy from '@tippyjs/react';

const Payment = () => {
    const [paymentlist, setPaymentList] = useState([]);
    const [allpaymentlist, setAllPaymentList] = useState([]);
    const [batchlist, setBatchList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [modal, setModal] = useState(false);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = paymentlist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(paymentlist.length / recordsPerPage)
    const [studentName, setSearchStudentName] = useState('');


    const handleModal = (id) => {
        setModal(id)
    };

    const handleClose = () => setModal(false);

    useEffect(() => {
        getAllStudents(headers)
            .then((response) => {
                const paymentList = response.data.Students.filter((item) => {
                    return (item.BalanceAmount === false && item.thirdInstallment.thirdInstallmentPaymentStatus === "Not Paid") ||
                        (item.BalanceAmount === false && item.thirdInstallment.thirdInstallmentPaymentStatus === "") ||
                        (item.BalanceAmount === true && item.fourthInstallment.fourthInstallmentPaymentStatus === "Not Paid") ||
                        (item.BalanceAmount === true && item.fourthInstallment.fourthInstallmentPaymentStatus === "NA")

                })
                setPaymentList(paymentList)
                setAllPaymentList(paymentList)
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
            setPaymentList(allpaymentlist);
            console.log(paymentlist)
        }
        else {
            let data = allpaymentlist.filter((item, i) => {
                return item.batchname === batchName;
            })
            console.log(data);
            if (data.length > 0) {
                setPaymentList(data);
            }
            else {
                setPaymentList([])

            }
        }
    }

    return (
        <div className="card">
            <div className='d-flex'>
                <p className='ps-2 payfee-card-text'>Pay Fee</p>
                <img className='payfee-icon' src={PayFee} alt="PayFee" />
            </div>
            <div className="row ps-2">
                <div className="col-sm-6">
                    <p className="text-start select-field-label">Select Batch</p>
                    <select className="pay-fee-input-width mb-2 w-100" name="batchName" id="batchName" onChange={handleBatchSelect}>
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
                    <input type="text" className="pay-fee-input-width w-100" id="studentname" name="studentname"
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
                            <th scope="col">Amount Due</th>
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
                                    {item.registration.registrationPaymentStatus === "Not Paid" ?
                                       <Tippy content={<span>{"Registration Fees"}</span>}>
                                       <td>{item.registration.registrationfees}</td></Tippy>  : null}
                                    {item.registration.registrationPaymentStatus === "Paid" &&
                                        item.secondInstallment.secondInstallmentPaymentStatus === "Not Paid" &&
                                        item.registration.registrationPaymentStatus === "Paid" ?
                                        <Tippy content={<span>{"First Installment Fees"}</span>}>
                                        <td>{item.secondInstallment.secondInstallmentfees}</td></Tippy> : null}
                                    {item.registration.registrationPaymentStatus === "Paid" &&
                                        item.secondInstallment.secondInstallmentPaymentStatus === "Paid" &&
                                        item.thirdInstallment.thirdInstallmentPaymentStatus === "Not Paid"
                                        ? 
                                        <Tippy content={<span>{"Second Installment Fees"}</span>}>
                                            <td>{item.thirdInstallment.thirdInstallmentfees}</td></Tippy> : null}
                                    {item.BalanceAmount ? 
                                   <Tippy content={<span>{"Third Installment Fees"}</span>}> 
                                   <td>{item.fourthInstallment.fourthInstallmentfees}</td></Tippy> : null}
                                    <td>{item.contactdetails}</td>
                                    <td>{item.createdAt.substring(0, 10)}</td>
                                    <td><button className='payfee-payment-button' onClick={() => {
                                        handleModal(item._id)
                                    }}>
                                        <p className='payfee-payment-button-text'>Make Payment</p>
                                    </button></td>
                                    <Modal show={modal === item._id ? true : false} onHide={handleClose}>
                                        <ModalMakePayment data={item} />
                                    </Modal>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                {currentRecords.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        {paymentlist.length === 0 ?
                            <p className='fs-4'>No Data Found</p>
                            :
                            <BallTriangle
                                height={300}
                                width={300}
                                radius={5}
                                color="#10D1E3"
                                ariaLabel="ball-triangle-loading"
                                wrapperClassName=''
                                wrapperStyle=""
                                visible={true}
                            />
                        }
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

export default Payment;
