import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, password2 } = this.state;

    if (password === password2) {
      const newUser = {
        name,
        email,
        password
      };

      this.props.register(newUser);
    } else {
      this.props.setAlert('Passwords do not match', 'danger');
    }
  }

  render() {
    // Redirect if logged in
    if (this.props.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <div className='landing'>
        <div className='landing-inner d-flex flex-column align-items-center justify-content-center'>
          <Alert />
          <div className='card shadow no-border mb-4'>
            <div className='card-header bg-primary'>
              <h1 className='h1 text-white mb-3 font-weight-bold text-center'>
                Register
              </h1>
            </div>
            <div className='card-body'>
              <form
                onSubmit={this.handleSubmit}
                className='form login-form mb-4'
              >
                <div className='form-group login-input'>
                  <input
                    className='form-control'
                    type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder='Name'
                  />
                </div>
                <div className='form-group login-input'>
                  <input
                    className='form-control'
                    type='text'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder='Email'
                  />
                </div>
                <div className='form-group login-input'>
                  <input
                    className='form-control'
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder='Password'
                  />
                </div>
                <div className='form-group login-input'>
                  <input
                    className='form-control'
                    type='password'
                    name='password2'
                    value={this.state.password2}
                    onChange={this.handleChange}
                    placeholder='Confirm Password'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Register'
                    className='btn btn-success btn-full'
                  />
                </div>
              </form>
              <div className='d-flex flex-column justify-center text-center'>
                <div className='mb-2'>Already have an account?</div>
                <Link to='/login' className='btn btn-primary'>
                  Log In
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className='h3 text-center font-weight-bold text-primary'>
              Or choose a demo account:
            </h3>
            <div className='row'>
              <div className='col-md-6 demo-user'>
                <i className='fas fa-user mb-2'></i>
                <h6>Project Manager</h6>
              </div>
              <div className='col-md-6 demo-user'>
                <i className='fas fa-user mb-2'></i>
                <h6>Developer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
