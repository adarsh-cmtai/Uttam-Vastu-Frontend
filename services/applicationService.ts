import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/application`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export interface ApplicationFormData {
    name: string;
    contact: string;
    state: string;
    address: string;
    qualifications: string;
    experience: string;
}

const submitApplication = (formData: ApplicationFormData) => {
    return axiosInstance.post('/', formData);
};

const getAllApplications = () => {
    return axiosInstance.get('/');
}

const updateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    return axiosInstance.patch(`/status/${id}`, { status });
}

const applicationService = {
    submitApplication,
    getAllApplications,
    updateStatus,
};

export default applicationService;