### Developer Documentation

#### Obtaining source code

Git clone on our project repository on Git Hub.   
For example, git clone [git@github.com](mailto:git@github.com):peytonju/team-5-spryntax.git will clone our source code. 







#### Testing the software

* For **Unit Testing**, we will use white-box testing on individual components (Typing logic, API requests) where the developers will test the components that they built.  
* For **Integration Testing** we will make sure the backend, frontend, and database work together. We will check if data is being sent, and read correctly from the backend and database using the HTTPS status 200 (OK) for working routes, and status code 400 (Bad Request) with routes that produce some error.   
* For **Usability Testing,** we will see real users test functionality (Leaderboard, Algorithm Selection), and we can use ourselves as developers to test these parts acting as the user.  
* For **Performance Testing**, we will measure typing response time, and API speeds, making changes if we observe slow loading times.  
* We will receive bug reports from users (Reference to the user documentation for this part)

#### Adding new tests

Since we have a website, the only test to add would be for usability testing. We would send JSON files to the database in place of the user data that would be sent there. Since there are no users currently, it would be easier if we could send mock data via PostMan to test the leaderboard and such pages that require dynamically updated information from the users. 
