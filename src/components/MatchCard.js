import React from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Button, Modal, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import {updateUserMatches} from '../thunks/userThunks';

class MatchCard extends React.Component  {

  state = {
    displayUser: false,
    tooltipOpen: false
  }

   menuChoicesFilterAndMapper = (filterParam) => {
      const menuChoices = this.props.menuChoices.filter(choice => {
        return choice.id === filterParam
      })
      return menuChoices[0].name;
    }

    handleUserDisplay = () => {
      this.setState({
        displayUser: !this.state.displayUser
      })
    }

    toggle = () => {
      this.setState(prevState => ({
        displayUser: !prevState.displayUser
      }));
    }

      toggleTooltip = () => {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
      }

      handleUserClick = choice => {
        this.props.updateUserMatches(this.props.matchData.id,{user_id:this.props.userId, accepted_match: choice});
      }


  render(){
      const {full_name, gender, age, image_url, crave } = this.props.matchData.user_data;
      return(
        <div className="text-center p-4  justify-content-center" >

          <div className="card mb-9" >
            <div className="row no-gutters justify-content-center">
                <div className="col-md-3" id="crave" style={{cursor:'pointer'}}  >
                  <img onClick={() => this.handleUserClick(true) } src={require('../assets/images/would-eat.png')}  className="card-img" alt="Read heart with fork and knife." />
                  <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="crave" toggle={this.toggleTooltip}>
                    Crave this User!
                  </Tooltip>
              </div>

                <div className="col-md-3">
                  <img  style={{cursor:'pointer'}}  onClick={this.handleUserDisplay} src={image_url}  className="card-img" alt={full_name} />
                </div>
                <div style={{cursor:'pointer'}}  className="col-md-3" id="un-crave">
                  <img onClick={() => this.handleUserClick(false) } src={require('../assets/images/would-not-eat.png')} className="card-img" alt="Black heart with fork and knife." />
                    <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="un-crave" toggle={this.toggleTooltip}>
                      Not-Crave this User!
                    </Tooltip>
                </div>
              </div>
              <div className="card-footer">
                <h5>{full_name}</h5><p className="card-text">Craves: <br/>{
                  this.menuChoicesFilterAndMapper(crave.main_course_id) + ', ' +
                  this.menuChoicesFilterAndMapper(crave.dessert_id) + ', ' +
                  this.menuChoicesFilterAndMapper(crave.drink_id) + ' and ' +
                  crave.other  + '.'
                }</p>
              </div>
          </div>
              <div>
                <Modal isOpen={this.state.displayUser} toggle={this.toggle}  className="text-center justify-content-center">
                  <ModalBody>
                    <img onClick={this.handleUserDisplay}  src={image_url} className="avatar " alt={full_name} />
                    <h4>{full_name}</h4>
                    <h5>Age: {age}</h5>
                    <h5>Identifies as: {gender.name}</h5>

                </ModalBody>
                  <ModalFooter  className="text-center justify-content-center">
                    <Button style={{backgroundColor: '#be5960'}} onClick={this.toggle}>Close Profile</Button>
                  </ModalFooter>
                </Modal>
              </div>
        </div>
      )
  }
};

const mapStateToprops = state => {
  return {
    userId: state.userReducer.user.id,
    userCraves: state.userReducer.user.craves,
    menuChoices: state.menuChoiceReducer.menuChoices
  }
};

const mapDispatchToProps = dispatch => ({
  updateUserMatches: (matchedCraveId, matchedCraveData) => dispatch(updateUserMatches(matchedCraveId,matchedCraveData))
});

export default connect(mapStateToprops, mapDispatchToProps)(MatchCard);
