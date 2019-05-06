import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
// import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getUserConversations } from '../thunks/conversationThunks';
import { updateConversationMessages, updateConversations } from '../actions/conversationActions';

// import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../simple-sidebar.css';
import '../conversation-messages.css';

class ConversationsList extends React.Component {
  state = {
    conversations: this.props.conversations,
    activeConversation: null,
    user:this.props.user,
    toggled: true
  };

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.user !==  this.props.user){
  //     this.props.getUserConversations(nextProps.user.id)
  //   }
  // }

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };


  toggle = () => {
      this.setState({
        toggled: !this.state.toggled
      });
    }



  render = () => {

    const conversations = this.props.conversations;
    const activeConversation = this.state.activeConversation;

    return (

      <div  className={this.state.toggled ? 'd-flex toggled' : 'd-flex' }   id="wrapper">

        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading"><FontAwesome name='heart' />Matched</div>
          <div className="list-group list-group-flush">
            <div className="chat_list active_chat">
              <div className="chat_people">
                <div className="chat_img">
                  <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
              </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput<span className="chat_date">Dec 25</span> </h5>
                </div>
              </div>
            </div>
            <div className="chat_list ">
              <div className="chat_people">
                <div className="chat_img">
                  <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/>
              </div>
                <div className="chat_ib">
                  <h5>Sunil Rajput<span className="chat_date">Dec 25</span> </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

       <div id="page-content-wrapper"  >
         <nav id='navbar-with-option' className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
           <button className="btn btn-primary" onClick={this.toggle} id="menu-toggle">
             {this.state.toggled ?
               <FontAwesome name='comments' />
               :
               <FontAwesome name='inbox'  />
             }
            </button>
         </nav>

         <div className="container-fluid p-2 " hidden={this.state.toggled } >
           <div className="incoming_msg">
             <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"/> </div>
             <div className="received_msg">
               <div className="received_withd_msg">
                 <p>Test which is a new approach to have all
                   solutions</p>
                 <span className="time_date"> 11:01 AM    |    June 9</span></div>
             </div>
           </div>
           <div className="outgoing_msg">
             <div className="sent_msg">
               <p>Test which is a new approach to have all
                 solutions</p>
               <span className="time_date"> 11:01 AM    |    June 9</span> </div>
           </div>


         </div>

        <div className="type_msg m-2" hidden={this.state.toggled } >
          <div className="input_msg_write">
            <input type="text" className="write_msg" placeholder="Type a message" />
            <button className="msg_send_btn" type="button">
              <FontAwesome name='paper-plane' aria-hidden="true" />
            </button>
          </div>
        </div>


      </div>
{
        /*
      }
    <ActionCable channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
    {this.state.conversations.length ? (
      <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
    ) : null}
      <div className="col-sm-3 bg-secondary" style={{height:'68vh', overflow:'auto'}} expand="md">
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
      </div>
      <div className="col-sm-9 bg-primary " style={{height:'68vh'}} >
        {activeConversation ? (
          <MessagesArea
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
            userId={this.state.user.id}
            />
        ) : null}
        </div>
    */

  }

      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    conversations: state.conversationReducer.conversations
   }
}

const mapDispatchToProps = dispatch => ({
  getUserConversations: (userId) => dispatch(getUserConversations(userId)),
  updateConversationMessages: (message) => dispatch(updateConversationMessages(message)),
  updateConversations: (conversation) => dispatch(updateConversations(conversation))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);

// helpers
const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <li key={conversation.id} onClick={() => handleClick(conversation.id)}>
        {conversation.created_at}
      </li>
    );
  });
};
