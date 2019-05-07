import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
// import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import NewMessagesForm from './NewMessagesForm';
import Cable from './Cable';

import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getUserConversations } from '../thunks/conversationThunks';
import { updateConversationMessages, updateConversations } from '../actions/conversationActions';

import moment from 'moment';

import '../simple-sidebar.css';
import '../conversation-messages.css';

class ConversationsList extends React.Component {
  state = {
    conversations: this.props.conversations,
    activeConversation: null,
    user:this.props.user,
    toggled: false
  };

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.user !==  this.props.user){
  //     this.props.getUserConversations(nextProps.user.id)
  //   }
  // }

  handleClick = id => {
    if(id === this.state.activeConversation){
      this.setState({
        activeConversation: null,
        toggled: false
        });
    } else {
      this.setState({
        activeConversation: id,
        toggled: true
      });
    }

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

      <div  className={this.state.toggled ? 'd-flex ' : 'd-flex toggled' } id="wrapper">

        <ActionCable channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
        {this.state.conversations.length ? (
          <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
        ) : null}

        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading ">Conversations <FontAwesome name='comments' /></div>
          <div className="list-group list-group-flush">
            {mapConversations(conversations, this.handleClick, this.props.user.id, this.state.activeConversation)}
          </div>
        </div>

       <div id="page-content-wrapper"  >

           {activeConversation && this.state.toggled ? (
             <MessagesArea
               conversation={findActiveConversation(
                 conversations,
                 activeConversation
               )}
               toggle={this.toggle}
               userId={this.props.user.id}
               toggled={this.state.toggled}
               />
           ) : null}

           { activeConversation && this.state.toggled ?
              <div className="type_msg m-2"  >
                <NewMessagesForm user_id={this.props.user.id} conversation_id={activeConversation} />
              </div>
            :
              null
            }
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

const mapConversations = (conversations, handleClick, actualUserId, activeConversation) => {
  return conversations.map(conversation => {
    const otherUser =  conversation.users.find(user => user.id !== actualUserId);
    return (
        <div onClick={() => handleClick(conversation.id)} key={conversation.id} className={activeConversation === conversation.id? 'chat_list active_chat': 'chat_list'}>
          <div className="chat_people">
            <div className="chat_img">
              <img src={otherUser.image_url} alt={otherUser.full_name} />
          </div>
            <div className="chat_ib">
              <h6>{otherUser.full_name}</h6>
              <small>
                { conversation.messages.length > 0 ?
                  moment(conversation.messages[conversation.messages.length -1].created_at).format('LL')
                  :
                  'No messages yet.'
                }

               </small>
            </div>

          </div>
        </div>
    );
  });
};
