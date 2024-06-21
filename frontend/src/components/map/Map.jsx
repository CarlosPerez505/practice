import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const mapboxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;
console.log('Mapbox API Key:', mapboxApiKey);

const Map = () => {
    const mapContainer = useRef(null);
    const [map, setMap] = useState(null);
    const [showHeatmap, setShowHeatmap] = useState(true);

    useEffect(() => {
        if (map) return;
        if (!mapboxApiKey) {
            console.error("Mapbox API key is missing");
            return;
        }

        mapboxgl.accessToken = mapboxApiKey;

        const mapInstance = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: [-108.2187, 36.7281],
            zoom: 9,
        });

        mapInstance.on('load', () => {
            setMap(mapInstance);
            mapInstance.resize();

            const locations = [
                { lng: -108.2187, lat: 36.7281, name: 'Farmington' },
                { lng: -107.9917, lat: 36.8222, name: 'Aztec' },
                { lng: -108.6877, lat: 36.7857, name: 'Shiprock' },
                { lng: -108.3534, lat: 36.7392, name: 'Kirtland' },
            ];

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

            mapInstance.addLayer({
                id: 'locations-heatmap',
                type: 'heatmap',
                source: 'locations',
                layout: {},
                paint: {
                    'heatmap-weight': {
                        property: 'point_count',
                        type: 'exponential',
                        stops: [
                            [1, 0],
                            [100, 1]
                        ]
                    },
                    'heatmap-intensity': {
                        stops: [
                            [0, 1],
                            [10, 3]
                        ]
                    },
                    'heatmap-color': [
                        'interpolate',
                        ['linear'],
                        ['heatmap-density'],
                        0, 'rgba(33,102,172,0)',
                        0.2, 'rgb(103,169,207)',
                        0.4, 'rgb(209,229,240)',
                        0.6, 'rgb(253,219,199)',
                        0.8, 'rgb(239,138,98)',
                        1, 'rgb(178,24,43)'
                    ],
                    'heatmap-radius': {
                        stops: [
                            [0, 2],
                            [9, 20]
                        ]
                    },
                    'heatmap-opacity': {
                        default: 1,
                        stops: [
                            [7, 1],
                            [9, 0]
                        ]
                    },
                }
            });

            const missingWomenLocations = [
                { lng: -74.0060, lat: 40.7128, name: 'Jane Doe' },
            ];

            missingWomenLocations.forEach(location => {
                const el = document.createElement('div');
                el.className = 'marker';

                new mapboxgl.Marker(el)
                    .setLngLat([location.lng, location.lat])
                    .setPopup(new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h3>${location.name}</h3>`))
                    .addTo(mapInstance);
            });

            mapInstance.setLayoutProperty('locations-heatmap', 'visibility', showHeatmap ? 'visible' : 'none');
        });
    }, [map, showHeatmap]);

    const toggleHeatmap = () => {
        setShowHeatmap(currentShowHeatmap => {
            const newShowHeatmap = !currentShowHeatmap;
            map.setLayoutProperty('locations-heatmap', 'visibility', newShowHeatmap ? 'visible' : 'none');
            return newShowHeatmap;
        });
    };

    return (
        <div className="relative mt-5 mb-5">
            <button className="absolute top-4 left-4 z-10 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-700 transition duration-300" onClick={toggleHeatmap}>
                Toggle Heatmap
            </button>
            <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-lg overflow-hidden" />
        </div>
    );
};

export default Map;


