import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class ConversationsContainer extends React.Component {

  render(){

    return(
      <div>
        conversations
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

export default withRouter(connect(mapStateToProps)(ConversationsContainer)) ;
