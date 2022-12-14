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

    date = datetime.now()

    save = History(
        date,
        
        history['btc_price'],
        history['eth_price'], 
        history['xrp_price'], 

        history['btc_quantity'], 
        history['btc_current_value'], 
        history['btc_buying_value'],
        history['btc_profit'],
        history['btc_profitper'],

        history['eth_quantity'],
        history['eth_current_value'],
        history['eth_buying_value'],
        history['eth_profit'],
        history['eth_profitper'],

        history['xrp_quantity'],
        history['xrp_current_value'],
        history['xrp_buying_value'],
        history['xrp_profit'],
        history['xrp_profitper'],
        
        history['total_buying_value'],
        history['total_current_value'],
        history['total_profit'],
        history['total_profitper']
    )
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
    print(graph_id)

    return str(graph_id)

# Get plot

@routes.route(f"/api/history/plot/<id>", methods=['GET'])
def get_plot(id):
    image = f'./plot.{id}.png'
    return send_file(image)