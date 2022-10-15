from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
parameters = {
    'convert':'EUR',
    'id': '1,1027,52'
}
headers = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': '1e8ee20c-b827-4fd6-97d7-c4c8c9c3324f',
}

session = Session()
session.headers.update(headers)

result = {}

def get_market_cap():
    try:
        response = session.get(url, params=parameters)
        data = json.loads(response.text)['data']
        for crypto in data :
            result[data[crypto]['symbol']] = data[crypto]['quote']['EUR']['price'] 
    except (ConnectionError, Timeout, TooManyRedirects) as e:
        print(e)

    return result