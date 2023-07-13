import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { addLead } from "../../postdata/postdata";
import moment from 'moment';
import '../../styles/leads/addlead.css';

const AddLead = ({ closeAddLeadModal }) => {
    const [leaddata, setleadData] = useState({
        name: "",
        contactdetails: "",
        emailid: "",
        address: "",
        city: "",
        education: "",
        employementStatus: "",
        status: "",
        source: "",
        comments: {
            comment: "",
            commentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
    })

    const [otherStatus, setOtherStatus] = useState();
    const [referralName, setReferralName] = useState();
    const employmentStatus = ['Student', 'Employee', 'Job Seeker', 'Other'];
    const Status = ['Followup', 'Cold Reach out', 'Converted', 'Not Interested/ Permanently Lost', 'Walk In'];
    const Source = ['Direct Walk In', 'Google Ads', 'Meta Ads', 'Social Media', 'Referral']

    const handleChange = (event) => {
        setleadData({ ...leaddata, [event.target.name]: event.target.value })
    }

    const handleComment = (event) => {
        setleadData({
            ...leaddata,
            comments: {
                ...leaddata.comments,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleOtherStatus = (event) => {
        setOtherStatus(event.target.value)
    }

    const handleReferralName = (event) => {
        setReferralName(event.target.value)
    }

    const handleAddLead = (event) => {
        event.preventDefault();
        console.log(leaddata)
        if (leaddata.employementStatus === "Other" && leaddata.source === "Referral") {
            const payload = {
                ...leaddata,
                employementStatus: otherStatus,
                source: referralName
            }
            console.log(payload)
            addLead(payload)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                    closeAddLeadModal();
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
        else if (leaddata.employementStatus === "Other") {
            const payload = {
                ...leaddata,
                employementStatus: otherStatus,
            }
            console.log(payload)
            addLead(payload)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                    closeAddLeadModal();
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
        else if (leaddata.source === "Referral") {
            const payload = {
                ...leaddata,
                source: referralName
            }
            console.log(payload)
            addLead(payload)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                    closeAddLeadModal();
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
        else {
            addLead(leaddata)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                    closeAddLeadModal();
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
    }
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="text-black">
                    <p className='view-expense-details-modal-heading'>
                        Add Lead
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleAddLead}>
                    <div className='row'>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Name</p>
                            <input type="text" className="input-box-width w-100" id="name" name="name"
                                onChange={handleChange} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Contact Number</p>
                            <input type="tel" className="input-box-width w-100" id="contactdetails" name="contactdetails"
                                pattern="[0-9]{3}[0-9]{4}[0-9]{3}" onChange={handleChange} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Email Address</p>
                            <input type="email" className="input-box-width w-100" id="emailid" name="emailid"
                                onChange={handleChange} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">City</p>
                            <input type="text" className="input-box-width w-100" id="city" name="city"
                                onChange={handleChange} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Full Address</p>
                            <input type="text" className="input-box-width w-100" id="address" name="address"
                                onChange={handleChange} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Education Details</p>
                            <input type="text" className="input-box-width w-100" id="education" name="education"
                                onChange={handleChange} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start select-field-label">Employment Status</p>
                            <select className="input-box-width w-100" name="employementStatus" required
                                onChange={handleChange}>
                                <option value="">Select Employment</option>
                                {employmentStatus.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {leaddata.employementStatus === "Other" ?

                            <div className="col-sm-4 mb-3">
                                <p className="text-start input-field-label">Other Employee Status</p>
                                <input type="text" className="input-box-width w-100" id="otherStatus" name="otherStatus"
                                    onChange={handleOtherStatus}
                                    required />
                            </div>
                            : null}

                        <div className="col-sm-4 mb-3">
                            <p className="text-start select-field-label">Status</p>
                            <select className="input-box-width w-100" name="status" required
                                onChange={handleChange}>
                                <option value="">Select Status</option>
                                {Status.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>


                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Source</p>
                            <select className="input-box-width w-100" name="source" required
                                onChange={handleChange}>
                                <option value="">Select Source</option>
                                {Source.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>

                        {leaddata.source === "Referral" ?

                            <div className="col-sm-4 mb-3">
                                <p className="text-start input-field-label">Referral Name</p>
                                <input type="text" className="input-box-width w-100" id="referralName" name="referralName"
                                    onChange={handleReferralName}
                                    required />
                            </div>
                            : null}

                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Comments</p>
                            <textarea className="input-box-width" rows={5} cols={20} id="comment" name="comment"
                                onChange={handleComment}
                                required />
                        </div>
                    </div>
                    
                    <button className='add-student-form-button' type='submit'>
                        <p className='add-student-form-button-text'>Submit</p>
                    </button>
                </form>
            </Modal.Body>

        </>
    );
}

export default AddLead;