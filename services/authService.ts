import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface VerifyOTPData {
    email: string;
    otp: string;
}

interface ResendOTPData {
    email: string;
}

const register = (userData: RegisterData) => {
    return axiosInstance.post('/register', userData);
};

const login = (userData: LoginData) => {
    return axiosInstance.post('/login', userData);
};

const verifyOTP = (data: VerifyOTPData) => {
    return axiosInstance.post('/verify-otp', data);
};

const resendOTP = (data: ResendOTPData) => {
    return axiosInstance.post('/resend-otp', data);
};

const logout = () => {
    return axiosInstance.post('/logout');
};

const getCurrentUser = () => {
    return axiosInstance.get('/me');
};

const authService = {
    register,
    login,
    verifyOTP,
    resendOTP,
    logout,
    getCurrentUser,
};

export default authService;