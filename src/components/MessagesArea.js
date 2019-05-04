import React from 'react';
import NewMessagesForm from './NewMessagesForm';

const MessagesArea = (props) => {
  return (
    <div className="messagesArea">
      <h2>{}</h2>
      <ul>{orderedMessages(props.conversation.messages)}</ul>
      <NewMessagesForm user_id={props.userId} conversation_id={props.conversation.id} />
    </div>
  );
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
