
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'reactstrap';

import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

import NavBar from './components/NavBar';
import UserOptionsTab from './components/UserOptionsTab';

import { getUser } from './thunks/userThunks'
import { loadingManager } from './actions/userActions';
import { getMenuChoices } from './thunks/menuChoiceThunks';

class App extends React.Component {

  componentDidMount(){
    const location = this.props.history.location.pathname;
    const token = localStorage.token;
    if(token){
      this.props.loadingManager();
      this.props.getUser(token)
    } else if (location !== '/login' && location !== '/signup'){
      this.props.history.push('/login');
    }
    this.props.loadMenuChoices();
  }

  render(){
    return (
      <div>
         <NavBar />

        {
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
            <Route exact path="/" render={() => <UserOptionsTab />} />
          </Switch>
         }
        <div hidden={this.props.loading}></div>
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
