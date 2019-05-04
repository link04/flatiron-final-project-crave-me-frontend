import React from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ConversationsList from '../components/ConversationsList.js';

class ConversationsContainer extends React.Component {




  render(){

    return(
      <div  style={{maxHeight:'68vh', overflow:'auto'}} >
      
        <ConversationsList  />


      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

export default withRouter(connect(mapStateToProps)(ConversationsContainer)) ;
