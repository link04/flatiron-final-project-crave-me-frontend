import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
// import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

import {connect} from 'react-redux';

import { getUserConversations } from '../thunks/conversationThunks';
import { updateConversationMessages, updateConversations } from '../actions/conversationActions';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ConversationsList extends React.Component {
  state = {
    conversations: this.props.conversations,
    activeConversation: null,
    user:this.props.user
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

  render = () => {

    const conversations = this.props.conversations;
    const activeConversation = this.state.activeConversation;

    return (
      <div class="row" >

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
