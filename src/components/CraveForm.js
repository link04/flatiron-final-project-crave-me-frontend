import React from 'react';
import {connect} from 'react-redux';

import { postCrave } from '../thunks/craveThunks';
import { Row, Col, Form, FormGroup, Input, Button} from 'reactstrap';

import FontAwesome from 'react-fontawesome';

class CraveForm extends React.Component {

  state = {
    user_id: 0,
    other: '',
    main_course_id: 0,
    dessert_id: 0,
    drink_id: 0
  }

  handleInputChange = (event) =>  {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleSubmit = (event) =>  {
    event.preventDefault();
    this.setState({user_id: this.props.userId},
      () => this.props.postCrave(this.state));
  }

  menuChoicesFilterAndMapper = (filterParam) => {

    const menuChoices = this.props.menuChoices.filter(choice => {
      return choice.category === filterParam
    })
    const sortedChoices = menuChoices.sort(function (a, b) {
      return (a.name).localeCompare(b.name);
    })
    return sortedChoices.map(choice => {
      return (<option key={choice.id} value={choice.id} >{choice.name}</option>)
    })

  }

  render(){

    return(
      <div className="text-center p-4"  >
        <h5>Create Crave</h5>
          <Form autoComplete="off" onSubmit={this.handleSubmit} >
            <Row form>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <label htmlFor="main_course">Main Course: </label>
                  <br/>
                    <Input type="select" id="main_course" name="main_course_id" onChange={this.handleInputChange} required>
                      <option value='' >Select Main Course</option>
                      {this.menuChoicesFilterAndMapper('main_course')}
                    </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <label htmlFor="main_course">Dessert: </label>
                  <br/>
                    <Input type="select" id="dessert" name="dessert_id" onChange={this.handleInputChange} required>
                      <option value='' >Choose Dessert</option>
                      {this.menuChoicesFilterAndMapper('dessert')}
                    </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <label htmlFor="drink_id">Drink: </label>
                  <br/>
                    <Input type="select" id="drink" name="drink_id" onChange={this.handleInputChange} required>
                      <option value='' >Choose Drink</option>
                      {this.menuChoicesFilterAndMapper('drink')}
                    </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <FormGroup>
                  <label htmlFor="other">Add Other Crave</label>
                  <br/>
                    <Input required onChange={this.handleInputChange} name="other" id="other" value={this.state.other} placeholder="Other Crave" type="text"/>
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" className="m-2" color="primary">
              Begin Craving <FontAwesome name="cutlery" />
            </Button>



          </Form>
      </div>
    );
  };
}

  const mapStateToProps = state => {
    return {
      menuChoices: state.menuChoiceReducer.menuChoices,
      userId: state.userReducer.user.id,
      user: state.userReducer.user
    };
  }

  const mapDispatchToProps = dispatch => ({
    postCrave: (crave) => dispatch(postCrave(crave))
  })

export default connect(mapStateToProps,mapDispatchToProps)(CraveForm)
