# Maintenance Ticket Software
## Getting Started
These instructions will help you get your own local version up and running.

## Step by step installation instructions
### 1. Install [Node.js](https://nodejs.org) (node and npm)
### 2. Open Terminal/Command Prompt
### 3. Navigate to desired location and clone the repository
    ```bash
    $ git clone https://github.com/AustenBaker/Maintenance-Ticket-Software.git
    ```
    
### 4. Install dependencies
    ```bash
    $ cd ./project
    $ npm i
    ```
    
### 5. Start the server:
    ```bash
    $ cd ./Maintenance-Ticket-Software/project/
    $ npm run server  # This runs the backend server, listening to file changes
    ```
    
### 6. Open a new Terminal/Command Prompt and start the frontend client:
    ```bash
    $ cd ./Maintenance-Ticket-Software/project/client
    $ npm start  # This runs the frontend client (in the browser) listening to changes. Can run the app on mobile devices or run directly in the browser
    ```
Client app should pop up in a browser. You can run the app there directly

#### If using a mobile device:
Navigate to `./project/client/fetch`. Open the two files. On the first line, replace the code to: 
    ```js
    const PATH = 'http://<LAN_Address_Of_Your_Machine>:3001';  // http://192.168.1.100:3000, for example
    ```
This ensures proper client/server communication. If simulating locally in a browser, ignore this step.

## Run test suites and code coverage
Navigate to `./project/client`. Do:
    ```bash
    $ npm run test
    ```

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
