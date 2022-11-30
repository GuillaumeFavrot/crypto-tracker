#!/bin/python

from flask import Blueprint, send_from_directory, request, send_file
from datetime import datetime

from exts import db


from models.tokens import Token
from models.history import History
from schemas.tokenSchema import tokens_schema
from schemas.historySchema import histories_schema

from utilities.analysis import get_analysis
from utilities.history import get_history
from utilities.price import token_price
from utilities.graph import update_graph

import config

#Creation of the blueprint

routes = Blueprint('route', __name__)
graph_id = ''

# Main routes setup

# This route serves the frontend of the app

@routes.route("/")
def index():
    return send_from_directory(config.static_folder_path, 'index.html')


####### CRUD routes

# Get wallet composition
@routes.route("/api/wallet", methods=['GET'])
def get_wallet():
    wallet = Token.query.all()
    return get_analysis(tokens_schema.dump(wallet)
)

# Update the wallet composition

@routes.route("/api/wallet", methods=['PUT'])

def update_wallet():

    data = request.json

    token = Token.query.get(data['token'])

    if data['quantity'] > 0 :
        if token :
            token.quantity = token.quantity + data['quantity']
            token.buying_value = token.buying_value + data['buying_value']
            db.session.commit()

        else :
            new_token = Token(data['token'], data['quantity'], data['buying_value'])
            db.session.add(new_token)
            db.session.commit()
    else :
        token.quantity = token.quantity + data['quantity']
        token.buying_value = token.buying_value + data['quantity'] * token_price(token.abbreviation)
        db.session.commit()


    wallet = Token.query.all()

    return get_analysis(tokens_schema.dump(wallet))

####### Wallet data history route

# Wallet data backup

@routes.route("/api/history/backup", methods=['GET'])
def backup_wallet_data():

    wallet = Token.query.all()
    
    history = get_history(tokens_schema.dump(wallet))

    btc_quantity = history['btc_quantity']
    btc_price = history['btc_price']
    btc_current_value = history['btc_current_value']
    btc_buying_value = history['btc_buying_value']
    btc_profit = history['btc_profit']
    btc_profitper = history['btc_profitper']
    eth_quantity = history['eth_quantity']
    eth_price = history['eth_price']
    eth_current_value = history['eth_current_value']
    eth_buying_value = history['eth_buying_value']
    eth_profit = history['eth_profit']
    eth_profitper = history['eth_profitper']
    xrp_quantity = history['xrp_quantity']
    xrp_price = history['xrp_price']
    xrp_current_value = history['xrp_current_value']
    xrp_buying_value = history['xrp_buying_value']
    xrp_profit = history['xrp_profit']
    xrp_profitper = history['xrp_profitper']
    total_buying_value = history['total_buying_value']
    total_current_value = history['total_current_value']
    total_profit = history['total_profit']
    total_profitper = history['total_profitper']

    date = datetime.now()

    save = History(date, btc_quantity, btc_price,btc_current_value, btc_buying_value, btc_profit, btc_profitper, eth_quantity, eth_price, eth_current_value, eth_buying_value, eth_profit, eth_profitper, xrp_quantity, xrp_price, xrp_current_value, xrp_buying_value, xrp_profit, xrp_profitper, total_buying_value, total_current_value, total_profit, total_profitper)
    db.session.add(save)
    db.session.commit()

    response = 'data backed up'

    return response

# Get wallet history

@routes.route("/api/history/get", methods=['POST'])
def get_wallet_history():

    req = request.json

    data = History.query.all()
    graph_id = str(update_graph(histories_schema.dump(data), req))

    return str(graph_id)

# Get plot

@routes.route(f"/api/history/plot/<id>", methods=['GET'])
def get_plot(id):
    print(id)

    image = f'./plot.{id}.png'
    return send_file(image)