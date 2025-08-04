import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
axios.defaults.baseURL = API_BASE_URL;

export const doRegister = (userData:unknown)=>{
     console.log('Register API',userData);
     return axios.post('register',userData);//promise return karega
}
export const doLogin = (userData:unknown)=>{
     console.log('Login API',userData);
     return axios.post('login',userData);//promise return karega
}