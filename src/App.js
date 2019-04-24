import React from 'react';
import { connect } from 'react-redux';
import SignUp from './components/SignUp';

class App extends React.Component {

  render(){
    return (

      <div id="top">
        <SignUp />

      </div>

    );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

export default connect(mapStateToProps)(App);
