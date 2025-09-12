# Web Scraper App

![Web Scraper App](https://via.placeholder.com/150)

## 📌 Overview

Web Scraper App is a full-stack web scraping application designed to extract structured data from various websites. Built with a React frontend and a Flask backend, this app allows users to input URLs and select data types to scrape, including news articles, quotes, and weather information.

## 🚀 Features

- **Frontend**: Developed using React.js, providing a user-friendly interface for interacting with the scraper.
- **Backend**: Powered by Flask, handling API requests and data processing.
- **Data Types**: Supports scraping of:
  - News articles
  - Quotes
  - Weather information
- **Error Handling**: Provides informative error messages for invalid URLs or unsupported data types.

## 🔧 Technologies Used

- **Frontend**: React.js
- **Backend**: Flask (Python)
- **Web Scraping**: BeautifulSoup4, Requests
- **CORS**: Flask-CORS for handling cross-origin requests

## 🛠️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Python 3.8+](https://www.python.org/)
- [pip](https://pip.pypa.io/en/stable/)

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/VIVEKVLS/Web_Scraper_App.git
   cd Web_Scraper_App
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
The frontend will be available at http://localhost:3000.

Backend Setup
Navigate to the backend directory:

bash
Copy code
cd path/to/backend/directory
Create a virtual environment:

bash
Copy code
python -m venv venv
Activate the virtual environment:

On Windows:

bash
Copy code
.\venv\Scripts\activate
On macOS/Linux:

bash
Copy code
source venv/bin/activate
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run the Flask application:

bash
Copy code
python app.py
The backend will be available at http://localhost:5000.

🧪 Usage
Open the frontend application in your browser.

Enter a URL in the input field.

Select the desired data type (News, Quotes, Weather).

Click the "Scrape" button to fetch the data.

View the extracted information displayed on the page.

⚠️ Notes
Ensure the backend server is running before initiating requests from the frontend.

The app supports scraping of static content. Dynamic content loaded via JavaScript may not be captured.

Respect website terms of service and scraping policies.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
