import {gql} from "apollo-boost";

const addUserMutation = gql`
    mutation($first_name:String!, $last_name:String!, $user_name:String!, $email:String!){
        addUser(first_name: $first_name, last_name: $last_name, user_name: $user_name, email:$email){
        	_id
        }
    }
`

const GET_USER = gql`
query($username: String!){
    user(username: $username){
      _id
    first_name
    last_name
    user_name
    email
    courses_reviewed{
      review_id
      course_id
      course_title
      professor
      review_content
      recommend
      likes
    }
    }
  }
`

const UPDATE_USER = gql`
mutation($user_old_name: String!, $first_name: String, $last_name: String, $user_name: String){
    updateUser(user_old_name: $user_old_name,first_name: $first_name,last_name: $last_name,user_name: $user_name){
      _id
      first_name
      last_name
      user_name
      email
      courses_reviewed{
        review_id
        course_id
        course_title
        professor
        review_content
        recommend
        likes
      }
    }
  }
`

const GET_ALL_COURSES = gql `
    query{
    courses{
      _id
      title
    }
  }
`
const GET_COURSE_BY_ID = gql`
query($id: String!){
    course(id: $id){
    _id
    title
    campus
    ratings
    review{
      _id
      professor
      review_body
      likes
      recommend
    }
  }
}
`

const REVIEW_COURSE = gql`
mutation($course_id: String!, $user_id: String!, $professor: String, $review_body: String!, $recommended: Boolean!, $ratings: Number){
    reviewCourse(course_id: $course_id, user_id: $user_id, professor: $professor, review_body: $review_body, recommended: $recommended, ratings: $ratings){
      _id
      title
      campus
      ratings
      review{
        _id
        user{
          _id
          user_name
          first_name
          last_name
          email
        }
        professor
        review_body
        likes
        recommend
      }
    }
  }
`

const ADD_LIKES = gql`
mutation($review_id: String!, $course_id: String!){
    addLike(review_id: $review_id, course_id: $course_id){
      _id
      title
      campus
      ratings
      review{
        _id
        user{
          _id
          user_name
          first_name
          last_name
          email
        }
        professor
        review_body
        likes
        recommend
      }
    }
  }
`

export{
    addUserMutation,
    GET_USER,
    UPDATE_USER,
    GET_ALL_COURSES,
    GET_COURSE_BY_ID,
    REVIEW_COURSE,
    ADD_LIKES
}

