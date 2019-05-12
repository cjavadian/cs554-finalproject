import {gql} from "apollo-boost";

const addUserMutation = gql`
    mutation($first_name:String!, $last_name:String!, $user_name:String!, $email:String!){
        addUser(first_name: $first_name, last_name: $last_name, user_name: $user_name, email:$email){
            _id
            email
        }
    }
`

const GET_USER = gql`
query($e_mail: String!){
    user(e_mail: $e_mail){
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

const getUser = gql`
mutation($e_mail: String!){
    user(e_mail: $e_mail){
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
    allcourses{
        _id
        title
        campus
        ratings
        difficulty
        review {
            _id
            professor
            review_body
            likes
            recommend
            time
        }
        }
  }
`
const GET_COURSE_BY_ID = gql`
query($id: String!){
    course(id: $id){
    _id
    title
    instructor
    description
    campus
    ratings
    review{
      _id
      user{
        email
      }
      professor
      review_body
      likes
      dislikes
      recommend
      time
    }
  }
}
`

const GET_COURSE_BY_TITLE = gql`
query($title: String!){
    course(title: $title){
    _id
    title
    instructor
    description
    campus
    ratings
    review{
      _id
      professor
      review_body
      likes
      dislikes
      recommend
      time
    }
  }
}
`

const REVIEW_COURSE = gql`
mutation($course_id: String!, $user_id: String!, $professor: String!, $review_body: String!, $recommended: Boolean!, $ratings: Int!, $difficulty: Int!){
    reviewCourse(course_id: $course_id, user_id: $user_id, professor: $professor, review_body: $review_body, recommended: $recommended, ratings: $ratings, difficulty: $difficulty){
      _id
      title
      instructor
      description
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
        dislikes
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

const DIS_LIKES = gql`
mutation($review_id: String!, $course_id: String!){
    disLike(review_id: $review_id, course_id: $course_id){
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
const SEARCH_STUPID_COURSES = gql `
query($title: String!){
  searchCourses(title: $title){
  _id
  title
  instructor
  description
  campus
}
}
`


export{
    addUserMutation,
    getUser,
    GET_USER,
    UPDATE_USER,
    GET_ALL_COURSES,
    GET_COURSE_BY_ID,
    GET_COURSE_BY_TITLE,
    SEARCH_STUPID_COURSES,
    REVIEW_COURSE,
    ADD_LIKES,
    DIS_LIKES
}

