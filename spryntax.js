const PORT = 8080;

const PATH = require('path');
const PATH_VIEWS = PATH.join(__dirname, "website", "views");
const PATH_PUBLIC = PATH.join(__dirname, "website", "public");
const PATH_LEVELS_JSON = PATH.join(PATH_PUBLIC, "levels.json");

const algorithmController = require('./app/controllers/algorithmController');
const bodyParser = require('body-parser');
const mysql = require("mysql")
const fs = require("fs");

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

app.get("/leaderboards", (request, response) => {
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


/*****************************************LEVELS******************************************************/
app.get('/level_select', algorithmController.level_select);

app.get('/level_select/:name_level', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    response.status(200).render("level_desc.html");
})

app.get('/level_select/:name_level/:name_language/play', (request, response) => {
    const NAME_LEVEL = request.params["name_level"].toLowerCase();
    const NAME_LANGUAGE = request.params["name_language"].toLowerCase();
    const DATA_JSON = JSON.parse(fs.readFileSync(PATH_LEVELS_JSON).toString());
    const DATA_LEVEL = DATA_JSON[NAME_LEVEL][NAME_LANGUAGE];

    response.status(200).render("level_play.ejs", {
        level_data: DATA_LEVEL
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
// const con=mysql.createConnection({
//     host:'***',
//     user:'***',
//     password:'***',
//     database:'***',
//     port: 3307
// })

// con.connect((err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("connected")
//     }
// })

app.post('/signup.php', (req, res) => {
    const username = req.body.inputUsername; // Extract the username from the form data
    const email = req.body.inputEmail; // Extract the email from the form data
    const password = req.body.inputPassword; // Extract the password from the form data

    const query = 'INSERT INTO user (username, password, email, profile_pic) VALUES (?, ?, ?, ?)';
    
    con.query(query, [username, password, email, null], (err, result) => {
        if(err){
            console.log(err)
        }else{
            console.log("POSTED")
        }
    }
    
    )
    res.send(`Username: ${username}, Email: ${email}, Password: ${password}`);
});
/****************************************************************************************************/

/*********************Route to dynamically fetch algorithm data ****************/




/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
