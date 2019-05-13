import React, { Component } from "react";
import ReactModal from "react-modal";
import './EditCommentModal.css';
import { EDIT_COMMENT } from "../../queries/queries";
import { graphql, compose } from 'react-apollo';

ReactModal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    border: "1px solid #28547a",
    borderRadius: "4px"
  }
};

class EditCommentModal extends Component {
  constructor(props) {
    super(props);
    console.log("inside editmodal")
    console.log(`EditCommentModal ${JSON.stringify(this.props.review)}`);
    this.state = {
      showEditModal: this.props.isOpen,
      review_id: this.props.review._id,
      review_user_email: this.props.review.user.email,
      courseComment: this.props.review.courseComment,
      professorComment: this.props.review.professorComment,
      current_user_email: this.props.email
    };
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCloseEditModal() {
    this.setState({ showEditModal: false, todo: null });
    this.props.handleClose();
  }
  
  async handleEditComment(new_review_body, professor_comment) {
    console.log(`handleEditComment ${this.state.review_user_email}`);
    const courseInfo = await this.props.EDIT_COMMENT({
        variables: {
          review_id: this.state.review_id,
          new_review_body: new_review_body,
          professor_comment: professor_comment
        }
    }); 
    console.log("handleEditComment: " ,JSON.stringify(courseInfo.data.editComment));
    this.props.setCourse(courseInfo);
    this.setState({ showEditModal: false, todo: null });
  }
  async handleSubmit(e) {
    e.preventDefault();
    await this.handleEditComment(this.state.courseComment,this.state.professorComment);
    this.props.handleClose();
  }
  render() {
    return (
      <div>
        <ReactModal
          name="editModal"
          isOpen={this.state.showEditModal}
          contentLabel="Edit Comment"
          style={customStyles}
        >
          <form 
          onSubmit = {this.handleSubmit}>
          <p>Please input new comment</p>
          <div className="form-group">
          </div>
          <div className="form-group">
            <label>
              Comment Course:
              <br />
              <textarea
                value = {this.state.courseComment}
                required
                autoFocus={true}
                onChange={(e)=>this.setState({courseComment: e.target.value})}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Comment Professor:
              <br />
              <textarea
              value = {this.state.professorComment}
                required
                autoFocus={true}
                onChange={(e)=>this.setState({professorComment: e.target.value})}
              />
            </label>
          </div>
          <button className="button add-button" type="submit">
          Submit
          </button>
        </form>
          <button
            className="button cancel-button"
            onClick={this.handleCloseEditModal}
          >
            Cancel
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default compose(graphql(EDIT_COMMENT, {name: "EDIT_COMMENT"}))(EditCommentModal);
