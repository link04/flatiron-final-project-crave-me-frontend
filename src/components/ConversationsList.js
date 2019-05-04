import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import MessagesArea from './MessagesArea';
import Cable from './Cable';
import { API_ROOT, ATUTHORIZED_HEADERS  } from '../constants/';

import {connect} from 'react-redux';

class ConversationsList extends React.Component {
  state = {
    activeConversation: null
  };

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
      console.log(this.props.user.conversations);
    return (
      <div className="conversationsList">
        <ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {Object.keys(this.props.user).length ? (
          <Cable
            conversations={this.props.user.conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
          { this.props.user.conversations ?
            <ul>{mapConversations(this.props.user.conversations, this.handleClick)}</ul>
            :
            null
          }

        { this.state.activeConversation ? (
          <MessagesArea
            userId={this.props.user.id}
            conversation={findActiveConversation(
              this.props.user.conversations,
              this.state.activeConversation
            )}
          />
        ) : null}
      </div>
    );
  };
}

const mapStateToProps = state => {
  return { user: state.userReducer.user }
}

export default connect(mapStateToProps)(ConversationsList);

// helpers

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
