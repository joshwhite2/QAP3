const express = require('express');
const router = express.Router();
const albumsDal = require('../services/pg.albums.dal')


// https://localhost:3000/albums/
router.get('/', async (req, res) => {
   
    try {
        let theAlbums = await albumsDal.getAlbums(); 
        if(DEBUG) console.table(theAlbums);
        res.render('albums', {theAlbums});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
   
    try {
        const anAlbum = await albumsDal.getAlbumByAlbumId(req.params.id); // from postgresql
        if(DEBUG) console.log(`albums.router.get/:name ${anAlbum}`);
        if (anAlbum)
            res.render('album', {anAlbum});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('album.Replace : ' + req.params.id);
    res.render('albumPut.ejs', {Year: req.query.album_year, Publisher: req.query.publisher_id,  theId: req.params.id});
});


router.get('/:id', async (req, res) => {
   
    try {
        const anAlbum = await albumsDal.getAlbumByAlbumId(req.params.id); // from postgresql
        if(DEBUG) console.log(`albums.router.get/:name ${anAlbum}`);
        if (anAlbum)
            res.render('album', {anAlbum});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});
// router.get('/:id/replace', async (req, res) => {
//     if(DEBUG) console.log('album.Replace : ' + req.params.id);
//     res.render('albumPut.ejs', {Name: req.query.album_name,  theId: req.params.id});
// });

// https://localhost:3000/albums/205/edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('album.Edit : ' + req.params.id);
    res.render('albumPatch.ejs', {name: req.query.album_name, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('album.Delete : ' + req.params.id);
    res.render('albumDelete.ejs', {name: req.query.album_name, theId: req.params.id});
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("albums.POST");
    try {
        await albumsDal.addAlbum(req.body.album_name, req.body.artist_name, req.body.album_year, req.body.publisher_id);
        res.redirect('/albums/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});

// PUT, PATCH, and DELETE are part of HTTP, not a part of HTML
// Therefore, <form method="PUT" ...> doesn't work, but it does work for RESTful API

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('albums.PUT: ' + req.params.id);
    try {
        await albumsDal.putAlbum(req.params.id, req.body.album_year, req.body.publisher_id); ;
        res.redirect('/albums/');
    } catch {
        // log this error to an error log file.
        res.render('503');
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('albums.PATCH: ' + req.params.id);
    try {
        await albumsDal.patchAlbum(req.params.id, req.body.album_name);
        res.redirect('/albums/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('albums.DELETE: ' + req.params.id);
    try {
        await albumsDal.deleteAlbum(req.params.id);
        res.redirect('/albums/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // log this error to an error log file.
        res.render('503');
    }
});

module.exports = router