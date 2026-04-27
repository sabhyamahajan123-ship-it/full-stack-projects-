# Experiment 4.2 - REST API for Playing Card Collection

## Aim
To develop a RESTful API for managing playing card collections using Express.js.

## Hardware/Software Requirements
- Node.js 18+
- Express.js
- Postman
- VS Code

## Setup

```bash
npm install
npm start
```

Server runs on http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cards | Get all cards |
| GET | /api/cards?collection=royal | Filter by collection |
| GET | /api/cards/:id | Get card by ID |
| POST | /api/cards | Add a new card |
| PUT | /api/cards/:id | Update a card |
| DELETE | /api/cards/:id | Delete a card |

## Sample Requests (Postman)

### GET all cards
```
GET http://localhost:3000/api/cards
```

### POST new card
```
POST http://localhost:3000/api/cards
Content-Type: application/json

{
  "suit": "diamonds",
  "value": "queen",
  "collection": "royal"
}
```

### PUT update card
```
PUT http://localhost:3000/api/cards/1
Content-Type: application/json

{
  "value": "king"
}
```

### DELETE card
```
DELETE http://localhost:3000/api/cards/1
```
