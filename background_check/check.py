from googlesearch import search
import requests
from bs4 import BeautifulSoup



def check_substring(main_string, substring):
    if substring in main_string:
        return True
    else:
        return False

def scrape_website(url):
    # Make a request to the website
    response = requests.get(url)
    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')
    # Find certain region of text
    element = soup.select_one('html > body > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(5) > div:nth-of-type(1) > p:nth-of-type(1)')
    text = element.get_text()
    return text


def check_author(name: str):
    urls = search(name, tld="co.in", num=10, stop=10, pause=2)
    url_to_check = ""
    for url in urls:
        if check_substring(url, "wikipedia") == True:
            url_to_check = url
            break
    scraped_text = scrape_website(url_to_check)
    return scraped_text
