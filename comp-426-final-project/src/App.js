import React, { useState, useEffect } from 'react';

function App() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Listen for 'ready' event from the server
        const eventSource = new EventSource('http://localhost:3001/ready');
        eventSource.addEventListener('ready', () => {
            setIsReady(true);
        });

        // Cleanup event listener on component unmount
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div>
            {!isReady && <p>Loading...</p>}
            {isReady && <p>Application is ready to use!</p>}
            {/* Render your application components here */}
        </div>
    );
}

export default App;
