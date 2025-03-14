const PORT = 8080;

const fs = require("fs");
const algorithmController = require('./app/controllers/algorithmController');
const leaderboardController = require('./app/controllers/leaderboardController');
const statsController = require('./app/controllers/statsController');
const favoritesController = require('./app/controllers/favoritesController');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require("mysql")

const PATH = require('path');
const PATH_VIEWS = PATH.join(__dirname, "website", "views");
const PATH_PUBLIC = PATH.join(__dirname, "website", "public");
const PATH_STATIC_BUILD = PATH.join(__dirname, "website_static_build_tools");
const PATH_LEVEL_DATA = PATH.join(PATH_STATIC_BUILD, "alg_creator", "levels.json");
const PATH_LEVEL_TAGS = PATH.join(PATH_STATIC_BUILD, "alg_extras", "levels.json");
const PATH_LEVEL_TO_CLEAN = PATH.join(PATH_STATIC_BUILD, "alg_extras", "to_clean_names.json");
const PATH_LEVEL_TO_NONCLEAN = PATH.join(PATH_STATIC_BUILD, "alg_extras", "to_nonclean_names.json")

const JSON_LEVEL_DATA = JSON.parse(fs.readFileSync(PATH_LEVEL_DATA).toString());
const JSON_LEVEL_TAGS = JSON.parse(fs.readFileSync(PATH_LEVEL_TAGS).toString());
const LEVEL_NAME_TO_READABLE = JSON.parse(fs.readFileSync(PATH_LEVEL_TO_CLEAN).toString());
const LEVEL_NAME_TO_NONREADABLE = JSON.parse(fs.readFileSync(PATH_LEVEL_TO_NONCLEAN).toString());
const db = require('./config/database');


const session = require('express-session');
const express = require('express');
const reportController = require("./app/controllers/reportController");
const app = express();

app.use(session({
    secret: 'ADvcxexXP!2', // Make stronger
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use((req, res, next) => {
    if (typeof res.locals.activePage === 'undefined') {
      res.locals.activePage = '';
    }
    next();
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', PATH_VIEWS);

app.use(express.static(PATH_PUBLIC));
app.use(express.json());


app.get("/", (req, res) => {
    if (req.session.username) {
        res.render('index', { 
            username: req.session.username,
            level_language: 'c'
         });
      } else {
        res.render('index', { username: 'undefined',  level_language: 'null'});
      }
});

app.get("/login", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "login.html"));
});

app.post('/stats/add', statsController.addStat);

app.get("/signup", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "login.html"));
});

app.get("/settings", (request, response) => {
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "settings.html"));
});

/*stats*/
app.get('/stats', statsController.get_stat);
app.post('/stats/add', statsController.addStat);

/*favorites*/
app.get('/favorites', favoritesController.get_favorite);

app.post('/favorites/add', favoritesController.addFavorite);

/*report*/
app.get('/report', reportController.report_select);


addFavorite: (req, res) => {
    console.log("Session:", req.session); // Log session info
    
    if (!req.session.user_id) {
      console.error('User not logged in');
      return res.status(401).json({ error: "User not logged in" });
    }
    
    const user_id = req.session.user_id;
    const algorithmName = req.body.algorithmName;
  
    if (!algorithmName) {
      console.error('Algorithm name missing');
      return res.status(400).json({ error: "Algorithm name is required" });
    }
  
    Favorites.addFavorite(user_id, algorithmName, (err, result) => {
      if (err) {
        console.error('Error adding favorite:', err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true });
    });
  }

  app.post('/favorites/remove', favoritesController.removeFavorite);

/***IMAGES***/
app.get("/images/Spryntax.svg", (request, response) => {
    
    response.status(200).sendFile(PATH.join(PATH_VIEWS, "login.html"));
  });

/*****************************************LEVELS******************************************************/
app.get('/level_select', (req, res) => {
    const username = req.session.username || null;
    if (req.session.user_id) {
      const query = 'SELECT algorithm_name FROM favorites WHERE user_id = ?';
      db.query(query, [req.session.user_id], (err, results) => {
        if (err) {
          console.error(err);
          return res.render("level_select.ejs", {
            level_tags: JSON_LEVEL_TAGS,
            readable_to_nonreadable: LEVEL_NAME_TO_NONREADABLE,
            nonreadable_to_readable: LEVEL_NAME_TO_READABLE,
            favorites: [],
            activePage: 'level_select',
            username: username
          });
        }
        const userFavorites = results.map(row => row.algorithm_name);
        res.render("level_select.ejs", {
          level_tags: JSON_LEVEL_TAGS,
          readable_to_nonreadable: LEVEL_NAME_TO_NONREADABLE,
          nonreadable_to_readable: LEVEL_NAME_TO_READABLE,
          favorites: userFavorites,
          activePage: 'level_select',
          username: username
        });
      });
    } else {
      res.render("level_select.ejs", {
        level_tags: JSON_LEVEL_TAGS,
        readable_to_nonreadable: LEVEL_NAME_TO_NONREADABLE,
        nonreadable_to_readable: LEVEL_NAME_TO_READABLE,
        favorites: [],
        activePage: 'level_select',
        username: username
      });
    }
  });
  
  

