# Maintenance Ticket Software

## Step by step installation instructions

1. Install [Node.js](https://nodejs.org) (node and npm)

2. Open Terminal/Command Prompt

3. Navigate to desired location and clone the repository

`$ git clone https://github.com/AustenBaker/Maintenance-Ticket-Software.git`
    
4. Install dependencies

`$ cd ./project`

`$ npm i` 
    
5. Start the server:

`$ cd ./Maintenance-Ticket-Software/project/`

`$ npm run server  # This runs the backend server, listening to file changes`
    
6. Open a new Terminal/Command Prompt and start the frontend client:

`$ cd ./Maintenance-Ticket-Software/project/client` 

`$ npm start  # This runs the frontend client.`

Client app should pop up in a browser.

If using a mobile device:

Navigate to `./project/client/fetch`. Open the two files. On the first line, replace the code to:

`const PATH = 'http://<LAN_Address_Of_Your_Machine>:3001';  // http://192.168.1.100:3000, for example`

This ensures proper client/server communication. If simulating locally in a browser, ignore this step.

## Run test suites and code coverage

`$ cd ./project/client`

`$ npm run test`

## Team

* **Kelly V**
* **Harry Xue**
* **Kyle Schneider**
* **Austen Baker**
* **Kellie Stein**
* **Annalise Ho**

## Related Documentation

* [React Native](https://reactnative.dev/docs/getting-started)
* [React Navigation](https://reactnavigation.org/docs/getting-started)
* [Mobx](https://mobx.js.org/getting-started.html)
* [MongoDB Compass](https://www.mongodb.com/blog/post/getting-started-with-mongodb-compass)
* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com/en/starter/hello-world.html)

## License
This project is licensed under the MIT License - see [LICENSE.md](https://github.com/AustenBaker/Maintenance-Ticket-Software/blob/reversion-recovery/LICENSE.md) for more details
