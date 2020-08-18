# Maintenance Ticket Software
## How to use
1. Have [Node.js](https://nodejs.org) installed (node and npm)

1. Open Terminal/Command Prompt

1. Navigate to desired location and clone the repository
    ```bash
    $ git clone https://github.com/AustenBaker/Maintenance-Ticket-Software.git
    ```
    
1. Install dependencies
    ```bash
    $ cd ./project
    $ npm i
    ```
    
1. Start the server:
    ```bash
    $ cd ./Maintenance-Ticket-Software/project/
    $ npm run server  # This runs the backend server, listening to file changes
    ```
    
1.  In a new Terminal/Command Prompt, start the frontend client:
    ```bash
    $ cd ./Maintenance-Ticket-Software/project/client
    $ npm start  # This runs the frontend client (in the browser) listening to changes. Can run the app on mobile devices or run directly in the browser
    ```
    Client app should pop up in a browser. You can run the app there directly
    
   <br/><br/>
    
If you are running in a mobile device, be sure to navigate to `./project/client/fetch`. Open the two files. On the first line, replace the code to:
    ```js
    const PATH = 'http://<LAN_Address_Of_Your_Machine>:3001';  // http://192.168.1.100:3000, for example
    ```
    This ensures proper client/server communication. If simulating locally in a browser, ignore this step.

## How to run test suites and code coverage
1. Navigate to `./Maintenance-Ticket-Software/project/client` and do:
    ```bash
    $ npm run test
    ```
    
## Related Documentation
[React Native](https://reactnative.dev/docs/getting-started)<br/><br/>
[React Navigation](https://reactnavigation.org/docs/getting-started)<br/><br/>
[Mobx](https://mobx.js.org/getting-started.html)<br/><br/>
[MongoDB Compass](https://www.mongodb.com/blog/post/getting-started-with-mongodb-compass)<br/><br/>
[Node.js](https://nodejs.org)<br/><br/>
[Express](https://expressjs.com/en/starter/hello-world.html)<br/><br/>
