import React from 'react';
import { withRouter} from 'react-router-dom';
import ConversationsList from '../components/ConversationsList.js';

class ConversationsContainer extends React.Component {

  render(){
    return(
      <div  style={{maxHeight:'68vh', overflow:'auto'}} >

        <ConversationsList user={this.props.user} />

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

export default ConversationsContainer;
