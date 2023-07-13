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
import '../../styles/studentperformance/studentperformance.css';
import { useEffect, useState } from 'react';

const ScoreCard = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = location.state.item.id;
    const testRecords = data.testRecords;
    let [totalMarks, setTotalMarks] = useState();
    let [cgpa, setCgpa] = useState();


    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/performance')
    }

    useEffect(() => {
        calculateMarks();
    }, [])

    const calculateMarks = () => {
        let totalMarks = 0;
        for (let i = 0; i < testRecords.length; i++) {
            totalMarks = totalMarks + testRecords[i].score;
        }
        console.log(totalMarks)
        setTotalMarks(totalMarks)
        setCgpa((totalMarks / testRecords.length).toFixed(1))
    }


    const downloadPDF = () => {

        const capture = document.querySelector(".main-receipt-card");
        html2canvas(capture)
            .then((canvas) => {
                const imgData = canvas.toDataURL('img/png');
                const doc = new jsPDF('p', 'mm', 'a4');
                const componentWidth = doc.internal.pageSize.getWidth();
                const componentHeight = doc.internal.pageSize.getHeight();
                doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
                doc.save('Score-card.pdf');
            })
    }

    return (

        <div className="card scroll">
            <div className="main-receipt-card">
                <img className='receipt-header-logo' src={ReceiptHeader} alt="ReceiptHeader" />
                <div className="d-flex justify-content-between">
                    <img className='receipt-logo' src={ReceiptLogo} alt="ReceiptLogo" />
                    <div className="ms-4 me-4 mt-2 vr" style={{ color: "#43C4D8", width: 5, height: 80 }}></div>
                    <div>
                        <p className='fw-bold'>A unit of GraffersID | GST : 23AATFG1858K1ZY</p>
                        <p className='fw-bold'>815 Shekhar Central Palasia Square
                            Indore, Madhya Pradesh 452018 India</p>
                    </div>

                </div>

                <div className="main-first-receipt-box">
                    <div className="d-flex justify-content-between">
                        <p className="score-card-student-name">Student Name :</p>
                        <p className="score-card-student-value">{data.studentname}</p>

                        <p className="score-card-student-name">Student ID :</p>
                        <p className="pe-2 score-card-student-value">{`CODERSID-${id}`}</p>
                    </div>
                    <div className="main-receipt-horizontal-line-1"></div>
                    <div className="d-flex justify-content-between">
                        <p className="score-card-student-name">Batch Name :</p>
                        <p className="score-card-batch-value">{data.batchname}</p>
                        <p className="score-card-cgpa">CGPA.</p>
                        <p className="pe-2 score-card-cgpa-value">{testRecords.length === 0 ? 0 : cgpa}</p>
                    </div>
                </div>
                
                <div className="score-card-box">
                    {testRecords.length > 0 ?
                        <table className="table" >
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col"><p className='test-name-header'>Test Name</p></th>
                                    <th scope="col"><p className='test-name-header'>Total Marks</p></th>
                                    <th scope="col"><p className='test-name-header'>Achieved Marks</p></th>
                                </tr>
                            </thead>


                            <tbody className='text-center'>
                                {testRecords.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td><p className='test-name-value'>{item.testname}</p></td>
                                            <td><p className='test-name-value'>{item.totalMarks}</p></td>
                                            <td><p className='test-name-value'>{item.score}</p></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        : <div className='text-center'>
                            <p>No Test Found</p>
                        </div>}
                </div>

                <div className="d-flex justify-content-end">
                    <p className='total-cgpa-text'>CGPA</p>
                    <div className='total-cgpa-border'>
                        <p className='total-cgpa-border-value'>{testRecords.length === 0 ? 0 : cgpa}</p>
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
                <button className="mt-2 mb-2 btn btn-primary" onClick={downloadPDF}>Download Score Card</button>
            </div>
        </div>


    );
}

export default ScoreCard;