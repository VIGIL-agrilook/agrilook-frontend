#!/bin/bash

# Azure App Service startup script for Next.js
cd /home/site/wwwroot

# Check Node.js version
echo "Current Node.js version:"
node --version

# Force Node.js version to 20.x
export NODE_VERSION=20.11.0
export WEBSITE_NODE_DEFAULT_VERSION=20.11.0

# Try to use nvm to switch Node.js version if available
if command -v nvm &> /dev/null; then
    echo "Using nvm to switch to Node.js 20.11.0..."
    nvm use 20.11.0 || nvm install 20.11.0
fi

# Alternative: Use Azure's built-in Node.js version switching
if [ -f "/opt/nodejs/20.11.0/bin/node" ]; then
    echo "Using Azure's Node.js 20.11.0..."
    export PATH="/opt/nodejs/20.11.0/bin:$PATH"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm ci
fi

# Build the application if .next doesn't exist
if [ ! -d ".next" ]; then
    echo "Building Next.js application..."
    npm run build
fi

# Start the application
echo "Starting Next.js application..."
npm start
