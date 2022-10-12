#!/bin/python

from flask import Blueprint, send_from_directory, request
from exts import db

from models.tokens import Token
from schemas.tokenSchema import tokens_schema

import config

#Creation of the blueprint

routes = Blueprint('route', __name__)


# Main routes setup

# This route serves the frontend of the app

@routes.route("/")
def index():
    return send_from_directory(config.static_folder_path, 'index.html')


# CRUD routes

# Get wallet composition
@routes.route("/api/wallet", methods=['GET'])

def get_wallet():

    wallet = Token.query.all()

    return tokens_schema.dump(wallet)


# Update the wallet composition

@routes.route("/api/wallet", methods=['PUT'])

def update_wallet():

    data = request.json

    token = Token.query.get(data['token']) 

    if token :
        token.quantity = token.quantity + data['quantity']
        token.buying_value = token.buying_value + data['buying_value']
        db.session.commit()

    else :
        new_token = Token(data['token'], data['quantity'], data['buying_value'])
        db.session.add(new_token)
        db.session.commit()

    wallet = Token.query.all()

    return tokens_schema.dump(wallet)