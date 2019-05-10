import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CourseReviewList.css";
import EditCommentModal from "./CommentModals/EditCommentModal";
import AddCommentModal from "./CommentModals/AddCommentModal";
class CourseReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showDeleteModal: false,
      showAddModal: false
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

  handleCloseModals() {
    this.setState({ showEditModal: false, showAddModal: false });
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  render() {
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Rating</th>
              <th scope="col">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr className="active">
              <td className="rating success">
                <div className="date">Date: </div>
                <div className="rating-block-awesome">
                  <div className="rating-wrapper">
                    <div className="icon awesome-icon" />
                    <span className="rating-type">Student Name : </span>
                  </div>
                  <div className="courseclass">
                    <span className="attendance">
                      Attendance:
                      <span className="response"> Not Mandatory</span>
                    </span>
                    <br />
                    <span className="grade">
                      Grade Recieved:
                      <span className="response"> A+</span>
                    </span>
                    <br />
                    <span className="textbook">
                      Campus:
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
                  <Link to="#" className="helpful">
                    <span className="count">0 </span>
                    <span className="grouping">people found this useful</span>
                  </Link>
                  <Link to="#" className="not helpful">
                    <span className="count">0 </span>
                    <span className="grouping">
                      people did not find this useful
                    </span>
                  </Link>
                </div>
                <br />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => {
                    this.handleOpenEditModal();
                  }}
                >
                  Edit
                </button>
                <button type="button" className="btn btn-outline-success">
                  Delete
                </button>
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
          modal='addReview'
          />
        )}
      </div>
    );
  }
}

export default CourseReviewList;
