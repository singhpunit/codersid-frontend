import axios from "axios";
import { baseUrl, secondbaseUrl } from "../baseurl";

export const getAllStudents = (headers) => {
    return axios.get(`${baseUrl}/api/students`, {headers})
}

export const getAllUsers = (headers) => {
    return axios.get(`${baseUrl}/api/user`, {headers})
}

export const getAllBatches = (headers) => {
    return axios.get(`${baseUrl}/api/batch`, {headers})
}

export const getAllCourses = (headers) => {
    return axios.get(`${baseUrl}/api/course`, {headers})
}

export const getAllCategories = (headers) => {
    return axios.get(`${baseUrl}/api/category`, {headers})
}

export const getAllExpenses = (headers) => {
    return axios.get(`${baseUrl}/api/expense`, {headers})
}

export const getAllNewExpenses = () => {
    return axios.get(`${secondbaseUrl}/api/expenses`)
}

export const getAllPayments = (headers) => {
    return axios.get(`${baseUrl}/api/payment`, {headers})
}

export const getAllLeads = (headers) => {
    return axios.get(`${baseUrl}/api/leads`, {headers})
}

export const getAllWalkins = (headers) => {
    return axios.get(`${baseUrl}/api/walkins`, {headers})
}

export const getAllQuestions = (headers) => {
    return axios.get(`${baseUrl}/api/questions`, {headers})
}

export const getAllTests = (headers) => {
    return axios.get(`${baseUrl}/api/tests`, {headers})
}

export const getAllAssessmentCategory = (headers) => {
    return axios.get(`${baseUrl}/api/assessmentCategory`, {headers})
}

export const getSingleTest = (id) => {
    return axios.get(`${baseUrl}/api/tests/${id}`)
}

export const getAllTestPerformance = (headers) => {
    return axios.get(`${baseUrl}/api/testPerformance`, {headers})
}

export const getfeedbackCategory = (headers)=>{
    return axios.get(`${baseUrl}/api/feedbackCategory`, {headers})
}

export const getAllFeedback=(headers)=>{
    return axios.get(`${baseUrl}/api/getAllFeedback`,{headers})
}

export const getSingleFeedback=(id)=>{
    return axios.get(`${baseUrl}/api/getSingleFeedback/${id}`)
}

export const getAllStudentFeedback=(headers)=>{
    return axios.get(`${baseUrl}/api/studentfeedback`,{headers})
}

export const getSingleStudentFeedback=(id)=>{
    return axios.get(`${baseUrl}/api/studentfeedback/${id}`)
}

export const getAllFeedbackQuestions = (headers) => {
    return axios.get(`${baseUrl}/api/feedbackquestion`, {headers})
}