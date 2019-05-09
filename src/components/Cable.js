import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import {connect} from 'react-redux';

import { getUserConversations } from '../thunks/conversationThunks';
import { updateConversationMessages, updateConversations } from '../actions/conversationActions';


const Cable = (props) => {

  return (
    <Fragment>
      {props.conversations.map(conversation => {
        return (
          <ActionCableConsumer
            key={conversation.id}
            channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
            onReceived={(resp) => props.handleReceivedMessage(resp)}
          />
        );
      })}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
   }
}
const mapDispatchToProps = dispatch => ({
  getUserConversations: (userId) => dispatch(getUserConversations(userId)),
  updateConversationMessages: (message) => dispatch(updateConversationMessages(message)),
  updateConversations: (conversation) => dispatch(updateConversations(conversation))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cable);
