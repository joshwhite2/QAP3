const express = require('express');
const router = express.Router();
const albumsDal = require('../services/pg.albums.dal');
DEBUG = true;
// https://localhost:3000/albums/
router.get('/', async (req, res) => {
    try {
        let theAlbums = await albumsDal.getAlbums();
        if (DEBUG) console.table(theAlbums);
        res.render('albums', { theAlbums });
    } catch {
        res.render('503');
    }
});

// GET route for rendering the form to replace album data
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('album.Replace : ' + req.params.id);
    res.render('albumPut.ejs', {Name: req.query.album_name, Artist: req.query.artist_name, Year: req.query.album_year,  theId: req.params.id});
});

// GET route for rendering the form to edit album data
router.get('/:id/edit', async (req, res) => {
    if (DEBUG) console.log('album.Edit : ' + req.params.id);
    res.render('albumPatch.ejs', { theId: req.params.id });
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('album.Delete : ' + req.params.id);
    res.render('albumDelete.ejs', {name: req.query.album_name, theId: req.params.id});
});


// GET route for rendering an album by ID
router.get('/:id', async (req, res) => {
    try {
        const anAlbum = await albumsDal.getAlbumByAlbumId(req.params.id);
        if (anAlbum.length === 0) {
            res.render('norecord');
        } else {
            res.render('album', { anAlbum });
        }
    } catch {
        res.render('503');
    }
});

// POST route for adding a new album
router.post('/', async (req, res) => {
    if (DEBUG) console.log("albums.POST");
    try {
        await albumsDal.addAlbum(req.body.album_name, req.body.artist_name, req.body.album_year, req.body.publisher_id);
        res.redirect('/albums/');
    } catch {
        res.render('503');
    }
});

// PUT route for updating album data
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('albums.PUT: ' + req.params.id);
    try {
        await albumsDal.putAlbum(req.params.id, req.body.album_name, req.body.artist_name, req.body.album_year, req.body.publisher_id); ;
        res.redirect('/albums/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});


// DELETE route for deleting an album
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
