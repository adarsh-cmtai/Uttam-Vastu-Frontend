import apiClient from './apiClient';

interface ConsultationFormData {
    name: string;
    email: string;
    phone: string;
    city: string;
    purpose: string;
    propertyType: string;
    comments?: string;
}

interface ReplyData {
    subject: string;
    message: string;
}

const submitConsultationForm = (formData: ConsultationFormData) => {
    return apiClient.post('/consultation/request', formData);
};

const getAllRequests = () => {
    return apiClient.get('/consultation/requests');
};

const replyToRequest = (requestId: string, replyData: ReplyData) => {
    return apiClient.post(`/consultation/reply/${requestId}`, replyData);
};

const deleteRequests = (ids: string[]) => {
    return apiClient.delete('/consultation/requests', { data: { ids } });
};

const consultationService = {
    submitConsultationForm,
    getAllRequests,
    replyToRequest,
    deleteRequests
};

export default consultationService;