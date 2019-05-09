import React from 'react';
import '../assets/css/conversation-messages.css';
import moment from 'moment';
import FontAwesome from 'react-fontawesome';

class MessagesArea extends React.Component {

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    scrollToTop = () => {
      this.messagesStart.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    handleClickUp = () => {
      this.scrollToTop();
    }

  render(){
    const conversationDifferentUser = this.props.conversation.users.find(user => user.id !== this.props.userId);
  return (
    <>
    <nav id='navbar-with-option' className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <button className="pull-left" onClick={this.props.toggle} id="menu-toggle">
        {this.props.toggled ?
          <FontAwesome name='arrow-circle-left' />
          :
          <FontAwesome name='comments'  />
        }
       </button>
       <h5>{conversationDifferentUser.full_name.split(' ')[0]} <img className="message-window-avatar" src={conversationDifferentUser.image_url} alt={conversationDifferentUser.full_name} /></h5>


    </nav>

    <div className="container-fluid p-2 "  >
      <div className="text-center" >
        <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesStart = el; }}>
         </div>
        <h5>Common Craves:</h5>
        <p>{this.props.conversation.match.matched_menu_choices.join(' - ')}</p>
      </div>
      {orderedMessages(this.props.conversation.messages, this.props.userId)}
      <div className="">
       <button onClick={this.handleClickUp} type="button" form="new-message-form"  className="btn btn-secondary" style={{bottom:'0', float:'right'}} >
          <FontAwesome name='angle-double-up' aria-hidden="true" />
        </button>
      </div>
      <div style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}>
       </div>
     </div>

    </>
  );
}
};



export default MessagesArea;

// helpers

const orderedMessages = (messages, actualUserId) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return sortedMessages.map(message => {
    if(message.user_data.id !== actualUserId){
      return (
        <div key={message.id} className="incoming_msg">
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>{message.text}</p>
              <span className="time_date">
                {moment(message.created_at).format('LT') } | {moment(message.created_at).format('MMM Do') }
              </span>
            </div>
          </div>
        </div>
      )
    } else if(message.user_data.id === actualUserId){
      return(
        <div key={message.id} className="outgoing_msg">
          <div className="sent_msg">
            <p>{message.text}</p>
              <span className="time_date">
                {moment(message.created_at).format('LT') } | {moment(message.created_at).format('MMM Do') }
              </span>
          </div>
        </div>
      )
    } else {
      // check
      return null
    }
  });
};
