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
  },
  async getReviewByUserId(user_id){
      if (user_id == null || user_id == undefined || user_id == "") throw "You must provide an user id to search for";
      if (typeof(user_id) !== 'string') throw "Invalid user id";

      const review_collection = await review();
      const result = await review_collection.find({user_id: user_id}).toArray();
      if(result === null) throw "No such task in MongoDB";
      return result;
  },
  async getReviewByCourseId(course_id){
      if (course_id == null || course_id == undefined || course_id == "") throw "You must provide a course id to search for";
      if (typeof(course_id) !== 'string') throw "Invalid course id";

      const review_collection = await review();
      const result = await review_collection.find({course_id: course_id}).toArray();
      if(result === null) throw "No such task in MongoDB";
      return result;
  },
  async addReview(user_id, course_id, professor, review_body, recommend, rating) {

      const newReview = {
          _id: uuidv4(),
          user_id: user_id,
          course_id: course_id,
          professor: professor,
          review_body: review_body,
          likes: 0,
          recommend: recommend
      };
      
      const review_collection = await review();

      const newInsertInformation = await review_collection.insertOne(newReview);
      if (newInsertInformation.insertedCount === 0)throw "Could not add review";
      const newId = newInsertInformation.insertedId;

      //await user.addReviewUser(user_id, newId);
      //await course.addReviewCourse(course_id, newId);
      await course.addRatingCourse(course_id, rating);
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
          "likes" : update_review.likes,
          "recommend" : update_review.recommend} },{ upsert: true });
      if (updatedInfo.modifiedCount === 0) {
          throw "could not add new review to user successfully";
      }
      return await this.getReviewById(update_review._id);
  }
}

module.exports = exportedMethods;