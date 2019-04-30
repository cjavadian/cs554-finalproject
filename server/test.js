const data = require("./data/");
const user = data.user;
const course = data.course;
const review = data.review;
const dbConnection = require("./config/mongoConnection");

const main = async () =>{
	const db = await dbConnection();
	await db.dropDatabase();
	let new_user = await user.addUser("Xinzhe","Li","HHH","xil144@stevens.edu");
    let new_course = await course.addCourse("Science", ["campus", "web"], "xxxx", "Science Book", "yes");
    //console.log(review);

    let new_review = await review.addReview(new_user._id, new_course._id, "Bob", "hhhh", "yes"); 
    await course.addRatingCourse(new_course._id,95);
    await user.addCourseUser(new_user._id, new_course._id)
    //console.log(new_review);
    await db.serverConfig.close();
};
	

main();