const PORT = 8080;
const express = require('express');
const app = express();
app.engine("html", require("ejs").renderFile);

/* place static files in /website/resources */
app.use(express.static('public'));


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
/****************************************************************************************************/


/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
