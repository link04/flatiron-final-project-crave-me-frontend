import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

import MatchList from '../components/MatchList'
import { getUserMatches } from '../thunks/userThunks';

class MatchesContainer extends React.Component {

  render(){

    return(
      <div className="text-center" >
        <div className="text-center" style={{maxHeight:'75vh', overflow:'auto'}} >
          <MatchList />
        </div>
        <Button className="m-2" style={{backgroundColor: '#85a2b6'}} onClick={() => this.props.getUserMatches(this.props.user.id)}>Refresh Matches</Button>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

const mapDispatchToProps = dispatch => ({
  getUserMatches: (userId) => dispatch(getUserMatches(userId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MatchesContainer)) ;
