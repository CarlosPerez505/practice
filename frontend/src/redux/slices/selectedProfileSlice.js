// src/redux/slices/selectedProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const selectedProfileSlice = createSlice({
    name: 'selectedProfile',
    initialState: null,
    reducers: {
        setSelectedProfile: (state, action) => action.payload,
        clearSelectedProfile: () => null,
    },
});

export const { setSelectedProfile, clearSelectedProfile } = selectedProfileSlice.actions;

export default selectedProfileSlice.reducer;
