import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../layout/Alert';
import { createTicket } from '../../actions/tickets';
import { getUsers } from '../../actions/users';

class CreateTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      assignedTo: null,
      category: '',
      priority: '',
      status: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsers();
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    const { description, assignedTo, category, priority, status } = this.state;
    const { history } = this.props;
    const { projectId } = this.props.match.params;

    e.preventDefault();
    let ticket = {
      description,
      assignedTo,
      category,
      priority,
      status
    };

    this.props.createTicket(ticket, history, projectId);
    this.setState({
      description: '',
      category: '',
      priority: '',
      status: '',
      assignedTo: null
    });

    this.props.toggle();
  }

  render() {
    return (
      <div className=' my-4'>
        <div className='card shadow no-border mb-4'>
          <div className='card-header bg-primary text-white'>
            <h1>Create a Ticket</h1>
          </div>
          <div className='card-body'>
            <Alert />
            <form action='post' className='form'>
              <div className='form-group'>
                <label htmlFor='description'>Description:</label>
                <textarea
                  onChange={this.handleChange}
                  name='description'
                  placeholder='Enter a description of the ticket.'
                />
              </div>

              <div className='form-group'>
                <select
                  name='category'
                  defaultValue='none'
                  className='form-control'
                  onChange={this.handleChange}
                >
                  <option value='none' disabled>
                    Select a category
                  </option>
                  <option name='UI'>UI</option>
                  <option name='Redux'>Redux</option>
                  <option name='Routing'>Routing</option>
                  <option name='Backend'>Backend</option>
                  <option name='UX'>UX</option>
                </select>
              </div>

              <div className='form-group'>
                <select
                  name='priority'
                  defaultValue='none'
                  className='form-control'
                  onChange={this.handleChange}
                >
                  <option value='none' disabled>
                    Select a priority
                  </option>
                  <option name='low'>low</option>
                  <option name='medium'>medium</option>
                  <option name='high'>high</option>
                </select>
              </div>

              <div className='form-group'>
                <select
                  name='status'
                  defaultValue='none'
                  className='form-control'
                  onChange={this.handleChange}
                >
                  <option value='none' disabled>
                    Select a status (optional)
                  </option>
                  <option name='open'>open</option>
                  <option name='In progress'>In progress</option>
                  <option name='Waiting for review'>Waiting for review</option>
                  <option name='Stuck'>Stuck</option>
                  <option name='Done'>Done</option>
                </select>
              </div>

              <div className='form-group'>
                <select
                  name='assignedTo'
                  defaultValue='none'
                  className='form-control'
                  onChange={this.handleChange}
                >
                  <option value='none' disabled>
                    Select an Assigned User
                  </option>
                  {this.props.users.map(user => {
                    return (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <input
                type='submit'
                className='form-control'
                disabled={
                  !this.state.description ||
                  !this.state.category ||
                  !this.state.assignedTo ||
                  !this.state.priority
                }
                onClick={this.handleSubmit}
                className='btn btn-success'
                value='Submit'
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  users: state.users.users
});

export default connect(mapStateToProps, { createTicket, getUsers })(
  withRouter(CreateTicket)
);
