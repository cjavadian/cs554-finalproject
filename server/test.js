const data = require("./data/");
const user = data.user;
const course = data.course;
const review = data.review;
const dbConnection = require("./config/mongoConnection");

const main = async () =>{
	const db = await dbConnection();
	await db.dropDatabase();
	let new_user = await user.addUser("Xinzhe","Li","HHH","xil144@stevens.edu");
    let new_course = await course.addCourse("Science", true);
    await course.addCourse("Physics", true);
    let new_review = await review.addReview(new_user._id, new_course._id, "Bob", "hhhh", true); 
    await review.addReview(new_user._id, new_course._id, "Bob1", "hhhh", true); 
    
    
    await course.addRatingCourse(new_course._id,95);
    await user.addCourseUser(new_user._id, new_course._id);
    await course.addRatingCourse(new_course._id,97);
    await review.addLike(new_review._id);
    await review.adddisLike(new_review._id);
    let comment = await review.getReviewByUserId(new_user._id);
    console.log("commet",comment);
    let new_comment = await review.getReviewByCourseId(new_course._id);
    console.log("new commet",new_comment);
    //let re_course = await user.getUserCourseById(new_user._id);
    //console.log("course",re_course);
    let course_list = await course.getAllCourse();
    console.log("course list",course_list);
    //console.log(new_review);
    await db.serverConfig.close();
};
	

main();