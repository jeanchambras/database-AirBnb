# Database Project : Airbnb

## Description of the project

The goal of this project was to design a database schema, parse and clean the data given (an Airbnb dataset), load the data into the database, write and optimize queries and implement an interface to interact with the dataset dynamically.

- Web interface (React, Js, Sass)
- Server NodeJS (Express, OracleDb)
- Oracle database (SQL)

## Table of Contents

- [Setup](#Setup)
    - [Install client](#Install-client)
    - [Install server](#Install-server)
    - [Start & watch client](#Start-&-watch-client)
    - [Start server](#Start-server)
    - [Simple build for production](#Simple-build-for-production)

## Setup
The database is an Oracle database located inside the EPFL network.

### Install client

We need to download all depedencies:

    $ cd database-airbnb/client
    $ npm install

### Install server
We need to download all depedencies:

    $ cd database-airbnb/server
    $ npm install

### Start & watch client

Start the web app in your browser:

    $ cd  database-airbnb/client
    $ npm start

### Start server

Start the server in another terminal:

    $ cd database-airbnb/server
    $ node server.js

### Simple build for production

    $ cd  database-airbnb/client
    $ npm run build

