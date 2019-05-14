
import React from 'react';
import { connect } from 'react-redux';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';

import CraveContainer from './containers/CraveContainer';
import ConversationsContainer from './containers/ConversationsContainer';
import MatchesContainer from './containers/MatchesContainer';

import { getUser } from './thunks/userThunks'
import { loadingManager, removeUser } from './actions/userActions';
import { getMenuChoices } from './thunks/menuChoiceThunks';
import { getUserConversations } from './thunks/conversationThunks';

import { Route, Switch, withRouter } from 'react-router-dom';


class App extends React.Component {

  state = {
    user: this.props.user,
    conversations: this.props.conversations
  }

  componentDidMount(){
    this.props.loadingManager();

    this.props.loadMenuChoices();

    const location = this.props.history.location.pathname;
    const token = localStorage.token;

    if(token){
      this.props.getUser(token);
      // this.props.history.push('/matches');
    } else if (location !== '/login' && location !== '/signup'){
      this.props.history.push('/login');
    }

    this.props.loadingManager();
  }

  componentDidUpdate(prevProps){
    if (Object.keys(prevProps.user).length < 1) {
      if(prevProps.user.id !==  this.props.user.id ){
        this.props.getUserConversations(this.props.user.id)
        this.setState({
          conversations: this.props.conversations
        })
      }
    }
  }

  //  Cleaning user object of errors before going to login or signup
  handleRedirectClick = () => {
    this.props.userLogOut();
  }

  render(){
    return (
      <div>

         <NavBar />
        {
          <div className="tab-childs" >
            <Switch>
               <Route
               exact
               path="/signup"
               render={() => <SignUp handleRedirectClick={this.handleRedirectClick} />}
               />
               <Route
               exact
               path="/login"
               render={() => <LogIn handleRedirectClick={this.handleRedirectClick} />}
               />
               <Route
               exact
               path="/userprofile"
               render={() => <UserProfile />}
               />
               <Route
               exact
               path="/conversations"
               render={() => <ConversationsContainer conversations={this.props.conversations} />}
               />
               <Route
               exact
               path="/cravings"
               render={() => <CraveContainer />}
               />
               <Route
               exact
               path="/matches"
               render={() => <MatchesContainer />}
               />
               <Route
               exact
               path="/"
               render={() => <MatchesContainer />}
               />
           </Switch>
          </div>

         }
        <div  className="modal-load " hidden={!this.props.loading}></div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    loading: state.userReducer.loading,
    conversations: state.conversationReducer.conversations,
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: (token) => dispatch(getUser(token)),
  loadingManager: () =>  dispatch(loadingManager()),
  loadMenuChoices: () => dispatch(getMenuChoices()),
  getUserConversations: (userId) => dispatch(getUserConversations(userId)),
  userLogOut: () => dispatch(removeUser())

})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
