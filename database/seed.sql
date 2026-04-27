USE store_rating_db;

-- ADMIN USER
INSERT INTO users (name, email, password, address, role)
VALUES (
  'Admin',
  'admin@test.com',
  '$2b$10$I0g6BW5COKR.kI923r1bH.HtyFCXHBAqPbyjGPCVX6TmdjwNyvQYe',
  'Pune, India',
  'admin'
);