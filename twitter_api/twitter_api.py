import tweepy
import pandas
import configparser
import json
import re
import emoji
from collections import Counter
from nltk.corpus import stopwords
import nltk
import string
nltk.download('stopwords')


config = configparser.ConfigParser()
config.read('config.ini')


api_key = config['twitter']['api_key']
api_key_secret = config['twitter']['api_key_secret']

acces_token = config['twitter']['acces_token']
acces_token_secret = config['twitter']['acces_token_secret']


# Authentication
auth = tweepy.OAuthHandler(api_key, api_key_secret)
auth.set_access_token(acces_token, acces_token_secret)

api = tweepy.API(auth)

    
# Certain user tweets
user = 'BarackObama'
limit = 100

tweets = api.user_timeline(screen_name=user, 
                           count=limit,
                           tweet_mode='extended')

    
# Data cleaning
""" to do
1. Remove emojis
2. Remove links
3. Remove useless symbols -#$*!@#*&O!@*$() etc
4. lower case words
"""

def remove_emojis(text):
    return emoji.demojize(text).replace(':','')

def remove_links(text):
    link_pattern = re.compile(r'http\S+|www.\S+')
    return link_pattern.sub(r'', text)

def remove_symbols(text):
    symbol_pattern = re.compile('[!@#$%^&*()]')
    return symbol_pattern.sub(r'', text)

def lower_case(text):
    return text.lower()

tweet_list = []
for tweet in tweets:
    input = remove_links(tweet.full_text)
    input = remove_emojis(input)
    input = remove_symbols(input)
    input = lower_case(input)
    tweet_list.append(input)
    
    
def most_common_words(text_list, n=10, language='english'):
    # join all the strings in the list
    text = ' '.join(text_list)
    # split the text into words
    words = text.split()
    # remove punctuation
    words = [word.translate(str.maketrans('', '', string.punctuation)) for word in words]
    # remove stopwords
    stop_words = set(stopwords.words(language))
    words = [word for word in words if word.lower() not in stop_words]
    # get the most common words
    most_common = Counter(words).most_common(n)
    return most_common

print(most_common_words(tweet_list))