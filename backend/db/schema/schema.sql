
DROP TABLE IF EXISTS trips;

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  trip_url VARCHAR(255) UNIQUE NOT NULL,
  trip_name VARCHAR(255) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_editable BOOLEAN NOT NULL DEFAULT TRUE
);



-- id
-- trip_url (must be unique)
-- trip_name
-- start_date
-- end_date
-- is_editable = yes
