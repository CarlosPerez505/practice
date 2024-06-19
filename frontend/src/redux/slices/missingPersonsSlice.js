import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch profiles
export const fetchProfiles = createAsyncThunk(
    'profiles/fetchProfiles',
    async () => {
        const response = await fetch('http://10.0.0.163:5000/api/missingCases');
        const data = await response.json();
        console.log('Data fetched:', data); // Debugging log
        return data;
    }
);

const missingPersonsSlice = createSlice({
    name: 'profiles',
    initialState: {
        profiles: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profiles = action.payload;
            })
            .addCase(fetchProfiles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default missingPersonsSlice.reducer;


