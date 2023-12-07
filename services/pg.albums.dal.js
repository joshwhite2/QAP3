const dal = require("./InterwebMusicDataBase_db");

//get all albums.
var getAlbums = function() {
    if(DEBUG) console.log("albums.pg.dal.getAlbums()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT album_id AS _id, album_name, artist_name, album_year, publisher_id FROM album \
          ORDER BY album_id DESC LIMIT 7;";
      dal.query(sql, [], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };
var getAlbumByAlbumId = function(id) {
  if(DEBUG) console.log("albums.pg.dal.getAlbumByAlbumId()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT album_id AS _id, album_name FROM album WHERE album_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var addAlbum = function(albumName, artistName, album_year, publisher) {
    if(DEBUG) console.log("albums.pg.dal.addAlbum()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO public.album(album_name, artist_name, album_year, publisher_id) \
          VALUES ($2, $3, $4, $5);";
      dal.query(sql, [albumName, artistName, album_year, publisher], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
        } else {
            resolve(result.rows);
        }
      }); 
    });
  };

  var deleteAlbum = function(id) {
    if(DEBUG) console.log("albums.pg.dal.deleteAlbum()");
    return new Promise(function(resolve, reject) {
      const sql = "DELETE FROM public.album WHERE album_id = $1;";
      dal.query(sql, [id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  var putAlbum = function(id, albumName) {
    if(DEBUG) console.log("albums.pg.dal.putAlbum()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.album SET album_name=$2 WHERE album_id=$1;";
      dal.query(sql, [id, albumName], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    });
  
  };
  
module.exports = {
    getAlbums,
    getAlbumByAlbumId,
    addAlbum,
    putAlbum,
    patchAlbum,
    deleteAlbum,
}