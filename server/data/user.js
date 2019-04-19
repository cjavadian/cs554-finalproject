const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require("uuid/v4");
const collection = require("../config/mongoCollections");
const user = collection.user;

function check(num){
  return !isNaN(parseFloat(num))&&isFinite(num);
}

const exportedMethods = {
  async getUserById(id){
      if (id == null || id == undefined || id == "") throw "You must provide an id to search for";
      if (typeof(id) !== 'string') throw "Invalid id";

      const user_collection = await user();
      const result = await user_collection.findOne({_id:id});
      if(result === null) throw "No such task in MongoDB";
      return result;
  },// get /users/:id
  async addUser(first_name,last_name,user_name,email) {

      const newUser = {
          _id: uuidv4(),
          first_name: first_name,
          last_name: last_name,
          user_name:user_name,
          email:email,
          validated:false,
          courses:[],
          reviews:[]
      };
      
      const user_collection = await user();

      const newInsertInformation = await user_collection.insertOne(newUser);
      if (newInsertInformation.insertedCount === 0)throw "Could not add task";
      const newId = newInsertInformation.insertedId;

      return await this.getUserById(newId);;
  },//post /users
}

module.exports = exportedMethods;