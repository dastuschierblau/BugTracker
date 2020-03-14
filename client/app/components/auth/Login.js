import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password
    };

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const body = JSON.stringify(user);

      const res = await axios.post(`${baseUrl}/api/auth`, body, config);

      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  render() {
    return (
      <div className='landing'>
        <div className='landing-inner d-flex flex-column align-items-center justify-content-center'>
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
                  <label>Email</label>
                  <input
                    type='text'
                    name='email'
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder='Email'
                  />
                </div>
                <div className='form-group login-input'>
                  <label>Password</label>
                  <input
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder='password'
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
                <Link to='/register' className='btn btn-success'>
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

export default Login;
