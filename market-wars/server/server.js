const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Change to 3001 if your Next.js is running there
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// 1. Database Connection (Ensure MongoDB is running)
// If you don't have a .env, replace process.env.MONGO_URI with "mongodb://127.0.0.1:27017/marketwars"
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/marketwars";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 2. Real-Time Market Logic (Socket.io)
io.on('connection', (socket) => {
    console.log('Team Connected:', socket.id);

    // Listen for Asset Purchases (Phase 1 Scarcity Logic)
    socket.on('buy_asset', (data) => {
        console.log(`Purchase: Team bought ${data.amount} in ${data.asset}`);
        // In a full version, you would update the DB here
        // Then broadcast global "crowdedness" stats back to everyone
        io.emit('market_update', data); 
    });

    // Listen for Admin Market Flashes (Information War)
    socket.on('send_flash', (data) => {
        console.log("Broadcasting Market Flash:", data.message);
        io.emit('receive_flash', data);
    });

    socket.on('disconnect', () => {
        console.log('Team disconnected');
    });
});

// 3. API Routes
app.get('/', (req, res) => {
    res.send("Market Wars Server is Operational.");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 WebSocket ready for Information War`);
});