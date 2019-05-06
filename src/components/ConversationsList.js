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
          <div className="list-group list-group-flush"   >
            <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
            <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
          </div>
        </div>
       <div id="page-content-wrapper">
         <nav id='navbar-with-option' className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
           <button className="btn btn-primary" onClick={this.toggle} id="menu-toggle">
             {this.state.toggled ?
               <FontAwesome name='comments' />
               :
               <FontAwesome name='inbox'  />
             }
            </button>
         </nav>

         <div className="container-fluid"  >
           <h1 className="mt-4">Simple Sidebar</h1>
          <p>The starting state of the menu will appear collapsed on smaller screens, and will appear non-collapsed on larger screens. When toggled using the button below, the menu will change.</p>
          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
          <p>Make sure to keep all page content within the <code>#page-content-wrapper</code>. The top navbar is optional, and just for demonstration. Just create an element with the <code>#menu-toggle</code> ID which will toggle the menu when clicked.</p>
       </div>
   </div>

  {
    /*
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
