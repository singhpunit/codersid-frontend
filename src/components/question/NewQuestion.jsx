import { useState } from 'react';
import { addQuestion } from '../../postdata/postdata';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const NewQuestion = () => {
    const [questiondata, setQuestionData] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    })
    const navigate = useNavigate();

    const handleChange = (event) => {
        setQuestionData({
            ...questiondata,
            [event.target.name]: event.target.value
        })
    }

    const handleBack = () => {
        navigate('/create-test')
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        addQuestion(questiondata)
            .then((response) => {
                toast.success(response.data.msg, {
                    position: "top-center",
                    autoClose: 1000
                })
                navigate('/create-test')
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
            <p className='ps-2 studentlist-card-text'>Add Question</p>
            <form onSubmit={handleSubmit}>
                <div className="row ps-2">

                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Question</p>
                        <input className='student-name-input-field form-control' type="text" name="question"
                            placeholder='Enter Question' onChange={handleChange} required />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 1</p>
                        <input className='student-name-input-field form-control' type="text" name="option1" required
                            placeholder='Enter Option 1' onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 2</p>
                        <input className='student-name-input-field form-control' type="text" name="option2" required
                            placeholder='Enter Option 2' onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 3</p>
                        <input className='student-name-input-field form-control' type="text" name="option3" required
                            placeholder='Enter Option 3' onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Option 4</p>
                        <input className='student-name-input-field form-control' type="text" name="option4" required
                            placeholder='Enter Option 4' onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                        <p className='make-payment-email-address'>Select Answer</p>
                        <select className="student-name-input-field form-control w-100" name="answer" onChange={handleChange} required>
                            <option value="">Select Answer</option>
                            {questiondata.option1 === '' || questiondata.option2 === '' || questiondata.option3 === '' ||
                                questiondata.option4 === '' ?
                                <option value="No answer found">No Option Found</option>
                                :
                                <>
                                    <option value={questiondata.option1}>{questiondata.option1}</option>
                                    <option value={questiondata.option2}>{questiondata.option2}</option>
                                    <option value={questiondata.option3}>{questiondata.option3}</option>
                                    <option value={questiondata.option4}>{questiondata.option4}</option>
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

export default NewQuestion;