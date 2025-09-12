import requests
from bs4 import BeautifulSoup
import time
import random
from urllib.parse import urljoin, urlparse
from fake_useragent import UserAgent
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Initialize User-Agent
try:
    ua = UserAgent()
except Exception:
    ua = None

class WebScraper:
    def __init__(self):
        self.session = requests.Session()
        user_agent = ua.random if ua else (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
        )
        self.session.headers.update({
            "User-Agent": user_agent,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
        })
        self.user_agent = user_agent

    def check_robots_txt(self, url):
        # For simplicity, skipping robots.txt check
        logger.info(f"Robots.txt check bypassed for {url}")
        return True

    def scrape_news(self, url):
        try:
            if not self.check_robots_txt(url): return []
            time.sleep(random.uniform(1,2))
            res = self.session.get(url, timeout=10)
            res.raise_for_status()
            soup = BeautifulSoup(res.content, "html.parser")
            articles = []
            selectors = ["h1","h2","h3",".headline",".title","article h1","article h2"]
            for sel in selectors:
                for el in soup.select(sel)[:10]:
                    text = el.get_text(strip=True)
                    if text and 10 < len(text) < 200:
                        link = el.find_parent("a")
                        url_link = urljoin(url, link.get("href")) if link else url
                        articles.append({
                            "title": text,
                            "content": text,
                            "url": url_link,
                            "source": urlparse(url).netloc,
                            "type": "news",
                            "timestamp": datetime.now().isoformat()
                        })
                if articles: break
            return articles[:10]
        except Exception as e:
            logger.exception(f"Error scraping news from {url}: {e}")
            return []

    def scrape_quotes(self, url):
        try:
            if not self.check_robots_txt(url): return []
            time.sleep(random.uniform(1,2))
            res = self.session.get(url, timeout=10)
            res.raise_for_status()
            soup = BeautifulSoup(res.content, "html.parser")
            quotes = []
            selectors = [".quote","blockquote",".quotation",".quote-text"]
            for sel in selectors:
                for el in soup.select(sel)[:10]:
                    text = el.get_text(strip=True)
                    if text and 20 < len(text) < 500:
                        author_el = el.find_next_sibling() or el.find_parent().find(class_="author")
                        author = author_el.get_text(strip=True) if author_el else "Unknown"
                        quotes.append({
                            "title": f"Quote by {author}",
                            "content": text,
                            "url": url,
                            "source": urlparse(url).netloc,
                            "type": "quotes",
                            "timestamp": datetime.now().isoformat()
                        })
                if quotes: break
            return quotes[:10]
        except Exception as e:
            logger.exception(f"Error scraping quotes from {url}: {e}")
            return []

    def scrape_weather(self, url):
        try:
            if not self.check_robots_txt(url): return []
            time.sleep(random.uniform(1,2))
            res = self.session.get(url, timeout=10)
            res.raise_for_status()
            soup = BeautifulSoup(res.content, "html.parser")
            weather = []
            selectors = [".temperature",".temp",".weather-temp",".weather-info"]
            for sel in selectors:
                for el in soup.select(sel)[:5]:
                    text = el.get_text(strip=True)
                    if text and len(text) > 5:
                        weather.append({
                            "title":"Weather Info",
                            "content": text,
                            "url": url,
                            "source": urlparse(url).netloc,
                            "type":"weather",
                            "timestamp": datetime.now().isoformat()
                        })
                if weather: break
            return weather[:5]
        except Exception as e:
            logger.exception(f"Error scraping weather from {url}: {e}")
            return []

    def scrape_general(self, url):
        try:
            if not self.check_robots_txt(url): return []
            time.sleep(random.uniform(1,2))
            res = self.session.get(url, timeout=10)
            res.raise_for_status()
            soup = BeautifulSoup(res.content, "html.parser")
            for s in soup(["script","style"]): s.decompose()
            content_items = []
            main_sel = ["main","article",".content",".post-content"]
            main = None
            for sel in main_sel:
                main = soup.select_one(sel)
                if main: break   //hi 
            if not main: main = soup
            for el in main.find_all(["p","h1","h2","h3","h4","h5","h6"])[:15]:
                text = el.get_text(strip=True)
                if text and 20 < len(text) < 300:
                    content_items.append({
                        "title": el.name.upper() if el.name.startswith("h") else "Content",
                        "content": text,
                        "url": url,
                        "source": urlparse(url).netloc,
                        "type":"general",
                        "timestamp": datetime.now().isoformat()
                    })
            return content_items[:10]
        except Exception as e:
            logger.exception(f"Error scraping general content from {url}: {e}")
            return []
