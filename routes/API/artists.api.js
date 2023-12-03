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
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists/:id GET ' + req.url);
    try {
        let anArtist = await artistsDal.getArtistByartistId(req.params.id); 
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
        await artistsDal.addArtist(req.body.artist_name);
        res.statusCode = 201;
        res.json({message: "Created", status: 201});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    } 
});
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists PUT ' + req.params.id);
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
router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists PATCH ' + req.params.id);
    try {
        await artistsDal.patchArtist(req.params.id, req.body.artist_name);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/artists DELETE ' + req.params.id);
    try {
        await artistsDal.deleteArtist(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// // list the active api routes
// if(DEBUG) {
//     router.stack.forEach(function(r){
//         if (r.route && r.route.path){
//         console.log(r.route.path)
//         }
//     });
// }
module.exports = router;