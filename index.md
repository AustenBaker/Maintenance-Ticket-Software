# Maintenance Ticket Software
## Getting Started
These instructions will help you get your own local version up and running.

### Installing
1. Have [Node.js](https://nodejs.org) installed (node and npm)
2. Clone the repository
    ```bash
    $ git clone https://github.com/AustenBaker/Maintenance-Ticket-Software.git
    ```
3. Navigate to `project/server` directory, create a file named `settings.json`. Or from project root: 
    ```bash
    $ touch ./project/server/settings.json
    ```
4. Edit `settings.json` with the following content
    ```json
    {
        "PORT": 3001,
        "secure": false
    }
    ```
5. Install all dependencies
    ```bash
    $ cd ./project
    $ npm i

    ### If you are using windows, do the following too, just in case client dependencies are not being installed for some windows machines ###
    $ cd client
    $ npm i
    ```
    
### Desktop Usage
After installing the project: 
1. Open a terminal window and do:
    ```bash
    $ cd ./project
    $ npm run server  # This runs the backend server, listening to file changes
    ```
2. Open another window and do:
    ```bash
    $ cd ./project/client
    $ npm start  # This runs the frontend client (in the browser) listening to changes. Can run the app on mobile devices or run directly in the browser
    ```
    The app client should pop up in a browser. You can run the app there directly
    
### Mobile Usage
If using a mobile device: 
1.  Navigate to `./project/client/fetch`. Open the two files. On the first line, replace the code to:
    ```js
    const PATH = 'http://<LAN_Address_Of_Your_Machine>:3001';  // http://192.168.1.100:3000, for example
    ```
    This ensures proper client/server communication. If simulating locally in a browser, ignore this step.

### Running test suites and code coverage
1. Navigate to `./project/client`. Do:
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

## License
This project is licensed under the MIT License - see [LICENSE.md](https://github.com/AustenBaker/Maintenance-Ticket-Software/blob/reversion-recovery/LICENSE.md) for more details
