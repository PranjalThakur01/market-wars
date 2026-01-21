market-wars/
├── client/          # Next.js Frontend
│   ├── src/app/     # Dashboard Logic (page.tsx)
│   └── src/lib/     # Socket.io Configuration
└── server/          # Node.js Backend
    ├── models/      # MongoDB Schemas
    ├── server.js    # Express & WebSocket Engine
    └── trigger.js   # Admin script for Market Flashes



# ⚔️ Market Wars: The Scarcity Simulation

**Market Wars** is a real-time, high-stakes market simulation game. It challenges players to navigate the intersection of "Information Warfare" and "Scarcity." Unlike traditional markets, popularity here is a danger—the more crowded an asset becomes, the lower its value drops.

---

## 🛠️ Tech Stack
* **Frontend:** Next.js 15 (App Router), Tailwind CSS, Socket.io-client.
* **Backend:** Node.js, Express.js, Socket.io (WebSockets).
* **Database:** MongoDB (Mongoose).

---

## 📂 Project Structure
* **`/client`**: The Next.js dashboard where teams monitor live market alerts and manage their portfolios.
* **`/server`**: The Node.js engine handling real-time market updates, scarcity logic, and socket broadcasts.

---

## 🚀 Installation & Setup

### 1. Prerequisites
* Node.js installed on your system.
* MongoDB running locally (default: `mongodb://127.0.0.1:27017`).

### 2. Backend Setup
Open a new terminal:
```bash
cd market-wars/server
npm install
node server.js

Wait for the "MongoDB Connected Successfully" message.

3. Frontend SetupOpen a second terminal:Bashcd market-wars/client
npm install
npm run dev

Visit http://localhost:3000 (or 3001) in your browser.4. Admin Trigger (Information War)To send rumors (Market Flashes) during the game, run this in a third terminal:Bashcd market-wars/server
node trigger.js
🧠 Game LogicPhase 1: The Scarcity FormulaValue is inversely proportional to popularity. If you follow the "Sheep" (the crowd), your profits will vanish:$$Value = \frac{Total Market Pool}{Total Shares Issued}$$Information WarThe server uses WebSockets to push real-time "Micro-Intel" (e.g., "Black SUV spotted," "Library Lockdown"). Teams must decide within seconds whether to trust the rumor and pivot their investments.📈 Future RoadmapPhase 2 (Opinion Trading): Binary contracts (Yes/No bets) based on campus event predictions.Leaderboard: Real-time ranking of teams based on total net worth.Automatic Liquidation: Immediate team elimination if capital hits $0.