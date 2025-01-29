const PORT = 8080;
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();


app.engine('handlebars', exphbs.engine({
    defaultLayout: "index"
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


/* queries to "/" just render the main page */
app.get('/', (req, res) => {
    res.status(200).render('mainPage');
});

app.get('/code', (req,res) => {
    res.status(200).render("codePage")
})


/* hopefully not a concern for hosting on OSU's servers */
app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
});
