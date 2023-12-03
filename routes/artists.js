const express = require('express');
const router = express.Router();
const artistsDal = require('../services/pg.artists.dal')


// https://localhost:3000/artists/
router.get('/', async (req, res) => {
   
    try {
        let theArtists = await artistsDal.getArtists(); 
        if(DEBUG) console.table(theArtists);
        res.render('artists', {theArtists});
    } catch {
        res.render('503');
    }
});

router.get('/:id', async (req, res) => {
   
    try {
        const anArtist = await artistsDal.getArtistById(req.params.id); // from postgresql
        if(DEBUG) console.log(`artists.router.get/:name ${anArtist}`);
        if (anArtist)
            res.render('artist', {anArtist});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});

router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('artist.Replace : ' + req.params.id);
    res.render('artistPut.ejs', {Name: req.query.artist_name, Birthday: req.query.artist_birthday, Location: req.query.artist_location, Label: req.query.label_id, ID: req.params.id});
});

// https://localhost:3000/artists/205/edit
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('artist.Edit : ' + req.params.id);
    res.render('artistPatch.ejs', {Name: req.query.artist_name, Birthday: req.query.artist_birthday, Location: req.query.artist_location, Label: req.query.label_id, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('artist.Delete : ' + req.params.id);
    res.render('artistDelete.ejs', {Name: req.query.artist_name, ID: req.params.id});
});

router.post('/', async (req, res) => {
    if(DEBUG) console.log("artists.POST");
    try {
        await artistsDal.addArtist( req.body.artist_name, req.body.artist_birthday, req.body.artist_location, req.body.label_id, req.body.artist_id);
        
       
        res.redirect('/artists/');

    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});


router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('artists.PUT: ' + req.params.id);
    try {
        await artistsDal.putArtist(req.params.id, req.body.artist_name, req.body.artist_birthday, req.body.artist_location, req.body.label_id, req.body.artist_id); 
        res.redirect('/artists/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});


router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('artists.PATCH: ' + req.params.id);
    try {
        await artistsDal.patchArtist(req.params.id, req.body.artist_name, req.body.artist_birthday, req.body.artist_location, req.body.label_id, req.body.artist_id);
        res.redirect('/artists/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('artists.DELETE: ' + req.params.id);
    try {
        await artistsDal.deleteArtist(req.params.id);
        res.redirect('/artists/');
    } catch (err) {
        if(DEBUG) console.error(err);
        // log this error to an error log file.
        res.render('503');
    }
});

module.exports = router