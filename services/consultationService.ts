import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/consultation`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

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
    return axiosInstance.post('/request', formData);
};

const getAllRequests = () => {
    return axiosInstance.get('/requests');
}

const replyToRequest = (requestId: string, replyData: ReplyData) => {
    return axiosInstance.post(`/reply/${requestId}`, replyData);
}

const consultationService = {
    submitConsultationForm,
    getAllRequests,
    replyToRequest,
};

export default consultationService;