const dal = require("./InterwebMusicDataBase_db");

//get all artists.
var getArtists = function() {
  if(DEBUG) console.log("artists.pg.dal.getArtists()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT artist_name, artist_birthday, artist_location, label_id, artist_id as _id FROM artist \
        ORDER BY artist_id DESC LIMIT 7;"
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

var getArtistByArtistName = function(artist_name) {
  if(DEBUG) console.log("artists.pg.dal.getartistByartistName()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT artist_name FROM artist WHERE artist_name = $1";
    dal.query(sql, [artist_name], (err, result) => {
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

var addArtist = function(artist_name, artist_birthday, artist_location, label_id, artist_id) {
  if(DEBUG) console.log("artists.pg.dal.addArtist()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.artist(artist_name, artist_birthday, artist_location, label_id, artist_id) \
        VALUES ($1, $2, $3, $4, $5);";
    dal.query(sql, [artist_name, artist_birthday, artist_location, label_id, artist_id], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var putArtist = function(artist_name, artist_birthday, artist_location, label_id, artist_id) {
    if(DEBUG) console.log("artists.pg.dal.putArtist()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.artist SET artist_name=$1 WHERE artist_id=$5;";
      dal.query(sql, [artist_name, artist_birthday, artist_location, label_id, artist_id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  
  var patchArtist = function(artist_name, artist_birthday, artist_location, label_id, artist_id) {
    if(DEBUG) console.log("artists.pg.dal.patchArtist()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE public.artist SET artist_name=$1  WHERE artist_id=$5;";
      dal.query(sql, [artist_name, artist_birthday, artist_location, label_id, artist_id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  
  var deleteArtist = function(id) {
    if(DEBUG) console.log("artists.pg.dal.deleteArtist()");
    return new Promise(function(resolve, reject) {
      const sql = "DELETE FROM public.artist WHERE artist_id = $1;";
      dal.query(sql, [id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };
  


module.exports = {
    getArtists,
    getArtistByArtistName,
    addArtist,
    putArtist,
    patchArtist,
    deleteArtist,
}