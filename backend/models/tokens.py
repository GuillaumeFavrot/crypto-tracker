#!/bin/python

from exts import db

class Token(db.Model):
    name = db.Column(db.String(255), primary_key=True, unique=True)
    quantity = db.Column(db.float, unique=False)
    buying_value = db.Column(db.float, unique=False)

    def __init__(self, name, quantity, buying_value):
        self.name = name
        self.quantity = quantity
        self.buying_value = buying_value