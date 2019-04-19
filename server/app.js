const express=require("express");
const app=express();
const configRoutes=require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
configRoutes(app);

app.listen(7050,()=>{
	console.log("We've got a server!");
	console.log("Your routes will be running on http://localhost:7050");
});