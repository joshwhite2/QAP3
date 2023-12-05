var router = require('express').Router();
const artistsDal = require('../../services/pg.artists.dal')


// api/artists
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists/ GET ' + req.url);
    try {
        let theArtists = await artistsDal.getArtists(); 
        res.json(theArtists);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// api/artists/:id
router.get('/:artist_name', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists/:artist_name GET ' + req.url);
    try {
        let anArtist = await artistsDal.getArtistByartistName(req.params.artist_name); 
        if (anArtist.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(anArtist);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.post('/', async (req, res) => {
    if(DEBUG) { 
        console.log('ROUTE: /api/artists/ POST');
        // console.log(req);
    }
    try {
        await artistsDal.addArtist(req.body.artist_name, req.body.artist_birthday, req.body.artist_location, req.body.label_id, req.body.artist_id);
        res.statusCode = 201;
        res.json({message: "Created", status: 201});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    } 
});
router.put('/:artist_name', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists PUT ' + req.params.artist_name);
    try {
        await artistsDal.putArtist(req.params.id, req.body.artist_name);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.patch('/:artist_name', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists PATCH ' + req.params.artist_name);
    try {
        await artistsDal.patchArtist(req.params.artist_name, req.body.artist_name);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.delete('/:artist_name', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists DELETE ' + req.params.artist_name);
    try {
        await artistsDal.deleteArtist(req.params.artist_name);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;