app.get('/level_select/:name_level/:name_language', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    const NAME_LANGUAGE = request.params["name_language"].toLowerCase();

    if (NAME_LEVEL in JSON_LEVEL_DATA && NAME_LANGUAGE in JSON_LEVEL_DATA[NAME_LEVEL]) {
        response.status(200).render("level_play.ejs", {
            username: request.session.username || 'undefined',
            level_language: NAME_LANGUAGE,
            level_data: JSON_LEVEL_DATA[NAME_LEVEL][NAME_LANGUAGE]
        });
    } else {
        response.redirect("/");
    }
});

app.get('/level_select/:name_level/:name_language/end', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    const NAME_LANGUAGE = request.params["name_language"].toLowerCase();

    if (NAME_LEVEL in JSON_LEVEL_DATA && NAME_LANGUAGE in JSON_LEVEL_DATA[NAME_LEVEL]) {
        response.status(200).render("level_end.ejs", {
            level_name: NAME_LEVEL,
            level_language: NAME_LANGUAGE
        });
    } else {
        response.redirect("/");
    }
});

/*****************************************LEADERBOARD******************************************************/
app.get('/leaderboard', leaderboardController.table_select);

/*******************************************About us*******************************************************/
app.get("/about", (req, res) => {
    res.render("about", { activePage: "about", username: req.session.username || null });
});


/*****************************************Database******************************************************/



app.post('/signup.php', async (req, res) => {
    const username = req.body.inputUsername; // Extract the username from the form data
    const email = req.body.inputEmail; // Extract the email from the form data
    const password = req.body.inputPassword; // Extract the password from the form data
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Query to check if username already exists
    const checkUserQuery = 'SELECT * FROM user WHERE username = ?';
    db.query(checkUserQuery, [username], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Server error');
        } else if (result.length > 0) {
            res.redirect('/signup?error=Username%20already%20exists%20');
        } else {
            // If username does not exist, insert the new user
            const insertUserQuery = 'INSERT INTO user (username, password, email, profile_pic) VALUES (?, ?, ?, ?)';
            db.query(insertUserQuery, [username, hashedPassword, email, null], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Server error');
                } else {
                    // Automatically sign the user in by setting session variables.
                    // Assume that `result.insertId` holds the new user's ID.
                    req.session.username = username;
                    req.session.user_id = result.insertId;
                    
                    // Redirect the user to the home/dashboard page.
                    res.redirect('/');
                }
            });
        }
    });
});

app.post('/login.php', (req, res) => {
    // Now the input field holds either the email or the username.
    const userInput = req.body.inputEmail;  
    const password = req.body.inputPassword;

    // Modify the query to check if the provided value matches either the email or username column.
    const query = 'SELECT username, user_id, password FROM user WHERE email = ? OR username = ?';

    db.query(query, [userInput, userInput], async (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching user from database');
        } else {
            if (results.length > 0) {
                const username = results[0].username;
                const user_id = results[0].user_id;
                const hashedPassword = results[0].password;

                // Compare the provided password with the stored hashed password
                const isMatch = await bcrypt.compare(password, hashedPassword);

                if (isMatch) {
                    req.session.username = username;
                    req.session.user_id = user_id;
                    res.redirect('/');
                } else {
                    res.redirect('/login?error=Invalid%20email%20or%20password');
                }
            } else {
                res.redirect('/login?error=Invalid%20email%20or%20password');
            }
        }
    });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).send('Error occurred during logout.');
        }
        res.redirect('/'); // Redirect to the homepage
    });
});


app.get('/test', (req, res) => {                                //Can print username and id in ejs. May be able to save data that way
    if (req.session.username) {
        res.render('test', { username: req.session.username, user_id: req.session.user_id });
    } else {
        res.render('test', { username: 'Not signed in', user_id: '' });
    }
});

// for the report button
app.post('/report.php', (req, res) => {
    const name = req.body.name; 
    const problem = req.body.problem;
    const username = req.session.username || null;

    if (!name || !problem) {
        return res.render('report', { message: 'Please enter all fields before submitting', success: false });
    }

    const last_id = "SELECT * FROM bug_reports ORDER BY id DESC LIMIT 1";   //gets the latest id number
    
    db.query(last_id, (err, result) => {
        if(err){
            console.log(err)
            return res.render('report', { message: "Error with database.", success: false });
        }
        else{
            let new_id = 1;
            if (result.length > 0) {
                new_id = result[0].id + 1;  //add to one to latest num
            }

            const query = "INSERT INTO bug_reports (id, name, problem) VALUES (?, ?, ?)";   //insert

            db.query(query, [new_id, name, problem], (err, result) => {
                if(err){
                    console.log(err)
                    return res.render('report', { message: "Error with submitting the bug report.", success: false });
                }else{
                    console.log("Added bug report to database")
                    res.render('report', { 
                        message: "Thank you! Your bug report has been submitted and will be looked at.", 
                        success: true,
                        username: username,
                    });

                }
            });
        }
        
    });
});
/****************************************************************************************************/






/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
