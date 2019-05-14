import React from 'react';
import {connect} from 'react-redux';
import CraveForm from '../components/CraveForm'
import CraveCard from '../components/CraveCard'
import { setCrave } from '../actions/craveActions'
import { coordinateUser } from '../thunks/userThunks';

class CraveContainer extends React.Component {

  componentDidMount(){
    if(Object.keys(this.props.user).length > 0){
      this.geoFindMe();
    }
  }

  geoFindMe = (userId) => {
      const success = (position) =>  {
        const coordinates = {
          coordinates: `${position.coords.latitude} ${position.coords.longitude}`
        }
          this.props.udpatedCoordinates(coordinates , this.props.user.id)
      }

      const error = () => {
        alert('Unable to retrieve your location, for acurate craving please try again.');
      }

      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
  }


  render(){
    return(
      <div  style={{maxHeight:'70vh', overflowY:'auto'}} >
        {this.props.user.last_crave === null || this.props.user.last_crave === undefined?
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
  setCrave: (userCrave) => dispatch(setCrave(userCrave)),
  udpatedCoordinates: (coordinates, userId) => dispatch(coordinateUser(coordinates, userId))
})

export default connect(mapStateToProps,mapDispatchToProps)(CraveContainer) ;
