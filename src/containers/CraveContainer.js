import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class CraveContainer extends React.Component {

  userLogged = () => {
    if(this.props.userId === undefined) {
      this.props.history.push('/login');
    };
  }

  render(){
      this.userLogged();
    return(
      <div>
        Your Crave
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {userId : state.userReducer.user.id}
}

export default withRouter(connect(mapStateToProps)(CraveContainer)) ;
