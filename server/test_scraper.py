#!/usr/bin/env python3
"""
Test script for the web scraper functionality
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import WebScraper

def test_scraper():
    """Test the web scraper with a simple website"""
    print("🧪 Testing Web Scraper...")

    scraper = WebScraper()

    # Test URLs with associated data types
    test_sites = [
        ("https://www.bbc.com", "news"),        # For news scraping test
        ("https://quotes.toscrape.com", "quotes"),  # For quotes
        ("https://www.weather.com", "weather")  # For weather data
    ]

    for url, data_type in test_sites:
        print(f"\n📡 Testing: {url} with data type '{data_type}'")
        try:
            if data_type == "news":
                data = scraper.scrape_news(url)
            elif data_type == "quotes":
                data = scraper.scrape_quotes(url)
            elif data_type == "weather":
                data = scraper.scrape_weather(url)
            else:
                data = scraper.scrape_general(url)

            print(f"✅ Scraped {len(data)} items")

            if data:
                print("📄 Sample data:")
                for i, item in enumerate(data[:2]):  # Show first 2 items
                    print(f"  {i+1}. {item['title'][:50]}...")

        except Exception as e:
            print(f"❌ Error: {e}")

    print("\n🎉 Test completed!")

if __name__ == "__main__":
    test_scraper()
