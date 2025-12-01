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

const deleteBookings = (ids: string[]) => {
    return apiClient.delete('/live-session/', { data: { ids } });
};

const liveSessionService = {
    submitBooking,
    getAllBookings,
    updateStatus,
    deleteBookings
};

export default liveSessionService;