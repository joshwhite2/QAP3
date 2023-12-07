-- CREATE TABLE artist(
-- 	artist_name VARCHAR PRIMARY KEY,
-- 	artist_birthday INTEGER,
-- 	artist_location VARCHAR,
-- 	label_id INTEGER
-- );

-- CREATE TABLE publisher(
-- 	publisher_id SERIAL PRIMARY KEY,
-- 	publisher_name VARCHAR NOT NULL	
-- );

-- CREATE TABLE album (
-- 	album_id SERIAL PRIMARY KEY,
-- 	album_name VARCHAR(255) NOT NULL,
-- 	artist_name VARCHAR(100) REFERENCES artist(artist_name),
-- 	album_year INTEGER,
-- 	publisher_id INTEGER REFERENCES publisher(publisher_id)
-- );

-- Insert data into Artists table
-- INSERT INTO artist (artist_name, artist_birthday, artist_location, label_id)
-- VALUES
--     ('Debbie Harry', 1956, 'New York', 1),
--     ('Bonnie Tyler', 1952, 'Los Angeles', 2),
--     ('Kate Bush', 1950, 'Chicago', 3);
	
-- INSERT INTO publisher (publisher_id, publisher_name)
-- VALUES
--     ('1', '80s Fem Records'),
--     ('2', 'Power Pop Music'),
--     ('3', 'Discos Discs');
	 
-- INSERT INTO album (album_name, artist_name, album_year, publisher_id)
-- VALUES
--     ('The Dreaming', 'Kate Bush', 1982, 1),
--     ('AutoAmerican', 'Debbie Harry', 1980, 2),
--     ('Faster than the speed of night', 'Bonnie Tyler', 1984, 3);

ALTER TABLE artist
ADD COLUMN artist_id SERIAL ;
	
SELECT * from album
SELECT * from artist

DELETE from album
WHERE album_id = '12' 

UPDATE album 
SET album_year = 1985
WHERE album_name = 'Faster than the speed of night' AND artist_name = 'Bonnie Tyler';