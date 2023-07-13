import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { getAllQuestions } from '../../getdata/getdata';
import { headers } from '../../headers';
import AddQuestion from '../test/AddQuestion';
import { addTest, deleteAllQuestions } from '../../postdata/postdata';
import { getAllAssessmentCategory } from '../../getdata/getdata';
import { toast } from "react-toastify";

const CreateTest = () => {
    const [assessmentcategorylist, setAssessmentCategoryList] = useState([]);
    const [questionlist, setQuestionList] = useState([]);
    const [testmodal, setTestModal] = useState(false);
    const [testdata, setTestData] = useState({
        testname: "",
        category: "",
        questionslist: [],
        expiryDate: "",
    })
    
    useEffect(() => {
        getAllAssessmentCategory(headers)
            .then((response) => {
                setAssessmentCategoryList(response.data.AssessmentCategories);
            })
            .catch((error) => {
                console.log(error);
            })

        getAllQuestions(headers)
            .then((response) => {
                setQuestionList(response.data.Questions);
                
            })
            .catch((error) => {
                console.log(error);
            })
        
    }, []);

    console.log(questionlist)

    const OpenTestModal = () => {
        setTestModal(true);
    }

    const CloseTestModal = () => {
        setTestModal(false);
    }

    const handleChange = (event) => {
        setTestData({
            ...testdata,
            [event.target.name]: event.target.value
        })
    }

    const AddTest = (event) => {
        event.preventDefault();
        const payload = {
            ...testdata,
            questionslist: questionlist
        }
        console.log(payload);
        addTest(payload)
            .then((response) => {
                toast.success(response.data.msg, {
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
            deleteAllQuestions()
            .then((response) => {
                // toast.success(response.data.msg, {
                //     position: "top-center",
                //     autoClose: 3000
                // })
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 2000
                })
            })
        }, 1000);
    }




    return (
        <div className="card">
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex justify-content-start">
                    <p className='studentlist-card-text'>Create Test</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='add-student-button' onClick={OpenTestModal}>
                        <p className='add-student-button-text'>Add Question + </p>
                    </button>
                    <Modal show={testmodal ? true : false} onHide={CloseTestModal}>
                        <AddQuestion CloseTestModal={CloseTestModal} setQuestionList={setQuestionList} questionlist={questionlist}/>
                    </Modal>
                </div>
            </div>
            {questionlist.length > 0
                ?
                <form onSubmit={AddTest}>
                    <div className='row'>
                        <div className='col-sm-4'>
                            <p className="text-start">Assessment Name</p>
                            <input type="text" className="add-batch-input w-100"
                                id="testname" name="testname"
                                onChange={handleChange} required />
                        </div>
                        <div className='col-sm-4'>
                            <p className="text-start">Assessment Category</p>
                            <select className="add-batch-input mt-1 w-100"
                                id="category" name="category"
                                onChange={handleChange} required>
                                <option value="">Select Category</option>
                                {assessmentcategorylist.map((category) => {
                                    return (
                                        <option value={category.assessmentcategoryName}>{category.assessmentcategoryName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='col-sm-4'>
                            <button className='add-batch-button' type='submit'>
                                <p className='add-batch-button-text'>Submit</p>
                            </button>
                        </div>
                    </div>
                </form>
                : <div className="text-center">
                    <p className='fs-4'>No Test Found</p>
                </div>
            }

            {questionlist.map((item) => {
                return (
                    <div className='mt-4'>
                        <p className='fw-bold'>Q{item.id}. {item.question}</p>
                        <ul>
                            <li>{item.option1}</li>
                            <li>{item.option2}</li>
                            <li>{item.option3}</li>
                            <li>{item.option4}</li>
                        </ul>
                        <p>Answer : {item.answer}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default CreateTest;