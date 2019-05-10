import React, { Component } from "react";
import ReactModal from "react-modal";


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
    this.state = {
      showEditModal: this.props.isOpen
    };
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
  }
  handleCloseEditModal() {
    this.setState({ showEditModal: false, todo: null });
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
          <form>
            <div className="form-group">
              <label>
                Title:
                <br />
                <input
                  //   ref={node => {
                  //     title = node;
                  //   }}
                  //   defaultValue={this.props.todo.title}
                  autoFocus={true}
                />
              </label>
            </div>
            <button className="button add-button" type="submit">
              Update Comment
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

export default EditCommentModal;
