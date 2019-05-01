import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import MatchList from '../components/MatchList'

class MatchesContainer extends React.Component {

  render(){

    return(
      <div className="text-center">
        <MatchList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

export default withRouter(connect(mapStateToProps)(MatchesContainer)) ;
