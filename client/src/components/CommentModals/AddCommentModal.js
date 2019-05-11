import React, { Component } from "react";
import ReactModal from "react-modal";
import { REVIEW_COURSE, getUser } from "../../queries/queries";
import { graphql, compose } from 'react-apollo';

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
      showAddModal: this.props.isOpen,
      coursename:"",
      professorname:"",
      comment:"",
      overallquality: 0,
      recommended: true,
      levelofdifficulty: 0,
      rateprofessor:""
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

  async submitForm(e){
        e.preventDefault();
        const email = this.props.email;
        const userInfo = await this.props.getUser({
          variables: {
            e_mail: email, 
          }
        });
        console.log("info",userInfo.data);
        console.log("name",this.state.professorname);
        await this.props.REVIEW_COURSE({
          variables: {
            course_id: this.props.course._id, 
            user_id: userInfo.data.user._id, 
            professor: this.state.professorname, 
            review_body: this.state.comment, 
            recommended: Boolean(this.state.recommended), 
            ratings: Number(this.state.overallquality), 
            difficulty: Number(this.state.levelofdifficulty)
          }
      });
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
      console.log(this.props);
      body = (
        <form onSubmit = {this.submitForm.bind(this)}>
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
                onChange={(e)=>this.setState({professorname: e.target.value})}
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
                onChange={(e)=>this.setState({comment: e.target.value})}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Overall Quality:
              <br />
              <select name = "Quality" onChange={(e)=>this.setState({overallquality: e.target.value})}>
                <option>Not Select</option>
                <option value = {1}>1</option>
                <option value = {2}>2</option>
                <option value = {3}>3</option>
                <option value = {4}>4</option>
                <option value = {5}>5</option>       
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Recommended:
              <br />
              <select name = "recommend" onChange={(e)=>this.setState({recommended: e.target.value})}>
                <option>Not Select</option>
                <option value = {1}>True</option>
                <option value = {0}>False</option>    
              </select>
            </label>
          </div>
          <div className="form-group">
            <label>
              Level Of Difficulty:
              <br />
              <select name = "Difficulty" onChange={(e)=>this.setState({levelofdifficulty: e.target.value})}>
                <option>Not Select</option>
                <option value = {1}>1</option>
                <option value = {2}>2</option>
                <option value = {3}>3</option>
                <option value = {4}>4</option>
                <option value = {5}>5</option>      
              </select>
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
                onChange={(e)=>this.setState({rateprofessor: e.target.value})}
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

export default compose(graphql(REVIEW_COURSE, {name: "REVIEW_COURSE"}),graphql(getUser, {name: "getUser"}))(AddCommentModal);
