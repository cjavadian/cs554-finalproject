import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseReviewList.css";
import EditCommentModal from "./CommentModals/EditCommentModal";
import AddCommentModal from "./CommentModals/AddCommentModal";
import { FaThumbsUp,FaThumbsDown,FaEdit,FaTrash } from "react-icons/fa";
class CourseReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false,
      likes:0,
      dislikes:0
    };
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
    this.handleCloseModals = this.handleCloseModals.bind(this);
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleLikes = this.handleLikes.bind(this);
    this.handleDislikes = this.handleDislikes.bind(this);
  }
  handleOpenEditModal() {
    this.setState({
      showEditModal: true
    });
  }

  handleCloseModals() {
    this.setState({ showEditModal: false, showAddModal: false });
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  handleLikes() {
    let count=this.state.likes;
    count+=1;
    this.setState({likes:count});
  }
  handleDislikes() {
    let count=this.state.dislikes;
    count+=1;
    this.setState({dislikes:count});
  }


  render() {
    console.log("list",this.props.email);
    return (
      <div class = "tablecontainer">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">RATING</th>
              <th scope="col">COMMENT</th>
            </tr>
          </thead>
          <tbody>
            <tr className="active">
              <td className="rating success">
                <div className="date">DATE: </div>
                <div className="rating-block-awesome">
                  <div className="rating-wrapper">
                    <div className="icon awesome-icon" />
                    <span className="rating-type">STUDENT NAME : </span>
                  </div>
                  <div className="courseclass">
                    <span className="attendance">
                      ATTENDANCE:
                      <span className="response"> Not Mandatory</span>
                    </span>
                    <br />
                    <span className="grade">
                      GRADE RECIEVED:
                      <span className="response"> A+</span>
                    </span>
                    <br />
                    <span className="textbook">
                      CAMPUS:
                      <span className="response"> Main/Web</span>
                    </span>
                  </div>
                </div>
              </td>
              <td colSpan="2" className="comments">
                <p className="commentsParagrah">
                  CS-554 is well structured, teaches new treding web
                  technologies
                </p>
                <div className="helpful-links-thumbs">
                  <button type = "button" to="#" className="helpful btn-outline-primary">
                    <span className="count" onClick={this.handleLikes}><FaThumbsUp/></span>
                    {this.state.likes}
                  </button>
                  
                  <button type = "button" to="#" className="nothelpful btn-outline-primary">
                    <span className="count"  onClick={this.handleDislikes}><FaThumbsDown/> </span>
                   {this.state.dislikes}
                  </button>
                </div>
                <br />
                <div>
                <button type="button" to="#" className="btn btn-outline-primary"> 
                  
                  <span className ="edit" onClick={() => {this.handleOpenEditModal();}}><FaEdit/></span> 
                </button>
                <button type="button" to ="#" className="btn btn-outline-primary">
                 <span className = "delete"> <FaTrash/> </span>
                </button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td colSpan="2">Jacob</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colSpan="2">Larry the Bird</td>
            </tr>
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
          course = {this.props.course}
          email = {this.props.email}
          modal='addReview'
          />
        )}
      </div>
    );
  }
}

export default CourseReviewList;
