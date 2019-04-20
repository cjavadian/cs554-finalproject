const graphql = require("graphql");
const{GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLBoolean, GraphQLList} = graphql;
const data = require("../data/");
const userData = data.user;

// const course = new GraphQLObjectType({
// 	name:"Course",
// 	fields:()=>({
// 		_id: {type: GraphQLString},
// 	})
// });

// const review = new GraphQLObjectType({
// 	name:"Review",
// 	fields:()=>({
// 		_id: {type: GraphQLString},
// 	})
// });

const user = new GraphQLObjectType({
	name:"User",
	fields:()=>({
		_id: {type: GraphQLString},
		first_name: {type: GraphQLString},
		last_name: {type: GraphQLString},
		user_name: {type: GraphQLString},
		email: {type: GraphQLString},
		validated: {type: GraphQLBoolean},
		courses: {type: new GraphQLList(GraphQLString)},
  		reviews: {type: new GraphQLList(GraphQLString)}
	})
});

const RootQuery = new GraphQLObjectType({
	name:"RootQueryType",
	fields:{
		getUser:{
			type:user,
			args:{_id:{type:GraphQLString}},//id as query parameter
			async resolve(parent,args){
				//code to get data from db
				return await userData.getUserById(args._id);
			}
		}
	}
});

const RootMutation =  new GraphQLObjectType({
	name:"RootMutationType",
	fields:{
		addUser:{
			type:user,
			args:{first_name: {type: GraphQLString}, last_name: {type: GraphQLString}, user_name: {type: GraphQLString}, email: {type: GraphQLString}},//id as query parameter
			async resolve(parent,args){
				//code to get data from db
				return await userData.addUser(args.first_name, args.last_name, args.user_name, args.email);
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});