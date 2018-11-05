const inquirer = require('inquirer');
require('dotenv').config();
var mysql = require('mysql');
const cTable = require('console.table');

// Define the MySQL connection parameters
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect(function (err) {
    if (err) {
        throw ('error connecting: ' + err.stack);
    }
    console.log("");
    readProducts();
});

function start() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View product sales by Department', 'Create new Department',]
        },
        {
            type: 'list',
            name: 'addId',
            message: 'What is the id of the product?',
            when: function (answers) {
                return answers.choice === 'Add to Inventory';
            },
            validate: function (value) {
                const pass = value.match(/^([1-9][0-9]?)$/);
                if (pass) {
                    return true;
                }
                return 'Please select a valid ID';
            }
        },
        {
            type: 'input',
            name: 'addInv',
            message: 'How many of the product are you adding?',
            when: function (answers) {
                return answers.choice === 'Add to inventory';
            }
        },
        {
            type: 'input',
            name: 'newName',
            message: 'What is the name of the product?',
            when: function (answers) {
                return answers.choice === 'Add new Product';
            }
        },
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the department of the product?',
            when: function (answers) {
                return answers.choice === 'Add new Product';
            }
        },
        {
            type: 'input',
            name: 'newPrice',
            message: 'What is the price of the product?',
            when: function (answers) {
                return answers.choice === 'Add new Product';
            }
        },
        {
            type: 'input',
            name: 'newStock',
            message: 'How much of the product is in stock?',
            when: function (answers) {
                return answers.choice === 'Add new Inventory';
            }
        },
    ]).then((ans) => {
        switch (ans.choice) {
            case 'View products for Sale':
                readProducts();
                break;
            case 'View low inventory':
                viewLow();
                break;
            case 'Add to inventory':
                checkAdd(ans.addId);
                connection.query(
                    'SELECT * FROM products WHERE ?',
                    {
                        item_id: parseInt(ans.addId)
                    },
                    function (err, res) {
                        if (err) throw err;
                        updateProduct(res[0].stock_quantity + parseInt(ans.addInv), parseInt(ans.addId));
                    }
                );
                break;
            case 'Add new product':
                createProduct(ans.newName, ans.newDept, parseInt(ans.newPrice), parseInt(ans.newStock));
                break;
        }
    });
}
// Select item
function checkAdd(num) {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        if (num > res.length) {
            console.log('Please select a valid ID');
            return start();
        }
    });
}
// Update product funtion
function updateProduct(toSet, whatId) {
    connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: toSet
            },
            {
                item_id: whatId
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log('Added stock!');
            reset();
        }
    );
}
// Print all items on table
function readProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
} 

// View low inventory
function viewLow() {
    connection.query(
        'SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
            if (err) throw err;
            console.table(res);
            reset();
        }
    );
}

// Create product function
function createProduct(name, dept, price, stock) {
    connection.query(
        "INSERT INTO products SET ?", {
            product_name: name,
            department_name: dept,
            price: price,
            stock_quantity: stock,
            product_sales: 0,
        },
        function (err, res) {
            if (err) throw err;
            console.log('New product added!\n');
            reset();
        }
    );
}


// RESET function
function reset() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'restart',
            message: 'Do something else?'
        }
    ]).then(ans => {
        if (ans.restart)
            return start();
        return end();
    });
}

function end() {
    connection.end(function (err) {
        console.log('BYE');
    });
}