import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class MatchesContainer extends React.Component {

  render(){

    return(
      <div>
        matches
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

export default withRouter(connect(mapStateToProps)(MatchesContainer)) ;
