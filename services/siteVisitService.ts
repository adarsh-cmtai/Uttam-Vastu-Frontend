import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/site-visit`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export interface SiteVisitFormData {
    name: string;
    contact: string;
    location: string;
    address: string;
    qualifications: string;
    experience: string;
    chosenPackage: string;
}

const submitApplication = (formData: SiteVisitFormData) => {
    return axiosInstance.post('/', formData);
};

const getAllApplications = () => {
    return axiosInstance.get('/');
}

const updateStatus = (id: string, status: 'Approved' | 'Scheduled') => {
    return axiosInstance.patch(`/status/${id}`, { status });
}

const siteVisitService = {
    submitApplication,
    getAllApplications,
    updateStatus,
};

export default siteVisitService;