const { createClient } = require("redis");

const client = createClient();
client.connect().catch(console.error);

client.on("error", (err) => console.error("Redis Client Error:", err));

let availableSeats = 100;

exports.bookSeat = async (req, res) => {
  const seatId = "seat-lock";

  try {
    // Attempt to acquire lock using SET NX (only set if key doesn't exist)
    const lock = await client.set(seatId, "locked", {
      NX: true,  // Only set if Not eXists
      EX: 5      // Auto-expire after 5 seconds (prevents deadlock)
    });

    if (!lock) {
      return res.status(400).json({
        success: false,
        message: "Seat is being booked by someone else. Please try again."
      });
    }

    if (availableSeats <= 0) {
      await client.del(seatId);
      return res.status(400).json({
        success: false,
        message: "No seats available"
      });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 100));

    availableSeats--;
    const bookingId = Date.now();

    // Release the lock
    await client.del(seatId);

    res.status(200).json({
      success: true,
      bookingId,
      remaining: availableSeats
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.getStatus = async (req, res) => {
  res.json({
    availableSeats,
    totalSeats: 100
  });
};
