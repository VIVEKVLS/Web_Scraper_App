#!/bin/bash

echo "🌐 Web Scraper Application Setup"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

echo "✅ Node.js and Python 3 are installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd server
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE

# Server Configuration
PORT=5000
PYTHON_PORT=5001
EOF
    echo "✅ .env file created"
    echo "⚠️  Please update the Google Client ID in the .env file"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Get your Google OAuth Client ID from Google Cloud Console"
echo "2. Update the REACT_APP_GOOGLE_CLIENT_ID in .env file"
echo "3. Update the Google Client ID in src/index.js"
echo "4. Run 'npm start' to start the frontend"
echo "5. Run 'cd server && python3 app.py' to start the backend"
echo ""
echo "For detailed instructions, see README.md" 