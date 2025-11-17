import apiClient from './apiClient';

export interface BookingFormData {
    name: string;
    contact: string;
    state: string;
    address: string;
    qualifications: string;
    experience: string;
    chosenPackage: string;
}

const submitBooking = (formData: BookingFormData) => {
    return apiClient.post('/live-session/', formData);
};

const getAllBookings = () => {
    return apiClient.get('/live-session/');
};

const updateStatus = (id: string, status: 'Confirmed' | 'Completed') => {
    return apiClient.patch(`/live-session/status/${id}`, { status });
};

const liveSessionService = {
    submitBooking,
    getAllBookings,
    updateStatus,
};

export default liveSessionService;