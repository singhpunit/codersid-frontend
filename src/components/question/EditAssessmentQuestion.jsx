import { useState } from 'react';
import { updateAssessmentQuestion } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';

const EditAssessmentQuestion = () => {
    const location = useLocation();
    const data = location.state.item;
    const id = data._id
    const [editquestiondata, setEditQuestionData] = useState({
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        answer: data.answer
    })
    const navigate = useNavigate();

    const handleChange = (event) => {
        setEditQuestionData({
            ...editquestiondata,
            [event.target.name]: event.target.value
        })
    }

    console.log(id);

    const handleBack = () => {
        navigate('/question-details')
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            ...editquestiondata,
            _id: id,
            id: data.id
        }
        updateAssessmentQuestion(id, payload)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                navigate('/all-tests')
                window.location.reload(false);
            })
            .catch((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
            })
    }

    return (
        <div className='card'>
            <p className='studentlist-card-text'>Edit Question</p>
            <form onSubmit={handleSubmit}>
                <div className="row">

                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Question</p>
                        <input className='student-name-input-field form-control' type="text" name="question"
                            placeholder='Enter Question' 
                            value={editquestiondata.question} 
                            onChange={handleChange} required />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 1</p>
                        <input className='student-name-input-field form-control' type="text" name="option1" required
                            placeholder='Enter Option 1' value={editquestiondata.option1} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 2</p>
                        <input className='student-name-input-field form-control' type="text" name="option2" required
                            placeholder='Enter Option 2' value={editquestiondata.option2} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 3</p>
                        <input className='student-name-input-field form-control' type="text" name="option3" required
                            placeholder='Enter Option 3' value={editquestiondata.option3} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 4</p>
                        <input className='student-name-input-field form-control' type="text" name="option4" required
                            placeholder='Enter Option 4' value={editquestiondata.option4} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Select Answer</p>
                        <select className="student-name-input-field form-control w-100" name="answer" 
                         value={editquestiondata.answer} onChange={handleChange} required>
                            <option value="">Select Answer</option>
                            {editquestiondata.option1 === '' || editquestiondata.option2 === '' || editquestiondata.option3 === '' ||
                                editquestiondata.option4 === '' ?
                                <option value="No answer found">No Option Found</option>
                                :
                                <>
                                    <option value={editquestiondata.option1}>{editquestiondata.option1}</option>
                                    <option value={editquestiondata.option2}>{editquestiondata.option2}</option>
                                    <option value={editquestiondata.option3}>{editquestiondata.option3}</option>
                                    <option value={editquestiondata.option4}>{editquestiondata.option4}</option>
                                </>
                            }
                        </select>
                    </div>
                </div>
                <button className='add-expense-submit-button me-2' type='button' onClick={handleBack}>
                    <p className='add-student-form-button-text'>Back</p>
                </button>
                <button className='add-expense-submit-button' type='submit'>
                    <p className='add-student-form-button-text'>Submit</p>
                </button>
            </form>
        </div>
    );
}

export default EditAssessmentQuestion;