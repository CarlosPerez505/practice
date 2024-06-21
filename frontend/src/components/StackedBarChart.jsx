// src/components/StackedBarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBarChart = () => {
    const data = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Southwest',
                data: [20, 50, 30, 60],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Northwest',
                data: [30, 60, 40, 70],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div className="chart-container h-64">
            <Bar data={data} options={options} />

        </div>
    );
};

export default StackedBarChart;



