import React, { useState } from 'react';
import Chart from "react-apexcharts";

const ApexPieChart = () => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            foreColor: '#FFFFFF', // Changes the default text color of the chart
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
        legend: {
            position: 'right',
            labels: {
                colors: ['#1E90FF', '#32CD32', '#FFA500', '#FF6347', '#9370DB'], // Adjust as needed for better visibility
                useSeriesColors: false, // Use custom colors for legend labels
                fontSize: '14px',
            },
            markers: {
                width: 12,
                height: 12,
                radius: 12,
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: ['#1E90FF', '#32CD32', '#FFA500', '#FF6347', '#9370DB'], // Adjust as needed for better visibility
                        fontSize: '12px',
                    },
                },
            },
        }],
    });

    const [series, setSeries] = useState([44, 55, 13, 43, 22]);

    return (
        <div>
            <Chart
                options={chartOptions}
                series={series}
                type="pie" width="380"
            />
        </div>
    );
}

export default ApexPieChart;
