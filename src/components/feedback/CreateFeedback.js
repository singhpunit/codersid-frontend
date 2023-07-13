 
 import { useState, useEffect } from 'react';
 import { Modal ,Button,Form } from 'react-bootstrap';
 import { getAllQuestions } from '../../getdata/getdata';
 import { headers } from '../../headers';
 import { createFeedback } from '../../postdata/postdata';
 import { getfeedbackCategory } from '../../getdata/getdata';
 import FeedbackIcon from '../../assets/FeedbackIcon.png';
 
 const CreateFeedback = () => {
     const [feedbackcategorylist, setFeedbackCategoryList] = useState([]);
     const [questionlist, setQuestionList] = useState([]);
     const [feedbackmodal, setFeedbackModal] = useState(false);
     const [feedbackdata, setFeedbackData] = useState({
        feedbackname: "",
         category: "",
         questionslist: [],
         expiryDate: "",
     })
     const [question,setQuestion] = useState("")
     
     useEffect(() => {
        getfeedbackCategory(headers)
             .then((response) => {
                setFeedbackCategoryList(response.data);
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
 
     const handleChange = (event) => {
         setFeedbackData({
             ...feedbackdata,
             [event.target.name]: event.target.value
         })
     }
 
     const AddFeedback = (event) => {
         event.preventDefault();
         let payload =feedbackdata
         payload.questionslist = questionlist
         payload.expiryDate = new Date()
         console.log("payload",payload)
         createFeedback(payload)
         
     }

     const createQuestionList = (e)=>{
        if(question!==""){
            let data = {
                "id":questionlist.length+1 ,
                "question":question
            }
            setQuestionList(pre=>{
                return [...pre,data]
            })
            setQuestion("")
            setFeedbackModal(false)
        }
     
     }
 
 
 
 
     return (
         <div className="card">
             <div className="d-flex align-items-start justify-content-between">
                 <div className="d-flex justify-content-start">
                     <p className='studentlist-card-text'>Create Feedback Form
                     <img className='studentlist-icon' src={FeedbackIcon} alt="FeedbackIcon" /></p>
                 </div>
                 <div className="d-flex justify-content-end">
                     <button className='add-student-button' onClick={()=>setFeedbackModal(true)}>
                         <p className='add-student-button-text'>Add Question + </p>
                     </button>
                     {/* <Modal show={feedbackmodal ? true : false} onHide={CloseFeedbackModal}>
                     <div>
                     <p className='make-payment-email-address'>Question</p>
                        <input className='student-name-input-field form-control' type="text"
                            id="question"
                            name="question" onChange={handleChange}
                            required />
                     </div>
                     </Modal> */}
                    <Modal show={feedbackmodal} onHide={()=>setFeedbackModal(false)}>
                        <Modal.Header closeButton>
                        <Modal.Title>Add Question</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Question Category</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e)=>setCategory(e.target.value)}>
                                        <option value="">Open this select menu</option>
                                        {
                                            feedbackcategorylist.map((val,ind)=>{
                                               return <option value={val.categoryName}>{val.categoryName}</option>
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group> */}
                                <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                                >
                                <Form.Label>Question</Form.Label>
                                <input className='student-name-input-field form-control' type="text"
                                    id="question"
                                    name="question" onChange={(e)=>setQuestion(e.target.value)}
                                    required />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        
                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setFeedbackModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={(e)=>createQuestionList(e)}>
                            Add
                        </Button>
                        </Modal.Footer>
                    </Modal>
                 </div>
             </div>
             {questionlist.length > 0
                 ?
                 <form onSubmit={AddFeedback}>
                     <div className='row'>
                         <div className='col-sm-4'>
                             <p className="text-start">Feedback Form Name</p>
                             <input type="text" className="add-batch-input w-100"
                                 id="testname" name="name"
                                 onChange={handleChange} required />
                         </div>
                         <div className='col-sm-4'>
                             <p className="text-start">Feedback Category</p>
                             <select className="add-batch-input mt-1 w-100"
                                 id="category" name="category"
                                 onChange={handleChange} required>
                                 <option value="">Select Category</option>
                                 {
                                    feedbackcategorylist.map((category) => {
                                     return (
                                         <option value={category.categoryName}>{category.categoryName}</option>
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
                     <p className='fs-4'>No Feedback Form Found</p>
                 </div>
             }
 
             {questionlist.map((item) => {
                 return (
                     <div className='mt-4'>
                         <p className='fw-bold'>Q{item.id}. {item.question}</p>
                     </div>
                 )
             })}
         </div>
     );
 }
 
 export default CreateFeedback;