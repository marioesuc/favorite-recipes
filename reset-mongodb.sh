#!/bin/bash

# Script to reset MongoDB container and volume (removes authentication requirement)

echo "Stopping MongoDB container..."
docker-compose down

echo "Removing MongoDB volume..."
docker volume rm favorite-recipes_mongodb_data 2>/dev/null || echo "Volume already removed or doesn't exist"

echo "Starting MongoDB fresh..."
docker-compose up -d

echo "Waiting for MongoDB to be ready..."
sleep 5

echo "MongoDB reset complete! It should now work without authentication."
echo "MongoDB is running on port 27018 (to avoid conflicts with other MongoDB instances)."

