import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class CraveContainer extends React.Component {

  render(){

    return(
      <div>
        Your Crave
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

export default withRouter(connect(mapStateToProps)(CraveContainer)) ;
