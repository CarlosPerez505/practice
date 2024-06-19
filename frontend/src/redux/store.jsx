import { configureStore } from '@reduxjs/toolkit';
import profilesReducer from './slices/missingPersonsSlice';
import predictionsReducer from './slices/predictionsSlice';
import selectedProfileReducer from './slices/selectedProfileSlice';

const store = configureStore({
    reducer: {
        profiles: profilesReducer,
        predictions: predictionsReducer,
        selectedProfile: selectedProfileReducer,
    },
});

export default store;

