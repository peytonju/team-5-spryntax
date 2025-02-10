const PORT = 8080;
const express = require('express');
const app = express();
app.engine("html", require("ejs").renderFile);
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require("mysql")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
/* place static files in /website/resources */
app.use(express.static('public'));
app.use(express.json());



app.get("/", (request, response) => {
    response.status(200).render("index.html");
});

app.get("/leaderboards", (request, response) => {
    response.status(200).render("leaderboard.html");
});

app.get("/login", (request, response) => {
    response.status(200).render("login.html");
});

app.get("/signup", (request, response) => {
    response.status(200).render("signup.html");
});

app.get("/settings", (request, response) => {
    response.status(200).render("settings.html");
});


/*****************************************LEVELS******************************************************/
app.get("/level_select", (request, response) => {
    response.status(200).render("level_select.html");
})

app.get('/level_select/:level_name', (request, response) => {
    const level_name = request.params["level_name"].toLowerCase();
    response.status(200).render("level_desc.html");
})

app.get('/level_select/:level_name/play', (request, response) => {
    const level_name = request.params["level_name"].toLowerCase();
    response.status(200).render("level_play.html");
})

app.get('/level_select/:level_name/end', (request, response) => {
    const level_name = request.params["level_name"].toLowerCase();
    response.status(200).render("level_end.html");
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


/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
