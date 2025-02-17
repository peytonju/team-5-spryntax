### Developer Documentation

#### Obtaining source code

Git clone on our project repository on Git Hub.   
For example, git clone [git@github.com](mailto:git@github.com):peytonju/team-5-spryntax.git will clone our source code. 

#### Directory structure

- app
  - A directory for organizing our Express file and SQL queries. We don’t want to place everything in one file– separating things provides nice organization.
  Contains the following directories.
    - controllers
        - Contains files that contain functions used for Express “get” and “post” statements.
    - models
        - Contains files that contain functions used for SQL queries.

- config
  - Contains SQL functionalities, such as a DDL for the SQL structure and a javascript file for establishing a connection
  Contains the following directories
    - ER\_Diagram
        - An “entity relation” folder for SQL.

- website
  - Contains views of our site and public assets.
  Contains the following directories.
    - public
        - Contains public assets for use by our site. These will be included by the “views” directory.
    - views
        - Contains .html and .ejs files that will be used by the Express server.

- website\_static\_build\_tools
  - Static build tools for our website. A “static” item is something that does not change. Specifically here, we have build tools that produce static items for us.
  Contains the following directories.
    - raw\_alg\_builder
        - Currently, we have our JSONifier for our algorithms placed here– this scans all of our algorithms and creates a big JSON of their data. This JSON is then dumped into “public” since it will be used frequently.
        Contains the following directories.
            - algs-c
                - Contains all of our C files that we will display on our site.
            - algs-py
                - Ditto, but for our Python files.

#### Building the software

Building the software was designed to be as high-level as possible for the developers. Below are some steps for building everything and getting this running as fast as possible.

Note: our site requires SQL implementation. You have to create a ‘.env” file in the root of the repository. This must contain the following information (in this exact format):  
	`DB_HOST=<Name of the Host>`  
    `DB_USER=<Name of the user that database is associated with>`  
    `DB_PASSWORD=<Password for the database>`  
    `DB_NAME=<Name of the database>`  
    `DB_PORT=<Port of the database>`

Just Running

1. Change directory to where “package-lock.json” and “package.json” is for spryntax
   1. This will be in the "spryntax" folder, accessible from the root directory
2. Run “npm start”  
   1. This will set up the static assets, install node modules, and start the server locally.  
3. Open a browser and enter “localhost:PORT”  
   1. Replace “PORT” with whatever port was printed after “npm start” was ran.

Full Command List

- You can always run “npm run” when in the directory of our spryntax package. This will print every available command for our package and comments describing them. Below is a list regardless.

- Local commands
    - npm start  
        - Runs "static-levels", installs needed node modules, and locally hosts the Express server locally. Prints the port number
    - npm run static-levels
        - Builds static assets and moves them into the public directory

- PM2 commands
These commands will work for any device, but it is advised to reserve PM2 for a server that will continually host the site. If you never run any of these (none of the local commands run these), they are completely irrelevant.
    - npm run pm2-start  
        - Runs the “spryntax.js” file with pm2, following the same steps as “npm start”. Creates the “spryntax” process  
    - npm run pm2-stop  
        - Stops the “spryntax” pm2 process  
    - npm run pm2-restart  
        - Restarts the “spryntax” pm2 process. Runs “pm2-stop” and then “pm2-start”  
    - npm run pm2-kill  
        - Completely stops the “spryntax” process and stops the “pm2” process on your machine  
    - npm run pm2-status  
        - Prints the status of all “pm2” applications  
    - npm run pm2-printout  
        - Prints out the 15 most recent logs from the “spryntax” process

- Miscellaneous Utility
    - npm run desc  
        - Prints a full description of every available command for the “spryntax” package

#### Testing the software

* For **Unit Testing**, we will use white-box testing on individual components (Typing logic, API requests) where the developers will test the components that they built.  
* For **Integration Testing** we will make sure the backend, frontend, and database work together. We will check if data is being sent, and read correctly from the backend and database using the HTTPS status 200 (OK) for working routes, and status code 400 (Bad Request) with routes that produce some error.   
* For **Usability Testing,** we will see real users test functionality (Leaderboard, Algorithm Selection), and we can use ourselves as developers to test these parts acting as the user.  
* For **Performance Testing**, we will measure typing response time, and API speeds, making changes if we observe slow loading times.  
* We will receive bug reports from users (Reference to the user documentation for this part)

#### Adding new tests

Since we have a website, the only test to add would be for usability testing. We would send JSON files to the database in place of the user data that would be sent there. Since there are no users currently, it would be easier if we could send mock data via PostMan to test the leaderboard and such pages that require dynamically updated information from the users. 
