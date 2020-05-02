# Maintenance Ticket Software
## How to use
1. Have [Node.js](https://nodejs.org) installed (node and npm)
1. Clone the repository
    ```bash
    $ git clone https://github.com/AustenBaker/Maintenance-Ticket-Software.git
    ```
1. Navigate to `project/server` directory, create a file named `settings.json`. Or from project root: 
    ```bash
    $ touch ./project/server/settings.json
    ```
1. Edit `settings.json` with the following content
    ```json
    {
        "PORT": 3001,
        "secure": false
    }
    ```
1. Install all dependencies
    ```bash
    $ cd ./project
    $ npm i

    ### If you are using windows, do the following too, just in case client dependencies are not being installed for some windows machines ###
    $ cd client
    $ npm i
    ```
1. Open another terminal windows. In one window, do:
    ```bash
    $ cd ./project
    $ npm run server  # This runs the backend server, listening to file changes
    ```
    In another window, do:
    ```bash
    $ cd ./project/client
    $ npm start  # This runs the frontend client (in the browser) listening to changes. Can run the app on mobile devices or run directly in the browser
    ```
    Client app should pop up in a browser. You can run the app there directly
1. If you are running in a mobile device, be sure to navigate to `./project/client/fetch`. Open the two files. On the first line, replace the code to:
    ```js
    const PATH = 'http://<LAN_Address_Of_Your_Machine>:3001';  // http://192.168.1.100:3000, for example
    ```
    This ensures proper client/server communication. If simulating locally in a browser, ignore this step.

## Running test suites and code coverage
1. Navigate to `./project/client`. Do:
    ```bash
    $ npm run test
    ```
