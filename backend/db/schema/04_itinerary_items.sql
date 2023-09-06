DROP TABLE IF EXISTS itinerary_items CASCADE;

CREATE TABLE itinerary_items(
  id SERIAL PRIMARY KEY NOT NULL,
  itinerary_id INTEGER REFERENCES itinerary(id) ON DELETE CASCADE,
  trip_id INTEGER REFERENCES trips(id) ON DELETE CASCADE,
  name VARCHAR(255),
  address VARCHAR(255),
  description VARCHAR(1000),
  category VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE
);


-- trigger to set trip_id in itinerary_items to match the trip_id in itinerary
CREATE OR REPLACE FUNCTION set_trip_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Set the trip_id in itinerary_items to match the trip_id in itinerary
  NEW.trip_id := (SELECT trip_id FROM itinerary WHERE id = NEW.itinerary_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger on itinerary_items
CREATE TRIGGER set_trip_id_trigger
BEFORE INSERT ON itinerary_items
FOR EACH ROW
EXECUTE PROCEDURE set_trip_id();