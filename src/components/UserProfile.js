import React from 'react';
import {connect} from 'react-redux';
import { Col, Row} from 'reactstrap';
import moment from 'moment';

class UserProfile extends React.Component {


 lomalditogender = () => {
    if (this.props.user.liked_genders){
      return this.props.user.liked_genders.map(gender =>  gender.name).join(', ')
    }
  }

  render(){


    return(
        <div id="user-profile" className="text-center p-4">
           <div >
             <h5>User Profile</h5>
              <h5>{this.props.user.full_name}</h5>
           </div>
           <div className="p-4" >
             <img  src={this.props.user.image_url} style={{ height: '15vh', maxWidth: '30vw'}}   alt={this.props.user.full_name} />
           </div>
           <Row form>
            <Col md={6}  >
              <p>Email:<br/> {this.props.user.email}</p>
            </Col>
            <Col md={6}>
              <p>Date of Birth: <br/>{moment(this.props.user.date_of_birth).format('LL')}</p>
            </Col>
          </Row>
          <Row form>
           <Col md={6}>
             <p>Gender: <br/>{this.props.user.gender ? this.props.user.gender.name : null}</p>
           </Col>
           <Col md={6}>
            <p> Interested Genders: <br/>{this.lomalditogender()}</p>
           </Col>
         </Row>

         </div>

    )
  }
}

const mapStateToprops = state =>{
  return { user: state.userReducer.user }
}

export default connect(mapStateToprops)(UserProfile);
