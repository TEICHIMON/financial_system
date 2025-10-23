#!/bin/bash

echo "======================================"
echo "  RuPPs System - Quick Start Script  "
echo "======================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16.x or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "📌 Access the application at: http://localhost:8080"
echo "📌 Login credentials:"
echo "   Username: admin"
echo "   Password: admin"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
