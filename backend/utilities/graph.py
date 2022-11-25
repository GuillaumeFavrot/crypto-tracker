import matplotlib.pyplot as plot

import numpy as np

def update_graph(history):

    print(history)

    x = np.arange(0,len(history))

    y = np.zeros(len(history))

    for i, entry in enumerate(history) :
        y[i] = entry['total_profit']

    plot.plot(x, y)
    plot.savefig('../frontend/src/components/body/plot.png')