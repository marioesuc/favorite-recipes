# Postman Collection Setup Guide

This guide will help you set up and use the Postman collection to test the Favorite Recipes API.

## Quick Start

1. **Import the Collection:**
   - Open Postman
   - Click "Import" in the top left
   - Select `Favorite-Recipes-API.postman_collection.json`
   - Click "Import"

2. **Import the Environment:**
   - Click "Import" again
   - Select `Favorite-Recipes-API.postman_environment.json`
   - Click "Import"

3. **Select the Environment:**
   - In the top right corner, click the environment dropdown
   - Select "Favorite Recipes - Local"

4. **Start Testing:**
   - Make sure your server is running (`npm run dev`)
   - Start with "Health Check" to verify the server is up
   - Then run "Register User" or "Login"
   - The token will be automatically saved for authenticated requests

## Collection Structure

### Authentication
- **Register User**: Creates a new user account and automatically saves the token
- **Login**: Authenticates with existing credentials and saves the token

### Recipes
- **Get All Recipes**: Retrieves all recipes for the authenticated user
- **Get Single Recipe**: Gets a specific recipe by ID (requires recipe_id in environment)
- **Create Recipe**: Creates a new recipe with image upload (token and recipe_id auto-saved)

### Health Check
- **Health Check**: Verifies server is running (no auth required)

## Automatic Token Management

The collection includes test scripts that automatically:
- Save the JWT token after registration/login to `auth_token` variable
- Save the user ID to `user_id` variable
- Save the recipe ID after creating a recipe to `recipe_id` variable

All authenticated requests use the `auth_token` variable automatically via Bearer token authentication.

## Testing Scenarios

### Scenario 1: Complete User Flow
1. **Health Check** - Verify server is running
2. **Register User** - Create a new account (token auto-saved)
3. **Create Recipe** - Add a recipe with image (recipe_id auto-saved)
4. **Get All Recipes** - View all your recipes
5. **Get Single Recipe** - View the specific recipe you created

### Scenario 2: Existing User
1. **Health Check** - Verify server is running
2. **Login** - Authenticate with existing credentials (token auto-saved)
3. **Get All Recipes** - View existing recipes
4. **Create Recipe** - Add a new recipe

### Scenario 3: Error Testing
1. **Register User** with invalid email format
2. **Login** with wrong password
3. **Get All Recipes** without token (remove auth_token from environment)
4. **Create Recipe** without image file
5. **Get Single Recipe** with invalid ID

## Environment Variables

You can modify the environment variables:
- `base_url`: Change to your server URL (default: `http://localhost:3000`)
- `auth_token`: Automatically set after login/register
- `user_id`: Automatically set after login/register
- `recipe_id`: Automatically set after creating a recipe

## Tips

1. **Image Upload**: When creating a recipe, click on the "image" field in form-data and select a file from your computer
2. **Token Expiry**: If you get 401 errors, re-run the Login request to get a fresh token
3. **Recipe ID**: After creating a recipe, the ID is saved automatically. You can also copy it from the "Get All Recipes" response
4. **Multiple Users**: Create a new environment for each user to test multi-user scenarios

## Troubleshooting

- **401 Unauthorized**: Make sure you've run Register or Login first, and the environment is selected
- **Connection Error**: Verify the server is running and `base_url` is correct
- **Image Upload Fails**: Make sure the image file is under 5MB and is a valid image format (jpg, png, gif, webp)
- **Recipe Not Found**: Make sure you're using a valid recipe_id that belongs to your user

