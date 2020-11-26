# README for Chatterbox App

![alt text](welcomescreen.jpg)
          
## Description 
              
This application is a chat application which allows users to sign up and chat with other users.  The app utilises an Model, View, Controller (MVC) structure and uses Socket.IO, MySQL, Sequelize, Express and Handlebars .
        
## Table of Contents
* Title
* Description
* Installation
* Useage
* License
* Contributing
* Tests
* Questions

    
## Installation
To install this application, the user runs the “server.js file in Node (or when deployed uses the app through the html interface). The server establishes the port on 3600 and requires express, which is used to run the server, drawing on the files in the “public directory”. The public directory holds the JS functions (xxx.js) and the CSS. The app is then based around the “Model, View, Controller” structure. The user.js, chat.js and index.js files are held in the model folder and they provide the models for user and chat, and construct the database queries. The “Views” part of the app consists of three handlebars files which provide the front-end templates. Finally, the “Controller” is represented by the routes files (api routes and html routes), which are responsible for creating all of the routes for the server to use, including get, post and put functions. The back-end database is a MySQL database (chatterbox). 

The below directory structure highlights the “MVC” nature of this application:

```
.
├── config
│   ├── config.json
│   └── passport.js
│   └── middleware
│       └── isAuthenticated.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── chat.js
│   └── index.js
│   └── user.js
│   └── user_login.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│           └── chat.css
│           └── style.css
│           └── welcome.css
│       └── images
│   └── html
│       ├── chat.html
│       ├── home.html
│       ├── index.html
│       ├── roomchat.html
│       ├── welcome.html
│
│   └── js
│       ├── main.js
│   
│
├── utils
│   └── message.js
│   └── users.js
│
│
├── server.js
│
└── views
    ├── index.handlebars
    ├── public_chat.handlebars
    └── layouts
        └── main.handlebars
```

## Usage 
“Chatterbox” is a chat app that lets users chat in public or private rooms, in real-time.  The app stores user and their chat in a database. The application requires several node packages: Socket.IO, Express, MySQL and Handlebars.  

Once the app has been launched, the user is presented with the home screen, where the user has the option of logging in (if they are already a member) or signing up:

![alt text](homescreen.jpg)

If they login, they are directed to the chat page:

![alt text](chatscreen.jpg)

Members are able to chat to each other, in real-time, utilising the Socket.IO package. Code relevant to the Socket.IO package is included on the server (server.js) for the server-side functionality, and in the main.js client-side script. 



## Credits
This project was completed by RJ Wright, Sarah Brand, Annisa Purbandari and Andrew Middleton (Project Group 7). The project relied heavily on Socket.IO and the other node packages mentioned above. The group sought advice from our class instructors (Jack, Sandes and Ali), who we would like to thank for their assistance during our project sessions.

## License
MIT

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributing
Should others wish to contribute to this application, we thank them for their interest and request that they use the standards found at the Contributor Covenant
Note: the [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard

## Tests
There were no tests developed for this application.

## Questions
Please direct questions to the Project 7 Team:

rjwrightme, https://github.com/rjwrightme
brandpower, https://github.com/brandpower
annisapf, https://github.com/annisapf
Andrewmiddleton1, https://github.com/andrewmiddleton1
