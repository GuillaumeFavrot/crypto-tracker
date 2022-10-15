from utilities.coinmarketcap_fetcher import get_market_cap

def get_analysis(wallet) :

    market_cap = get_market_cap()

    total = {
        'abbreviation': 'TOT',
        'buying_value': 0,
        'current_value': 0,
        'profit': 0,
        'profitper': 0
    }

    for crypto in wallet :
        #Per crypto analysis
        crypto['current_value'] = round(crypto['quantity'] * market_cap[crypto['abbreviation']],2)
        crypto['profit'] = round(crypto['current_value'] - crypto['buying_value'],2)
        crypto['profitper'] = round((crypto['current_value']/crypto['buying_value']-1)*100,2)
        
        #Total wallet analysis
        total['buying_value'] += crypto['buying_value']
        total['buying_value'] = round(total['buying_value'],2)

        total['current_value'] += crypto['current_value']
        total['current_value'] = round(total['current_value'],2)

        total['profit'] += crypto['profit']
        total['profit'] = round(total['profit'],2)

        total['profitper'] = (total['current_value']/total['buying_value']-1)*100
        total['profitper'] = round(total['profitper'],2)
    
    analyzed_wallet = {
        'wallet' : wallet,
        'total' : total
    }

    return analyzed_wallet

