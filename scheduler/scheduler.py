#!/bin/python

from pytz import utc
from apscheduler.schedulers.blocking import BlockingScheduler
import requests

#Backup wallet data every 2 minutes
def trigger_backup():
    url = 'http://127.0.0.1:8000/api/history/backup'
    requests.get(url = url)

scheduler = BlockingScheduler(timezone=utc)
scheduler.add_job(trigger_backup, 'interval', minutes=1)
    
try:
    scheduler.start()
except (KeyboardInterrupt, SystemExit):
    pass 