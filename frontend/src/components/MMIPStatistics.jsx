// src/components/MMIPStatistics.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const MMIPStatistics = () => {
    const data = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [
            {
                label: 'Missing Indigenous People Cases - Southwest',
                data: [40, 45, 50, 55, 60, 70], // Example data
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Missing Indigenous People Cases in the Southwest (2016-2021)',
            },
        },
    };

    return (
        <div className="w-full h-96 md:h-128 lg:h-160 p-4">
            <Bar data={data} options={options} />
            <p className="text-sm text-gray-600 mt-2">
                Source: <a href="https://www.iad.nm.gov/programs-and-funding/missing-murdered-indigenous-persons/" target="_blank" rel="noopener noreferrer">New Mexico Indian Affairs Department</a>
            </p>
        </div>
    );
};

export default MMIPStatistics;
