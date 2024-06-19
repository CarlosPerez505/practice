// src/redux/slices/predictionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPredictions = createAsyncThunk(
    'predictions/fetchPredictions',
    async (profile) => {
        const response = await fetch(`http://10.0.0.163:5000/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return { id: profile.id, ...data };
    }
);

const predictionsSlice = createSlice({
    name: 'predictions',
    initialState: {
        data: {},
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPredictions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPredictions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data[action.payload.id] = action.payload;
            })
            .addCase(fetchPredictions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default predictionsSlice.reducer;
