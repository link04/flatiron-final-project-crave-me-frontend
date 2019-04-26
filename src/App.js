
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import CraveContainer from './containers/CraveContainer';

class App extends React.Component {

  render(){
    return (
      <div>
      <NavBar />
      <div className="container" >
        {
           <Switch>
           <Route
           exact
           path="/signup"
           render={() => <SignUp />}
           />
           <Route
           exact
           path="/cravecontainer"
           render={() => <CraveContainer />}
           />
           <Route path="/" render={() => <SignUp />} />
           </Switch>
         }

        <div className={this.props.loading ? 'modal' : 'hidden-modal'}></div>
      </div>
    </div>

    );
  }
}

const mapStateToProps = state => {
  console.log(state.userReducer);
  return {
    user: state.userReducer.user,
    loading: state.userReducer.loading
  }
}

export default withRouter(connect(mapStateToProps)(App));
