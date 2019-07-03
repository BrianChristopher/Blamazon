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
    startProgram();

});

let startProgram = function () {
    console.log("\n-------------------------------------\nBLAMAZON MANAGER SYSTEM version 1.7.2\n-------------------------------------")

    inquirer
        .prompt([
            {
                type: "list",
                message: "MENU OPTIONS",
                choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"],
                name: "menuChoice"
            }
        ])
        .then(function (res) {

            switch (res.menuChoice) {
                case ("View Products"): {
                    displayInventory();
                    break;
                };

                case ("View Low Inventory"): {
                    displayLowInventory();
                    break;
                };

                case ("Add to Inventory"): {
                    addInventory();
                    break;
                };

                case ("Add New Product"): {
                    addProduct();
                    break;
                };

                case ("EXIT"): {
                    exitProgram();
                    break;
                };
            }
        });
}

let displayInventory = function () {
    console.log("\nBLAMAZON PRODUCTS FOR SALE\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Create a table, an array of arrays. Log all results of the SELECT statement.
        let tableHeader = ["ID", "PRODUCT NAME", "PRICE", "STOCK"]
        tableData = [];
        tableData.push(tableHeader);
        for (let i = 0; i < res.length; i++) {
            let id = res[i].item_id;
            let name = res[i].product_name;
            let price = "$" + res[i].price;
            let stock = res[i].stock_quantity;
            let tableRow = [];
            tableRow.push(id, name, price, stock);
            tableData.push(tableRow);
        }
        output = table(tableData);
        console.log(output);
        startProgram();


    });

};

let displayLowInventory = function () {
    console.log("\nBLAMAZON PRODUCTS FOR SALE\n");
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
        if (err) throw err;
        // Create a table, an array of arrays. Log all results of the SELECT statement.
        let tableHeader = ["ID", "PRODUCT NAME", "PRICE", "STOCK"]
        tableData = [];
        tableData.push(tableHeader);
        for (let i = 0; i < res.length; i++) {
            let id = res[i].item_id;
            let name = res[i].product_name;
            let price = "$" + res[i].price;
            let stock = res[i].stock_quantity;
            let tableRow = [];
            tableRow.push(id, name, price, stock);
            tableData.push(tableRow);
        }
        output = table(tableData);
        console.log(output);

        startProgram();
    });
};

// let addInventory = function () {
//     console.log("Add inventory called.");
//     startProgram();
// }

let addProduct = function () {
    console.log("Add product called.");
    startProgram();
}



let addInventory = function () {
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'item',
                message: "Select the product ID you would like to add inventory."
            },
            {
                type: 'number',
                name: 'quantity',
                message: "How many units are you adding to inventory?"
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            item = answers.item;
            addToInventory = answers.quantity;
            connection.query("SELECT * FROM products WHERE item_id = ?", item, function (err, res) {
                if (err) throw err;
                let stock = res[0].stock_quantity;
                newQuantity = stock + addToInventory;
                updateInventory(item, newQuantity)
            });
        });
};

let updateInventory = function (id, newStock) {

    connection.query(`UPDATE products SET stock_quantity = ${newStock} WHERE item_id = ${id}`, function (error, results, fields) {
        if (error) throw error;
    });
    startProgram();
}

let exitProgram = function () {
    console.log("Thank you for using BLAMAZON MANAGER SYSTEM. Have a fantastic day!");
    connection.end();
}


