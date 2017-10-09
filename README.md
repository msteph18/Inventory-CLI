# Inventory-CLI
This is a Command Line Interface-based Node.js application that pulls information from a SQL database.

#Functions
  This application is able to:
    *View current inventory
    *Edit current inventory
    
#Overview
  1. At the main menu, you can choose to view the current inventory before making a purchase.  Select "Display items for sale".
  2. The console will then display a table with all the current products in stock.  It will display the following:
    *A unique Item ID.
    *The product's name.
    *The product's department's name.
    *The price of the product (in dollars).
    *The stock quantity of the item.
  3. The user is then prompted to enter the number corresponding to the item that they wish to purchase.
    *If the ID that the user enters is not valid, it will alert the user and prompt for a product ID again.
  4. After entering a valid ID, the user is prompted for the quantity they wish to purchase.
    *The prompt also includes the current inventory for that item in case the table is so large that the previous quantity is no longer in view.
  5. The user then enters the amount of that item that they wish to purchase.
    *If the quantity that the user enters is larger than the current amount in the inventory, it will alert the user and prompt for a quantity again.
  6. The inventory is then updated through a SQL command that updates the quantity field with a value equal to the current inventory quantity minus the amount entered by the user.
  7. A receipt is then displayed showing the total quantity puchased as well as the total cost of that purchase.
  8. The user is then returned to the main menu.
