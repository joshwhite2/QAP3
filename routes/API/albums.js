var router = require('express').Router();
const albumsDal = require('../../services/pg.albums.dal')
// const albumsDal = require('../../services/m.albums.dal')

// api/albums
router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/albums/ GET ' + req.url);
    try {
        let theAlbums = await albumsDal.getAlbums(); 
        res.json(theAlbums);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
// api/albums/:id
router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/albums/:id GET ' + req.url);
    try {
        let anAlbum = await albumsDal.getAlbumByAlbumId(req.params.id); 
        if (anAlbum.length === 0) {
            // log this error to an error log file.
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(anAlbum);
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.post('/', async (req, res) => {
    if(DEBUG) { 
        console.log('ROUTE: /api/albums/ POST');
        // console.log(req);
    }
    try {
        await albumsDal.addAlbum(req.body.album_name, req.body.artist_name, req.body.album_year, req.body.publisher);  
        res.statusCode = 201;
        

        res.json({message: "Created", status: 201});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});
router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/albums PUT ' + req.params.id);
    try {
        await albumsDal.putAlbum(req.params.id, req.body.album_name, req.body.artist_name, req.body.album_year, req.body.publisher_id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/albums DELETE ' + req.params.id);
    try {
        await albumsDal.deleteAlbum(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        // log this error to an error log file.
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

module.exports = router;
