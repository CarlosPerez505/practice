import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-neumorphism w-full lg:w-3/4 mx-auto mt-16 mb-16">
            <h1 className="text-5xl text-center font-bold mb-8">About The Red Palm Project</h1>
            <p className="text-lg leading-relaxed mb-4">
                The Red Palm Project is an innovative and dedicated initiative aimed at raising awareness and providing comprehensive information about missing Indigenous people, particularly in the Southwest region. The project's mission is to create a reliable platform for sharing critical data, supporting efforts to locate missing individuals, and fostering community engagement. By leveraging modern web technologies and data visualization tools, The Red Palm Project ensures efficient management and dynamic display of missing persons' information.
            </p>
            <h2 className="text-3xl font-semibold mt-6 mb-4">Key Features:</h2>
            <ul className="list-disc list-inside space-y-3 text-lg">
                <li><strong>Dynamic Data Management:</strong> The project utilizes a robust Node.js and Express backend connected to a MySQL database to handle data efficiently. Users can search, add, update, and delete records with ease.</li>
                <li><strong>Interactive Mapping:</strong> Integrated with Mapbox, the application provides a visual representation of missing persons' last known locations, enhancing the search and awareness efforts.</li>
                <li><strong>Data Visualization:</strong> Using Chart.js, the project visualizes important statistics, making complex data accessible and understandable for users.</li>
                <li><strong>Responsive Design:</strong> The React frontend, styled with Tailwind CSS, ensures a seamless user experience across all devices, from desktops to mobile phones.</li>
                <li><strong>Community and Official Data Integration:</strong> The project gathers data from official government sources and community inputs, ensuring comprehensive and accurate information.</li>
                <li><strong>Security and Privacy:</strong> Emphasizing the importance of protecting sensitive information, the project implements best practices in data security and privacy.</li>
            </ul>
        </div>
    );
};

export default About;
