import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    missingPersons: [],
    loading: false,
    error: null,
};

// Async thunk for fetching missing persons
export const fetchMissingPersons = createAsyncThunk(
    'missingPersons/fetchMissingPersons',
    async () => {
        const response = await axios.get('/api/missingPersons'); // Adjust the URL to your API endpoint
        return response.data;
    }
);

const missingPersonsSlice = createSlice({
    name: 'missingPersons',
    initialState,
    reducers: {
        addMissingPerson: (state, action) => {
            state.missingPersons.push(action.payload);
        },
        updateMissingPerson: (state, action) => {
            const index = state.missingPersons.findIndex(person => person.id === action.payload.id);
            if (index !== -1) {
                state.missingPersons[index] = action.payload;
            }
        },
        removeMissingPerson: (state, action) => {
            state.missingPersons = state.missingPersons.filter(person => person.id !== action.payload.id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMissingPersons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMissingPersons.fulfilled, (state, action) => {
                state.loading = false;
                state.missingPersons = action.payload;
            })
            .addCase(fetchMissingPersons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addMissingPerson, updateMissingPerson, removeMissingPerson } = missingPersonsSlice.actions;

export default missingPersonsSlice.reducer;
