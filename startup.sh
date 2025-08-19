#!/bin/bash

# Azure App Service startup script for Next.js
cd /home/site/wwwroot

echo "=== Starting Azure App Service ==="
echo "Current directory: $(pwd)"
echo "Current Node.js version: $(node --version)"
echo "Current npm version: $(npm --version)"

# Set environment variables
export NODE_ENV=production
export PORT=8080
export NODE_VERSION=20.11.0
export WEBSITE_NODE_DEFAULT_VERSION=20.11.0

echo "Environment variables set:"
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "ERROR: package.json not found!"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci --production=false
    if [ $? -ne 0 ]; then
        echo "ERROR: npm ci failed!"
        exit 1
    fi
fi

# Build the application if .next doesn't exist
if [ ! -d ".next" ]; then
    echo "Building Next.js application..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "ERROR: npm run build failed!"
        exit 1
    fi
fi

# Start the application
echo "Starting Next.js application on port $PORT..."
npm start
