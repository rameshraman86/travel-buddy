-- Seed data for the itinerary_items table
INSERT INTO itinerary_items (itinerary_id, name, address, description, category, completed)
VALUES
  (1, 'Beach Day', '123 Beach Rd', 'Relax on the beach and enjoy the sun.', 'Leisure', FALSE),
  (1, 'Explore Local Market', '456 Market St', 'Shop for local souvenirs and crafts.', 'Shopping', FALSE),
  (2, 'Visit Museum', '789 Museum Ave', 'Learn about local history and art.', 'Cultural', FALSE),
  (2, 'City Tour', '101 City Tour Blvd', 'Guided tour of the city landmarks.', 'Sightseeing', FALSE),
  (3, 'Fine Dining', '222 Restaurant Ln', 'Enjoy a gourmet dinner at a fancy restaurant.', 'Dining', FALSE),
  (3, 'Food Tasting', '333 Food Plaza', 'Try local delicacies and street food.', 'Food', FALSE),
  (4, 'Conference Keynote', '555 Conference Center', 'Attend the keynote presentation.', 'Conference', FALSE),
  (4, 'Networking Lunch', '666 Conference Center', 'Connect with fellow attendees during lunch.', 'Networking', FALSE),
  (5, 'Hike to Waterfall', '777 Trailhead Rd', 'Explore a scenic trail leading to a waterfall.', 'Adventure', FALSE),
  (5, 'Campfire Night', '888 Campsite Dr', 'Gather around the campfire for stories and marshmallows.', 'Camping', FALSE);
