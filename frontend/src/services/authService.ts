import api from "../lib/axios";
import { Login, SignUp } from "../lib/types";


export const loginAPI = async (credentials: Login) => {
    try {
        const response = await api.post('/users/login', credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed")
    }
};

export const registerAPI = async (credentials: SignUp) => {
    try {
        const response = await api.post('/users/register', credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error: any) {
        console.error("Register Error:", error);
        throw new Error(error.response?.data?.message || "Register failed")
    }
};
