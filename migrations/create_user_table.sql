
CREATE TABLE if not exists bookMarket(
  id int PRIMARY KEY, 
  book_id int,
  summa INT,
  adress VARCHAR(255),
  FOREIGN KEY (book_id) REFERENCES book(id)
);