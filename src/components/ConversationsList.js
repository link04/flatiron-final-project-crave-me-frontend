import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import { API_ROOT, ATUTHORIZED_HEADERS  } from '../constants/';

import {connect} from 'react-redux';

import { getUserConversations } from '../thunks/conversationThunks'

class ConversationsList extends React.Component {
  state = {
    activeConversation: null,
    loadedConversations: false
  };

// if any error arrives, this mmust be verified
  componentDidUpdate(){
    if(this.state.loadedConversations === false){
      this.props.getUserConversations(this.props.user.id)
      this.setState({
        loadedConversations: true
      })
    }
  }


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

  render () {

    return (
          <div className="conversationsList">
        <ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {Object.keys(this.props.user).length ? (
          <Cable
            conversations={this.props.conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
          { this.props.conversations ?
            <ul>{mapConversations(this.props.conversations, this.handleClick)}</ul>
            :
            null
          }

        { this.state.activeConversation ? (
          <MessagesArea
            userId={this.props.user.id}
            conversation={findActiveConversation(
              this.props.conversations,
              this.state.activeConversation
            )}
          />
        ) : null}
      </div>

    );
  };
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    conversations : state.conversationReducer.conversations
   }
}
const mapDispatchToProps = dispatch => ({
  getUserConversations: (userId) => dispatch(getUserConversations(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);

// helpers-========

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {

  return conversations.map(conversation => {
    return (
      <li key={'conversation-' + conversation.id  } onClick={() => handleClick(conversation.id)}>

        {conversation.users}

      </li>
    );
  });

};
