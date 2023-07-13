import ReceiptHeader from '../../assets/ReceiptHeader.png';
import ReceiptFooterLogo from '../../assets/ReceiptFooterLogo.png';
import ReceiptLogo from '../../assets/ReceiptLogo.png';
import MailIcon from '../../assets/MailIcon.png';
import PhoneIcon from '../../assets/PhoneIcon.png';
import LocationIcon from '../../assets/CompanyAddressIcon.png';
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import '../../styles/payment-receipt/main-receipt.css';

const MainPaymentReceipt = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = location.state.item.id;

const navigate = useNavigate();

const handleBack = () => {
    navigate('/payment-records')
}

    const gstAmount = (data.Amount * 18) / 100;
    const downloadPDF = () => {
        
        const capture = document.querySelector(".main-receipt-card");
        html2canvas(capture)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save('payment-receipt.pdf');
            })
    }

    return (
        
        <div className="card scroll">
            <div className="main-receipt-card">
                <img className='receipt-header-logo' src={ReceiptHeader} alt="ReceiptHeader" />
                <div className="d-flex justify-content-between">
                    <img className='receipt-logo' src={ReceiptLogo} alt="ReceiptLogo" />
                    <div className="ms-4 me-4 mt-2 vr" style={{color: "#43C4D8", width: 5, height: 80}}></div>
                    <div>
                    <p className='fw-bold'>A unit of GraffersID | GST : 23AATFG1858K1ZY</p>
                    <p className='fw-bold'>815 Shekhar Central Palasia Square
                        Indore, Madhya Pradesh 452018 India</p>
                    </div>
                    
                </div>
                <div className="d-flex justify-content-end pe-4">
                    <p className="main-receipt-date-text">Date of Invoice:</p>
                    <p className="main-receipt-date-value">{data.createdAt.substring(0, 10)}</p>
                </div>
                <div className="main-first-receipt-box">
                    <div className="d-flex justify-content-between">
                        <p className="main-receipt-no">Receipt No :</p>
                        <p className="main-receipt-no-value">CI/{data._id.slice(-3, -1)}</p>
                        
                        <p className="main-receipt-student-id">Student ID :</p>
                        <p className="pe-2 main-receipt-student-id-value">{`CODERSID-${id}`}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-1"></div>
                    <div className="d-flex justify-content-between">
                        <p className="main-receipt-student-name">Name :</p>
                        <p className="main-receipt-student-value">{data.StudentName}</p>                 
                        <p className="main-receipt-contact-number">Contact No.</p>
                        <p className="pe-2 main-receipt-contact-value">{data.contactdetails}</p>
                    </div>
                </div>
                <div className="main-second-receipt-box">
                    <div className="d-flex justify-content-between">
                        <p className="main-receipt-payment-mode">Mode of Payment :</p>            
                        <p className="pe-2 main-receipt-payment-mode-value">{data.PaymentMode}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-2"></div>
                    <div className="d-flex justify-content-between">
                        <p className="main-receipt-payment-mode">Type of Payment :</p>
                        <p className="pe-2 main-receipt-payment-mode-value">{data.PaymentType}</p>
                    </div>
                </div>

                <div className="main-third-receipt-box">
                    <div className="d-flex justify-content-between">
                        <p className="ps-2 pt-1">Email Address :</p>
                        <p className="pe-2 pt-1">{data.Email}</p>
                    </div>
                </div>

                <div className="main-fourth-receipt-box">
                    <div className="d-flex justify-content-around">
                        <p className="main-receipt-description">Description</p>
                        <p className="main-receipt-amount">Amount</p>
                    </div>
                    <div className="main-receipt-horizontal-line-3"></div>
                    <div className="d-flex justify-content-around">
                        <p className="main-receipt-course-name">Course Name</p>

                        <p className="main-receipt-course-value">{data.course}</p>

                        <p className="main-receipt-amount-1">Amount :</p>
                        <p className="main-receipt-amount-value">{data.Amount - gstAmount}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-4"></div>
                    <div className="d-flex justify-content-around">
                        <p className="main-receipt-batch-name">Batch Name</p>
                        <p className="main-receipt-batch-value">{data.batchname}</p>
                        <p className="main-receipt-gst-amount">GST - 18%</p>
                        <p className="main-receipt-gst-amount-value">{gstAmount}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-4"></div>
                    <div className="d-flex justify-content-around">
                        <p className="main-receipt-sac-name">SAC</p>
                        <p className="main-receipt-sac-value">999293</p>
                        <p className="main-receipt-gst-amount"></p>
                        <p className="main-receipt-gst-amount-value"></p>
                    </div>
                    <div className="main-receipt-horizontal-line-4"></div>
                    <div className="d-flex justify-content-around">
                        <p className="main-receipt-total-amount">Total Amount</p>
                        <p className="main-receipt-total-amount-value">&#8377; {data.Amount}</p>
                    </div>
                </div>


                <p className="main-receipt-note">
                    This document contains confidential information. If you are not the intended recipient,
                    you are not authorized to use or disclose it in any form.If you have received this in error,
                    please destroy it along with any copies and notify the sender immediately.
                </p>

                <div className="d-flex">
                    <img className='main-receipt-email-icon' src={MailIcon} alt="MailIcon" />
                    <p className="ms-2 main-receipt-email-value">Placement@codersid.com</p>
                    <img className='main-receipt-phone-icon' src={PhoneIcon} alt="PhoneIcon" />
                    <p className="ms-2 main-receipt-phone-value">+91 910919221</p>
                    <img className='main-receipt-location-icon' src={LocationIcon} alt="LocationIcon" />
                    <p className="ms-2 main-receipt-location-value">716 Shekhar Central Palasia, Square, Manorama Ganj,
                        Indore, Madhya Pradesh 452010,</p>
                </div>
                <img className='receipt-header-logo' src={ReceiptFooterLogo} alt="ReceiptFooterLogo" />
            </div>
            <div className="text-center">
            <button className="mt-2 mb-2 me-2 btn btn-primary" onClick={handleBack}>Back</button>
                <button className="mt-2 mb-2 btn btn-primary" onClick={downloadPDF}>Download Receipt</button>
            </div>
        </div>
        
       
    );
}

export default MainPaymentReceipt;