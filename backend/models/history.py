#!/bin/python
from sqlalchemy import DateTime

from exts import db

class History(db.Model):
    date = db.Column(DateTime, primary_key=True, unique=True)

    btc_quantity = db.Column(db.Float, unique=False)
    btc_price = db.Column(db.Float, unique=False)
    btc_current_value = db.Column(db.Float, unique=False)
    btc_buying_value = db.Column(db.Float, unique=False)
    btc_profit = db.Column(db.Float, unique=False)
    btc_profitper = db.Column(db.Float, unique=False)
    
    eth_quantity = db.Column(db.Float, unique=False)
    eth_price = db.Column(db.Float, unique=False)
    eth_current_value = db.Column(db.Float, unique=False)
    eth_buying_value = db.Column(db.Float, unique=False)
    eth_profit = db.Column(db.Float, unique=False)
    eth_profitper = db.Column(db.Float, unique=False)

    xrp_quantity = db.Column(db.Float, unique=False)
    xrp_price = db.Column(db.Float, unique=False)
    xrp_current_value = db.Column(db.Float, unique=False)
    xrp_buying_value = db.Column(db.Float, unique=False)
    xrp_profit = db.Column(db.Float, unique=False)
    xrp_profitper = db.Column(db.Float, unique=False)

    total_buying_value = db.Column(db.Float, unique=False)
    total_current_value = db.Column(db.Float, unique=False)
    total_profit = db.Column(db.Float, unique=False)
    total_profitper = db.Column(db.Float, unique=False)

    def __init__(self,date, btc_quantity, btc_price,btc_current_value, btc_buying_value, btc_profit, btc_profitper, eth_quantity, eth_price, eth_current_value, eth_buying_value, eth_profit, eth_profitper, xrp_quantity, xrp_price, xrp_current_value, xrp_buying_value, xrp_profit, xrp_profitper,  total_buying_value, total_current_value, total_profit, total_profitper):
        self.date = date

        self.btc_quantity = btc_quantity
        self.btc_price = btc_price
        self.btc_current_value = btc_current_value
        self.btc_buying_value = btc_buying_value
        self.btc_profit = btc_profit
        self.btc_profitper = btc_profitper
        
        self.eth_quantity = eth_quantity
        self.eth_price = eth_price
        self.eth_current_value = eth_current_value
        self.eth_buying_value = eth_buying_value
        self.eth_profit = eth_profit
        self.eth_profitper = eth_profitper

        self.xrp_quantity = xrp_quantity
        self.xrp_price = xrp_price
        self.xrp_current_value = xrp_current_value
        self.xrp_buying_value = xrp_buying_value
        self.xrp_profit = xrp_profit
        self.xrp_profitper = xrp_profitper

        self.total_buying_value = total_buying_value
        self.total_current_value = total_current_value
        self.total_profit = total_profit
        self.total_profitper = total_profitper


