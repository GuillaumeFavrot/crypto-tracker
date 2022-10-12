#!/bin/python

from marshmallow import Schema, fields

# Message Schema

class TokenSchema(Schema):
    abbreviation = fields.Str()
    quantity = fields.Float()
    buying_value = fields.Float()

# Schema initialization



token_schema = TokenSchema()
tokens_schema = TokenSchema(many = True) 