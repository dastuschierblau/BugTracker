import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { getUsers, editUser } from '../../actions/users';
import Alert from './Alert';
import { setAlert } from '../../actions/alert';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      role: ''
    };

    this.changeUserRole = this.changeUserRole.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleSelect(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  changeUserRole(e) {
    e.preventDefault();

    const { currentUser } = this.props;

    if (currentUser.role !== 'admin' && currentUser.role !== 'manager') {
      e.preventDefault();
      this.props.setAlert(
        'Not Authorized. You must be an admin to access this functionality.',
        'danger'
      );
    }

    const { user, role } = this.state;
    if (user && role) {
      this.props.editUser({
        target: user,
        value: role
      });
    }
  }

  render() {
    const { loading, users } = this.props.users;

    return (
      <Navbar>
        {/* Page Heading */}
        <div className='mb-4'>
          <h1 className='h3 my-3'>Users</h1>
        </div>

        <div className='card shadow mb-4'>
          <div className='card-header bg-gradient-purple py-3'>
            Slack Tracker Users
          </div>
          <div className='card-body'>
            <div className='table-responsive'>
              <table
                className='table'
                id='userTable'
                width='100%'
                cellSpacing='0'
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td>
                        <img src='../../img/loading.gif' alt='Loading...' />
                      </td>
                    </tr>
                  )}

                  {!loading &&
                    users.map((user, ind) => {
                      return (
                        <tr key={ind}>
                          <td>{user.name}</td>
                          <td>{user.role}</td>
                          <td>{user.email}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            {/* End of table-responsive */}
          </div>
        </div>
        {/* End of card div */}

        {/* Begin Edit User */}
        {!loading && (
          <div className='row mb-5'>
            <div className='col-xl-12 mb-4'>
              <div className='card shadow'>
                <div className='card-header bg-gradient-purple'>Edit User</div>
                <div className='card-body'>
                  <Alert />
                  <form action='post'>
                    <div className='form-group d-flex justify-content-between'>
                      <label>User:</label>
                      <select
                        name='user'
                        className='form-control'
                        defaultValue='none'
                        onChange={this.handleSelect}
                      >
                        <option value='none' disabled>
                          Select a User
                        </option>
                        {users.map((item, ind) => {
                          return (
                            <option key={ind} value={item._id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className='form-group'>
                      <label className='d-flex align-items-center'>Role:</label>
                      <select
                        name='role'
                        defaultValue='none'
                        className='form-control'
                        onChange={this.handleSelect}
                      >
                        <option value='none' disabled>
                          Select a Role
                        </option>
                        <option value='developer'>Developer</option>
                        <option value='manager'>Project Manager</option>
                        <option value='admin'>Admin</option>
                        <option value='guest'>Guest</option>
                      </select>
                    </div>

                    <input
                      type='submit'
                      disabled={!this.state.role || !this.state.user}
                      className='btn btn-success'
                      value='Submit'
                      onClick={this.changeUserRole}
                    ></input>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* End Edit User */}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  currentUser: state.auth.user
});

export default connect(mapStateToProps, { getUsers, editUser, setAlert })(
  Users
);
