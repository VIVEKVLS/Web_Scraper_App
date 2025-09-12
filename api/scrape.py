from flask import Blueprint, request, jsonify
from .web_scraper import WebScraper   # Move your WebScraper class into web_scraper.py for clarity
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

scrape_bp = Blueprint("scrape", __name__)
scraper = WebScraper()

@scrape_bp.route("/scrape", methods=["POST"])
def scrape_data():
    try:
        data = request.get_json() or {}
        url = data.get("url")
        data_type = data.get("dataType", "general")
        user_id = data.get("userId")

        if not url:
            return jsonify({"error": "URL is required"}), 400

        logger.info(f"Scraping {data_type} from {url} for user {user_id}")

        if not url.startswith(("http://", "https://")):
            url = "https://" + url

        if data_type == "news":
            scraped_data = scraper.scrape_news(url)
        elif data_type == "quotes":
            scraped_data = scraper.scrape_quotes(url)
        elif data_type == "weather":
            scraped_data = scraper.scrape_weather(url)
        else:
            scraped_data = scraper.scrape_general(url)

        if not scraped_data:
            return jsonify({"error": "No data found."}), 404

        logger.info(f"Successfully scraped {len(scraped_data)} items from {url}")
        return jsonify(scraped_data)
    except Exception as e:
        logger.exception("Error in scraping endpoint:")
        return jsonify({"error": str(e)}), 500
