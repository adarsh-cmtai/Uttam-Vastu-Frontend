import apiClient from './apiClient';

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
    return apiClient.post('/site-visit/', formData);
};

const getAllApplications = () => {
    return apiClient.get('/site-visit/');
};

const updateStatus = (id: string, status: 'Approved' | 'Scheduled') => {
    return apiClient.patch(`/site-visit/status/${id}`, { status });
};

const deleteApplications = (ids: string[]) => {
    return apiClient.delete('/site-visit/', { data: { ids } });
};

const siteVisitService = {
    submitApplication,
    getAllApplications,
    updateStatus,
    deleteApplications
};

export default siteVisitService;