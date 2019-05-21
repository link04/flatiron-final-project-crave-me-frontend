import React from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Button } from 'reactstrap';

import MatchList from '../components/MatchList'
import { getUserMatches } from '../thunks/userThunks';
import { getUserConversations } from '../thunks/conversationThunks';

import FontAwesome from 'react-fontawesome';

class MatchesContainer extends React.Component {

  componentDidMount(){
    if(this.props.user.id){
        this.props.getUserMatches(this.props.user.id, this.props.userToken);
      }
    }

  componentDidUpdate(prevProps){
    if(!prevProps.user.id){
      this.props.getUserMatches(this.props.user.id, this.props.userToken);
    }
  }

  render(){

    return(
      <div className="text-center" >
        <div className="text-center" style={{maxHeight:'68vh', overflow:'auto'}} >
          <MatchList />
        </div>
        <Button className="m-2" style={{backgroundColor: '#85a2b6'}} onClick={() => this.props.getUserMatches(this.props.user.id, this.props.userToken)}>
          Refresh Matches <FontAwesome name="refresh" />
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user : state.userReducer.user,
    userToken: state.userReducer.user_token
  }
}

const mapDispatchToProps = dispatch => ({
  getUserMatches: (userId, token) => dispatch(getUserMatches(userId,token)),
  getUserConversations: (userId) => dispatch(getUserConversations(userId)),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MatchesContainer)) ;
