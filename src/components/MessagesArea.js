import React from 'react';
import NewMessagesForm from './NewMessagesForm';

class MessagesArea extends React.Component {

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }
  render(){
  return (
    <>
      <div style={{height:'100%', overflow:'auto'}} >
        <h2>{}</h2>
        <ul>{orderedMessages(this.props.conversation.messages)}</ul>
          <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
           </div>
      </div>
      <NewMessagesForm user_id={this.props.userId} conversation_id={this.props.conversation.id} />

    </>
  );
}
};

export default MessagesArea;

// helpers

const orderedMessages = messages => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map(message => {
    return <li key={message.id}>{message.text}</li>;
  });
};
