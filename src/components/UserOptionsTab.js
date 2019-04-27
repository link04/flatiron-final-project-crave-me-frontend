import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from 'react-router-dom';

import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import CraveContainer from '../containers/CraveContainer';
import ConversationsContainer from '../containers/ConversationsContainer';
import MatchesContainer from '../containers/MatchesContainer';


class UserOptionsTab  extends React.Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '3'
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
      <div >
      <Col sm="12" >
        <Nav tabs style={{lineHeight: '50px'}} className="d-flex justify-content-center nav-fill">
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
            Matches
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
            Conversations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Cravings
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane  tabId="1" >
              <Col className="tab-childs" sm="8">
                <MatchesContainer />
              </Col>
          </TabPane>
          <TabPane tabId="2">
              <Col className="tab-childs" sm="8">
                <ConversationsContainer />
              </Col>
          </TabPane>
          <TabPane tabId="3">
              <Col className="tab-childs" sm="8">
                <CraveContainer />
              </Col>
          </TabPane>
        </TabContent>
        </Col>
      </div>
    );
  }
}

export default withRouter(connect()(UserOptionsTab));
