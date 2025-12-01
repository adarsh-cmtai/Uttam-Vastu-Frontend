import apiClient from './apiClient';

const getDashboardStats = (month?: number, year?: number) => {
    const params = new URLSearchParams();
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    return apiClient.get(`/dashboard/stats?${params.toString()}`);
};

const downloadReport = async (month: number, year: number) => {
    const response = await apiClient.get(`/dashboard/download?month=${month}&year=${year}`, {
        responseType: 'blob'
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Vastumaye_Report_${month}_${year}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

const dashboardService = { getDashboardStats, downloadReport };
export default dashboardService;