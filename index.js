require('dotenv').config()
const express = require("express");
const app = express();
const { CosmosClient } = require("@azure/cosmos");


const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
})

const testingDatabase = async() => {
    const productsDb = client.database("ToDoList");
    const productsContainer = productsDb.container("Products");

    const fetchQuery = {
        query: "SELECT * FROM p WHERE p.id = @id",
        parameters: [{ name: "@id", value: "1" }]
    }

    const { resources: products } = await productsContainer.items.query(fetchQuery).fetchAll();

    const { resources: insertedProduct } = await productsContainer.items.create({ id: "3", name: "Playstation 5", categoryId: "1" });

}

app.listen(3000, () => {
    console.log("server is running!");
    testingDatabase();
})