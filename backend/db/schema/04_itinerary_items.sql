DROP TABLE IF EXISTS itinerary_items CASCADE;

CREATE TABLE itinerary_items(
  id SERIAL PRIMARY KEY NOT NULL,
  itinerary_id INTEGER REFERENCES itinerary(id) ON DELETE CASCADE,
  name VARCHAR(255),
  address VARCHAR(255),
  description VARCHAR(1000),
  category VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE
);