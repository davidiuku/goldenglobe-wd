import api from "../lib/axios";
import { Login } from "../lib/types";


export const loginAPI = async (credentials: Login) => {
    try {
        const response = await api.post('/user/login', credentials);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed")
    }
};
