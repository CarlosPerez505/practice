import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'

// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbWFrZXI0MjAiLCJhIjoiY2x0ODI0and6MHMxczJpbWdldmQ3cWJoMSJ9.e6Cg-_7k-Spy_F5yV0zu0Q';

const Map = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(true); // State to toggle heatmap

    useEffect(() => {
        if (map) return; // Initialize the map only once

        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11', // or any other style
            center: [-108.2187, 36.7281], // Centered on Farmington, NM
            zoom: 9,
        });

        mapInstance.on('load', () => {
            setMap(mapInstance);
            mapInstance.resize();

            // Mock locations in New Mexico with names
            const locations = [
                { lng: -108.2187, lat: 36.7281, name: 'Farmington' },
                { lng: -107.9917, lat: 36.8222, name: 'Aztec' },
                { lng: -108.6877, lat: 36.7857, name: 'Shiprock' },
                { lng: -108.3534, lat: 36.7392, name: 'Kirtland' },
                // Add more locations as needed
            ];

            // Add source and layers for heatmap and markers with popups
            mapInstance.addSource('locations', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: locations.map(location => ({
                        type: 'Feature',
                        properties: { name: location.name },
                        geometry: {
                            type: 'Point',
                            coordinates: [location.lng, location.lat]
                        }
                    }))
                }
            });

            // Add heatmap layer
            mapInstance.addLayer({
                id: 'locations-heatmap',
                type: 'heatmap',
                source: 'locations',
                layout: {},
                paint: {
                    // Heatmap properties here
                }
            });





            const missingWomenLocations = [
                { lng: -74.0060, lat: 40.7128, name: 'Jane Doe' },
                // ...other locations
            ];

            // Add marker layer for popups
            missingWomenLocations.forEach(location => {
                const el = document.createElement('div');
                el.className = 'marker';

                new mapboxgl.Marker(el)
                    .setLngLat([location.lng, location.lat])
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h3>${location.name}</h3>`))
                    .addTo(mapInstance);
            });

            // Initially set visibility based on state
            mapInstance.setLayoutProperty('locations-heatmap', 'visibility', showHeatmap ? 'visible' : 'none');
        });
    }, [map, showHeatmap]);

    // Toggle heatmap and markers visibility

    const toggleHeatmap = () => {
        setShowHeatmap(currentShowHeatmap => {
            const newShowHeatmap = !currentShowHeatmap;
            map.setLayoutProperty('locations-heatmap', 'visibility', newShowHeatmap ? 'visible' : 'none');
            // Toggle other layers as needed
            return newShowHeatmap;
        });
    };


    return (
        <div>
            <button onClick={toggleHeatmap}>Toggle Heatmap</button>
            <div ref={mapContainer} style={{ width: '50vw', height: '50vh' }} />
        </div>
    );
};

export default Map;

