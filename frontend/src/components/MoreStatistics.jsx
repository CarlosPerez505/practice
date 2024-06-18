// src/components/MoreStatistics.js

import React from 'react';

const MoreStatistics = () => {
    return (
        <div className="chart-container more-statistics p-4">
            <h2 className="text-white text-2xl mb-4">Additional Statistics on Missing Indigenous People</h2>
            <p className="text-white">
                According to the New Mexico Indian Affairs Department, the state has seen a significant increase in cases of missing and murdered Indigenous people.
                As of recent reports, there are numerous active cases that are under investigation.
                <br /><br />
                Source: <a href="https://www.iad.nm.gov/programs-and-funding/missing-murdered-indigenous-persons/" className="text-blue-400" target="_blank" rel="noopener noreferrer">New Mexico Indian Affairs Department</a>
            </p>
        </div>
    );
};

export default MoreStatistics;

