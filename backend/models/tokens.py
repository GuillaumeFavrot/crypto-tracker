#!/bin/python

from exts import db

class Token(db.Model):
    abbreviation = db.Column(db.String(255), primary_key=True, unique=True)
    quantity = db.Column(db.Float, unique=False)
    buying_value = db.Column(db.Float, unique=False)

    def __init__(self, abbreviation, quantity, buying_value):
        self.abbreviation = abbreviation
        self.quantity = quantity
        self.buying_value = buying_value


