from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import time
import random
from urllib.parse import urljoin, urlparse
from fake_useragent import UserAgent
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# CORS: restrict to your frontend domain if known, else allow all for now
# Set FRONTEND_ORIGIN as an env var in Vercel for stricter control
import os
frontend_origin = os.getenv("FRONTEND_ORIGIN", "*")
if frontend_origin == "*":
    CORS(app, resources={r"/api/*": {"origins": "*"}})
else:
    CORS(app, resources={r"/api/*": {"origins": frontend_origin}}, supports_credentials=True)


# Initialize User-Agent generator
ua = UserAgent()


class WebScraper:
    def __init__(self):
        self.session = requests.Session()
        user_agent = ua.random
        self.session.headers.update({
            'User-Agent': user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        })
        self.user_agent = user_agent

    def check_robots_txt(self, url):
        # Completely disable robots.txt check for testing purposes
        logger.info(f"Robots.txt check bypassed for {url}")
        return True

    def scrape_news(self, url):
        try:
            if not self.check_robots_txt(url):
                return []

            time.sleep(random.uniform(1, 3))

            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = []

            selectors = [
                'h1', 'h2', 'h3',
                '.headline', '.title', '.article-title',
                '[class*="headline"]', '[class*="title"]',
                'article h1', 'article h2', 'article h3'
            ]

            for selector in selectors:
                elements = soup.select(selector)
                for element in elements[:10]:
                    text = element.get_text(strip=True)
                    if text and 10 < len(text) < 200:
                        link = element.find_parent('a')
                        article_url = urljoin(url, link.get('href')) if link else url
                        articles.append({
                            'title': text,
                            'content': text,
                            'url': article_url,
                            'source': urlparse(url).netloc,
                            'type': 'news',
                            'timestamp': datetime.now().isoformat()
                        })
                if articles:
                    break

            return articles[:10]

        except Exception as e:
            logger.error(f"Error scraping news from {url}: {e}")
            return []

    def scrape_quotes(self, url):
        try:
            if not self.check_robots_txt(url):
                return []

            time.sleep(random.uniform(1, 3))

            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            quotes = []

            selectors = [
                '.quote', '.quotation', '.quote-text',
                'blockquote', '[class*="quote"]',
                '.quote-content', '.quote-body'
            ]

            for selector in selectors:
                elements = soup.select(selector)
                for element in elements[:10]:
                    text = element.get_text(strip=True)
                    if text and 20 < len(text) < 500:
                        author_element = element.find_next_sibling() or element.find_parent().find(class_='author')
                        author = author_element.get_text(strip=True) if author_element else 'Unknown'

                        quotes.append({
                            'title': f'Quote by {author}',
                            'content': text,
                            'url': url,
                            'source': urlparse(url).netloc,
                            'type': 'quotes',
                            'timestamp': datetime.now().isoformat()
                        })
                if quotes:
                    break

            return quotes[:10]

        except Exception as e:
            logger.error(f"Error scraping quotes from {url}: {e}")
            return []

    def scrape_weather(self, url):
        try:
            if not self.check_robots_txt(url):
                return []

            time.sleep(random.uniform(1, 3))

            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            weather_data = []

            selectors = [
                '.temperature', '.temp', '.weather-temp',
                '.weather-info', '.weather-details',
                '[class*="temperature"]', '[class*="weather"]'
            ]

            for selector in selectors:
                elements = soup.select(selector)
                for element in elements[:5]:
                    text = element.get_text(strip=True)
                    if text and len(text) > 5:
                        weather_data.append({
                            'title': 'Weather Information',
                            'content': text,
                            'url': url,
                            'source': urlparse(url).netloc,
                            'type': 'weather',
                            'timestamp': datetime.now().isoformat()
                        })
                if weather_data:
                    break

            return weather_data[:5]

        except Exception as e:
            logger.error(f"Error scraping weather from {url}: {e}")
            return []

    def scrape_general(self, url):
        try:
            if not self.check_robots_txt(url):
                return []

            time.sleep(random.uniform(1, 3))

            response = self.session.get(url, timeout=15)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            content_items = []

            for script in soup(["script", "style"]):
                script.decompose()

            main_selectors = [
                'main', 'article', '.content', '.main-content',
                '.post-content', '.entry-content', '.article-content'
            ]

            main_content = None
            for selector in main_selectors:
                main_content = soup.select_one(selector)
                if main_content:
                    break

            if not main_content:
                main_content = soup

            elements = main_content.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

            for element in elements[:15]:
                text = element.get_text(strip=True)
                if text and 20 < len(text) < 300:
                    content_items.append({
                        'title': element.name.upper() if element.name.startswith('h') else 'Content',
                        'content': text,
                        'url': url,
                        'source': urlparse(url).netloc,
                        'type': 'general',
                        'timestamp': datetime.now().isoformat()
                    })

            return content_items[:10]

        except Exception as e:
            logger.error(f"Error scraping general content from {url}: {e}")
            return []


# Initialize scraper instance
scraper = WebScraper()


@app.route('/api/scrape', methods=['POST'])
def scrape_data():
    try:
        data = request.get_json() or {}
        url = data.get('url')
        data_type = data.get('dataType', 'general')
        user_id = data.get('userId')

        if not url:
            return jsonify({'error': 'URL is required'}), 400

        logger.info(f"Scraping {data_type} from {url} for user {user_id}")

        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url

        if data_type == 'news':
            scraped_data = scraper.scrape_news(url)
        elif data_type == 'quotes':
            scraped_data = scraper.scrape_quotes(url)
        elif data_type == 'weather':
            scraped_data = scraper.scrape_weather(url)
        else:
            scraped_data = scraper.scrape_general(url)

        if not scraped_data:
            return jsonify({'error': 'No data found. The website might be blocking requests or the content selectors need adjustment.'}), 404

        logger.info(f"Successfully scraped {len(scraped_data)} items from {url}")
        return jsonify(scraped_data)

    except Exception as e:
        logger.error(f"Error in scraping endpoint: {e}")
        return jsonify({'error': 'Internal server error'}), 500


# Vercel detects the WSGI app via the 'app' module-level variable.



