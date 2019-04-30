const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require("uuid/v4");
const collection = require("../config/mongoCollections");
const course = collection.course;
const user = require("./user"); 

function check(num){
  return !isNaN(parseFloat(num))&&isFinite(num);
}

const exportedMethods = {
  async getCourseById(id){
      if (id == null || id == undefined || id == "") throw "You must provide an id to search for";
      if (typeof(id) !== 'string') throw "Invalid id";

      const course_collection = await course();
      const result = await course_collection.findOne({_id:id});
      if(result === null) throw "No such task in MongoDB";
      return result;
  },// get /users/:id
  async addCourse(title, campus, syllabus, book, recommended) {

      const newCourse = {
          _id: uuidv4(),
          title: title,
          campus: campus,
          reviews: [],
          ratings: [],
          syllabus: syllabus,
          book: book,
          recommended: recommended
      };
      
      const course_collection = await course();

      const newInsertInformation = await course_collection.insertOne(newCourse);
      if (newInsertInformation.insertedCount === 0)throw "Could not add task";
      const newId = newInsertInformation.insertedId;

      return await this.getCourseById(newId);;
  },//post /users
  async addReviewCourse(course_id, review_id){
      const course_collection = await course();
      let update_course = await this.getCourseById(course_id);
      update_course.reviews.push(review_id);
      const updatedInfo = await course_collection.updateOne({_id: update_course._id}, { $set: { "title" : update_course.title,
          "campus" : update_course.campus,
          "reviews" : update_course.reviews,
          "ratings" : update_course.ratings,
          "syllabus" : update_course.syllabus,
          "book" : update_course.book,
          "recommended" : update_course.recommended} },{ upsert: true });
      if (updatedInfo.modifiedCount === 0) {
          throw "could not add new review to user successfully";
      }

      return await this.getCourseById(update_course._id);
  },
  async addRatingCourse(course_id, rating){
      const course_collection = await course();
      let update_course = await this.getCourseById(course_id);
      update_course.ratings.push(rating);
      const updatedInfo = await course_collection.updateOne({_id: update_course._id}, { $set: { "title" : update_course.title,
          "campus" : update_course.campus,
          "reviews" : update_course.reviews,
          "ratings" : update_course.ratings,
          "syllabus" : update_course.syllabus,
          "book" : update_course.book,
          "recommended" : update_course.recommended} },{ upsert: true });
      if (updatedInfo.modifiedCount === 0) {
          throw "could not add new review to user successfully";
      }

      return await this.getCourseById(update_course._id);
  }
}

module.exports = exportedMethods;