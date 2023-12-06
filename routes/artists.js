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
        const anArtist = await artistsDal.getArtistByArtistName(req.params.artist_name); // from postgresql
        if(DEBUG) console.log(`artists.router.get/:name ${anArtist}`);
        if (anArtist)
            res.render('artist', {anArtist});
        else
            res.render('norecord');
    } catch {
        res.render('503');
    }
});





module.exports = router