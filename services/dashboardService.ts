import apiClient from './apiClient';
const getDashboardStats = () => apiClient.get('/dashboard/stats');
const dashboardService = { getDashboardStats };
export default dashboardService;