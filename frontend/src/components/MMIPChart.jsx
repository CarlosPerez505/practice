// src/components/MMIPChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const MMIPChart = () => {
    const data = {
        labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Missing Indigenous People Cases - Southwest',
                data: [40, 50, 60, 70, 80, 90, 100, 110],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white'
                }
            },
            title: {
                display: true,
                text: 'Missing Indigenous People Cases in the Southwest (2016-2023)',
                color: 'white'
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)'
                }
            }
        }
    };

    return (
        <div className="w-full h-96">
            <Bar data={data} options={options} />
        </div>
    );
};

export default MMIPChart;


