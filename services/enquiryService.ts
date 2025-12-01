import apiClient from './apiClient';

export interface EnquiryFormData { name: string; email: string; phone: string; subject: string; message: string; }

interface ReplyData { subject: string; message: string; }

const submitEnquiry = (formData: EnquiryFormData) => apiClient.post('/enquiry/', formData);

const getAllEnquiries = () => apiClient.get('/enquiry/');

const updateStatus = (id: string, status: 'Contacted' | 'Resolved') => apiClient.patch(`/enquiry/status/${id}`, { status });

const deleteEnquiries = (ids: string[]) => apiClient.delete('/enquiry/', { data: { ids } });

const replyToEnquiry = (id: string, data: ReplyData) => apiClient.post(`/enquiry/reply/${id}`, data);

const enquiryService = { submitEnquiry, getAllEnquiries, updateStatus, deleteEnquiries, replyToEnquiry };
export default enquiryService;