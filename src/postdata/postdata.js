import axios from "axios";
import { baseUrl, secondbaseUrl } from "../baseurl";


export const login = (logindata) => {
    return axios.post(`${baseUrl}/login`, logindata)
} 

export const addStudent = (leavedata) => {
    return axios.post(`${baseUrl}/api/students`, leavedata)
} 

export const updateStudent = (id, studentdata) => {
    return axios.patch(`${baseUrl}/api/students/${id}`, studentdata)
}

export const addUser = (userdata) => {
    return axios.post(`${baseUrl}/api/user`, userdata)
} 

export const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/api/user/${id}`)
} 

export const addBatch = (batchdata) => {
    return axios.post(`${baseUrl}/api/batch`, batchdata)
} 

export const deleteBatch = (id) => {
    return axios.delete(`${baseUrl}/api/batch/${id}`)
} 


export const addCourse = (coursedata) => {
    return axios.post(`${baseUrl}/api/course`, coursedata)
} 

export const deleteCourse = (id) => {
    return axios.delete(`${baseUrl}/api/course/${id}`)
} 

export const addCategory = (categorydata) => {
    return axios.post(`${baseUrl}/api/category`, categorydata)
} 

export const addExpense = (expensedata) => {
    return axios.post(`${baseUrl}/api/expense`, expensedata)
} 

export const addNewExpense = (formdata) => {
    return axios.post(`${secondbaseUrl}/api/expenses`, formdata)
} 

export const updateExpense = (id, expensedata) => {
    return axios.patch(`${baseUrl}/api/expense/${id}`, expensedata)
} 

export const updateNewExpense = (id, formdata) => {
    return axios.patch(`${secondbaseUrl}/api/expenses/${id}`, formdata)
} 

export const deleteCategory = (id) => {
    return axios.delete(`${baseUrl}/api/category/${id}`)
} 

export const updatePaymentStatus = (id, paymentdata) => {
    return axios.patch(`${baseUrl}/api/students/${id}`, paymentdata)
} 

export const addPaymentRecord = (paymentrecord) => {
    return axios.post(`${baseUrl}/api/payment`, paymentrecord)
} 

export const addLead = (leaddata) => {
    return axios.post(`${baseUrl}/api/leads`, leaddata)
} 

export const editLead = (id, editleaddata) => {
    return axios.patch(`${baseUrl}/api/leads/${id}`, editleaddata)
} 


export const addWalkin = (walkindata) => {
    return axios.post(`${baseUrl}/api/walkins`, walkindata)
} 

export const addQuestion = (questiondata) => {
    return axios.post(`${baseUrl}/api/questions`, questiondata)
} 

export const editQuestion = (id, editquestiondata) => {
    return axios.patch(`${baseUrl}/api/questions/${id}`, editquestiondata)
} 

export const deleteQuestion = (id) => {
    return axios.delete(`${baseUrl}/api/questions/${id}`)
}

export const addTest = (testdata) => {
    return axios.post(`${baseUrl}/api/tests`, testdata)
} 

export const deleteAllQuestions = () => {
    return axios.delete(`${baseUrl}/api/questions`)
} 

export const addAssessmentCategory = (assessmentcategorydata) => {
    return axios.post(`${baseUrl}/api/assessmentCategory`, assessmentcategorydata)
} 

export const deleteAssessmentCategory = (id) => {
    return axios.delete(`${baseUrl}/api/assessmentCategory/${id}`)
} 

export const addTestPerformance = (testPerformancedata) => {
    return axios.post(`${baseUrl}/api/testPerformance`, testPerformancedata)
} 

export const addExpiryDate = (id, payload) => {
    return axios.post(`${baseUrl}/api/tests/${id}`, payload)
} 

export const deleteAssessment = (id) => {
    return axios.delete(`${baseUrl}/api/tests/${id}`)
} 


export const addStudentPerformanceRecord = (id, payload) => {
    return axios.post(`${baseUrl}/api/students/${id}`, payload)
} 

export const addFeedbackCategory = (payload)=>{
    return axios.post(`${baseUrl}/api/createFeedbackCategory`,payload)
}

export const deleteFeedbackCategory = (id) => {
    return axios.delete(`${baseUrl}/api/deleteFeedbackCategory/${id}`)
} 


export const createFeedback = (payload)=>{
    return axios.post(`${baseUrl}/api/createFeedback`,payload)
}

export const updateFeedback = (id, payload) => {
    return axios.post(`${baseUrl}/api/getSingleFeedback/${id}`, payload)
} 

export const deleteFeedback = (id) => {
    return axios.delete(`${baseUrl}/api/deleteFeedback/${id}`)
} 

export const addStudentFeedback = (payload)=>{
    return axios.post(`${baseUrl}/api/studentfeedback`,payload)
}

export const addFeedbackQuestion = (payload)=>{
    return axios.post(`${baseUrl}/api/feedbackquestion`,payload)
}

export const deleteFeedbackQuestion = (id)=>{
    return axios.delete(`${baseUrl}/api/feedbackquestion/${id}`)
}

export const updateFeedbackQuestion = (id, payload)=>{
    return axios.patch(`${baseUrl}/api/feedbackquestion/${id}`, payload)
}

export const updateNewFeedbackQuestion = (id, payload)=>{
    return axios.patch(`${baseUrl}/api/updateFeedback/${id}`, payload)
}

export const deleteNewFeedbackQuestion = (id)=>{
    return axios.delete(`${baseUrl}/api/deleteFeedbackQuestion/${id}`)
}

export const addNewFeedbackQuestion = (id, payload)=>{
    return axios.post(`${baseUrl}/api/addNewFeedbackQuestion/${id}`, payload)
}

export const addNewAssessmentQuestion = (id, payload)=>{
    return axios.post(`${baseUrl}/api/tests/addquestion/${id}`, payload)
}

export const deleteAllFeedbackQuestions = () => {
    return axios.delete(`${baseUrl}/api/feedbackquestion`)
} 

export const deleteAssessmentQuestion = (id)=>{
    return axios.delete(`${baseUrl}/api/tests/deletequestion/${id}`)
}

export const updateAssessmentQuestion = (id, payload)=>{
    return axios.patch(`${baseUrl}/api/tests/updatequestion/${id}`, payload)
}




