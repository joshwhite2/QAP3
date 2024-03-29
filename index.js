const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, })); // This is important!
app.use(methodOverride('_method')); // So is this!

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Ladies Who Rocked the 80s'});
});


const artistsRouter = require('./routes/artists')
app.use('/artists', artistsRouter);

const albumsRouter = require('./routes/albums')
app.use('/albums', albumsRouter);

// const publishersRouter = require('./routes/publishers')
// app.use('/publishers', publishersRouter);

// anything beginning with "/api" will go into this
// const apiRouter = require('./routes/api')
// app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});