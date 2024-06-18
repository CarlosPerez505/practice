// src/components/MMIPStatistics.js

import React from 'react';

const MMIPStatistics = () => {
    return (
        <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">Additional Statistics on Missing Indigenous People</h2>
            <p>
                According to the New Mexico Indian Affairs Department, the state has seen a significant increase in cases of missing and murdered Indigenous people. As of recent reports, there are numerous active cases that are under investigation.
            </p>
            <p className="mt-2">
                The Bureau of Indian Affairs' Missing and Murdered Unit (MMU) works to provide leadership and direction for cross-departmental and interagency work involving missing and murdered American Indians and Alaska Natives. The MMU utilizes the National Missing and Unidentified Persons System (NamUs) to aid in this effort.
            </p>
            <p className="mt-2">
                Source: <a href="https://www.iad.nm.gov/programs-and-funding/missing-murdered-indigenous-persons/" className="text-blue-400 hover:underline">New Mexico Indian Affairs Department</a>, <a href="https://www.bia.gov/service/mmu/missing-and-murdered-indigenous-people-crisis" className="text-blue-400 hover:underline">Bureau of Indian Affairs</a>
            </p>
        </div>
    );
};

export default MMIPStatistics;

