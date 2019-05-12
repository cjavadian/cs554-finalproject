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
		_id: {
			type: GraphQLString,
			resolve: (user, args) => {
				return user._id;
			}
		},
		user_name: {
			type: GraphQLString,
			resolve: (user, args) => {
				return user.user_name;
			}},
		first_name: {
			type: GraphQLString,
			resolve: (user, args) => {
				return user.first_name;
			}
		},
		last_name: {
			type: GraphQLString,
			resolve: (user, args) => {
				return user.last_name;
			}
		},
		email: {
			type: GraphQLString,
			resolve: (user, args) => {
				return user.email;
			}
		}
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
		dislikes: {type: GraphQLInt},
		recommend: {type: GraphQLBoolean},
		time: {type: GraphQLString}
	})
});

const courseType = new GraphQLObjectType({
	name:"courseType",
	description: 'Course query type definition',
 	fields:()=>({
		_id: {type: GraphQLString},
		title: {type: GraphQLString},
		description: {type: GraphQLString},
		instructor: {type: GraphQLString},
		campus: {type: GraphQLBoolean},
		ratings: {type: GraphQLFloat},
		difficulty: {type: GraphQLFloat},
		review: {
			type: new GraphQLList(courseReview),
			async resolve(course, args) {
				try {
					const reviewInfo = await review.getReviewByCourseId(course._id);
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
		review_id: {
			type: GraphQLString,
			resolve: (userReview, args) => {
				return userReview._id;
			}
		},
		course_id: {
			type: GraphQLString,
			resolve: (userReview, args) => {
				return userReview.course_id;
			}
		},
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
		professor: {
			type: GraphQLString,
			resolve: (userReview, args) => {
				return userReview.professor;
			}
		},
		review_content: {
			type: GraphQLString,
			resolve: (userReview, args) => {
				return userReview.review_body;
			}
		},
		recommend: {
			type: GraphQLBoolean,
			resolve: (userReview, args) => {
				return userReview.recommend;
			}
		},
		likes: {
			type: GraphQLInt,
			resolve: (userReview, args) => {
				return userReview.likes;
			}
		},
		dislikes: {
			type: GraphQLInt,
			resolve: (userReview, args) => {
				return userReview.dislikes;				;
			}
		},
		time: {
			type: GraphQLString,
			resolve: (userReview, args) => {
				return userReview.time;
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
			args: {e_mail: {type: new GraphQLNonNull(GraphQLString)}},//username as query parameter
			async resolve(parent,args){
				try {
					const userInfo = await userData.getUserByEmail(args.e_mail);
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
				id: {type: GraphQLString},
				title: {type: GraphQLString}
			},
			async resolve(parent, args) {
				try {
					if(args.id) {
					return await course.getCourseById(args.id);
					}
					else {
						return await course.getCourseByTitle(args.title);
					}
				} catch(e) {
					console.log(e);
				}
			}
		},
		allcourses: {
			type: new GraphQLList(courseType),
			description: "Query all courses",
			async resolve(parent, args) {
				try {
					return await course.getAllCourse();
				} catch(e) {
					console.log(e);
				}
			}
		},
		searchCourses: {
			type: new GraphQLList(courseType),
			description: "Search courses",
			args: {
				title: {type: GraphQLString}
			},
			async resolve(parent, args) {
				try {
					const courses = await course.getAllCourse();
					const searchCourse = courses.filter(course => {
						if (course.title) {
						   return course.title.indexOf(args.title) !== -1;
						}
					 })
					 return searchCourse;
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
		user:{
			type: userType,
			args: {e_mail: {type: new GraphQLNonNull(GraphQLString)}},//username as query parameter
			async resolve(parent,args){
				try {
					const userInfo = await userData.getUserByEmail(args.e_mail);
					return userInfo;
				} catch (e) {
					console.log(e);
				}
			}
		},
		updateUser: {
			type: userType,
			args:{
				user_old_name: {type: new GraphQLNonNull(GraphQLString)},
				first_name: {type: GraphQLString},
				last_name: {type: GraphQLString},
				user_name: {type: GraphQLString}
			},
			async resolve(parent, args){
				try{
					return await userData.updateUser(args.user_old_name, args.first_name, args.last_name, args.user_name);
				} catch(e) {
					console.log(e);
				}
			}
		},
		deleteUser: {
			type: userType
		},
		addCourse: {
			type: courseType,
			args: {
				title: {type: GraphQLString},
				instructor: {type: GraphQLString},
				description: {type: GraphQLString},
          		campus: {type: GraphQLBoolean}
			},
			async resolve(parent, args) {
				try {
					return await course.addCourse(args.title, args.campus, args.instructor, args.description);
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
				recommended: {type: new GraphQLNonNull(GraphQLBoolean)},
				ratings: {type: new GraphQLNonNull(GraphQLInt)},
				difficulty: {type: new GraphQLNonNull(GraphQLInt)}
			},
			async resolve(parent, args) {
				try {
					await review.addReview(args.user_id, args.course_id, args.professor, args.review_body, args.recommended, args.ratings, args.difficulty);
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
		},
		disLike: {
			type: courseType,
			args: {
				review_id: {type: new GraphQLNonNull(GraphQLString)},
				course_id: {type: new GraphQLNonNull(GraphQLString)}
			},
			async resolve(parent, args) {
				try {
					await review.adddisLike(args.review_id);
					return await course.getCourseById(args.course_id);
				} catch(e) {
					console.log(e);
				}
			}
		},
		editComment: {
			type:courseType,
			args: {
				review_id: {type: new GraphQLNonNull(GraphQLString)},
				new_review_body: {type : new GraphQLNonNull(GraphQLString)},
				course_id: {type: new GraphQLNonNull(GraphQLString)}
			},
			async resolve(parent,args) {
				try {
					await review.editComment(args.review_id, args.new_review_body);
					return await course.getCourseById(args.course_id);
				}catch(e) {
					console.log(e);
				}
			}
		},
		deleteComment: {
			type:courseType,
			args: {
				review_id: {type: new GraphQLNonNull(GraphQLString)},
				course_id: {type: new GraphQLNonNull(GraphQLString)}
			},
			async resolve(parent,args) {
				try {
					await review.deleteComment(args.review_id);
					return await course.getCourseById(args.course_id);
				}catch(e) {
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