# CRYPTO TRACKER

# SETUP PROCEDURE

This setup procedure is suitable for a freshly cloned folder (from git) on a fresh machine.

REQUIREMENTS :

=> PYTHON 3.10.4 OR LATER ;

=> NODE.JS 16.XX.X OR LATER ;

=> NPM 8.15.0 OR LATER ;

All other required packages and dependencies will be installed during the setup process. You'll find the full list of required packages in the requirement.txt and package.json files.



# A - DEV Environement setup

Upon downloading of this app the first step is to ensure the correct environment is set up.


A.1 - Flask environement setup

It is highly recommended to use this app in a virtual environement to ensure a proper python dependency management :

=> Go in the main app directory and run the command :

$ pip3 install pipenv       (if not already installed)

$ pipenv shell

=>Then all the packages the project needs to work have to be installed. The list of theses packages resides in the requirement.txt file (or Pifile see note). To install all packages from the requirement.txt file use the command :

$ pipenv install -r ./requirements.txt


A.2 - Javascript environement setup

All javascript dependencies are listed in the package.json file in the frontend folder.

=>To install all javascript dependencies, navigate to the frontend directory and run the command :
    
$ npm install

This command will install all dependencies listed in the package.json file



# B - Launching the developpement environement

Both Django and React have their own develpmentevironement that need to be launched in order tu run the code.


B.1 - Flask

=> (Option 1) Flask developement server 

To launch the Flask web server be sure to have the virtual environment up and running then naviguate in the backend directory and use the command :

$ python3 app.py

This command will launch the python server that will be avaiblable at the following address (local) : 127.0.0.1:5000

In this template Flask is configured to serve the React app on the root address however this features requires to generate a live build. Without a live build the root adress (127.0.0.1:8000) leads to nothing.

=> (Option 2) Gunicorn production server  

Although gunicorn will be used as a production server it is possible to use it instead of the stock Flask dev server.

To launch the gunicorn server for production use the following command in the backend directory of the app :

$ gunicorn wsgi:app --bind 0.0.0.0:8000


B.2 - React

To launch the react devlopment environment simply use the following command in the frontend directory :

npm start

The React development environement has it's own webserver accessible at the address :

localhost:3000

# Running the app as a container

# A. Creating a react live build

=> The first step requires to naviguate with the console in the frontend directory and run the command :

$ npm install
$ npm run build

This command will bundle all the react code into static files and store them into a "build" folder in the root  directory.

The Flask app is setup to serve the index.html file and all other static file from the build folder on its root address.

# B. Creating a .env file

If this app is meant to be run on a server instead of a local machine it needs a .env file with the server ip adress to run properly.

Naviguate in the frontend folder of the app, create a file named .env and insert :
    REACT_APP_PROD_IP=YOUR_IP_ADDRESS

This will allow the frontend to know where to look for the graph.

# C. Creating the DB

/ ! \ You need all python packages installed to initialize the db. A working virtual env is advised. Please follow the "Dev env setup" of this readme / ! \

Naviguate in the backend folder and run the following command :

$ python3 db_init.py


# D. Building and running the image

The app is composed of three containers. The main app container and the nginx container and a scheduler that calls regularly an API endpoint to trigger a DB backup. To launch all containers concurrently use the following command :

$ docker-compose up -d -- build

To bring the app down use this command :

$ docker-compose down
