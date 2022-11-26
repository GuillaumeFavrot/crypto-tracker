import matplotlib.pyplot as plot

import numpy as np

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
    x = np.arange(0,len(data))
    y = np.zeros(len(data))
    for i, entry in enumerate(data) :
        y[i] = entry[request]

    #I clear the existing figure to prevent plots to stack on the figure 
    plot.clf()
    #The plot is drawn
    plot.plot(x, y)
    #The figure is saved
    plot.savefig('../frontend/src/components/body/plot.png')