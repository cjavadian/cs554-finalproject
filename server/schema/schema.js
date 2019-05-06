const graphql = require("graphql");
const{GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema, 
	GraphQLBoolean, 
	GraphQLList,
	GraphQLFloat,
	GraphQLInt,
	GraphQLNonNull} = graphql;
const data = require("../data/");
const userData = data.user;
const course = data.course;
const review = data.review;

const userInfoInCourseReview = new GraphQLObjectType({
	name: "userInfoInCourseReview",
	description: "User Info in the review when Query a specific course",
	fields: () => ({
		user_name: {
			type: GraphQLString,
			resolve: (user, args) => {
				return user.user_name;
			}}
	})
});

const courseReview = new GraphQLObjectType({
	name:"courseReview",
	description: 'Query review by course id',
	fields:()=>({
		_id: {type: GraphQLString},
        user: {
			type: userInfoInCourseReview,
			async resolve(parent, args) {
				try {
					return await userData.getUserById(parent.user_id);
				}catch(e) {
					console.log(e);
				}
		}},
        professor: {type: GraphQLString},
		review_body: {type: GraphQLString},
		likes: {type: GraphQLInt},
		recommend: {type: GraphQLBoolean}
	})
});

const courseType = new GraphQLObjectType({
	name:"courseType",
	description: 'Course query type definition',
 	fields:()=>({
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		campus: {type: GraphQLBoolean},
		ratings: {type: GraphQLFloat},
		review: {
			type: new GraphQLList(courseReview),
			async resolve(course, args) {
				try {
					const reviewInfo = await review.getReviewByCourseId(course._id);
					console.log(JSON.stringify(reviewInfo));
					return reviewInfo;
				} catch (e) {
					console.log(e);
				}
			}
		}
 	})
});

const userCourseReview = new GraphQLObjectType ({
	name: "userCourseReview",
	description: "User course review type",
	fields: ()=>({
		course_title: {
			type: GraphQLString,
			async resolve(userReview, args) {
				try {
					const courseInfo = await course.getCourseById(userReview.course_id);
					return courseInfo.title;
				}catch(e) {
					console.log(e);
				}
		}},
		review_content: {
			type: GraphQLString,
			async resolve(userReview, args) {
				return userReview.review_body;
			}
		},
		recommend: {
			type: GraphQLBoolean,
			async resolve(userReview, args) {
				return userReview.recommend;
			}
		},
		likes: {
			type: GraphQLInt,
			async resolve(userReview, args) {
				return userReview.likes;
			}
		}
	})
});

const userType = new GraphQLObjectType({
	name:"userType",
	description: 'User query type definition',
	fields:()=>({
		_id: {type: GraphQLString},
		first_name: {type: GraphQLString},
		last_name: {type: GraphQLString},
		user_name: {type: GraphQLString},
		email: {type: GraphQLString},
		courses_reviewed: {
			type: new GraphQLList(userCourseReview),
			async resolve(user, args) {
				try {
					return await review.getReviewByUserId(user._id);
				}catch(e) {
					console.log(e);
				}
			}}
	})
});

const RootQuery = new GraphQLObjectType({
	name:"RootQueryType",
	fields:{
		user:{
			type: userType,
			args: {username: {type: new GraphQLNonNull(GraphQLString)}},//username as query parameter
			async resolve(parent,args){
				try {
					const userInfo = await userData.getUserByName(args.username);
					console.log(JSON.stringify(userInfo));
					return userInfo;
				} catch (e) {
					console.log(e);
				}
			}
		},
		course: {
			type: courseType,
			description: "Query a single course",
			args: {
				id: {type: new GraphQLNonNull(GraphQLString)}
			},
			async resolve(parent, args) {
				try {
					return await course.getCourseById(args.id);
				} catch(e) {
					console.log(e);
				}
			}
		},
		courses: {
			type: new GraphQLList(courseType),
			description: "Query all courses",
			async resolve(parent, args) {
				try {
					return await course.getAllCourse();
				} catch(e) {
					console.log(e);
				}
			}
		}
	}
});

const RootMutation =  new GraphQLObjectType({
	name:"RootMutationType",
	fields:{
		addUser:{
			type:userType,
			args:{
				first_name: {type: new GraphQLNonNull(GraphQLString)}, 
				last_name: {type: new GraphQLNonNull(GraphQLString)}, 
				user_name: {type: new GraphQLNonNull(GraphQLString)}, 
				email: {type: new GraphQLNonNull(GraphQLString)}},//id as query parameter
			async resolve(parent,args){
				//code to get data from db
				try{
					return await userData.addUser(args.first_name, args.last_name, args.user_name, args.email);
				} catch(e) {
					console.log(e);
				}
			}
		},
		updateUser: {
			type: userType
		},
		deleteUser: {
			type: userType
		},
		addCourse: {
			type: courseType,
			args: {
				title: {type: GraphQLString},
          		campus: {type: GraphQLBoolean}
			},
			async resolve(parent, args) {
				try {
					return await course.addCourse(args.title, args.campus);
				} catch (e) {
					console.log(e);
				}
			}
		},
		reviewCourse: {
			type: courseType,
			args: {
				course_id: {type: new GraphQLNonNull(GraphQLString)},
				user_id: {type: new GraphQLNonNull(GraphQLString)},
				professor: {type: new GraphQLNonNull(GraphQLString)},
				review_body: {type: new GraphQLNonNull(GraphQLString)},
				recommended: {type: new GraphQLNonNull(GraphQLBoolean)}
			},
			async resolve(parent, args) {
				try {
					await review.addReview(args.user_id, args.course_id, args.professor, args.review_body, args.recommended);
					return await course.getCourseById(args.course_id);
				} catch (e) {
					console.log(e);
				}
			}
		},
		addLike: {
			type: courseType,
			args: {
				review_id: {type: new GraphQLNonNull(GraphQLString)},
				course_id: {type: new GraphQLNonNull(GraphQLString)}
			},
			async resolve(parent, args) {
				try {
					await review.addLike(args.review_id);
					return await course.getCourseById(args.course_id);
				} catch(e) {
					console.log(e);
				}
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});