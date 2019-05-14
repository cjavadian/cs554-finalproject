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
      dislikes
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
      dislikes
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
        dislikes
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
            dislikes
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
    difficulty
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
        dislikes
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
        dislikes
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

const EDIT_COMMENT = gql`
mutation($review_id:String!,$new_review_body: String!,$professor_comment: String!){
  editComment(review_id:$review_id,new_review_body:$new_review_body,professor_comment:$professor_comment){
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
        time
      }
    }
  }
`
const DELETE_COMMENT = gql`
mutation($review_id:String!,$course_id: String!){
  deleteComment(review_id:$review_id,course_id:$course_id){
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

const GET_REVIEW = gql `
mutation($user_id:String!){
  getReview(user_id: $user_id){
    review_id
    course_title
    professor
    review_content
    recommend  
    likes
    dislikes
    time
  }
}
`
const GET_COURSE_REVIEW_WITH_USER_BLONG_STATUS = gql `
query($course_id: String!, $user_email: String!){
  showCourseReview(course_id: $course_id, user_email: $user_email){
    _id
    title
    description
    instructor
    campus
    ratings
    difficulty
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
      time
      userStatus
    }
  }
}`

const NEW_EDIT_COMMENT = gql`
mutation($review_id:String!,$new_review_body: String!,$professor_comment: String!){
  newEditComment(review_id:$review_id,new_review_body:$new_review_body,professor_comment:$professor_comment){
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
        time
        userStatus
      }
    }
  }
`

const NEW_REVIEW_COURSE = gql`
mutation($course_id: String!, $user_id: String!, $professor: String!, $review_body: String!, $recommended: Boolean!, $ratings: Int!, $difficulty: Int!){
  newReviewCourse(course_id: $course_id, user_id: $user_id, professor: $professor, review_body: $review_body, recommended: $recommended, ratings: $ratings, difficulty: $difficulty){
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
        time
        userStatus
      }
    }
  }
`

const NEW_ADD_LIKES = gql`
mutation($review_id: String!, $course_id: String!, $email: String!){
    newAddLike(review_id: $review_id, course_id: $course_id, email: $email){
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
        dislikes
        recommend
        time
        userStatus
      }
    }
  }
`

const NEW_DIS_LIKES = gql`
mutation($review_id: String!, $course_id: String!, $email: String!){
  newDisLike(review_id: $review_id, course_id: $course_id, email: $email){
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
        dislikes
        recommend
        time
        userStatus
      }
    }
  }
`

const NEW_DELETE_COMMENT = gql`
mutation($review_id:String!,$course_id: String!){
  newDeleteComment(review_id:$review_id,course_id:$course_id){
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
        time
        userStatus
      }
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
    DIS_LIKES,
    EDIT_COMMENT,
    DELETE_COMMENT,
    GET_REVIEW,
    GET_COURSE_REVIEW_WITH_USER_BLONG_STATUS,
    NEW_EDIT_COMMENT,
    NEW_REVIEW_COURSE,
    NEW_ADD_LIKES,
    NEW_DIS_LIKES,
    NEW_DELETE_COMMENT
}

