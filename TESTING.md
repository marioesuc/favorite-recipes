# Testing Guide

This guide provides multiple ways to test the Favorite Recipes API.

## Prerequisites

1. Make sure MongoDB is running
2. Create a `.env` file (see README.md)
3. Install dependencies: `npm install`
4. Start the server: `npm run dev`

## Method 1: Using cURL (Command Line)

### 1. Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "test@example.com"
  }
}
```

**Save the token** from the response for the next steps.

### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Create a Recipe

Replace `YOUR_TOKEN` with the token from registration/login:

```bash
curl -X POST http://localhost:3000/api/recipes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Pasta Carbonara" \
  -F "description=Classic Italian pasta dish" \
  -F "cuisine=Italian" \
  -F "sourceUrl=https://example.com/recipe" \
  -F "image=@/path/to/your/image.jpg"
```

**Note:** Replace `/path/to/your/image.jpg` with an actual image file path on your system.

### 4. Get All Recipes

```bash
curl -X GET http://localhost:3000/api/recipes \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Get Single Recipe

Replace `RECIPE_ID` with an actual recipe ID from the previous response:

```bash
curl -X GET http://localhost:3000/api/recipes/RECIPE_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 6. Health Check

```bash
curl http://localhost:3000/health
```

## Method 2: Using a Test Script

Run the provided test script (see `test-api.sh` or `test-api.js`).

## Method 3: Using Postman

### Setup

1. **Import the Postman Collection:**
   - Open Postman
   - Click "Import" button
   - Import `Favorite-Recipes-API.postman_collection.json`
   - Import `Favorite-Recipes-API.postman_environment.json`
   - Select the "Favorite Recipes - Local" environment

2. **Environment Variables (auto-configured):**
   - `base_url`: `http://localhost:3000` (default)
   - `auth_token`: (automatically saved after login/register)
   - `user_id`: (automatically saved after login/register)
   - `recipe_id`: (automatically saved after creating a recipe)

### Requests to Create

1. **Register**
   - Method: POST
   - URL: `{{baseUrl}}/api/auth/register`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```
   - Tests: Save token to environment variable

2. **Login**
   - Method: POST
   - URL: `{{baseUrl}}/api/auth/login`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

3. **Create Recipe**
   - Method: POST
   - URL: `{{baseUrl}}/api/recipes`
   - Headers: `Authorization: Bearer {{token}}`
   - Body (form-data):
     - `title`: Pasta Carbonara
     - `description`: Classic Italian pasta dish
     - `cuisine`: Italian
     - `sourceUrl`: https://example.com/recipe
     - `image`: (select file)

4. **Get All Recipes**
   - Method: GET
   - URL: `{{baseUrl}}/api/recipes`
   - Headers: `Authorization: Bearer {{token}}`

5. **Get Single Recipe**
   - Method: GET
   - URL: `{{baseUrl}}/api/recipes/:id`
   - Headers: `Authorization: Bearer {{token}}`

## Method 4: Using Node.js Test Script

See `test-api.js` for an automated test script.

## Common Issues

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod` or check your MongoDB service
- Verify the `MONGODB_URI` in your `.env` file

### Authentication Error
- Make sure you're including the `Authorization` header with `Bearer <token>`
- Check that the token hasn't expired

### Image Upload Error
- Make sure the file is a valid image (jpg, png, gif, webp)
- File size must be under 5MB
- Use `multipart/form-data` content type

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or stop the process using port 3000

