import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://192.168.100.10:3001';

const Dashboard = () => {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = socketIOClient(ENDPOINT);

        // Listen for updates to protector messages
        socket.on('updated_protector_messages', (updatedMessages) => {
            setMessages(updatedMessages);
        });

        // Initial call to get protector messages (if needed)
        // socket.emit('get_protector_messages', (initialMessages) => {
        //     setMessages(initialMessages);
        // });

        // Cleanup the socket connection on component unmount
        return () => socket.disconnect();
    }, []);

    return (
        <div className="dashboard">
            <h1>Protector Dashboard</h1>
            {Object.entries(messages).map(([protectorId, msgs]) => (
                <div key={protectorId} className="protector-message">
                    <h2>Protector {protectorId}</h2>
                    <ul>
                        {msgs.map((msg, index) => (
                            <li key={index}>Message: {msg}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
