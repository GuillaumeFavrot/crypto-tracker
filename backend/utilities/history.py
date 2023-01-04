#The role of this file is to take the current wallet and the marketcap to build a complete wallet status overview and format it in a DB friendly format

from utilities.coinmarketcap_fetcher import get_market_cap

def compute_crypto_data(abbreviation, quantity, price, buying_value):

    abbr = abbreviation.lower()

    crypto = {
        f'{abbr}_quantity' : quantity,
        f'{abbr}_price' : price,
        f'{abbr}_buying_value' : buying_value,
        f'{abbr}_current_value' : 0,
        f'{abbr}_profit' : 0,
        f'{abbr}_profitper' : 0,
    }
    if quantity > 0 and buying_value > 0 :
        crypto[f'{abbr}_current_value'] = quantity * price
        crypto[f'{abbr}_profit'] = crypto[f'{abbr}_current_value'] - crypto[f'{abbr}_buying_value']
        crypto[f'{abbr}_profitper'] = round((crypto[f'{abbr}_current_value']/crypto[f'{abbr}_buying_value']-1)*100,2)

    return crypto

def get_history(wallet) :

    market_cap = get_market_cap()

    if len(wallet) < 3 : 
        for token in [token for token in ['BTC', 'ETH', 'XRP'] if token not in [crypto['abbreviation'] for crypto in wallet]]:
            new_token = {
                'abbreviation' : token,
                'quantity': 0,
                'buying_value': 0
            }
            wallet.append(new_token)


    history = {}
    for crypto in wallet :
        history = history | compute_crypto_data(crypto['abbreviation'], crypto['quantity'], market_cap[crypto['abbreviation']], crypto['buying_value'])
    
    
    total = {
        'total_buying_value':0,
        'total_current_value':0,
        'total_profit':0,
        'total_profitper':0
    }
    
    for y in [x for x in history if x.endswith('buying_value')]:
        total['total_buying_value'] += history[y]

    total['total_buying_value'] = round(total['total_buying_value'],2)

    for y in [x for x in history if x.endswith('current_value')]:
        total['total_current_value'] += history[y]

    total['total_current_value'] = round(total['total_current_value'],2)
    
    for y in [x for x in history if x.endswith('profit')]:
        total['total_profit'] += history[y]
    
    total['total_profit'] = round(total['total_profit'],2)

    total['total_profitper'] = round((total['total_current_value']/total['total_buying_value']-1)*100,2)

    history = history | total

    return history

