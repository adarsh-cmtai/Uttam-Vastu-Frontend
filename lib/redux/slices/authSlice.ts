import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '../../../services/authService';
import Cookies from 'js-cookie';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData: any, thunkAPI) => {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData: any, thunkAPI) => {
        try {
            const response = await authService.login(userData);
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            await authService.logout();
            return;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            const response = await authService.getCurrentUser();
            return response.data;
        } catch (error: any) {
            Cookies.remove('accessToken');
            return thunkAPI.rejectWithValue('Session expired or invalid.');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { user, accessToken } = action.payload.data;
                state.status = 'succeeded';
                state.isAuthenticated = true;
                state.user = user;
                state.error = null;
                if (accessToken) {
                    Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: 'strict' });
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.status = 'idle';
                Cookies.remove('accessToken');
            })
             .addCase(logoutUser.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.status = 'idle';
                Cookies.remove('accessToken');
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<{ data: User }>) => {
                state.isAuthenticated = true;
                state.user = action.payload.data;
                state.status = 'succeeded';
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.status = 'failed';
            });
    },
});

export default authSlice.reducer;