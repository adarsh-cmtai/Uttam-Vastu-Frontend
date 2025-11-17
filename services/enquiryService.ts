import apiClient from './apiClient';
export interface EnquiryFormData { name: string; email: string; phone: string; subject: string; message: string; }
const submitEnquiry = (formData: EnquiryFormData) => apiClient.post('/enquiry/', formData);
const getAllEnquiries = () => apiClient.get('/enquiry/');
const updateStatus = (id: string, status: 'Contacted' | 'Resolved') => apiClient.patch(`/enquiry/status/${id}`, { status });
const enquiryService = { submitEnquiry, getAllEnquiries, updateStatus };
export default enquiryService;