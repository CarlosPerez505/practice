// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sideBarSlice'; // Ensure this path matches the file name exactly
import missingPersonsReducer from './slices/missingPersonsSlice.js'

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
            missingPersons: missingPersonsReducer,

    },

});

export default store;

