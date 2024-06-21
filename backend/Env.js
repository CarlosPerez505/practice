import React from 'react';

function Env() {
    console.log('VITE_MAPBOX_API_KEY:', import.meta.env.VITE_MAPBOX_API_KEY);
    console.log('VITE_OPENAI_API_KEY:', import.meta.env.VITE_OPENAI_API_KEY);

    return (
        <div>
            <p>Check the console for environment variables.</p>
        </div>
    );
}

export default Env;

