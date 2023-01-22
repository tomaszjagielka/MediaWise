from googlesearch import search
import requests
from bs4 import BeautifulSoup

 
# to search
query = "Andrzej Duda"
first_url = next(search(query, tld="co.in", num=10, stop=10, pause=2))


def scrape_website(url):
    # Make a request to the website
    response = requests.get(url)
    # Parse the HTML content
    soup = BeautifulSoup(response.text, 'html.parser')
    # Get all the text from the website
    text = soup.get_text()
    return text


scraped_text = scrape_website(first_url)
print(scraped_text)

