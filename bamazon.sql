CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity int (11) NOT NULL
    
);    

ALTER TABLE products
ADD product_sales int (11) NOT NULL;
    
-- Insert data into the 'products' table --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Turkey trouble', 'Books', 7.99, 537),
				('After Nightfall', 'Books',7.48, 301),
                ('Bleak Harbor: A Novel', 'Books',4.99, 13),
				('Head & Shoulders Classic', 'Health and Beauty', 14.50, 93),
                ('Franklin Sports NFL Deluxe Youth Uniform Set', 'Sports', 65.68, 2294),
                ('Wilson NFL MVP Junior Football w/ Pump & Tee', 'Sports', 8.99, 389),
                ('Wilson Traditional Soccer Ball', 'Sports', 8.27, 1340),
                ('Franklin Sports Black Hawk Portable Soccer Goal', 'Sports', 19.99, 882),
                ('Franklin Sports Ball Maintenance Kit: Pump', 'Sports', 7.99, 1374),
                ('Champion Sports Economy Electric Inflating Air Pump','Electronics', 78.86, 32),
                ('Coleman Sundome 4-Person Tent', 'Outdoors', 52.97, 2676),
                ('Coleman Palmetto Cool Weather Adult Sleeping Bag', 'Outdoors', 22.99, 3842),
                ('Coleman Evanston Dome Tent with Screen Room', 'Outdoors', 127.27, 1325),
                ('Image Portable LED Camping Lantern with Ceiling Fan', 'Electronics', 13.99, 2516),
                ('MalloMe Camping Tent Lantern Bulb Lights - 4 Pack', 'Electronics', 8.66, 125),
                ('Intex Explorer K2 Kayak, 2-Person Inflatable Kayak', 'Outdoors', 79.99, 1969),
                ('Stearns Adult Classic Series Vest', 'Outdoors', 22.63, 795),
                ('Intex Challenger K1 Kayak', 'Outdoors', 67.42, 1950),
                ('Inflatable Stand Up Board With Fins', 'Outdoors', 369.00, 2),
                ('RED Paddle 2018 Co. RIDE Inflatable Paddle', 'Outdoors', 1249.99, 5),
                ('Body Glove Aquatic Aire Snorkel Mask', 'Accessories', 79.99, 1),
                ('Weightlifting Gloves with Integrated','Accessories', 29.99, 7),
                ('Leather Palm for Fitness Workout', 'Accessories', 8.99, 155);
                
                SELECT * FROM products;
                
	CREATE TABLE departments (
	item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_id VARCHAR (255) NOT NULL,
    department_name VARCHAR (255) NOT NULL,
    over_head_costs VARCHAR (255) NOT NULL
);    
