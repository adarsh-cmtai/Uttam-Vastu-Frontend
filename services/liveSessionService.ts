import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/live-session`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

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
    return axiosInstance.post('/', formData);
};

const getAllBookings = () => {
    return axiosInstance.get('/');
}

const updateStatus = (id: string, status: 'Confirmed' | 'Completed') => {
    return axiosInstance.patch(`/status/${id}`, { status });
}

const liveSessionService = {
    submitBooking,
    getAllBookings,
    updateStatus,
};

export default liveSessionService;