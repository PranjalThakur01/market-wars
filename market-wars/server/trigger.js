const { io } = require("socket.io-client");

// Connect to your running server
const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("✅ Admin connected to Information War engine");

  // Send a test Market Flash
  const flashMessage = {
    message: "URGENT: Black SUV spotted outside the Library. Possible lockdown imminent.",
    type: "CRITICAL"
  };

  console.log("📡 Sending Market Flash...");
  socket.emit("send_flash", flashMessage);

  // Disconnect after sending
  setTimeout(() => {
    console.log("Done. Closing connection.");
    process.exit();
  }, 1000);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection failed. Is your server.js running?");
});