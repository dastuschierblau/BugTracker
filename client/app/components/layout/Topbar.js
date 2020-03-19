import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Topbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleMenu: 'closed'
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState(prevstate => ({
      toggleMenu: prevstate.toggleMenu === 'closed' ? 'active' : 'closed'
    }));
  }

  render() {
    return (
      <div className='topnav'>
        <nav className='navbar navbar-expand navbar-light bg-white topbar static-top shadow'>
          {/* Sidebar Toggle (Topbar) */}
          <button
            id='sidebarToggleTop'
            className='btn btn-link d-md-none rounded-circle mr-3'
            onClick={this.toggleMenu}
          >
            <i className='fa fa-bars'></i>
          </button>
          {/* Topbar Navbar */}
          <ul className='navbar-nav ml-auto'>
            <div className='topbar-divider d-none d-sm-block'></div>

            {/* Nav Item - User Information */}
            <li className='nav-item nav-link'>
              <span className='mr-2  text-gray-600 small'>
                {this.props.user !== null && this.props.user.name}
              </span>
            </li>
            <li className='nav-item'>
              <button className='btn btn-success' onClick={this.props.logout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>

        <ul
          className={`bg-primary py-2 collapse-inner rounded navbar-nav collapse-nav ${this.state.toggleMenu}`}
        >
          <li className='collapse-item'>
            <a className='collapse-item btn text-white' href='/dashboard'>
              Dashboard
            </a>
          </li>
          <li className='collapse-item'>
            <a className='collapse-item btn text-white' href='/users'>
              Users
            </a>
          </li>
          <li className='collapse-item'>
            <a className='collapse-item btn text-white' href='/projects'>
              Projects
            </a>
          </li>
          <li className='d-flex justify-content-around p-4'>
            <i className='fab fa-node-js fa-2x'></i>
            <i className='fas fa-crow fa-2x'></i>
            <i className='fab fa-react fa-2x'></i>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Topbar);
