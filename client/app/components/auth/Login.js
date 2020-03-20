import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import Alert from '../layout/Alert';
import useDemoUser from '../../utils/useDemoUser';

const baseUrl = process.env.NEXT_STATIC_BASE_URL || 'http://localhost:5000';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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

  setDemo(role) {
    const user = useDemoUser(role);
    const { email, password } = user;

    this.setState({
      email,
      password
    });

    try {
      this.props.login(user);
    } catch (err) {
      this.props.setAlert('Invalid Credentials', 'danger');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    try {
      this.props.login(user);
    } catch (err) {
      this.props.setAlert('Invalid Credentials', 'danger');
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
                Log In
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
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Log In'
                    className='btn btn-success btn-full'
                  />
                </div>
              </form>
              <div className='d-flex flex-column justify-center text-center'>
                <div className='mb-2'>Don't have an account?</div>
                <Link to='/register' className='btn btn-primary'>
                  Create an Account
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className='h3 text-center font-weight-bold text-primary'>
              Or choose a demo account:
            </h3>
            <div className='row'>
              <div
                className='col-md-6 demo-user'
                onClick={() => this.setDemo('manager')}
              >
                <i className='fas fa-user mb-2'></i>
                <h6>Project Manager</h6>
              </div>
              <div
                className='col-md-6 demo-user'
                onClick={() => this.setDemo('developer')}
              >
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, login })(Login);
