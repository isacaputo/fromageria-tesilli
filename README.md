# Fromageria Tesilli Online Store

Fromageria Tesilli is **an artisan cheese factory located at Belo Horizonte - Brazil**.
The Fromageria produces cured artisanal cheeses with semi-cooked dough, carefully crafted combining delicious ingredients with creativity.

## About the project

The project is built with the following stack of web development frameworks:

> **React** for the user interface;

> **Express** and **Node** for the server side / application layer;

> **MySQL** for the database.

The purpose of the webpage is to offer a digital channel for purchasing cheeses online. It displays the 20 products portfolio and offers a shopping cart and checkout process to the customers. The project also aims to provide the Fromageria with a well organized and centralized database.

## Client side

- **React Router** for the client side routing;
- **React Context** for sharing data across multiple components;
- **Vite** as a local development server for providing better performance for the web application;
- **MaterialUI** as the React component library.

_Color pallete_

- Primary:

  - main: "#549470"

- Secondary:

  - main: "#F5CB8B",

- Neutral:
  - contrastText: "#FFFFFF".

## Server

- **Sequelize** for the database migration mechanism;

## The Database Schema

> For the database visualization, please check "database_visualization.png" file located at the root of the project.

## Setup

### Dependencies

Run `npm install` in the project folder to install dependencies related to Express (the server).

`cd client` and run `npm install` to install dependencies related to React (the client).

### Database Prep

Create .env file in project directory and add

DB_NAME=fromageria

DB*PASS=\_YOUR_PASSWORD*

- Type `mysql -u root -p` to access the MySQL CLI using your password.
- In the MySQL CLI, type create database **fromageria**; to create a database in MySQL.
- Run the following in the MySQL CLI: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD'; (replace YOUR_PASSWORD with your actual password)
- Run `npm run migrate` in your TERMINAL, in the project folder to create the tables of te project.

## Run The Development Servers

Run `npm start` in project directory to start the Express server on port 4000
cd client and run npm run dev to start client server in development mode with hot reloading in port 5173.
Client is configured so all API calls will be proxied to port 4000 for a smoother development experience. Yay!
You can test your client app in http://localhost:5173
You can test your API in http://localhost:4000/api

**LET'S GET TO WORK**
