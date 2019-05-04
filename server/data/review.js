const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require("uuid/v4");
const collection = require("../config/mongoCollections");
const review = collection.review;
const user = require("./user"); 
const course = require("./course"); 

function check(num){
  return !isNaN(parseFloat(num))&&isFinite(num);
}

const exportedMethods = {
  async getReviewById(id){
      if (id == null || id == undefined || id == "") throw "You must provide an id to search for";
      if (typeof(id) !== 'string') throw "Invalid id";

      const review_collection = await review();
      const result = await review_collection.findOne({_id:id});
      if(result === null) throw "No such task in MongoDB";
      return result;
  },// get /users/:id
  async addReview(user_id, course_id, professor, review_body, likes) {

      const newReview = {
          _id: uuidv4(),
          user_id: user_id,
          course_id: course_id,
          professor: professor,
          review_body: review_body,
          likes: 0
      };
      
      const review_collection = await review();

      const newInsertInformation = await review_collection.insertOne(newReview);
      if (newInsertInformation.insertedCount === 0)throw "Could not add review";
      const newId = newInsertInformation.insertedId;
      console.log(user.addReviewUser);
      console.log(course);
      await user.addReviewUser(user_id, newId);
      await course.addReviewCourse(course_id, newId);
      return await this.getReviewById(newId);
  },//post /users
  async addLike(review_id){
      const review_collection = await review();
      let update_review = await this.getReviewById(review_id);
      update_review.likes++;
      const updatedInfo = await review_collection.updateOne({_id: update_review._id}, { $set: { "user_id" : update_review.user_id,
          "course_id": update_review.course_id,
          "professor": update_review.professor,
          "review_body": update_review.review_body,
          "likes" : update_review.likes} },{ upsert: true });
      if (updatedInfo.modifiedCount === 0) {
          throw "could not add new review to user successfully";
      }
      return await this.getReviewById(update_review._id);
  }
}

module.exports = exportedMethods;