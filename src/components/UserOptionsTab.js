
import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import { Nav, NavItem, NavLink, Col } from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import { getUserMatches } from '../thunks/userThunks';
import { getUserConversations } from '../thunks/conversationThunks';

class UserOptionsTab  extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <div id="tab-options" >
      <Col sm="12"   >
        <Nav tabs id="tab-options" className="d-flex justify-content-center nav-fill">
          <NavItem >
            <NavLink
              className={classnames({ active: this.props.history.location.pathname === '/matches' })}
              onClick={() => {
                this.toggle('1');
                this.props.handleClickedLink('matches')
                // this.props.getUserMatches(this.props.user.id)
              }}
            >
            Matches <FontAwesome name='users'/>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.history.location.pathname === '/conversations' })}
              onClick={() => {
                this.toggle('2');
                this.props.handleClickedLink('conversations')
                // this.props.getUserConversations(this.props.user.id)
              }}
            >
            Conversations <FontAwesome name='comments'  />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.props.history.location.pathname === '/cravings' })}
              onClick={() => { this.toggle('3');
              this.props.handleClickedLink('cravings')
              }}
            >
              Craves <FontAwesome name='cutlery'  />
            </NavLink>
          </NavItem>
        </Nav>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {user : state.userReducer.user}
}

const mapDispatchToProps = dispatch => ({
  getUserMatches: (userId) => dispatch(getUserMatches(userId)),
  getUserConversations: (userId) => dispatch(getUserConversations(userId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserOptionsTab));
