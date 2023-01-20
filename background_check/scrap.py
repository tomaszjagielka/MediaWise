import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    # Make a request to the website
    response = requests.get(url)
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    # Get all the text from the website
    text = soup.get_text()
    return text


url = "https://www.geeksforgeeks.org/"
scraped_text = scrape_website(url)
print(scraped_text)
