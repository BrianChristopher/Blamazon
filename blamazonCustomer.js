const mysql = require('mysql');
const { table } = require('table');
const inquirer = require('inquirer');

let tableData = [];
let item = 0;
let quantity = 0;
let newQuantity = 0;


const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "root",
    database: "blamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId + "\n");
    //connection.end();
    displayInventory();

});


let displayInventory = function () {
    console.log("\nBLAMAZON PRODUCTS FOR SALE\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Create a table, an array of arrays. Log all results of the SELECT statement.
        for (let i = 0; i < res.length; i++) {
            let id = res[i].item_id;
            let name = res[i].product_name;
            let price = "$" + res[i].price;
            let tableRow = [];
            tableRow.push(id, name, price);
            tableData.push(tableRow);
        }
        output = table(tableData);
        console.log(output);

        buyProduct();
    });
};

let buyProduct = function () {
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'item',
                message: "Select the item number you would like to purchase."
            },
            {
                type: 'number',
                name: 'quantity',
                message: "How many would you like to purchase?"
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            item = answers.item;
            quantity = answers.quantity;

            if (item > 0 && item <= tableData.length) {

                connection.query("SELECT * FROM products WHERE item_id = ?", item, function (err, res) {
                    if (err) throw err;
                    let price = res[0].price;
                    let stock = res[0].stock_quantity;

                    if (quantity > stock) {
                        console.log("\nWe're sorry. There are insufficient quantities in stock to fulfill your order. \nRestart BLAMAZON to make a different purchase.");
                        connection.end();
                        
                    }
                    else {
                        console.log("The total cost of your order is $" + (quantity * price) + ".\nThank you for shopping Blamazon.");
                        newQuantity = stock - quantity;
                        updateDatabase();
                    }
                });
            }
            else {
                console.log("That is not an item. Please select an item by item number.")
            }
        });
};

let updateDatabase = function () {
    //console.log(item, newQuantity);

    connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${item}`, function (error, results, fields) {
        if (error) throw error;

    })
    connection.end();
}


