console.log("asdf");

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


/* queries to "/" just render the main page */
app.get('/', (request, response) => {
    console.log("user connected to /");
    response.status(200).render("pages/mainPage");
});

/* "/code" redirects to the code page */
app.get('/code', (request, response) => {
    response.status(200).render("pages/codePage")
})


/* makes the express server listen on the specified port */
app.listen(PORT, () => {
    /* after successfully listening, just print out a status message */
    console.log(`Server started on localhost:${PORT}`);
});
