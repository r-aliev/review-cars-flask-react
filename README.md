# flaskReactSetup

Used React.js and Flask with REST API to build a small car search&sort app.
Database is connected to MySQL AWS to make it easy to test. SQLAlchemy is used.

Tried to implement docker&nginx, but failed to connect to api. So request to api doesn't work. To check the code go to tryNginxDocker branch. 
Unfortunately, too busy for now to fix it, as previewed.

## Installation
On backend: 

    cd backend

    python3 -m venv venv

    source venv/bin/activate

    pip install -r requirements.txt

    run app.py

And finally go to `localhost:5000/tasks`

On frontend:

    npm install
    npm start

And go to `localhost:3000`
