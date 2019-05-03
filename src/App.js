
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';

import CraveContainer from './containers/CraveContainer';
import ConversationsContainer from './containers/ConversationsContainer';
import MatchesContainer from './containers/MatchesContainer';

import { getUser } from './thunks/userThunks'
import { loadingManager } from './actions/userActions';
import { getMenuChoices } from './thunks/menuChoiceThunks';

class App extends React.Component {

  componentDidMount(){
    this.props.loadingManager();

    this.props.loadMenuChoices();
    const location = this.props.history.location.pathname;
    const token = localStorage.token;
    if(token){
      this.props.getUser(token);
    } else if (location !== '/login' && location !== '/signup'){
      this.props.history.push('/login');
    }
    this.props.loadingManager();


  }

  render(){

    return (
      <div>
         <NavBar />
        {
          <div className="tab-childs" sm="8" >
            <Switch>
               <Route
               exact
               path="/signup"
               render={() => <SignUp />}
               />
               <Route
               exact
               path="/login"
               render={() => <LogIn />}
               />
               <Route
               exact
               path="/userprofile"
               render={() => <UserProfile />}
               />
               <Route
               exact
               path="/conversations"
               render={() => <ConversationsContainer />}
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
    loading: state.userReducer.loading
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: (token) => dispatch(getUser(token)),
  loadingManager: () =>  dispatch(loadingManager()),
  loadMenuChoices: () => dispatch(getMenuChoices())
})


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
