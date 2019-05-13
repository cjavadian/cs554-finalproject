import React from "react";
import io from "socket.io-client";
import LoggedinNavbar from "../components/LoggedinNavbar";
import Footer from "../components/Footer";
import "./Chat.css";
import { getUser } from "../queries/queries";
import { graphql, compose } from "react-apollo";
import axios from 'axios'

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            email: this.props.email,
            userOnline: [],
            receiver: ""
        };

        this.socket = io('localhost:4001');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
        
        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
        this.getUserOnline = this.getUserOnline.bind(this);
    }

    async getUserOnline() {
        const users = await axios.get('http://localhost:7050/userlog/userlog');
        console.log("user online", users.data);
        this.setState({userOnline: users.data});
    }
    
    async componentDidMount() {
        console.log("chat componentDidMount", this.state.email);
        const user_info = await this.props.getUser({
            variables: {
              e_mail: this.state.email
            }
        })
        this.setState({
            username: user_info.data.user.user_name,
        })
        this.getUserOnline();
        setInterval(this.getUserOnline, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.getUserOnline);
    }

    render(){
        let li = null;
        if(this.state && this.state.userOnline) {
            console.log(this.state.userOnline);
            li = this.state.userOnline.map((user,index) => {
                console.log(user);
                         return (
                      <li key={index}>
                          {user}
                      </li>
                         );
                     })
        }
        return (
            
            <div>
                <LoggedinNavbar email={this.props.email}/>
                    <h1>Chat Room</h1>
                    <hr />
                    <div className="container">
                    <div className="align-items-start">
                        <div className="row">
                            <div className="col-8">
                          {/*  <body>*/}
                                <div className="messages-container">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                    </div>
                              {/* </body> */}{/*className="chat-body"*/}
                              
                            </div>
                                <div className="col-4">
                            <ul className = "userOnline">
                            <li><strong>User Online</strong></li>
                                {li}
                                </ul>
                           </div>
                        </div>
                     </div>
                     <div  className="align-items-end">
                                    <div className="chat-fluid">
                                        <div class="col-lg">
                                            <div class="button-container">
                                            <input type="text" placeholder="Chat Name" value={this.state.receiver} onChange={ev => this.setState({receiver: ev.target.value})} className="form-control"/>
                                                <input type="text" placeholder="Message" className="form-message-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                                <button onClick={this.sendMessage} className="btn btn-primary form-chat-control">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                     </div>
                     
                <Footer />
            </div>
        );
    }
}

export default compose(
    graphql(getUser, {name: "getUser"}))(Chat);