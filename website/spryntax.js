const PORT = 8080;
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();


app.engine('handlebars', exphbs.engine({
    defaultLayout: "index"
}));
app.set('view engine', 'handlebars');

/* place static files in /website/public */
app.use(express.static('public'));


app.get("/", (request, response) => {
    response.status(200).render("pages/main");
});

app.get("/leaderboards", (request, response) => {
    response.status(200).render("pages/leaderboard_global");
});

app.get("/login", (request, response) => {
    response.status(200).render("pages/login");
});

app.get("/signup", (request, response) => {
    response.status(200).render("pages/signup");
});

app.get("/settings", (request, response) => {
    response.status(200).render("pages/settings");
});


/*****************************************LEVELS******************************************************/
app.get("/level_select", (request, response) => {
    response.status(200).render("pages/level_select");
})

app.get('/level_select/:level_name', (request, response) => {
    const level_name = request.params["level_name"].toLowerCase();
    response.status(200).render("pages/level_desc");
})

app.get('/level_select/:level_name/play', (request, response) => {
    const level_name = request.params["level_name"].toLowerCase();
    response.status(200).render("pages/level_play");
})

app.get('/level_select/:level_name/end', (request, response) => {
    const level_name = request.params["level_name"].toLowerCase();
    response.status(200).render("pages/level_end");
})
/****************************************************************************************************/


/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
