import { useState, useEffect } from "react";
import { updatePaymentStatus, addPaymentRecord } from "../../postdata/postdata";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import '../../styles/payfee/makepayment.css';


const ModalMakePayment = ({data}) => {
    const id = data._id

    const [paymentdata, setPaymentData] = useState({
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
    })


    const [paymentrecord, setPaymentRecord] = useState({
        id: data.id,
        StudentName: data.studentname,
        batchname: data.batchname,
        course: data.course,
        Email: data.emailid,
        contactdetails: data.contactdetails,
        Amount: "",
        PaymentType: "",
        PaymentMode: ""
    })

    const [thirdfees, setThirdfees] = useState();
    const [mindate, setMinimumDate] = useState();
    const navigate = useNavigate();


    useEffect(() => {
        disableDates();
    }, [])



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

    const handleRegistrationChange = (event) => {
        const registrationfee = event.target.value;
        const difference = (paymentdata.registration.registrationfees - registrationfee);
        paymentdata.secondInstallment.secondInstallmentfees += difference

        setPaymentData({
            ...paymentdata,
            registration: {
                ...paymentdata.registration,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSecondInstallmentChange = (event) => {
        const secondInstallmentFees = event.target.value;
        const difference = (paymentdata.secondInstallment.secondInstallmentfees - secondInstallmentFees);
        paymentdata.thirdInstallment.thirdInstallmentfees += difference
        setPaymentData({
            ...paymentdata,
            secondInstallment: {
                ...paymentdata.secondInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleThirdInstallmentChange = (event) => {
        setThirdfees(event.target.value)
        setPaymentData({
            ...paymentdata,
            thirdInstallment: {
                ...paymentdata.thirdInstallment,
                [event.target.name]: event.target.value
            }
        })

    }

    const handleFourthInstallmentChange = (event) => {
        setPaymentData({
            ...paymentdata,
            fourthInstallment: {
                ...paymentdata.fourthInstallment,
                [event.target.name]: event.target.value
            }
        })
    }


    const handleFourthInstallmentDate = (event) => {
        setPaymentData({
            ...paymentdata,
            fourthInstallment: {
                ...paymentdata.fourthInstallment,
                [event.target.name]: event.target.value
            }
        })
    }

    const handlePaymentType = (event) => {
        setPaymentRecord({
            ...paymentrecord,
            [event.target.name]: event.target.value
        })
        if (paymentrecord.PaymentType === "Registration fee") {
            paymentdata.registration.registrationPaymentStatus = "Paid";
            paymentdata.registration.registrationDate = mindate
        }
        if (paymentrecord.PaymentType === "Installment 1") {
            paymentdata.secondInstallment.secondInstallmentPaymentStatus = "Paid";
            paymentdata.secondInstallment.secondInstallmentDate = mindate
        }
        if (paymentrecord.PaymentType === "Installment 2") {
            paymentdata.thirdInstallment.thirdInstallmentPaymentStatus = "Paid";
            paymentdata.thirdInstallment.thirdInstallmentDate = mindate
        }
        if (paymentrecord.PaymentType === "Installment 3") {
            paymentdata.fourthInstallment.fourthInstallmentPaymentStatus = "Paid"
        }
    }


    const handlePaymentMode = (event) => {
        setPaymentRecord({
            ...paymentrecord,
            [event.target.name]: event.target.value
        })
    }



    const handlePayment = (event) => {
        event.preventDefault();

        if (paymentrecord.PaymentType === "Registration fee") {
            paymentdata.registration.registrationPaymentStatus = "Paid";
            paymentdata.registration.registrationDate = mindate
        }
        if (paymentrecord.PaymentType === "Installment 1") {
            paymentdata.secondInstallment.secondInstallmentPaymentStatus = "Paid";
            paymentdata.secondInstallment.secondInstallmentDate = mindate
        }
        if (paymentrecord.PaymentType === "Installment 2") {
            paymentdata.thirdInstallment.thirdInstallmentPaymentStatus = "Paid";
            paymentdata.thirdInstallment.thirdInstallmentDate = mindate
        }
        if (paymentrecord.PaymentType === "Installment 3") {
            paymentdata.fourthInstallment.fourthInstallmentPaymentStatus = "Paid"
        }

        if (thirdfees < data.thirdInstallment.thirdInstallmentfees) {
            const totalfees = data.totalfees;
            const sumofThreeInstallments = Number(data.registration.registrationfees) + Number(data.secondInstallment.secondInstallmentfees) + Number(thirdfees);
            console.log(sumofThreeInstallments);
            const pendingAmount = Number(totalfees) - sumofThreeInstallments;

            if (pendingAmount > 0) {
                paymentdata.fourthInstallment.fourthInstallmentfees = pendingAmount;
                paymentdata.BalanceAmount = true;

                updatePaymentStatus(id, paymentdata)
                    .then((response) => {
                        toast.success(response.data.msg, {
                            position: "top-center",
                            autoClose: 2000
                        })

                        window.location.reload(false);
                        navigate("/payment-records")
                    })
                    .catch((error) => {
                        toast.error(error.response.data.msg, {
                            position: "top-center",
                            autoClose: 2000
                        })
                    })
            }
        }

        else {
            console.log(paymentdata)
            updatePaymentStatus(id, paymentdata)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })
                    window.location.reload(false);
                    navigate("/payment-records")
                })
                .catch((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })
                })
        }

        if (paymentrecord.PaymentType === "Registration fee") {
            paymentrecord.Amount = paymentdata.registration.registrationfees;
        }
        else if (paymentrecord.PaymentType === "Installment 1") {
            paymentrecord.Amount = paymentdata.secondInstallment.secondInstallmentfees;
        }
        else if (paymentrecord.PaymentType === "Installment 2") {
            paymentrecord.Amount = paymentdata.thirdInstallment.thirdInstallmentfees;

        }
        else {
            paymentrecord.Amount = paymentdata.fourthInstallment.fourthInstallmentfees;

        }

        console.log(paymentrecord);
        addPaymentRecord(paymentrecord)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
                window.location.reload(false);
                navigate("/payment-records")
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })

    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Payment Details
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=''>
                    
                    <form onSubmit={handlePayment}>
                        <div className="">
                            
                            {data.registration.registrationPaymentStatus === "Not Paid" ?
                                <div className="">
                                    <p className='make-payment-email-address'>Registration Fees</p>
                                    <input className='student-name-input-field form-control' type="number"
                                        value={paymentdata.registration.registrationfees} max={data.totalfees} id="registrationfees"
                                        name="registrationfees" onChange={handleRegistrationChange}
                                        readOnly={data.registration.registrationPaymentStatus === "Paid" ? true : false} />
                                </div>
                                : null}

                            {paymentdata.registration.registrationPaymentStatus === "Paid" &&
                                data.secondInstallment.secondInstallmentPaymentStatus === "Not Paid" &&
                                data.registration.registrationPaymentStatus === "Paid" ?
                                <div className="">
                                    <p className='make-payment-email-address'>1st Installment Fees</p>
                                    <input className='student-name-input-field form-control' type="number"
                                        value={paymentdata.secondInstallment.secondInstallmentfees}
                                        min={data.registration.registrationfees} max={data.totalfees} id="secondInstallmentfees"
                                        name="secondInstallmentfees"
                                        onChange={handleSecondInstallmentChange} placeholder='Enter 1st Installment Fees' required
                                        readOnly={data.registration.registrationPaymentStatus === "Not Paid" ||
                                            data.secondInstallment.secondInstallmentPaymentStatus === "Paid" ? true : false} />
                                </div>
                                : null}

                            {paymentdata.registration.registrationPaymentStatus === "Paid" &&
                                data.secondInstallment.secondInstallmentPaymentStatus === "Paid" &&
                                data.thirdInstallment.thirdInstallmentPaymentStatus === "Not Paid"
                                ?
                                <div className="">
                                    <p className='make-payment-email-address'>2nd Installment Fees</p>
                                    <input className='student-name-input-field form-control' type="number"
                                        value={paymentdata.thirdInstallment.thirdInstallmentfees} min={data.registration.registrationfees}
                                        max={data.totalfees} id="thirdInstallmentfees" name="thirdInstallmentfees"
                                        onChange={handleThirdInstallmentChange} placeholder='Enter 3rd Installment Fees' required
                                        readOnly={data.registration.registrationPaymentStatus === "Not Paid" ||
                                            data.secondInstallment.secondInstallmentPaymentStatus === "Not Paid" ||
                                            data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid" ? true : false} />
                                </div>
                                : null}

                            {paymentdata.BalanceAmount ?
                                <>
                                    <div className="">
                                        <p className='make-payment-email-address'>3rd Installment Fees</p>
                                        <input className='student-name-input-field form-control' type="text"
                                            value={paymentdata.fourthInstallment.fourthInstallmentfees} min={data.registration.registrationfees}
                                            max={data.totalfees} id="fourthInstallmentfees" name="fourthInstallmentfees"
                                            onChange={handleFourthInstallmentChange} placeholder='Enter 4th Installment Fees' required
                                            readOnly />
                                    </div>
                                    <div className="">
                                        <p className='make-payment-email-address'>3rd Installment Date</p>
                                        <input className='student-name-input-field form-control' type="date"
                                            min={mindate}
                                            id="fourthInstallmentDate" name="fourthInstallmentDate"
                                            onChange={handleFourthInstallmentDate} required
                                            value={data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ?
                                                data.fourthInstallment.fourthInstallmentDate :
                                                paymentdata.fourthInstallment.fourthInstallmentDate}
                                            readOnly={data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid" ? true : false} />
                                    </div>
                                </>
                                : null}
                            {(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                ? null :
                                <>
                                    <div className="">
                                        <p className='make-payment-email-address'>Payment Type</p>
                                        <select className="make-payment-third-installment-status-input-field form-select w-100" name="PaymentType" required
                                            onChange={handlePaymentType}>
                                            <option value="">Select Payment Type</option>
                                            {data.registration.registrationPaymentStatus === "Not Paid" ?
                                                <option value="Registration fee">Registration fee</option> : null}
                                            {paymentdata.registration.registrationPaymentStatus === "Paid" &&
                                                data.secondInstallment.secondInstallmentPaymentStatus === "Not Paid" &&
                                                data.registration.registrationPaymentStatus === "Paid" ?

                                                <option value="Installment 1">Installment 1</option> : null}
                                            {paymentdata.registration.registrationPaymentStatus === "Paid" &&
                                                data.secondInstallment.secondInstallmentPaymentStatus === "Paid" &&
                                                data.thirdInstallment.thirdInstallmentPaymentStatus === "Not Paid"
                                                ? <option value="Installment 2">Installment 2</option> : null}
                                            {paymentdata.BalanceAmount ? <option value="Installment 3">Installment 3</option> : null}
                                        </select>
                                    </div>
                                    <div className="">
                                        <p className='make-payment-student-name'>Payment Mode </p>
                                        <select className="make-payment-third-installment-status-input-field form-select w-100" name="PaymentMode" required
                                            onChange={handlePaymentMode}>
                                            <option value="">Select Payment Mode</option>
                                            <option value="Online Payment">Online Payment</option>
                                            <option value="Cash Payment">Cash Payment</option>
                                        </select>
                                    </div>
                                </>}


                            {(data.BalanceAmount === false && data.thirdInstallment.thirdInstallmentPaymentStatus === "Paid") ||
                                (data.BalanceAmount === true && data.fourthInstallment.fourthInstallmentPaymentStatus === "Paid")
                                ? null : (
                                    <div className="text-center">
                                        <button type="submit" className="mb-3 btn btn-primary">Make Payment</button>
                                    </div>
                                )}
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </>
    )
}

export default ModalMakePayment