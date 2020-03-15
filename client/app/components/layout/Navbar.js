import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Navbar(props) {
  return (
    <div id='wrapper'>
      <Sidebar />

      <div id='content-wrapper' className='d-flex flex-column'>
        <Topbar />
        <div className='container-fluid'>{props.children}</div>
      </div>
    </div>
  );
}
