# 🌐 Web Scraper Application

A modern ReactJS application with OAuth 2.0 authentication that allows users to scrape data from public websites and display it on a centralized platform. Built with ethical scraping practices and responsive design.

## ✨ Features

### 🔐 OAuth Authentication
- **Google OAuth 2.0 Integration**: Secure user authentication using Google accounts
- **Session Management**: Persistent login sessions with localStorage
- **Protected Routes**: Secure access to scraping functionality
- **User Profile Display**: Shows user information and avatar

### 🕷️ Web Scraping
- **Multi-format Support**: Scrape news headlines, quotes, weather data, and general content
- **Ethical Scraping**: Respects robots.txt and implements rate limiting
- **Smart Selectors**: Uses intelligent CSS selectors for different content types
- **Error Handling**: Robust error handling and user feedback
- **Preset URLs**: Quick access to popular websites for each content type

### 📊 Data Display
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Filter System**: Filter data by content type (news, quotes, weather, general)
- **Card Layout**: Clean, modern card-based display with hover effects
- **Real-time Updates**: Refresh data with a single click
- **Data Persistence**: Saves scraped data locally

### 🎨 User Interface
- **Modern Design**: Beautiful gradient backgrounds and glassmorphism effects
- **Loading States**: Smooth loading animations and spinners
- **Interactive Elements**: Hover effects and smooth transitions
- **Responsive Grid**: Adaptive layout for different screen sizes

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web-scraper-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   pip install -r requirements.txt
   cd ..
   ```

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add your domain to authorized origins
   - Copy the Client ID
   - Replace `YOUR_GOOGLE_CLIENT_ID_HERE` in `src/index.js` with your actual Client ID

5. **Start the Application**
   ```bash
   # Start both frontend and backend servers
   npm run server
   
   # Or start them separately:
   # Terminal 1 - Frontend
   npm start
   
   # Terminal 2 - Backend
   cd server
   python app.py
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
web-scraper-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.js          # Main dashboard component
│   │   ├── DataDisplay.js        # Data visualization component
│   │   ├── Header.js             # Navigation header
│   │   ├── LoadingSpinner.js     # Loading animation
│   │   ├── Login.js              # OAuth login component
│   │   └── ScrapingForm.js       # Scraping controls
│   ├── App.js                    # Main app component
│   ├── index.js                  # App entry point
│   └── index.css                 # Global styles
├── server/
│   ├── app.py                    # Flask backend server
│   ├── requirements.txt          # Python dependencies
│   └── index.js                  # Node.js proxy server
├── package.json                  # Node.js dependencies
└── README.md                     # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here

# Server Configuration
PORT=5000
PYTHON_PORT=5001
```

### Google OAuth Setup
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add authorized origins:
   - `http://localhost:3000` (development)
   - `https://yourdomain.com` (production)
7. Copy the Client ID and update `src/index.js`

## 🕷️ Web Scraping Features

### Supported Content Types
- **News Headlines**: Scrapes headlines from news websites
- **Quotes**: Extracts quotes and author information
- **Weather Data**: Gathers weather information
- **General Content**: Extracts general text content

### Ethical Scraping Practices
- **Robots.txt Compliance**: Checks and respects robots.txt files
- **Rate Limiting**: Implements delays between requests
- **User-Agent Rotation**: Uses fake user agents to avoid detection
- **Request Limits**: Limits the number of scraped items per request
- **Error Handling**: Graceful handling of scraping errors

### Preset Websites
The application includes preset URLs for popular websites:

**News:**
- BBC News
- CNN
- Reuters

**Quotes:**
- BrainyQuote
- Goodreads Quotes

**Weather:**
- Weather.com
- AccuWeather

## 🎨 UI Components

### Styled Components
The application uses styled-components for modern CSS-in-JS styling:

- **Glassmorphism Effects**: Semi-transparent backgrounds with blur
- **Gradient Backgrounds**: Beautiful color gradients
- **Hover Animations**: Smooth transitions and transforms
- **Responsive Design**: Mobile-first approach

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Teal gradient (#4ecdc4 to #44a08d)
- **Danger**: Red gradient (#ff6b6b to #ee5a24)
- **Background**: Purple gradient background

## 🔒 Security Features

### OAuth 2.0 Security
- **Secure Token Handling**: JWT tokens with proper validation
- **Session Management**: Secure session storage
- **Protected Routes**: Authentication-required routes
- **User Data Protection**: Secure handling of user information

### API Security
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation of all inputs
- **Error Handling**: Secure error responses
- **Rate Limiting**: Prevents abuse of scraping endpoints

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to your hosting platform
3. Set environment variables in your hosting platform
4. Update Google OAuth authorized origins

### Backend Deployment (Heroku/Railway)
1. Create a `Procfile` in the server directory:
   ```
   web: gunicorn app:app
   ```
2. Deploy to your preferred platform
3. Set environment variables
4. Update CORS origins in `app.py`

### Environment Variables for Production
```env
FLASK_ENV=production
CORS_ORIGINS=https://yourdomain.com
GOOGLE_CLIENT_ID=your_production_client_id
```

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
cd server
python -m pytest tests/
```

## 📝 API Documentation

### Endpoints

#### POST /api/scrape
Scrape data from a website

**Request Body:**
```json
{
  "url": "https://example.com",
  "dataType": "news",
  "userId": "user123"
}
```

**Response:**
```json
[
  {
    "title": "Article Title",
    "content": "Article content...",
    "url": "https://example.com/article",
    "source": "example.com",
    "type": "news",
    "timestamp": "2023-12-01T10:30:00"
  }
]
```

#### GET /api/scrape/refresh
Refresh scraped data

#### GET /api/health
Health check endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This application is designed for educational and personal use. Users are responsible for:
- Complying with website terms of service
- Respecting robots.txt files
- Following ethical scraping practices
- Not overwhelming servers with requests
- Respecting copyright and intellectual property rights

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

### Version 1.0.0
- Initial release with OAuth authentication
- Basic web scraping functionality
- Responsive design
- Data visualization features

---

**Built with ❤️ using React, Python Flask, and modern web technologies** 