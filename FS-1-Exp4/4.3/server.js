const express = require("express");
const bookingSystem = require("./booking-system");

const app = express();
app.use(express.json());

// Book a seat
app.post("/api/book", bookingSystem.bookSeat);

// Check seat availability
app.get("/api/status", bookingSystem.getStatus);

app.listen(3000, () => {
  console.log("Ticket Booking System running on port 3000");
});
