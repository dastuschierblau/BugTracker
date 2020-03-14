import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className='landing'>
      <div className='landing-inner d-flex flex-column align-items-center justify-content-center'>
        <h1 className='h1 mb-0 text-primary mb-3 font-weight-bold text-center'>
          Slack Tracker
        </h1>
        <h3 className='font-weight-bold text-white text-center'>
          <p>Manage your team's collaboration on multiple projects.</p>
          <p>The tools you need to pick up the slack.</p>
        </h3>
        <div className='buttons my-3'>
          <Link to='/register' className='btn btn-primary'>
            Sign Up
          </Link>
          <Link to='/login' className='btn btn-success'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
