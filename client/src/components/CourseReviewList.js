import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseReviewList.css";
import EditCommentModal from "./CommentModals/EditCommentModal";
import AddCommentModal from "./CommentModals/AddCommentModal";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from "react-icons/fa";
import { GET_USER } from "../queries/queries";
import { Query } from "react-apollo";
import { ADD_LIKES, DIS_LIKES, DELETE_COMMENT, EDIT_COMMENT, getUser, GET_COURSE_BY_ID} from "../queries/queries";
import { graphql, compose } from 'react-apollo';

class CourseReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      likes: 0,
      dislikes: 0,
      email: this.props.email,
      review_user_id: "",
      courseComment: "",
      professorComment: "",
      review_user_email: "",
      review_id: "",
      review: {},
      course: this.props.course
    };
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleCloseModals = this.handleCloseModals.bind(this);
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.setCourse = this.setCourse.bind(this);
  }
  
  handleOpenEditModal(review) {
    if(review.user.email !== this.props.email) return( alert("You are not authorize to modify this comment"));
    this.setState({
      showEditModal: true
    });
    this.setState({review: review});
  }

  setCourse(course) {
    this.setState({course: course});
  }

  async handleDelete(email, review_id, course_id) {
    console.log(email, this.props.email);
    if (email !== this.props.email) {
      return alert("You are not authorize to delete this comment");
    } else {
      if (window.confirm("Are you sure you want to delete the comment?")) {
        await this.props.DELETE_COMMENT({
          variables: {
            review_id: review_id,
            course_id: course_id
          }
        });
      }
    }
  }

  handleCloseModals() {
    this.setState({
      showAddModal: false,
      showEditModal: false,
      showDeleteModal: false
    });
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  async handleLikes(review_id, course_id) {
    //e.preventDefault();
    console.log("id", review_id, course_id);
    await this.props.ADD_LIKES({
      variables: {
        review_id: review_id,
        course_id: course_id
      }
    });
  }

  async handleDislikes(review_id, course_id) {
    //e.preventDefault();
    console.log("id", review_id, course_id);
    await this.props.DIS_LIKES({
      variables: {
        review_id: review_id,
        course_id: course_id
      }
    });
    window.location.reload();
  }

  campus() {
    if (this.props.course.campus === true) return <p>On campus</p>;
    else return <p>Web</p>;
  }

  name(email) {
    return (
      <Query query={GET_USER} variables={{ e_mail: email }}>
        {({ data }) => {
          const userInfo = data;
          if (
            !userInfo ||
            userInfo.user === undefined ||
            userInfo.user === null
          ) {
            return null;
          }
          //console.log(userInfo.user);
          return <p>{userInfo.user.user_name}</p>;
        }}
      </Query>
    );
  }

  displayComment() {
    
    if (this.state && this.state.course && this.state.course.review && this.state.course.review.length === 0) return null;
    console.log(this.props.course.review);
    const reviews = this.props.course.review;
    return reviews.map(review => {
      return (
        <tr className="active" key={review._id}>
          <td className="rating success">
            <div className="date">COMMENT DATE: </div>
            <p className="value">{review.time}</p>
            <div className="rating-block-awesome">
              <div className="rating-wrapper">
                <div className="icon awesome-icon" />
                <div className="rating-type">
                  STUDENT NAME : 
                </div>
                <p className="value">{this.name(review.user.email)}</p>
              </div>
              <div className="courseclass">
                <span className="textbook">
                  RECOMMEND:      
                  </span>
                  <span className="response">
                    {" "}
                    {review.recommend === true ? "Yes" : "No"}
            
                </span>
                {/* <span className="textbook">
                      <div className="professor">PROFESSOR:</div>
                      <span className="response"> {this.props.course.instructor}</span>
                    </span>*/}
              </div>
            </div>
          </td>
          <td colSpan="2" className="comments">
          <div>
            <span className="course"> Course: </span>
            <br/>
            <span className="value1">{review.review_body}</span>
            </div>
            <br/>
            <div>
            <span className="professor">Professor: </span>
            <br/>
            <span className="value1">{review.professor}</span>
            </div>
           
            <div className="helpful-links-thumbs">
 
              <button
                type="button"
                to="#"
                className="helpful btn-outline-primary"
              >
              
                <span
                  className="count"
                  onClick={e =>
                    this.handleLikes(review._id, this.props.course._id)
                  }
                >
               
                  <FaThumbsUp />
                </span>
                {review.likes}
              </button>
                 
              <button
                type="button"
                to="#"
                className="nothelpful btn-outline-primary"
              >
                <span
                  className="count"
                  onClick={e =>
                    this.handleDislikes(review._id, this.props.course._id)
                  }
                >
                  <FaThumbsDown />{" "}
                </span>
                {review.dislikes}
              </button>
            </div>
            <br />
            <div>
              <button type="button" to="#" className="edit btn-outline-primary">
                <span
                  className="edit-spa"
                  onClick={() => {
                    this.handleOpenEditModal(
                      review
                    );
                  }}
                >
                  <FaEdit />
                </span>
              </button>
              <button type="button" to="#" className="delete btn-outline-primary">
                <span
                  className="delete-spa"
                  onClick={() => {
                    this.handleDelete(
                      review.user.email,
                      review._id,
                      this.props.course._id
                    );
                  }}
                >
                  {" "}
                  <FaTrash />{" "}
                </span>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }


  render() {
    console.log("list", this.props.email);
    //console.log(this.props.course.review);
    return (
      <div className="tablecontainer">
        <table className="table table-hover">
          <thead>
            <tr>
              <th  className="table-header" scope="col">RATING</th>
              <th className="table-header1" scope="col">COMMENT</th>
            </tr>
          </thead>
          <tbody className="tbody">{this.displayComment()}</tbody>
        </table>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={this.handleOpenAddModal}
        >
          Add Review
        </button>

        {/* Edit Comment Modal */}
        {this.state && this.state.showEditModal && (
          <EditCommentModal
            isOpen={this.state.showEditModal}
            handleClose={this.handleCloseModals}
            review = {this.state.review}
            setCourse = {this.setCourse}
          />
        )}

        {/* Add Comment Modal */}
        {this.state && this.state.showAddModal && (
          <AddCommentModal
            isOpen={this.state.showAddModal}
            handleClose={this.handleCloseModals}
            course={this.props.course}
            email={this.props.email}
            modal="addReview"
          />
        )}
      </div>
    );
  }
}

export default compose(
  graphql(ADD_LIKES, { name: "ADD_LIKES" }),
  graphql(DIS_LIKES, { name: "DIS_LIKES" }),
  graphql(DELETE_COMMENT, { name: "DELETE_COMMENT" }),
  graphql(EDIT_COMMENT, {name: "EDIT_COMMENT"}),
  graphql(getUser, { name: "getUser" })
)(CourseReviewList);
