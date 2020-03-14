import React from 'react';

function Sidebar() {
  return (
    <ul
      className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
      id='accordionSidebar'
    >
      {/* Sidebar - Brand */}
      <a
        className='sidebar-brand d-flex align-items-center justify-content-center'
        href='index.html'
      >
        <div className='sidebar-brand-icon rotate-n-15'></div>
        <div className='sidebar-brand-text mx-3'>Slack Tracker</div>
      </a>

      {/* Divider */}
      <hr className='sidebar-divider my-0' />

      {/* Nav Item - Dashboard */}
      <li className='nav-item active'>
        <a className='nav-link' href='index.html'>
          <i className='fas fa-fw fa-tachometer-alt'></i>
          <span>Dashboard</span>
        </a>
      </li>

      {/* Divider */}
      <hr className='sidebar-divider' />

      {/* Nav Item - Pages Collapse Menu */}
      <li className='nav-item'>
        <a className='nav-link' href='users.html'>
          <i className='fas fa-fw fa-cog'></i>
          <span>Users</span>
        </a>
      </li>

      {/* Nav Item - Utilities Collapse Menu */}
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          <i className='fas fa-fw fa-wrench'></i>
          <span>Manage Users</span>
        </a>
      </li>

      {/* Nav Item - Pages Collapse Menu */}
      <li className='nav-item'>
        <a className='nav-link' href='#'>
          <i className='fas fa-fw fa-folder'></i>
          <span>Projects</span>
        </a>
      </li>

      {/* Divider */}
      <hr className='sidebar-divider d-none d-md-block' />

      <div className='sidebar-foot'>
        <i className='fab fa-node-js fa-2x'></i>
        <i className='fas fa-crow fa-2x'></i>
        <i className='fab fa-react fa-2x'></i>
      </div>
    </ul>
  );
}

export default Sidebar;
