import React, { Fragment } from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ conversations, handleReceivedMessage }) => {
  return (
    <Fragment>
      {conversations.map(conversation => {
        return (
          <ActionCableConsumer
            key={'conversation-'+conversation.id}
            channel={{ channel: 'MessagesChannel', conversation: conversation.id }}
            onReceived={handleReceivedMessage}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;
