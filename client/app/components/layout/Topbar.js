import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Topbar extends React.Component {
  render() {
    return (
      <nav className='navbar navbar-expand navbar-light bg-white topbar static-top shadow'>
        {/* Sidebar Toggle (Topbar) */}
        <button
          id='sidebarToggleTop'
          className='btn btn-link d-md-none rounded-circle mr-3'
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Topbar);
