CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  name TEXT,
  username TEXT,
  password TEXT,
  address TEXT,
  contact_number TEXT,
  usertype NUMBER

);

INSERT INTO users(email, name, username, password, address, contact_number, usertype) VALUES ('testemail','Test User', 'seller', 'password', 'Test Address', 'Contact number', 1);
