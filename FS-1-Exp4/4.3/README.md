# Experiment 4.3 - Concurrent Ticket Booking System

## Aim
To create a concurrent ticket booking system with seat locking using Redis.

## Hardware/Software Requirements
- Node.js 18+
- Redis
- Express.js
- Artillery (load testing)

## Key Concepts

### Concurrency
Multiple users accessing the booking system at the same time.

### Race Condition
When two requests try to book the same seat simultaneously, leading to double-booking.

### Redis Locking
Redis `SET NX EX` is used to atomically acquire a lock before processing a booking. Only one request can hold the lock at a time; others receive a "try again" response.

### Seat Locking Flow
1. Request arrives → attempt to acquire Redis lock
2. If locked → reject with 400 (seat busy)
3. If unlocked → decrement seat count → release lock → return success

## Setup

```bash
# Start Redis
redis-server

# Install dependencies
npm install

# Run server
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/book | Book a seat |
| GET | /api/status | Check seat availability |

## Sample Response

```json
{
  "success": true,
  "bookingId": 1718369248709,
  "remaining": 99
}
```

## Load Testing with Artillery

```bash
# Install Artillery globally
npm install -g artillery

# Run load test
artillery run load-test.yml
```

The test simulates 20 concurrent users per second for 10 seconds, demonstrating that the Redis lock prevents race conditions and double booking.
