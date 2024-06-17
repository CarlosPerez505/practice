import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const selectedProfileSlice = createSlice({
    name: 'selectedProfile',
    initialState,
    reducers: {
        setSelectedProfile: (state, action) => action.payload,
        clearSelectedProfile: () => null,
    },
});

export const { setSelectedProfile, clearSelectedProfile } = selectedProfileSlice.actions;

export default selectedProfileSlice.reducer;
