import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/enquiry`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export interface EnquiryFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const submitEnquiry = (formData: EnquiryFormData) => {
    return axiosInstance.post('/', formData);
};

const getAllEnquiries = () => {
    return axiosInstance.get('/');
}

const updateStatus = (id: string, status: 'Contacted' | 'Resolved') => {
    return axiosInstance.patch(`/status/${id}`, { status });
}

const enquiryService = {
    submitEnquiry,
    getAllEnquiries,
    updateStatus,
};

export default enquiryService;