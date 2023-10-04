-- Drop and recreate Users table 
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password VARCHAR(1000) NOT NULL,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE
);