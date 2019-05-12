import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseReviewList.css";
import EditCommentModal from "./CommentModals/EditCommentModal";
import AddCommentModal from "./CommentModals/AddCommentModal";
import DeleteCommentModal from "./CommentModals/DeleteCommentModal";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from "react-icons/fa";
import { GET_USER } from "../queries/queries";
import { Query } from "react-apollo";
import { ADD_LIKES, DIS_LIKES } from "../queries/queries";
import { graphql, compose } from 'react-apollo';

class CourseReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      likes: 0,
      dislikes: 0
    };
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleCloseModals = this.handleCloseModals.bind(this);
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
  }
  handleOpenEditModal() {
    this.setState({
      showEditModal: true
    });
  }

  handleOpenDeleteModal() {
    this.setState({
      showDeleteModal: true
      //deleteComment: todo
    });
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
    console.log("id",review_id,course_id);
    await this.props.ADD_LIKES({
          variables: {
            review_id: review_id,
            course_id: course_id 
          }
    })
  }

  async handleDislikes(review_id, course_id) {
    //e.preventDefault();
    console.log("id",review_id,course_id);
    await this.props.DIS_LIKES({
          variables: {
            review_id: review_id,
            course_id: course_id 
          }
    })
  }

  campus(){
    if(this.props.course.campus === true)return (<p>On campus</p>);
      else return (<p>Web</p>);
  }

  name(email){
    return(<Query query={GET_USER} variables ={{e_mail: email}}>
              {({data}) => {
                const userInfo = data;
                if(!userInfo || userInfo.user === undefined || userInfo.user === null ){
                  return null;
                }
                console.log(userInfo.user);
                return (
                    <p>{userInfo.user.user_name}</p>
                  )
                }
              }
    </Query>)
  }

  displayComment(){
      if(this.props.course.review === 0) return null;
      const reviews = this.props.course.review;
      return reviews.map(review=>{
          return (
            <tr className="active" key={review._id}>
              <td className="rating success">
                <div className="date">COMMENT DATE: </div>
                <p>{review.time}</p>
                <div className="rating-block-awesome">
                  <div className="rating-wrapper">
                    <div className="icon awesome-icon" />
                    <span className="rating-type">STUDENT NAME : {this.name(review.user.email)}</span>
                  </div>
                  <div className="courseclass">
                    <span className="textbook">
                      CAMPUS:
                      <span className="response"> {this.campus()}</span>
                    </span>
                    <span className="textbook">
                      <div className="professor">PROFESSOR:</div>
                      <span className="response"> {review.professor}</span>
                    </span>
                  </div>
                </div>
              </td>
              <td colSpan="2" className="comments">
                <p className="commentsParagrah">
                  {review.review_body}
                </p>
                <div className="helpful-links-thumbs">
                  <button
                    type="button"
                    to="#"
                    className="helpful btn-outline-primary"
                  >
                    <span className="count" onClick={(e)=>this.handleLikes(review._id, this.props.course._id)}>
                      <FaThumbsUp />
                    </span>
                    {review.likes}
                  </button>

                  <button
                    type="button"
                    to="#"
                    className="nothelpful btn-outline-primary"
                  >
                    <span className="count" onClick={(e)=>this.handleDislikes(review._id, this.props.course._id)}>
                      <FaThumbsDown />{" "}
                    </span>
                    {review.dislikes}
                  </button>
                </div>
                <br />
                <div>
                  <button
                    type="button"
                    to="#"
                    className="btn btn-outline-primary"
                  >
                    <span
                      className="edit"
                      onClick={() => {
                        this.handleOpenEditModal();
                      }}
                    >
                      <FaEdit />
                    </span>
                  </button>
                  <button
                    type="button"
                    to="#"
                    className="btn btn-outline-primary"
                  >
                    <span
                      className="delete"
                      onClick={() => {
                        this.handleOpenDeleteModal();
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
      })
  }

  render() {
    console.log("list", this.props.email);
    //console.log(this.props.course.review);
    return (
      <div className="tablecontainer">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">RATING</th>
              <th scope="col">COMMENT</th>
            </tr>
          </thead>
          <tbody>
           {this.displayComment()}
          </tbody>
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

        {/*Delete Comment Modal */}
        {this.state && this.state.showDeleteModal && (
          <DeleteCommentModal
            isOpen={this.state.showDeleteModal}
            handleClose={this.handleCloseModals}
            deleteComment={this.state.deleteComment}
          />
        )}
      </div>
    );
  }
}

export default compose(graphql(ADD_LIKES, {name: "ADD_LIKES"}),graphql(DIS_LIKES, {name: "DIS_LIKES"}))(CourseReviewList);
