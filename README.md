# Favorite Recipes API

A Node.js/TypeScript backend API for saving and managing favorite recipes from different websites and social media.

## Features

- User registration and authentication with JWT
- Create recipes with title, description, cuisine type, source URL, and image
- Retrieve all recipes for authenticated user
- Get individual recipe details
- Image upload and storage

## Tech Stack

- **Node.js** with **TypeScript**
- **Express.js** - Web framework
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File upload handling
- **Zod** - Input validation
- **bcrypt** - Password hashing

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose (for MongoDB)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/favorite-recipes
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
JWT_EXPIRES_IN=7d
```

3. Start MongoDB using Docker:
```bash
docker-compose up -d
```

This will start MongoDB in a Docker container on port 27017.

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Recipes

All recipe endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get All Recipes
```
GET /api/recipes
```

#### Get Single Recipe
```
GET /api/recipes/:id
```

#### Create Recipe
```
POST /api/recipes
Content-Type: multipart/form-data

Fields:
- title: string (required)
- description: string (optional)
- cuisine: string (required)
- sourceUrl: string (required, valid URL)
- image: file (required, image file)
```

## Project Structure

```
favorite-recipes/
├── src/
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose models
│   ├── middleware/      # Auth and upload middleware
│   ├── controllers/     # Route handlers
│   ├── routes/          # Express routes
│   ├── utils/           # Validation and error handling
│   ├── types/           # TypeScript types
│   └── app.ts           # Express app setup
├── uploads/             # Recipe images storage
└── dist/                # Compiled JavaScript (generated)
```

## Error Handling

The API returns errors in the following format:

```json
{
  "error": "Error message"
}
```

For validation errors:
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

## License

ISC

