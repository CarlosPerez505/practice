import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const apexBarChart = () => {
    const [chartOptions] = useState({
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true
                    },
                    autoSelected: 'zoom'
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                labels: {
                    style: {
                        colors: '#000'
                    },
                },
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)',
                    style: {
                        color: '#000',
                    },
                },
                labels: {
                    style: {
                        colors: '#000'
                    },
                },
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                theme: 'dark'
            },
            legend: {
                labels:{
                    colors: "#000"
                }
            },
        },
    });

    return (
        <div id="chart">
            <Chart options={chartOptions.options} series={chartOptions.series} type="bar" height={350} />
        </div>
    );
}

export default apexBarChart;