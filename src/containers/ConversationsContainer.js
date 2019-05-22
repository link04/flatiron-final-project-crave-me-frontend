import React from 'react';
import ConversationsList from '../components/ConversationsList.js';

class ConversationsContainer extends React.Component {

  render(){
    return(
      <div >
        <div style={{height:'68vh'}}>
          <ConversationsList conversations={this.props.conversations} />
        </div>

      </div>
    )
  }
}

export default ConversationsContainer;
