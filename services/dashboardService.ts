import axiosInstance from './api'; // Naya import

const getDashboardStats = () => {
    return axiosInstance.get('/dashboard/stats');
}

const dashboardService = {
    getDashboardStats,
};

export default dashboardService;