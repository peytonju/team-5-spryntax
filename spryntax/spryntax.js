const PORT = 8080;

const fs = require("fs");
const algorithmController = require('./app/controllers/algorithmController');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require("mysql")

const PATH = require('path');
const PATH_VIEWS = PATH.join(__dirname, "website", "views");
const PATH_PUBLIC = PATH.join(__dirname, "website", "public");
const PATH_STATIC_BUILD = PATH.join(__dirname, "website_static_build_tools");
const PATH_LEVEL_DATA = PATH.join(PATH_STATIC_BUILD, "raw_alg_builder", "levels.json");
const PATH_LEVEL_TAGS = PATH.join(PATH_STATIC_BUILD, "alg_extras", "levels.json");

const JSON_LEVEL_DATA = JSON.parse(fs.readFileSync(PATH_LEVEL_DATA).toString());
const JSON_LEVEL_TAGS = JSON.parse(fs.readFileSync(PATH_LEVEL_TAGS).toString());


const session = require('express-session');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', PATH_VIEWS);

app.use(express.static(PATH_PUBLIC));
app.use(express.json());


app.get("/", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, 'index.html'));
});

app.get("/leaderboard", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "leaderboard.html"));
});

app.get("/login", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "login.html"));
});

app.get("/signup", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "signup.html"));
});

app.get("/settings", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "settings.html"));
});

app.get("/report", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "report.html"));
});


/*****************************************LEVELS******************************************************/
app.get('/level_select', algorithmController.level_select);

app.get('/level_select/:name_level', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    response.status(200).render("level_desc.html");
})

app.get('/level_select/:name_level/:name_language/play', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    const NAME_LANGUAGE = request.params["name_language"].toLowerCase();

    response.status(200).render("level_play.ejs", {
        level_data: JSON_LEVEL_DATA[NAME_LEVEL][NAME_LANGUAGE]
    });
})

app.get('/level_select/:name_level/:name_language/end', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    const NAME_LANGUAGE = request.params["name_language"].toLowerCase();

    response.status(200).render("level_end.ejs", {
        level_name: NAME_LEVEL,
        level_language: NAME_LANGUAGE
    });
})
/*****************************************Database******************************************************/

app.use(session({
    secret: 'ADvcxexXP!2', // Make stronger
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const con=mysql.createConnection({
    host:'**',
    user:'**',
    password:'**',
    database:'**',
    port: 3307
})

con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected")
    }
})

app.post('/signup.php', async (req, res) => {
    const username = req.body.inputUsername; // Extract the username from the form data
    const email = req.body.inputEmail; // Extract the email from the form data
    const password = req.body.inputPassword; // Extract the password from the form data
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Query to check if username already exists
    const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
    con.query(checkUserQuery, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else if (result.length > 0) {
            res.status(400).send('Username already exists');
        } else {
            // If username does not exist, insert the new user
            const insertUserQuery = 'INSERT INTO user (username, password, email, profile_pic) VALUES (?, ?, ?, ?)';
            con.query(insertUserQuery, [username, hashedPassword, email, null], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                } else {
                    //console.log("POSTED");
                    //res.send(`Username: ${username}, Email: ${email}, Password: ${hashedPassword}`);
                    res.redirect('/');
                }
            });
        }
    });
});

app.post('/login.php', (req, res) => {
    const email = req.body.inputEmail; // Extract the email from the form data
    const password = req.body.inputPassword; // Extract the password from the form data

    const query = 'SELECT username, password FROM user WHERE email = ?';

    // Ensure you are using a properly configured MySQL connection
    con.query(query, [email], async (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching user from database');
        } else {
            if (results.length > 0) {
                const username = results[0].username;
                const hashedPassword = results[0].password;

                // Compare the provided password with the stored hashed password
                const isMatch = await bcrypt.compare(password, hashedPassword);

                if (isMatch) {
                    req.session.username = username; // Store the username in the session
                    res.redirect('/');              // Redirect to home
                } else {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
            } else {
                res.status(401).send('Invalid email or password');
            }
        }
    });
});

app.get('/', (req, res) => {                                //working on calling username to ensure it is stored
    if (req.session.username) {
        res.render('/', { username: req.session.username });
    } else {
        res.render('/', { username: 'none' });
    }
});

// for the report button not working yet
app.post('/report.php', (req, res) => {
    const name = req.body.name; 
    const problem = req.body.problem;

    const query = "INSERT INTO bug_reports (name, problem) VALUES (?, ?)";
    
    con.query(query, [name, problem], (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log("Added bug report to database")
            //res.alert("Thank You")
            res.redirect('/');
            //res.send(`name: ${name}, problem: ${problem}`);
        }
    });
    //res.send(`name: ${name}, problem: ${problem}`);
});


/****************************************************************************************************/






/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
