import React from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../actions/userActions';
import UserOptionsTab from '../components/UserOptionsTab';

import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert';

import { withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    handleClickLogout = () =>{

      swal("Are you sure?", {
          buttons: {
            cancel: "No",
            confirm: "Sure"
          },
        })
        .then((value) => {
          switch (value) {
            case true:
                delete localStorage.token;
                this.props.userLogOut();
                this.props.history.push('/login');
                swal("Bye Bye!");
              break;
            case null:
              break;
            default:
          }
        });
    }

    handleClickedLink = (location) => {
      if(location === '/login' || location === '/signup'){
        this.props.userLogOut();
        this.props.history.push(location);
      } else  {
        this.props.history.push(location);
      }
    }

    render() {
      return (
        <div>
          <Navbar style={{backgroundColor:"#dce4eb"}} light expand="md">
            <NavbarBrand >
                CraveMe
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              { Object.keys(this.props.user).length > 0 && !this.props.user.errors ?
                <>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="link" nav caret>
                    {this.props.user.full_name} <FontAwesome name="address-book-o" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem  className="link"  >
                    <NavLink onClick={() => this.handleClickedLink('/userprofile')} >
                      Profile  <FontAwesome name="user" />
                    </NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem style={{backgroundColor: '#a00d1e', color:'white'}}  >
                      <NavItem onClick={this.handleClickLogout}>
                        Log Out <FontAwesome name="sign-out" />
                      </NavItem>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </>
                :
                <>
                  <NavItem onClick={() => this.handleClickedLink('/login')} >
                    <NavLink className="link" >
                        Log In
                    </NavLink>
                  </NavItem>
                  <NavItem onClick={() => this.handleClickedLink('/signup')} >
                    <NavLink className="link" >
                        Sign Up
                    </NavLink>
                  </NavItem>
                </>
              }
              </Nav>
            </Collapse>
          </Navbar>
          { Object.keys(this.props.user).length > 0 && !this.props.user.errors ?
            <UserOptionsTab handleClickedLink={this.handleClickedLink} />
            :
            <br/>
          }
        </div>
      );
    }
}


const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => ({
  userLogOut: () => dispatch(removeUser())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
