import React, {Component} from 'react';
//Import Query from react-apollo
import {Mutation} from 'react-apollo';
import ReactModal from 'react-modal';

//Import the file where my query constants are defined
// import queries from '../../queries';

//For react-modal
ReactModal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        border: '1px solid #28547a',
        borderRadius: '4px'
    }
};

class DeleteCommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDeleteModal: this.props.isOpen,
            comment: this.props.deleteComment
        };
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        console.log(this.state.comment);
    }

    handleOpenDeleteModal() {
        this.setState({showDeleteModal: true});
    }

    handleCloseDeleteModal() {
        this.setState({showDeleteModal: false});
        this.props.handleClose(false);
    }
    render() {
        return (
            <div>
                {/*Delete Todo Modal */}
                <ReactModal
                    name='deleteModal'
                    isOpen={this.state.showDeleteModal}
                    contentLabel='Delete Comment'
                    style={customStyles}>
    
                    {/* <Mutation
                        mutation={queries.DELETE_TODO}
                        update={(cache, {data: {removeTodo}}) => {
                            const {comments} = cache.readQuery({query: queries.GET_TODOS});
                            cache.writeQuery({
                                query: queries.GET_TODOS,
                                data: {comments: comments.filter((e) => e.id !== this.state.comment.id)}
                            });
                        }}>
                        {(removeTodo, {data}) => ( */}
                            <div>
                                <p>
                                    Are you sure you want to delete {this.state.comment}{' '}
                                </p>
                                <form
                                    className='form'
                                    id='delete-comment'
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        // removeTodo({
                                        //     variables: {
                                        //         id: this.state.comment.id
                                        //     }
                                        // });
                                        this.setState({showDeleteModal: false});
                                        alert('Comment is Deleted');
                                        this.props.handleClose();
                                    }}>
                                    <br />
                                    <br />
                                    <button className='button add-button' type='submit'>
                                        Delete Comment
                                    </button>
                                </form>
                            </div>
                        {/* )} */}
                    {/* </Mutation> */}
                    <br />
                    <br />
                    <button className='button cancel-button' onClick={this.handleCloseDeleteModal}>
                        Cancel
                    </button>
                </ReactModal>
            </div>
        );
    }
}

export default DeleteCommentModal;
