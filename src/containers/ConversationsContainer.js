import React from 'react';
import { withRouter} from 'react-router-dom';
import ConversationsList from '../components/ConversationsList.js';

class ConversationsContainer extends React.Component {

  render(){
    return(
      <div >
        <div style={{height:'68vh'}}>
          <ConversationsList  />
        </div>

      </div>
    )
  }
}

export default ConversationsContainer;
