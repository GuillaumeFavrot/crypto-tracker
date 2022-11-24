#!/bin/python

from marshmallow import Schema, fields

# Message Schema

class HistorySchema(Schema):
    date = fields.DateTime()

    btc_quantity = fields.Float()
    btc_price = fields.Float()
    btc_current_value = fields.Float()
    btc_buying_value = fields.Float()
    btc_profit = fields.Float()
    btc_profitper = fields.Float()
    
    eth_quantity = fields.Float()
    eth_price = fields.Float()
    eth_current_value = fields.Float()
    eth_buying_value = fields.Float()
    eth_profit = fields.Float()
    eth_profitper = fields.Float()

    xrp_quantity = fields.Float()
    xrp_price = fields.Float()
    xrp_current_value = fields.Float()
    xrp_buying_value = fields.Float()
    xrp_profit = fields.Float()
    xrp_profitper = fields.Float()

    total_buying_value = fields.Float()
    total_current_value = fields.Float()
    total_profit = fields.Float()
    total_profitper = fields.Float()

# Schema initialization

history_schema = HistorySchema()
histories_schema = HistorySchema(many = True) 