const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require("uuid/v4");
const collection = require("../config/mongoCollections");
const user = collection.user;
const course = require("./course"); 
function check(num){
  return !isNaN(parseFloat(num))&&isFinite(num);
}

const exportedMethods = {
  async getUserById(id){
      if (id == null || id == undefined || id == "") throw "You must provide an id to search for";
      if (typeof(id) !== 'string') throw "Invalid id";

      const user_collection = await user();
      const result = await user_collection.findOne({_id:id});
      if(result === null) throw "No such user in MongoDB";
      return result;
  },// get /users/:id
  async getUserByName(user_name){
      if (user_name == null || user_name == undefined || user_name == "") throw "You must provide an user name to search for";
      if (typeof(user_name) !== 'string') throw "Invalid id";

      const user_collection = await user();
      const result = await user_collection.findOne({user_name : user_name});
      if(result === null) throw "No such user in MongoDB";
      return result;
  },// get /users/:id
  async getUserByEmail(e_mail){
    if (e_mail == null || e_mail == undefined || e_mail == "") throw "You must provide the email to search for";
    if (typeof(e_mail) !== 'string') throw "Invalid type, it should be string";

    const user_collection = await user();
    const result = await user_collection.findOne({email : e_mail});
    if(result === null) throw "No such user in MongoDB";
    return result;
    },
  async getUserCourseById(id){
      const user_collection = await user();
      let query_user = await this.getUserById(id);
      let result = [];
      for(let i = 0; i < query_user.courses.length; ++i){
          let tmp = await course.getCourseById(query_user.courses[i]);
          result.push(tmp);
      }
      return result;
  },// get /users/:id
  async addUser(first_name,last_name,user_name,email) {
      try{
          const newUser = {
            _id: uuidv4(),
            first_name: first_name,
            last_name: last_name,
            user_name:user_name,
            email:email
          };
      
          const user_collection = await user();

          const newInsertInformation = await user_collection.insertOne(newUser);
          if (newInsertInformation.insertedCount === 0)throw "Could not add task";
          const newName = newInsertInformation.ops[0].user_name;

          return await this.getUserByName(newName);
      }
      catch(e){
          console.log(e);
      }
      
  },//post /users
  async updateUser(user_old_name, first_name, last_name, user_name) {
      try{
          const user_collection = await user();
          console.log(user_old_name);
          let update_user = await this.getUserByName(user_old_name);
          const updatedInfo = await user_collection.updateOne({_id: update_user._id}, { $set: {"first_name" : first_name, "last_name" : last_name, "user_name" : user_name,
            "email" : update_user.email} },{ upsert: true });
          if (updatedInfo.modifiedCount === 0) {
            throw "could not update user successfully";
          }
          console.log("fetching new user name");
          console.log(update_user);
          return await this.getUserByName(user_name);
      }
      catch(e){
          console.log(e);
      }

  },//post /users
  async addCourseUser(user_id, course_id){
    try{
        const user_collection = await user();
        let update_user = await this.getUserById(user_id);
        update_user.courses.push(course_id);
        const updatedInfo = await user_collection.updateOne({_id: update_user._id}, { $set: {"first_name" : update_user.first_name, "last_name" : update_user.last_name, "user_name" : update_user.user_name,
            "email" : update_user.email,
            "courses" : update_user.courses,
            "reviews" : update_user.reviews} },{ upsert: true });
        if (updatedInfo.modifiedCount === 0) {
            throw "could not add new course to user successfully";
        }

        return await this.getUserByName(update_user.user_name);
    }
    catch(e){
        console.log(e);
    }  
  },
  async addReviewUser(user_id, review_id){
      try{
          const user_collection = await user();
          let update_user = await this.getUserById(user_id);
          update_user.reviews.push(review_id);
          const updatedInfo = await user_collection.updateOne({_id: update_user._id}, { $set: {"first_name" : update_user.first_name, "last_name" : update_user.last_name, "user_name" : update_user.user_name,
          "email" : update_user.email,
          "courses" : update_user.courses,
          "reviews" : update_user.reviews} },{ upsert: true });

          if (updatedInfo.modifiedCount === 0) {
              throw "could not add new review to user successfully";
          }

          return await this.getUserByName(update_user.user_name);
      }
      catch(e){
        console.log(e);
      }
  }
}

module.exports = exportedMethods;
