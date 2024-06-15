// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sideBarSlice'; // Ensure this path matches the file name exactly

const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
    },
});

export default store;
