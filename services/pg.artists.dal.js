const dal = require("./InterwebMusicDataBase_db");

//get all artists.
var getArtists = function() {
  if(DEBUG) console.log("artists.pg.dal.getArtists()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT artist_id AS _id, artist_name, artist_birthday, artist_location, label_id FROM artist \
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

var getArtistByArtistId = function(id) {
  if(DEBUG) console.log("artists.pg.dal.getartistByartistId()");
  return new Promise(function(resolve, reject) {
    const sql = "SELECT artist_id AS _id, artist_name FROM artist WHERE artist_id = $1";
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

var addArtist = function(aName) {
  if(DEBUG) console.log("artists.pg.dal.addArtist()");
  return new Promise(function(resolve, reject) {
    const sql = "INSERT INTO public.artist(artist_name) \
        VALUES ($1, $2);";
    dal.query(sql, [aName], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};
var putArtist = function(id, aName) {
  if(DEBUG) console.log("artists.pg.dal.putArtist()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.artist SET artist_name=$2 WHERE artist_id=$1;";
    dal.query(sql, [id, aName], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};
var patchArtist = function(id, aName) {
  if(DEBUG) console.log("artists.pg.dal.patchArtist()");
  return new Promise(function(resolve, reject) {
    const sql = "UPDATE public.artist SET artist_name=$ 2WHERE artist_id=$1;";
    dal.query(sql, [id, aName], (err, result) => {
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
    getArtistByArtistId,
    addArtist,
    putArtist,
    patchArtist,
    deleteArtist,
}