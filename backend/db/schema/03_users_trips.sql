-- Drop and recreate Users table 
DROP TABLE IF EXISTS UserTripsAssociation CASCADE;

CREATE TABLE UserTripsAssociation (
  id SERIAL PRIMARY KEY NOT NULL,
  user_email VARCHAR REFERENCES users(email) ON DELETE CASCADE,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE
);