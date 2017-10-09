var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
var currentInventory = [];
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "poop500",
	database: "bamazon"
});

connection.connect(function(err){
	if(err){
		throw err;
	}
	//put functions here
	mainMenu();
	//console.log("Connected as id " + connection.threadID);
});

function mainMenu(){
	inquirer.prompt([
		{
			type: "list",
			name: "main",
			message: "What would you like to do?",
			choices: ["Display items for sale", "Exit"]
		}
	]).then(function(answers){
		if(answers.main === "Display items for sale"){
			showAllProducts();
		} else {
			connection.end();
		}
	})
};

function showAllProducts(){
	connection.query("SELECT * FROM products", function(err, results){
		if(err){
			throw err;
		};
		currentInventory = [];
		for(i = 0; i < results.length; i++){
			currentInventory.push(results[i]);
		}
		console.table(results);
		forSaleID();
	});
};

function forSaleID(){
	inquirer.prompt([
		{
			type: "input",
			name: "forsaleid",
			message: "What item would you like to buy? Enter the corresponding ID",
		}
	]).then(function(answers){
		if(parseInt(answers.forsaleid) <= currentInventory.length){
			var name = currentInventory[parseInt(answers.forsaleid) - 1].product_name;
			var quantity = currentInventory[parseInt(answers.forsaleid) - 1].stock_quantity;
			forSaleQuantity(answers.forsaleid, name, quantity);
		} else {
			console.log("Sorry, that is not a valid ID. Please try again.");
			forSaleID();
		}
	})
};

function forSaleQuantity(id, name, quantity){
	inquirer.prompt([
		{
			type: "input",
			name: "forsalequantity",
			message: "How many units of " + name + " would you like to buy? (" + quantity + " units currently in stock)",
		}
	]).then(function(answers){
		if(parseInt(answers.forsalequantity) <= currentInventory[id - 1].stock_quantity){
			var newquantity = parseInt(quantity) - parseInt(answers.forsalequantity);
			var price = currentInventory[id - 1].price;
			applyChanges(id, newquantity);
			showReceipt(id, name, answers.forsalequantity, price);
		} else {
			console.log("Sorry, that number is greater than the current stock. Please try again.");
			forSaleQuantity(id, name);
		}
	})
};

function applyChanges(id, stock_quantity){
	connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity:stock_quantity},{item_id:id}]);
	refreshLocalInventory();
};

function refreshLocalInventory(){
	connection.query("SELECT * FROM products", function(err, results){
		if(err){
			throw err;
		};
		currentInventory = [];
		for(i = 0; i < results.length; i++){
			currentInventory.push(results[i]);
		}
	});
};

function showReceipt(id, name, quantity, price){
	var total = quantity * price;
	console.log("Your purchase has been successful.");
	console.log(quantity + " unit(s) of " + name + " at $" + price + " per unit");
	console.log("TOTAL: $" + total);
	mainMenu();
};