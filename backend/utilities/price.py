from utilities.coinmarketcap_fetcher import get_market_cap

def token_price(abbreviation) :

    market_cap = get_market_cap()

    return market_cap[abbreviation]