#!/bin/bash

# Azure App Service startup script for Next.js
cd /home/site/wwwroot

# Check Node.js version
echo "Current Node.js version:"
node --version

# Set Node.js version if needed
export NODE_VERSION=20.11.0

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci --only=production
fi

# Start the application
echo "Starting Next.js application..."
npm start
