import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

const getDashboardStats = () => {
    return axiosInstance.get('/stats');
}

const dashboardService = {
    getDashboardStats,
};

export default dashboardService;