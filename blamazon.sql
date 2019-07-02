DROP DATABASE IF EXISTS blamazon_db;
CREATE DATABASE blamazon_db;

USE blamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (50),
    price DECIMAL (8, 2),
    stock_quantity INT (6),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plastic Lawn Flamingo", "Lawn & Garden", 12.99, 1907);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Richard Nixon Chia Pet", "Lawn & Garden", 9.49, 1974);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Frisco 72-in Cat Tree", "Pets", 65.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Furry Fido Reversible Pet Sling Carrier", "Pets", 23.00, 82);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clumping Cat Litter, 40lb", "Pets", 11.33, 96);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AXE Body Spray - Smells Like Teen Spirit Scent", "HBA", 3.29, 1994);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charmin Ultra-Soft Luxury Triple Roll, 24-pack", "HBA", 12.99, 3008);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("1910 Steinway & Sons Grand Piano", "Musical Instruments", 125000.42, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Plastic Recorder", "Musical Instruments", 6.99, 142);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Willie Nelson's Guitar", "Music Instruments", 62000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas-by-the-bunch", "Grocery", 4.99, 84);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lemons", "Grocery", 0.89, 543);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crystal Pepsi 2-liter", "Grocery", 1.89, 1992);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dawson's Creek - The Complete Third Season", "Media", 27.89, 6);

