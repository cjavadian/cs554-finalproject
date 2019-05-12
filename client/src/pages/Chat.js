import React from "react";
import io from "socket.io-client";
import LoggedinNavbar from "../components/LoggedinNavbar";
import Footer from "../components/Footer";
import "./Chat.css";
import { GET_USER } from "../queries/queries";
import { Query } from "react-apollo";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            email: this.props.email
        };

        console.log(this.state.email);

        this.socket = io('localhost:4001');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            console.log(this.state.username);
            this.setState({message: ''});

        }
        
    }

    render(){
        return (
            <div>
                <LoggedinNavbar />
                    <h1>Chat Room</h1>
                    <hr />
                    <body>
                        <div className="messages-container">
                        {this.state.messages.map(message => {
                            return (
                                <div>{message.author}: {message.message}</div>
                            )
                        })}
                        </div>
                    </body>
                    <div className="chat-body">
                        <div className="chat-fluid">
                            <div class="col-lg">
                                <div class="button-container">
                                <input type="text" placeholder="Chat Name" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                    <input type="text" placeholder="Message" className="form-message-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-chat-control">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer />
            </div>
        );
    }
}

export default Chat;