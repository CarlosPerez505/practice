// src/components/MMIPChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'tailwindcss/tailwind.css';

const MMIPChart = () => {
    const data = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021'],
        datasets: [
            {
                label: 'Missing Indigenous People Cases - Southwest',
                data: [50, 55, 60, 65, 70, 75], // Example data
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    lineWidth: 2,
                },
            },
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    lineWidth: 2,
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
            title: {
                display: true,
                text: 'Missing Indigenous People Cases in the Southwest (2016-2021)',
                color: 'white',
            },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 p-5">
            <h2 className="text-white text-2xl mb-5">The Red PaLm Project</h2>
            <p className="text-white mb-5">
                The Red PaLm Project is dedicated to raising awareness about missing persons. Our mission is to provide a platform for sharing information and supporting efforts to locate missing individuals.
            </p>
            <div className="w-full md:w-4/5 lg:w-2/3">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default MMIPChart;

