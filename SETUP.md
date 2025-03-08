NOTE: you can utilize "http://flip1.engr.oregonstate.edu:8080/" for running our application. If you wish to install the application yourself to run on your machine, follow the instructions specified in "INSTALL.md" and the instructions below.  
NOTE: you MUST be on OSU's network directly or via VPN in order to connect to the site!

# Setup
(excerpt from the docs_developer.md file).  
Building the software was designed to be as high-level as possible for the developers. Below are some steps for building everything and getting this running as fast as possible.    

Note: our site requires SQL implementation. You have to create a ‘.env” file in "/spryntax". This must contain the following information (in this exact format):  
- `DB_HOST=<Name of the Host>`  
- `DB_USER=<Name of the user that database is associated with>`  
- `DB_PASSWORD=<Password for the database>`  
- `DB_NAME=<Name of the database>`  
- `DB_PORT=<Port of the database>`
Note: this data may be already committed, so you don't need to worry about it if it's under "/spryntax"!

1. Change directory to where “package-lock.json” and “package.json” is for spryntax (under "/spryntax")
2. Run “npm start”  
   1. This will set up the static assets, install node modules, and start the server locally on your machine.  
3. Open a browser and enter “localhost:PORT”  
   1. Replace “PORT” with whatever port was printed after “npm start” was ran.