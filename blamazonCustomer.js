const mysql = require('mysql');
const { table } = require('table');
const inquirer = require('inquirer');

let tableData = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "root",
    database: "blamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
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
            let item = answers.item;
            let quantity = answers.quantity;

            if (item > 0 && item <= tableData.length) {

                console.log("Good choice. You are not a complete idiot.")
            }
            else {

                console.log("That is not an item. Please select an item by item number.")
            }



            connection.end();
        });

};


