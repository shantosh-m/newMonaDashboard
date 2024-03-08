const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors"); // Import CORS middleware

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Use CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://192.168.100.10:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Store messages for each protector
const protectorMessages = {};

io.on("connection", (socket) => {
    console.log("Client connected!");

    socket.on('protector', (msg) => {
        console.log(`Message received from Protector ${msg.protector_id}: ${msg.data}`);
        
        // Store the message for the protector
        if (!protectorMessages[msg.protector_id]) {
            protectorMessages[msg.protector_id] = [];
        }
        protectorMessages[msg.protector_id].push(msg.data);

        // Emit the updated messages to all clients
        io.emit('updated_protector_messages', protectorMessages);
    });
});

// Serve the dashboard HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dashboard.html");
});

server.listen(3001, () => {
    console.log("Server started on port 3001");
});
