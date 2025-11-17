import apiClient from './apiClient';

interface RegisterData { name: string; email: string; password: string; }
interface LoginData { email: string; password: string; }
interface VerifyOTPData { email: string; otp: string; }
interface ResendOTPData { email: string; }

const register = (userData: RegisterData) => apiClient.post('/auth/register', userData);
const login = (userData: LoginData) => apiClient.post('/auth/login', userData);
const verifyOTP = (data: VerifyOTPData) => apiClient.post('/auth/verify-otp', data);
const resendOTP = (data: ResendOTPData) => apiClient.post('/auth/resend-otp', data);
const logout = () => apiClient.post('/auth/logout');
const getCurrentUser = () => apiClient.get('/auth/me');

const authService = { register, login, verifyOTP, resendOTP, logout, getCurrentUser };
export default authService;