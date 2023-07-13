import { useState, useEffect } from 'react';
import { getSingleFeedback, getAllStudents, getAllStudentFeedback } from '../../getdata/getdata';
import { addStudentFeedback } from '../../postdata/postdata';
import { headers } from '../../headers';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from '../pagination/Pagination';
import Rating from './Rating';

const Feedback = () => {
    const { id } = useParams();
    const [questionslist, setQuestionsList] = useState([]);
    const [studentlist, setStudentList] = useState([]);
    const [studentfeedbacklist, setStudentFeedbackList] = useState([]);
    const [showquestions, setShowQuestions] = useState(false);
    const [studentdata, setStudentData] = useState([]);
    const [feedbackname, setFeedbackName] = useState('');
    const [feedbackcategory, setFeedbackCategory] = useState('');
    const [studentid, setStudentId] = useState('');
    const [studentname, setStudentName] = useState('');
    const [batchname, setBatchName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = questionslist.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(questionslist.length / recordsPerPage)
    const [isRating, setIsRating] = useState(false);

    useEffect(() => {
        getAllStudents(headers)
            .then((response) => {
                setStudentList(response.data.Students);
            })
            .catch((error) => {
                console.log(error);
            })
        getAllStudentFeedback(headers)
            .then((response) => {
                setStudentFeedbackList(response.data.StudentFeedbacks);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);



    const handleFindStudent = (event) => {
        setTimeout(() => {
            const data = studentlist.filter((item) => {
                return item.id === Number(event.target.value);
            })
            console.log(data);
            setStudentData(data);
            if (data.length > 0) {
                toast.success("Details Fetched successfully", {
                    position: "top-center",
                    autoClose: 1000
                })
                setStudentId(data[0].id);
                setStudentName(data[0].studentname);
                setBatchName(data[0].batchname)
            }
            else {
                toast.error("Invalid ID", {
                    position: "top-center",
                    autoClose: 1000
                })

                setTimeout(() => {
                    window.location.reload(false);
                }, 0)

            }
        }, 1000)
    }

    const ShowTest = (event) => {
        event.preventDefault();
        console.log(studentid);

        const data = studentfeedbacklist.filter((item) => {
            return item.feedbackid === id && item.studentname === studentname
        })
        console.log(data);
        if (data.length > 0) {
            toast.error("Feedback already given", {
                position: "top-center",
                autoClose: 2000
            })
            window.location.reload(false);
        }
        else {
            getSingleFeedback(id)
                .then((response) => {
                    const date = new Date();
                    if (date < new Date(response.data.id.expiryDate)) {
                        setQuestionsList(response.data.id.questionslist);
                        setFeedbackName(response.data.id.name);
                        setFeedbackCategory(response.data.id.category);
                        setShowQuestions(true);
                    }
                    else {
                        toast.error("Feedback link Invalid", {
                            position: "top-center",
                            autoClose: 2000
                        })
                        window.location.reload(false);
                    }

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const handleRating = (value, id) => {
        console.log(id);
        console.log("id", value);
        setIsRating(true);
        const question = questionslist;
        for (let i = 0; i < questionslist.length; i++) {
            if (questionslist[i].id === id) {
                question[i].rating = value;
            }
        }
        setQuestionsList(question);
    }

    const handleComment = (comment, id) => {
        const question = questionslist;
        for (let i = 0; i < questionslist.length; i++) {
            if (questionslist[i].id === id) {
                question[i].comment = comment;
            }
        }
        setQuestionsList(question);
    }

    const SubmitFeeback = (event) => {
        event.preventDefault();

        console.log(questionslist)

        for (let i = 0; i < questionslist.length; i++) {
            if (questionslist[i].hasOwnProperty('rating') === false) {
                console.log(questionslist[i].hasOwnProperty('rating'))
                console.log("Set rating", isRating);
                setIsRating(questionslist[i].hasOwnProperty('rating'));
                
            }
        }
        
        if (isRating === false ) {
            toast.error("Please give rating", {
                position: "top-center",
                autoClose: 2000
            })
        }

        else {
            const studentfeedbackPayload = {
                studentname: studentname,
                batchname: batchname,
                studentid: studentid,
                feedbackid: id,
                feedbackname: feedbackname,
                feedbackcategory: feedbackcategory,
                feedbackResponse: questionslist
            }

            console.log(studentfeedbackPayload);

            addStudentFeedback(studentfeedbackPayload)
                .then((response) => {
                    toast.success("Feedback submitted successfully", {
                        position: "top-center",
                        autoClose: 3000
                    })
                }
                )
                .catch((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                        autoClose: 2000
                    })
                })

            setTimeout(() => {
                toast.success("Thank you for giving your valuable feedback", {
                    position: "top-center",
                    autoClose: 3000
                })
            }, 2000)
            setTimeout(() => {
                window.location.reload(false);
            }, 3000)

        }
    }

    return (
        <div >
            <div className='feedback-link-card'>
                <div className="d-flex justify-content-between">
                    <p className='studentlist-card-text ps-3'>Feedback Form</p>
                </div>
                <form onSubmit={ShowTest}>
                    <div className='ms-2 me-2 mt-2 row'>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Student ID</p>
                            <input type="number" className="input-box-width w-100" min={1} id="studentid" name="studentid"
                                onChange={handleFindStudent} required />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Student Name</p>
                            <input type="text" className="input-box-width w-100" id="Studentname" name="Studentname"
                                value={studentname} readOnly />
                        </div>
                        <div className="col-sm-4 mb-3">
                            <p className="text-start input-field-label">Batch Name</p>
                            <input type="text" className="input-box-width w-100" id="Studentname" name="Studentname"
                                value={batchname} readOnly />
                        </div>
                    </div>
                    <button className='ms-2 feedback-details-submit-button' disabled={showquestions} type='submit'>
                        <p className='add-student-form-button-text'>Submit</p>
                    </button>
                </form>
            </div>

            {showquestions ?
                <div className='mt-3 feedback-link-second-card'>
                    <div className='ms-2'>
                        <div className="mt-2">
                            <div className="d-flex justify-content-start">
                                <p className='ms-2 fs-5'>Feedback Name : </p>
                                <p className="mt-1 ms-4">{feedbackname}</p>
                            </div>
                            <div className="d-flex justify-content-start">
                                <p className='ms-2 fs-5'>Feedback Category : </p>
                                <p className='mt-1 ms-2 me-2'>{feedbackcategory}</p>
                            </div>

                        </div>

                        <form onSubmit={SubmitFeeback}>
                            {
                                currentRecords.map((item) => {
                                    return (
                                        <div className="ms-2 mt-2 mb-2 me-2 d-inline-block" key={item._id} >
                                            <p className='fw-bold'>{item.id}. {item.question}</p>
                                            <div className="">
                                                <Rating handleRating={handleRating} id={item.id} />
                                                <textarea className="feedback-comment-textbox" name="comment" id="comment"
                                                    cols="30" rows="3"
                                                    style={{ borderRadius: 20, paddingLeft: 5 }}
                                                    required
                                                    placeholder='Write here your feedback '
                                                    onChange={(event) => handleComment(event.target.value, item.id)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <button className="ms-2 mb-2 submit-feedback-button" type='submit'>
                                <p className='generate-score-button-text'>Submit Feedback</p>
                            </button>
                        </form>

                    </div>
                </div>

                : null}



            {
                currentRecords.length > 0 ?
                    <div className="mt-2 text-center">
                        <Pagination
                            nPages={nPages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>

                    : null
            }
        </div >
    );
}

export default Feedback;