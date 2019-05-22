import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';
import MessagesArea from './MessagesArea';
import NewMessagesForm from './NewMessagesForm';
import Cable from './Cable';

import {connect} from 'react-redux';
import FontAwesome from 'react-fontawesome';

import { getUserConversations, destroyConversation } from '../thunks/conversationThunks';
import { updateConversationMessages, updateConversations } from '../actions/conversationActions';

import { withRouter} from 'react-router-dom';

import { loadingManager } from '../actions/userActions';

import moment from 'moment';

import '../assets/css/conversation-messages.css';
import '../assets/css/simple-sidebar.css';

class ConversationsList extends React.Component {

  state = {
    conversations: [],
    activeConversation: null,
    user:{},
    toggled: false
  };

  componentDidMount(){
    if(this.props.user.id){
       this.props.getUserConversations(this.props.user.id);
     }
    this.setState({
        conversations: this.props.conversations,
        user:this.props.user
    })
  }

  componentDidUpdate(prevProps){
      if(prevProps.conversations.length !==  this.props.conversations.length){
        this.setState({
            conversations: this.props.conversations,
            user: this.props.user,
            toggle: false
        })
      }
  }

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

   handleReceivedConversation = () => {
      this.props.loadingManager();
      this.props.history.push('/');
      this.props.getUserConversations(this.props.user.id)
      .then(() => {
        this.props.history.push('/conversations')
        this.props.loadingManager();
      });
    }

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

  render (){

    const conversations = this.props.conversations;
    const activeConversation = this.state.activeConversation;

    return (

      <div  className={this.state.toggled ? 'd-flex ' : 'd-flex toggled' } id="wrapper">

        <ActionCableConsumer channel={{ channel: 'ConversationsChannel' }} onReceived={this.handleReceivedConversation} />
        {conversations.length ? (
          <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
        ) : null}

        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading p-2">
            <FontAwesome className="pull-left" onClick={this.handleReceivedConversation} name='refresh' style={{color: '#85a2b6', cursor:'pointer'}} />
             Conversations
            <FontAwesome name='comments' />
         </div>
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
               userInfo={{userId: this.props.user.id, userToken: this.props.userToken}}
               toggled={this.state.toggled}
               deleteConversation={this.props.deleteConversation}
               />
           ) : null}
           { activeConversation && this.state.toggled ?
              <div className="type_msg m-2" >
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
    userToken: state.userReducer.user_token
   }
}

const mapDispatchToProps = dispatch => ({
  getUserConversations: (userId) => dispatch(getUserConversations(userId)),
  updateConversationMessages: (message) => dispatch(updateConversationMessages(message)),
  updateConversations: (conversation) => dispatch(updateConversations(conversation)),
  loadingManager: () =>  dispatch(loadingManager()),
  deleteConversation: (conversationId, userToken) => dispatch(destroyConversation(conversationId, userToken))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConversationsList));

// helpers
const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick, actualUserId, activeConversation) => {

    let sortedConversations = [];

      if(conversations.length > 0){
        sortedConversations = conversations.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      }

  return sortedConversations.map(conversation => {
    const otherUser = conversation.users.find(user => user.id !== actualUserId);
    return (
        <div onClick={() => handleClick(conversation.id)} key={conversation.id} className={activeConversation === conversation.id? 'chat_list active_chat': 'chat_list'}>
          <div className="chat_people">
            <div className="chat_img">
              <img src={otherUser.image_url} className="chat_img_avatar" alt={otherUser.full_name} />
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
