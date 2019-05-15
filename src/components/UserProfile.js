import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { Row, Col, Form, FormGroup, CustomInput, Button} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { updateUserImage } from '../thunks/userThunks';

class UserProfile extends React.Component {

  state = {
    image:null,
    updateImage: false
  }

 mappedGendersList = () => {
    if (this.props.user.liked_genders){
      return this.props.user.liked_genders.map(gender =>  gender.name).join(', ')
    }
  }

  handleFileUploader = event => {
   this.setState({image: event.target.files[0]})
 }

 handleClick = () => {
   this.setState({
     updateImage: !this.state.updateImage
   })
 }

 handleSubmit = event => {
  event.preventDefault();
  this.props.updateUserImage({image: this.state.image}, this.props.user.id)
  .then(user => this.setState({
    image:null,
    updateImage: false
  }))
 }

  render(){
    return(
        <div id="user-profile" className="text-center p-4" style={{overflowY:'auto', maxHeight:'70vh' }}>
           <div >
             <h5>User Profile</h5>
              <h5>{this.props.user.full_name}</h5>
           </div>
           <div className="p-4" >
             <img hidden={this.state.updateImage} src={this.props.user.image_url} style={{ height: '15vh', maxWidth: '30vw'}}   alt={this.props.user.full_name} />
             <div>   <Button onClick={this.handleClick} type="button" className="m-2" color="secondary">
                  Edit <FontAwesome name="edit" />
                </Button></div>
          {this.state.updateImage ?
            ( <Form autoComplete="off" onSubmit={this.handleSubmit} >
               <Row form   >
                 <Col sm="12" md={{ size: 8, offset: 2 }} className="text-left">
                   <FormGroup >
                     {this.state.image !== null ?
                       <label>You choose {this.state.image.name}</label>
                       :
                       null
                     }
                     <CustomInput onChange={this.handleFileUploader} label={this.state.image === null? 'Update Image' : 'Image Selected'} type='file' id="image" name='image' required accept="image/png, image/jpeg" />
                   </FormGroup>
                 </Col>
               </Row>
               <Button type="submit" className="m-1" color="primary">
                 Update <FontAwesome name="edit" />
               </Button>
             </Form>)
             :
             null
           }

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
            <p> Interested Genders: <br/>{this.mappedGendersList()}</p>
           </Col>
         </Row>

         </div>

    )
  }
}

const mapStateToprops = state =>{
  return { user: state.userReducer.user }
};

const mapDispatchToProps = dispatch => ({
  updateUserImage: (image, user_id) => dispatch(updateUserImage(image, user_id))
});

export default connect(mapStateToprops, mapDispatchToProps)(UserProfile);
