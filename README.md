# CS 362 Project, Team 5 - Spryntax

# Project Proposal

## Team Information
### Team Members
#### Kali Pulanco
#### Shrey Bosamia  
#### Seojin Lee  
#### Prathmesh Nitin Gite  
#### Justice Peyton  
#### John Harrison Polasek  
#### Aidan Lusk

### Team Communication 
#### Trello
The team will utilize Trello to communicate team-wide and individual expectations and deadlines.  
https://trello.com/b/4y3Ca40R/pt5spryntax
#### Discord
The team will primarily communicate over Discord to establish meeting times, general communication, and for urgent messages. The team is encouraged to check this at least every 24 hours. 
#### Outlook
Outlook will be minimally used by the team but may be utilized to formally reach out to TAs or Instructors. The team will also utilize Outlook for meeting information-- specifically where, when, and what will be discussed. In the case that Discord is not working, this will be used in its place as a primary method for communication. 
#### Canvas
Canvas will be used in case Discord or Outlook are both unavailable. The team may also reach to team members directly through Canvas announcements in case we are unable to reach them. 


## Project Description
**Abstract:** Coding requires a subset of characters not commonly used in normal typing. To name a few (\<, \>, :, ;, { }, \[ \], \-, \+, \=, //, \_ ) and programming languages have different syntaxes as well, therefore even more variety of characters you wouldn’t normally use. Traditional typing practice websites are useful for general typing but what about coding? Well, what if you were shown algorithms– in multiple programming languages that you can select– and had to type it out? Not only will you practice typing code, but you’ll learn more about the fundamentals of the particular programming language you selected, and also the functionality/structure of the algorithm via the algorithm itself and comments throughout the code. Additionally, there will be an educational guide explaining the algorithm in detail at the bottom of the typing section, so you can learn and grow your programming skills no matter what.

**Goal:** Spryntax is made with the goal of helping its users by allowing them to practice typing programming languages. We aim to improve the typing speed, familiarity with common programming symbols, and promote a good standard of how to type code to our users. The users can then use this experience within their own projects and professionally.

**Current practice:** There are several places online that you can utilize to gain familiarity with algorithms and even provide opportunities for you to type the code yourself. For example, Leetcode and Geeks for Geeks provides its users with explanations and code execution experience. However, neither of these provide any statistics to the user regarding their typing speed and correctness– they have no way to gauge whether or not they’re improving their ability to type in languages. Monkey Type, on the other hand, does indeed provide users statistics about how fast and how correctly they type– but it only provides its users words.

**Novelty:** As mentioned above, current practices don’t provide users with statistics on how well they type the proper syntax for programming languages. Spryntax meshes places like Leetcode and Geeks for Geeks along with Monkey Type– a place where users are able to type algorithms, learn about them, while also being able to view how they’re improving their typing ability. Spryntax also spices this up a bit by allowing users to compete with each other on leaderboards, which we hope will inspire users to learn to type even faster!

**Effects:** Novice programmers will learn how to code through repetition and exposure to complex algorithms in multiple languages, while adding a little bit of friendly competition to boost motivation. For example, for the merge sort algorithm in C, the novice programmer will type out as they go along, learning proper grammar and styling. Once completed, a description will give them another understand of the purpose of the algorithm, as well as other information such as runtime. This will ensure the novice learns through repetition and exposure. Competition as well will motivate novices to give practice and commit to memory necessary grammar to be able to implement their programs faster.

# Project Requirements Elicitation

**Use Cases (Functional Requirements):**
Minimum Viable Product Goals:
* Monkeytype-style of program that allows users to type characters needed to create a specific file, the file contains some useful-to-know algorithm  
  * Actor: Beginner coders, students, or people that would like to increase their knowledge of coding would use the site.  
  * Trigger: It triggers when the user starts typing or practicing their code shown by the algorithm on their screen with a timer.   
  * Preconditions: The user should be able to reach the website or the page and click on the typing box.  
  * Postconditions: They can look at their stats displayed to them after they are done typing.  
  * Steps: They gonna open a web browser and type in the Spryntax. Then they can create an account or can directly start typing and check their coding efficiency. After completing they can view their result which would be presented to them on their screen.    
  * Extensions: The user can look at their stats after completing a coding session.  
  * Exceptions: If the user doesn’t have internet or the web browser is not supporting the website. Another exception would be if the site is crashing. 
* Leaderboard for fastest times  
  * Actor: Users viewing the highest wpm for each algorithm separated 2 sections, one section for python and another for c.  
  * Trigger: The user types at the 10-top highest wpm speed for an algorithm.  
  * Preconditions: The user has an account.  
  * Postconditions: The user will be added to the leaderboard, and all the other positions will be modified dynamically so only the top 10 are present.  
  * Steps: The user types the algorithm, and their wpm will be compared to the leaderboard at the end of their session (once they finished typing all the characters. If their wpm is higher than one of those in the leaderboard, then the user will be put in front of those that have lower wpm and behind those that have higher wpm.  
  * Extensions: The user\_id and wpm statistic of the user will be put into the leaderboard table in the database. The leaderboard page would dynamically change to reflect these changes.  
  * Exceptions: If the user doesn’t type with a wpm rate which is greater than any of the wpm in the leaderboard. 
- Statistics for users  
  - Time that a user took on a specific assignment  
  - Words per minute (\# of chars divided by 5\)  
* Save user data in a database as long as they are logged in  
  * Actor: User trying to log in to save their data.  
  * Trigger: User wants to save their data so they must log in so their data can be stored  
  * Preconditions: User wants to learn about coding or improve their coding ability.   
  * Postconditions: The user data being successfully saved with the user logged in.  
  * List of steps: Users must first sign up, or if they have an account log in. Once logged in the website must be linked to the database so their data can be stored.  
  * Extensions: Data is saved, stored, and successfully saved in the database.  
  * Exceptions: Users could be unable to create an account by not having adequate internet connection to access the website, or other factors.
* Allow users to favorite a level
  * Actor: User wants to favorite a typing level they like
  * Trigger: User clicks on the favorite button either in the level itself or on the levels menu
  * Preconditions: User has an account
  * Postconditions: The user can click on the favorite button to favorite or to unfavorite. This information will be saved on the user’s page and on the    website database
  * Steps: 
	- User signs up or signs in to their account
	- User goes to the levels menu
	- User clicks on the favorites button on the level menu or they can click into the level to click the favorites button
	- The user can go to their user page to see their favorites
	- The favorites data will be saved to the database
  * Extensions: The favorites data is saved to the database and linked to the user
  * Exceptions: The user does not have an account, or stable internet connection so the favorite information is not correctly loaded into the database. Or the database crashes.

* Code Comments  
  * Actor: A user wanting to view a comment for some line of code   
  * Trigger: User clicks a “(?)” symbol next to a line of code on the Level type site  
  * Preconditions: A line has been fully typed with no errors  
  * Postconditions: A modal appears and can be closed via an “x” at the top right  
  * Steps:  
    * User starts a Level  
    * User goes to that Level’s typing screen  
    * User types a full line containing no errors  
      * The site will automatically have a “(?)” appear at the end of this line  
    * User clicks the “(?)” symbol  
    * Modal appears with the sought after comment   
      * Modal can be closed via an “x” at its top right  
  * Extensions: None (local javascript will be ran with no communication with the SQL or Express servers)  
  * Exceptions: None (level data, including comments, are stored with local javascript)

Stretch Goals:
- “Profile” for a particular user that other users can view  
  - Support for multiple programming languages  
  - Support for users to compile/interpret code on the site
- Allow users to favorite a level 
  


**Non-functional Requirements:** 
- User passwords are securely stored  
- A clean website that looks aesthetically pleasing  
- Multiple users can be actively on the server at the same time

**External Requirements:** 

- The product is a web-based service, the server must have a public URL that others can use to access it.   
- The product must be robust against errors that can reasonably be expected to occur, such as invalid user input.  
- If your project is a web-based server, you will need to provide instructions for someone else setting up a new server.   
- Your system should be well documented to enable new developers to make enhancements.  
- The scope of the project must match the resources (number of team members) assigned.

**Technical approach:** The project is web-based and will be using NodeJS for processing user inputs and sending that information to a .NET framework.

# Project Architecture and Design

## Software Architecture
We are using Model-View-Controller and microservices architecture. The Model will hold the database interactions. The view has the client-side code (UI/Frontend). The controller handles the API requests. There will be microservices for keeping track of the user stats (e.g. wpm, accuracy ..etc) the leaderboard, and the favorites. 

2 alternatives are:
A fully monolith backend instead of microservices
Pros: Easier to develop since there are fewer moving parts and simpler debugging since there won't be any inter-service communication
Cons: Scalability issues (if we get a lot of users) and performance bottle neck, since each feature depends on the same server
NOSQL for schema-less storage. 
Pros: Faster inserts for typing stats since MongoDB handles unstructured data and easier schema changes
Cons: Querying leaderboards would be slower and not as reliable as MySQL for user authentication

The main software we will be using is NodeJS for connection to the website, APIs and database, and MySQL for creating the database.
(The database schema is in the database folder)


## Software Design
**Frontend: /views** | Handles UI logic (Typing process, pages, etc…)  
	          **public/spyrntax.js** | Handles Dynamically loading information from the database into pages (Load algorithms, filtering algorithms, etc..)

**Backend: /bin** | This will hold the server startup script  
	       **/server.js** | Main express server  
**Database: /app/models folder** | Fetches/stores data in MySQL database  
		      **/config** | Database.js is in this file, which connects to the database

**Typing stats service: /services/typing-stat-service** (Yet to be added) | Tracks real-time typing accuracy and WMP  
**Leaderboard service: /services/leaderboard-service** (Yet to be added)  | Stores and retrieves ranking data  
**Favorites service: /services/favorites-service** (Yet to be added) | Creates, stores, and retrieves user-favorited algorithms  
	

## **Coding Guideline:**

##### Overview

Following a standard for code is an incredibly important aspect of programming with a large team. We will constantly be referring to one another’s work and actively making changes to the project, perhaps on work that is not our own. Understanding what’s happening within the code is an imperative part of having a successful project. Below are several sections of languages that our project will utilize alongside the standards that they will follow. All team members are encouraged and expected to read and be familiar with the standards.

##### Executed Languages

Executed languages are languages that we are actively using and working with to make our project work. Technically, all languages should be listed here– however, our project utilizes some code that does not actually get executed but is viewed by the users of our site. Since it is viewed by users, we *must* follow a strong and common standard since they will be directly viewed by people who seek to learn and get used to actual professional programming, which is why those languages are listed in their own section.

##### HTML

[https://developer.mozilla.org/en-US/docs/MDN/Writing\_guidelines/Writing\_style\_guide/Code\_style\_guide/HTML](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/HTML)  
HTML naturally lacks any sort of structure, making it very necessary for us to follow guidelines– especially for cross-browser compatibility. The MDN Web Docs provides many examples, explanations, and guidelines for how to use and write HTML. The MDN Web Docs were also referenced within the Web Development course here at OSU, making this a set of documents that every team member is familiar with.

##### JavaScript

[https://developer.mozilla.org/en-US/docs/MDN/Writing\_guidelines/Writing\_style\_guide/Code\_style\_guide/JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript)  
Similarly to HTML, JavaScript also lacks structure and actively contains functionality that does not always work with every browser. The MDN Web Docs is an incredibly popular and well-used documentation page that contains information about how JavaScript should be structured and contains compatibility concerns with certain browsers. Since JavaScript and HTML are heavily intertwined within web development, using the same standard also helps to ensure that we’re staying consistent with both sides.

##### MySQL

[https://dev.mysql.com/doc/dev/mysql-server/8.4.3/PAGE\_CODING\_GUIDELINES.html](https://dev.mysql.com/doc/dev/mysql-server/8.4.3/PAGE_CODING_GUIDELINES.html)  
SQL is a difficult language for some people to learn and understand– making it very important that we follow a specific guideline that helps everybody consistently be able to assign meaning to code. Using the official SQL guidelines allows us to refer to an easy-to-access and sensical style and is especially important for the site developers to use as they will be requesting data from our SQL server.

##### Non-Executed Languages

We have two languages that we do not explicitly execute for our project. However, since our team will still be typing these languages for our project, we need a set of guidelines to follow. Both of these languages will be viewed by our users since the goal of our project is to help familiarize users with the keys utilized for programming. Following a strict set of rules here is especially important for new programmers– any inconsistency may confuse them.

##### C

[https://www.cs.umd.edu/\~nelson/classes/resources/cstyleguide/](https://www.cs.umd.edu/~nelson/classes/resources/cstyleguide/)  
C is a bit difficult to assign a guideline to since it is incredibly low-level and lacks any form of real structure in comparison to other languages. However, for the sake of consistency and generally, from what team members of the project have been taught, we will follow this style guideline from the  University of Maryland’s Computer Science department.

It provides direct examples of how we should indent, comment, and structure functions and defines variable name guidelines as well, amongst a plethora of other standards. Additionally, this standard pushes for not copying and pasting code as well as trying to be as modular and recyclable as possible with your code. This philosophy has importance beyond just having team members understand what you’re doing in C– a difficult language like C needs to have a consistent structure that the programmer follows so that they know what they’re doing.

##### Python

[https://peps.python.org/pep-0008/](https://peps.python.org/pep-0008/)  
Python, as sort of an opposite to C, is a powerful programming language that can allow users to easily program with little understanding of computer science topics. For this reason, Python is especially important to have organization in– the lack of structure that Python enforces onto you can leave your code in a sort of anarchy.

Python is also a very frequent language in the CS industry. On this note, it’s important that we teach a non-esoteric Python style guide– leading to why we chose the official Python style guidelines. This will allow users to learn a style for the language that’s used commonly within the industry, not only allowing the users to have their works able to be easily read by others but also for the user themself to easily read other Python programs.

##### The Enforcement of These Code Guidelines

Every team member has an explicit expectation of reading through these guidelines and ensuring that they’re following them. If we have absolutely no idea how to read someone’s code, how is it useful to us? Each of us will mutually ensure that everyone follows the standards. Additionally, one team member will be assigned to constantly check on other peoples’ codes and ensure that they are following them.

Our team will attempt to be significantly more strict with the Non-Executed Languages given that this code is directly viewed by users of the site and that the users are actively learning from these snippets of code.

## Process Description

### I. Risk assessment:
- **Overambition, unfinished project. (Risk: Low), (Impact: High)**. Currently, we are on track regarding the project timeline, but if we try to add in too many features we could fall behind. In the event we do fall behind we would be left with an unfinished website which would be a big issue. If we do begin falling behind we can reduce the scope of a project to a more manageable size. 
- **Crashing of the website. (Risk: Medium), (Impact: High)**. We are working on the infrastructure for the website now. In the event that a bug slips through our testing procedures, downtime on a website has a huge impact. Users are never happy with unexpected outages. We are working to reduce this risk by ensuring our testing is through. We can test this risk by testing if the website is live.
- **User Data Loss. (Risk: Low), (Impact: Medium)**. Our database is a MySQL server hosted by OSU IT. We are not hosting the server so it is possible for the server to be unexpectedly taken down or for it to be deleted. The OSU servers are generally live most of the time, and we have planned to have the server live with OSU IT until the end of the term. A test to check that the database still exists is checking if the MySQL server is live. We could mitigate risk by periodically creating saves of the database and storing it off the server.
- **Ensuring a Secure Website. (Risk: Medium), (Impact: High)**. We are planning to build as secure a website as we can. In the event that we do have a security issue then it could compromise user passwords, emails, or more. We will ensure that all of our applications are up to date as testing for bugs that could lead to a data breach. Detection for this risk is hard, but we are planning on logging who is accessing the database. In the event a security breach does occur, we will inform our users as soon as possible and try to ensure that a similar breach is unable to happen again.
- **Team Unavailability. (Risk: Low), (Impact: High)**. Team members may experience unexpected emergencies or become overwhelmed with their school workload. At the movement, we have found times when members can attend group meetings or at least attend digitally, but if issues arise in the future this could slow down our project. We can reduce the chance of this happening by having periodic check-ins and currently having clear lines of communication. If someone becomes unavailable then we can distribute their work among the team.
 
### II. Project schedule:
* Week 1: Discuss about the project idea   
* Week 2: Functional requirements   
* Week 3: Create database  
* Week 4: Full website wireframes  
* Week 5: Implementing html, css for the website design and node.js to connect to the database  
* Week 6: Local functionality  
* Week 7: Server functionality  
* Week 8: Fine tune explanations  
* Week 9: Polish javascript functions for non-static functionality  
* Week 10: Add more languages and extend explanations.
### III. Team structure:
#### **Kali Pulanco**

Project Lead and UX and UI Lead/Implementation

- Will lead the project’s overall direction and major features and implementations  
- Will lead the direction of the site’s UI and UX and its implementation

#### **Shrey Bosamia**

Full Stack, Backend and Database Lead

- Will work on SQL design and implementation  
- Will work with the front-end team for javascript functionality on non-static user interactions.

#### **Seojin Lee**

Backend Developer

- Will specifically work on the design of our SQL 

#### **Prathmesh Nitin Gite**

Frontend Developer

- Will specifically work on JavaScript for the site

#### **Justice Peyton**

Full Stack

- Will pitch in in a variety of areas as needed with a bigger focus on Frontend development

#### **John Harrison Polasek**

Frontend Developer

- Will be in charge of the Login Page, Home Page, and Menu of the site 

#### **Aidan Lusk**

Backend Developer

- Will help as needed with backend implementation

### IV. Test plan & bugs:
- **Unit Testing:** We will use white box testing to ensure each unit works. When testing on the website we can just use local host to ensure our implementations work correctly. When adding into the database we can local host the website and then use the live database to ensure the required information is correctly pushed or pulled. This will be sufficient because it allows for us to check if each addition works. 

- **System (integration) Testing:** When the database is linked with the front end we will use Fuzz testing to ensure that most user inputs do not cause any major problems. This will be sufficient for user inputs because we can find a fuzzer that inputs values that if not handled correctly could result in a crash. Additionally we need to test that all links work and that web pages load correctly. In the same aspect of unit testing we can local host the entire website on our machine to ensure each addition works together. When a module is changed or added in relation to the database we will also have to ensure that it still works with the website. The environment we will use to host it is visual studio code and we are running it using node.js. 

- **Usability Testing:** We can try out the typing function of the website to test the usability. We can try to type random inputs to check that the website will correctly get the users inputs and function like a monkey-type like website. We can also test out every button and links in the website to test that everything on the website works correctly and smoothly. Usability on different platforms could be tested, like mobile and computer browsers.

### V. Documentation plan:
Documentation will be written as code documentation as well as user documentation. Architecture documentation is as listed above and there are no current plans for this specific portion to be edited.
- For **code documentation**, programs will include comments that describe portions of the code such as loops, if-else statements, functions, and sections that appear unintuitive. In the typing portion, that documentation is separated for the user. 
- For **user documentation**, there will be an on-side documentation done through tooltips to aid in every interactable interface on a given page. This will apply to textboxes and clickable elements to indicate what interaction should take place.

On top of the in-code documentation, we will utilize a Google Document that will outline every file and its related classes, functions, and variables, and provide a CTRL+F-like library for people to easily jump around in to find definitions quickly and focus on coding.
