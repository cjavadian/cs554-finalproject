const express = require("express");
const expressgraphql = require("express-graphql");
const schema =  require("./schema/schema.js")

const app = express();

app.use("/graphql",expressgraphql({
	schema:schema,
	graphiql: true
}));

app.listen(7050,()=>{
 	console.log("We've got a server!");
 	console.log("Your routes will be running on http://localhost:7050");
});

