import axios from "axios";
const token = localStorage.getItem('token');
const header = { headers: { Authorization: `Bearer ${token}` } };

// Question 
// export const getQuestion = async() => {
//     const url = 'http://localhost:8080/api/v1/Topics';
//     return await axios.get(url , header )
// }
export const getQuestionID =async (id)=>{
     const url  = `http://localhost:8080/api/v1/category/${id}/questions`
    return await axios.get(url , header)
}
export const addQuestion =async (id  , data ) => {
    const url = `http://localhost:8080/api/v1/category/insertQuestion?categoryID=${id}`;
    return await axios.post(url , data , header )
}
export const updateQuestion  = async(id  , data ) => {
    const url =  `http://localhost:8080/api/v1/category/updateQuestion?categoryID=${id}`;
    return await axios.get(url , data, header )
}
export const deleteQuestion =async (  id1 ,   id2) => {
    const url =  `http://localhost:8080/api/v1/category/deleteQuestion/${id1}/${id2}`;
    return await axios.delete(url , header )
}

// Category
export const getCategory = async() => {
    const url = 'http://localhost:8080/api/v1/category';
    return await axios.get(url , header )
}
export const addCategory = async( data ) => {
    const url = 'http://localhost:8080/api/v1/category/insert';
    return await axios.post(url , data , header )
}
export const updateCategory  = async(id  , data ) => {
    const url =  `http://localhost:8080/api/v1/category/update/${id}`;
    return await axios.put(url , data, header )
}
export const deleteCategory = async (    id) => {
    const url =  `http://localhost:8080/api/v1/category/delete/${id}`;
    return await axios.delete(url , header )
}

// Answer
export const getAllAnswer = async (id1  , id2)=>{
    const url = `http://localhost:8080/api/v1/category/${id1}/questions/${id2}/answers`;
    return await axios.get(url , header);
}
export const getAnswer = async() => {
    const url = 'http://localhost:8080/api/v1/category';
    return await axios.get(url , header )
}
export const addAnswer =async (id1 , id2 , data ) => {
    console.log(id1 ,id2 , data);
    const url = `http://localhost:8080/api/v1/category/insertAnswer/${id1}/${id2}`;
    return await axios.post(url , data , header )
}
export const updateAnswerA  =async (id1 ,id2 , id3  , data ) => {
    const url =  `http://localhost:8080/api/v1/category/updateAnswer/${id1}/${id2}/${id3}`;
    return await axios.put(url , data, header )
}
export const deleteAnswer = async(id1 , id2 , id3) => {
    const url =  `http://localhost:8080/api/v1/category/deleteAnswer/${id1}/${id2}/${id3}`;
    return await axios.delete(url , header )
}
// User
export const getUserss =async () => {
    const url = 'http://localhost:8080/api/v1/users';
    return await axios.get(url , header )
}
export const  addUser = (data)=>{
     const url = "http://localhost:8080/api/v1/users/insert";
     return axios.post(url , data, header);
}
export const  updateUsers = (id , data)=>{
    const url = `http://localhost:8080/api/v1/users/update/${id}`;
    return axios.put(url , data , header);
}
export const  deleteUser = (id)=>{
    const url = `http://localhost:8080/api/v1/users/delete/${id}`;
    return axios.delete(url , header);
}


// Topic 
export const getTopic =async () => {
    const url = 'http://localhost:8080/api/v1/Topics';
    return await axios.get(url , header )
}
export const addTopic =async (data ) => {
    const url = `http://localhost:8080/api/v1/Topics/insert`;
    return await axios.post(url , data , header )
}
export const updateTopic  = async(id  , data ) => {
    const url =  `http://localhost:8080/api/v1/Topics/topics/${id}`;
    return await axios.put(url , data, header )
}
export const deleteTopic =async (id) => {
    const url =  `http://localhost:8080/api/v1/Topics/delete/${id}`;
    return await axios.delete(url , header )
}
