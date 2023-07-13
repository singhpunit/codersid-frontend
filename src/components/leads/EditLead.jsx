import { useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { editLead } from "../../postdata/postdata";
import moment from "moment";
import '../../styles/leads/addlead.css';

const EditLead = ({ data, id, closeEditLeadModal }) => {
    const date = new Date();

    console.log(date);
    date.setDate(date.getDate());
    
    const [editleaddata, setEditleadData] = useState({
        name: data.name,
        contactdetails: data.contactdetails,
        emailid: data.emailid,
        address: data.address,
        city: data.city,
        education: data.education,
        employementStatus: data.employementStatus,
        comments: {
            comment: data.comments,
            commentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
        },
        status: data.status,
        source: data.source, 
        date: date.toString()
    })

    const [newcomment, setNewComment] = useState();
    const [isComment, setIsComment] = useState(false);

    const Status = ['Followup', 'Cold Reach out', 'Converted', 'Not Interested/ Permanently Lost', 'Walk In']

    const handleChange = (event) => {
        setEditleadData({ ...editleaddata, [event.target.name]: event.target.value })
    }

    const handleComment = (event) => {
        setNewComment(event.target.value)
        setIsComment(true)
    }

    const handleUpdateLead = (event) => {
        event.preventDefault();
        if (isComment === true) {
            const newCommentObj = {
                comment: newcomment,
                commentAt: moment().format('MMMM Do YYYY, h:mm:ss a')
            }
            const previousComment = data.comments;
            previousComment.push(newCommentObj);
            const payload = {
                ...editleaddata,
                comments: previousComment
            }

            console.log(payload);
            editLead(id, payload)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                    closeEditLeadModal();
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
            const previousComment = data.comments;
            const payload = {
                ...editleaddata,
                comments: previousComment
            }
            editLead(id, payload)
                .then((response) => {
                    toast.success(response.data.msg, {
                        position: "top-center",
                        autoClose: 3000
                    })
                    closeEditLeadModal();
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
                        Edit Lead
                    </p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleUpdateLead}>
                    <div className=''>
                        <div className="">
                            <p className="text-start select-field-label">Status</p>
                            <select className="input-box-width w-100" name="status" required
                                value={editleaddata.status} onChange={handleChange}>
                                <option value="">Select Status</option>
                                {Status.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mt-3">
                            <p className="text-start input-field-label">Comments</p>
                            <textarea className="input-box-width w-100" rows={5} cols={30} id="newcomment" name="newcomment"
                                defaultValue={data.comments[data.comments.length - 1].comment} onChange={handleComment}
                                required />
                        </div>
                    </div>
                    <button className='add-student-form-button' type='submit'>
                        <p className='add-student-form-button-text'>Update</p>
                    </button>
                </form>
            </Modal.Body>

        </>
    );
}

export default EditLead;