import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import CraveForm from '../components/CraveForm'
import CraveCard from '../components/CraveCard'
import { setCrave } from '../actions/craveActions'


class CraveContainer extends React.Component {

  componentDidMount(){
    this.props.getCrave(this.props.user.last_crave)
  }

  render(){
    console.log(  this.props);
    return(
      <div>
        {this.props.crave === undefined || this.props.crave === null   ?
          <CraveForm />
          :
          <CraveCard />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    crave: state.craveReducer.crave
  }
}

const mapDispatchToProps = dispatch => ({
  getCrave: (userCrave) => dispatch(setCrave(userCrave))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CraveContainer)) ;
