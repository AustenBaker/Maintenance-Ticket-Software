## Maintenance Ticket Software

You can use the [editor on GitHub](https://github.com/AustenBaker/Maintenance-Ticket-Software/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

# Maintenance Ticket Software
## How to use
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
6. Open another terminal windows. In one window, do:
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
7. If you are running in a mobile device, be sure to navigate to `./project/client/fetch`. Open the two files. On the first line, replace the code to:
    ```js
    const PATH = 'http://<LAN_Address_Of_Your_Machine>:3001';  // http://192.168.1.100:3000, for example
    ```
    This ensures proper client/server communication. If simulating locally in a browser, ignore this step.

## Running test suites and code coverage
1. Navigate to `./project/client`. Do:
    ```bash
    $ npm run test
    ```


### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/AustenBaker/Maintenance-Ticket-Software/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
