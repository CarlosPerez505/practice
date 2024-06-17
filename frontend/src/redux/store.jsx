import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sideBarSlice';
import missingPersonsReducer from './slices/missingPersonsSlice';
import selectedProfileReducer from './slices/selectedProfileSlice';

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        missingPersons: missingPersonsReducer,
        selectedProfile: selectedProfileReducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;
