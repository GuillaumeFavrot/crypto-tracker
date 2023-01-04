import matplotlib.pyplot as plot
from datetime import datetime
import os

import numpy as np

##This line as be added in avoid thread issues
plot.switch_backend('agg')

def update_graph(history, req):
                                                                                                                                                                                                                          
    #The database data is converted into a numpy array in order to be easily manipulated
    dataframe = np.array(history)

    #The report request is parsed in order to select 
    
    #1) the right amount of data (ie: the period)
    days = 1
    if req['period'] == 'day' :
        days = 1
    elif req['period'] == 'week' :
        days = 7
    elif req['period'] == 'month' :
        days = 30
    elif req['period'] == 'all' :
        days = 99999999999
    
    #The initial dataframe is sliced in order to keep only the right number of entries
    data = dataframe[-6*24*days:] #The scheduler is set up to backup wallet data every 10 minutes so to get a full day of data you have to get 6*24 database entries. 

    #2) The right data
    request = f"{req['token']}_{req['report']}"

    #Creation of x and y arrays that will be passed on to matplotlib

    ##Definition of the x axis label
    x = []
    for i, entry in enumerate(data) :
        d = entry['date'].replace('-', ' ').replace(':', ' ').replace('T', ' ').split(' ')[:-1]
        date =''
        if days == 1 :
            date = '{}:{}'.format(d[3],d[4])
        else :
            date = '{}/{} {}:{}'.format(d[2],d[1],d[3],d[4])
        x.append(date)
    
    ###Definition of the step that will determine the number of x values that will be displayed
    step = 1
    x_label = ''
    if days == 1 :
        step = 6 #if daily stats are requested the graph will display hourly values
        x_label = 'Heures'
    elif days == 7 or days == 30 :
        step = 6*24 #if weekly or monthly stats are requested the graph will display daily values
        x_label = 'Jours'
    elif days == 99999999999 :
        step = 6*24*7 #if all data is requested the graph will display weekly values
        x_label = 'Semaines'
    
    ##Definition of Y values
    y = np.zeros(len(data))
    for i, entry in enumerate(data) :
        y[i] = entry[request]

    ##Definition of Y axis label

    y_label = ''
    if req['report'] == 'profit' :
        y_label = 'Profit (en euros)'
    elif req['report'] == 'profitper' :
        y_label = 'Profit (en %)'
    elif req['report'] == 'current_value' :
        y_label = 'Valeur portefeuille (en euros)'
    elif req['report'] == 'price' :
        y_label = 'Prix unitaire (en euros)'


    ##Definition of the title
    pronoun = 'du'
    if y_label == 'Valeur portefeuille (en euros)' :
        pronoun ='de la'

    section1 = 'portefeuille '
    if y_label == 'Prix unitaire (en euros)':
        section1 = ''
    
    pronoun2 = 'du ' 
    if req['token'] == 'eth' and y_label == 'Prix unitaire (en euros)':
        pronoun2 = "de l'"

    subject = ''
    if req['token'] == 'btc':
        subject = 'Bitcoin'
    elif req['token'] == 'eth':
        subject = 'Ethereum'
    elif req['token'] == 'xrp':
        subject = 'Ripple'
    elif req['token'] == 'total':
        subject = 'total'

    period = ''
    if req['period'] == 'day':
        period = 'au cours des dernières 24 heures'
    elif req['period'] == 'week':
        period = 'au cours de la dernière semaine'
    elif req['period'] == 'month':
        period = 'sur un mois'
    elif req['period'] == 'all':
        period = 'depuis la constitution du portefeuille'
    
    title = 'Evolution {} {} {}{}{} {}'.format(pronoun, y_label, pronoun2, section1, subject, period)
    
    #I clear the existing figure to prevent plots to stack on the figure 
    plot.clf()    
    
    #I apply general formatting on the plot
    fig = plot.figure()
    fig.set_facecolor("black")
    ax = plot.axes()
    ax.set_facecolor("black")
    ax.spines['bottom'].set_color('White')
    ax.spines['left'].set_color('White')
    ax.xaxis.label.set_color('White')
    ax.tick_params(axis='x', colors='white')
    ax.yaxis.label.set_color('White')
    ax.tick_params(axis='y', colors='white')

    #I draw the plot
    plot.plot(x, y)

    #I apply labels final formatting
    ##X formating
    plot.title(title, fontsize=14, color='white', wrap=True, pad=10)
    plot.xlabel(x_label, fontsize=14)
    plot.xticks(np.arange(0, len(x) + 1, step))
    plot.xticks(rotation=30)
    plot.xticks(size=6)
    ##Y Formatting
    plot.ylabel(y_label, fontsize=14)
    plot.tight_layout()
    plot.subplots_adjust(top=0.88)
    
    print(os.listdir())

    #I remove old plots 
    for old_plot in [plot for plot in os.listdir() if plot.startswith('plot')] :
        os.remove(old_plot)
    
    #I save the new figure using a unique Id
    id = str(datetime.now()).replace('-', '').replace(':', '').replace(' ','').split('.')[0]

    plot.savefig(f'./plot.{id}.png')

    return id
