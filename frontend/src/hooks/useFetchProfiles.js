// src/hooks/useFetchProfiles.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../redux/slices/missingPersonsSlice';
import { fetchPredictions } from '../redux/slices/predictionsSlice';

const useFetchProfiles = () => {
    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles.profiles);
    const isLoading = useSelector(state => state.profiles.isLoading);
    const error = useSelector(state => state.profiles.error);
    const predictions = useSelector(state => state.predictions.data);

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    useEffect(() => {
        if (profiles.length) {
            profiles.forEach(profile => {
                dispatch(fetchPredictions(profile));
            });
        }
    }, [dispatch, profiles]);

    return { profiles, isLoading, error, predictions };
};

export default useFetchProfiles;
