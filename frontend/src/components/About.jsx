import React from 'react';

const About = () => {
    const sections = [
        {
            title: "Dynamic Data Management",
            content:
                "The Red Palm Project utilizes a robust Node.js and Express backend connected to a MySQL database to handle data efficiently. Users can search, add, update, and delete records with ease.",
        },
        {
            title: "Interactive Mapping",
            content:
                "Integrated with Mapbox, the application provides a visual representation of missing persons' last known locations, enhancing the search and awareness efforts.",
        },
        {
            title: "Data Visualization",
            content:
                "Using Chart.js, the project visualizes important statistics, making complex data accessible and understandable for users.",
        },
        {
            title: "Responsive Design",
            content:
                "The React frontend, styled with Tailwind CSS, ensures a seamless user experience across all devices, from desktops to mobile phones.",
        },
    ];

    return (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-neumorphism w-full lg:w-2/3 mx-auto mt-16 mb-16">
            <h1 className="text-5xl text-center font-bold mb-4">About The Red Palm Project</h1>
            <p className="text-3xl p-3 leading-relaxed mb-8">
                The Red Palm Project is an innovative and dedicated initiative aimed at raising awareness and providing comprehensive information about missing Indigenous people, particularly in the Southwest region. The project's mission is to create a reliable platform for sharing critical data, supporting efforts to locate missing individuals, and fostering community engagement. By leveraging modern web technologies and data visualization tools, The Red Palm Project ensures efficient management and dynamic display of missing persons' information.
            </p>
            {sections.map((section, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-4xl font-bold mb-2">{section.title}</h2>
                    <p className="text-xl">{section.content}</p>
                </div>
            ))}
        </div>
    );
};

export default About;



