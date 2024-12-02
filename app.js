const express = require('express');
const app = express();
const path = require('path');


function working(req, res, next) {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();


    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send(`
    <h1>Site fermé</h1>
    <p>Ce site est accessible uniquement du lundi au vendredi, de 9h à 17h.</p>`);
    }
}


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(working);


app.get('/', (req, res) => {
    res.render('home', { title: 'Accueil' });
});

app.get('/services', (req, res) => {
    res.render('service', { title: 'Nos Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Nous Contacter' });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur est démarré sur http://localhost:${PORT}`);
});