import React from 'react';

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
            <span className='mr-2  text-gray-600 small'>Toby Slack</span>
          </li>
          <li className='nav-item'>
            <button className='btn btn-success'>Logout</button>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Topbar;
