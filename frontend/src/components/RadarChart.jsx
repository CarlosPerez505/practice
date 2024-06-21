// src/components/RadarChart.jsx
import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = () => {
    const data = {
        labels: ['Age', 'Last Seen Date', 'Reported Date', 'Height', 'Weight'],
        datasets: [
            {
                label: 'Case 1',
                data: [20, 50, 30, 60, 80],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Case 2',
                data: [30, 60, 40, 70, 90],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div className="chart-container h-64">
            <Radar data={data} options={options} />

        </div>
    );
};

export default RadarChart;

