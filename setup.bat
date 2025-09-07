@echo off
echo 🌐 Web Scraper Application Setup
echo ================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python first.
    pause
    exit /b 1
)

echo ✅ Node.js and Python are installed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully

REM Install backend dependencies
echo 🐍 Installing backend dependencies...
cd server
call pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully

cd ..

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    (
        echo # Google OAuth Configuration
        echo REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
        echo.
        echo # Server Configuration
        echo PORT=5000
        echo PYTHON_PORT=5001
    ) > .env
    echo ✅ .env file created
    echo ⚠️  Please update the Google Client ID in the .env file
)

echo.
echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Get your Google OAuth Client ID from Google Cloud Console
echo 2. Update the REACT_APP_GOOGLE_CLIENT_ID in .env file
echo 3. Update the Google Client ID in src/index.js
echo 4. Run 'npm start' to start the frontend
echo 5. Run 'cd server ^&^& python app.py' to start the backend
echo.
echo For detailed instructions, see README.md
pause 