import apiClient from './apiClient';

export interface ApplicationFormData {
    name: string;
    contact: string;
    state: string;
    address: string;
    qualifications: string;
    experience: string;
}

const submitApplication = (formData: ApplicationFormData) => {
    return apiClient.post('/application/', formData);
};

const getAllApplications = () => {
    return apiClient.get('/application/');
};

const updateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    return apiClient.patch(`/application/status/${id}`, { status });
};

const applicationService = {
    submitApplication,
    getAllApplications,
    updateStatus,
};

export default applicationService;