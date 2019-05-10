import React, { Component } from "react";
import ReactModal from "react-modal";

//For react-modal
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

export class AddCommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: this.props.isOpen
    };
    this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
    this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
  }

  handleOpenAddModal() {
    this.setState({ showAddModal: true });
  }

  handleCloseAddModal() {
    this.setState({ showAddModal: false });
    this.props.handleClose(false);
  }

  render() {
    let body;
    if (this.props.modal === "addReview") {
      let coursename;
      let professorname;
      let comment;
      let overallquality;
      let recommended;
      let levelofdifficulty;
      let rateprofessor;
      body = (
        <form>
          <p>Course Name: </p>
          <div className="form-group">
            <label>
              Professor Name:
              <br />
              <input
                // ref={(node) => {console.log("node:");console.log(node)
                // professorname = node;
                // }}
                required
                autoFocus={true}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Comment:
              <br />
              <input
                // ref={(node) => {console.log("node:");console.log(node)
                // professorname = node;
                // }}
                required
                autoFocus={true}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Overall Quality:
              <br />
              <input
                // ref={(node) => {console.log("node:");console.log(node)
                // professorname = node;
                // }}
                required
                autoFocus={true}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Recommended:
              <br />
              <input
                // ref={(node) => {console.log("node:");console.log(node)
                // professorname = node;
                // }}
                required
                autoFocus={true}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Level Of Difficulty:
              <br />
              <input
                // ref={(node) => {console.log("node:");console.log(node)
                // professorname = node;
                // }}
                required
                autoFocus={true}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Rate Professor:
              <br />
              <input
                // ref={(node) => {console.log("node:");console.log(node)
                // professorname = node;
                // }}
                required
                autoFocus={true}
              />
            </label>
          </div>
          <button className="button add-button" type="submit">
            Add Comment
          </button>
        </form>
      );
    }
    return (
      <div>
        <ReactModal
          name="addModal"
          isOpen={this.state.showAddModal}
          contentLabel="Add Modal"
          style={customStyles}
        >
          {body}
          <button
            className="button cancel-button"
            onClick={this.handleCloseAddModal}
          >
            Cancel
          </button>
        </ReactModal>
      </div>
    );
  }
}

export default AddCommentModal;
