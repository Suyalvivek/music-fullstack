import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
axios.defaults.baseURL = API_BASE_URL;

export const doRegister = (userData:unknown)=>{
     return axios.post('register',{data:userData});//promise return karega
}
export const doLogin = (userData:unknown)=>{
     return axios.post('login',{data:userData});//promise return karega
}