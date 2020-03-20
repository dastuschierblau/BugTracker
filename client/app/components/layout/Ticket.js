import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Alert from './Alert';
import { connect } from 'react-redux';
import {
  getTickets,
  setTicket,
  editTicket,
  addComment
} from '../../actions/tickets';
import { Redirect } from 'react-router-dom';

function EditTicket({ handleChange, toggle, handleSubmit, values }) {
  const { category, priority, status, assignedTo, description } = values;

  return (
    <div className='row mb-5'>
      <div className='col-lg-8 m-auto mb-4'>
        <div className='card shadow'>
          <div className='card-header bg-gradient-purple d-flex justify-content-between'>
            Edit Ticket:
            <i onClick={toggle} className='fas fa-window-close fa-2x'></i>
          </div>
          <div className='card-body'>
            <form action='post'>
              <div className='form-group d-flex justify-content-between'>
                <label>Category:</label>
                <select
                  onChange={e => handleChange(e)}
                  name='category'
                  value={category.current}
                >
                  <option name='category' value='UI'>
                    UI
                  </option>
                  <option name='category' value='Routing'>
                    Routing
                  </option>
                  <option name='category' value='Backend'>
                    Backend
                  </option>
                  <option name='category' value='Redux'>
                    Redux
                  </option>
                  <option name='category' value='UX'>
                    UX
                  </option>
                </select>
              </div>
              <div className='form-group d-flex flex-column'>
                <label>Description:</label>
                <textarea
                  name='description'
                  cols='30'
                  rows='5'
                  onChange={e => handleChange(e)}
                  name='description'
                  value={description.current}
                ></textarea>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <label>Assigned To:</label>
                <select
                  name='assignedTo'
                  onChange={e => handleChange(e)}
                  value={assignedTo.current}
                >
                  <option value='Toby Slack'>Toby Slack</option>
                  <option value='Brett Slack'>Brett Slack</option>
                  <option value='John Doe'>John Doe</option>
                  <option value='Emmett Slack'>Emmett Slack</option>
                </select>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <label>Status:</label>
                <select
                  name='status'
                  value={status.current}
                  onChange={e => handleChange(e)}
                >
                  <option value='Open'>Open</option>
                  <option value='In progress'>In Progress</option>
                  <option value='Pending'>Pending Review</option>
                  <option value='Stuck'>Stuck</option>
                  <option value='Done'>Done</option>
                </select>
              </div>
              <div className='form-group d-flex justify-content-between'>
                <label>Priority</label>
                <select
                  name='priority'
                  value={priority.current}
                  onChange={e => handleChange(e)}
                >
                  <option value='low'>Low</option>
                  <option value='medium'>Medium</option>
                  <option value='high'>High</option>
                </select>
              </div>
              <input
                type='submit'
                className='btn btn-success'
                value='Submit'
                onClick={e => handleSubmit(e)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function History({ ticket, loading }) {
  return (
    !loading && (
      <div className='col-lg-8 mb-4'>
        <div className='card shadow'>
          <div className='card-header bg-gradient-purple'>History</div>
          <div className='card-body'>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              voluptas officia voluptate omnis error minus rem vero porro
              accusantium quibusdam!
            </p>
            <div className='table-responsive'>
              <table
                className='table table-bordered'
                id='dataTable2'
                width='100%'
                cellSpacing='0'
              >
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Description</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>User</th>
                    <th>Description</th>
                    <th>Time</th>
                  </tr>
                </tfoot>
                <tbody>
                  {ticket &&
                    ticket.history.map((item, index) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.user}</td>
                          <td>{item.description}</td>
                          <td>{item.time}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function AddComment({ text, handleChange, handleSubmit, loading }) {
  return (
    !loading && (
      <div className='add-comment p-sm-2 mb-3'>
        <textarea
          className='mb-3'
          name='comment'
          id='commentField'
          cols='30'
          rows='10'
          value={text}
          onChange={e => handleChange(e)}
        ></textarea>
        <button className='btn btn-success' onClick={e => handleSubmit(e)}>
          Add your comment
        </button>
      </div>
    )
  );
}

class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editTicket: false,
      ticket: {
        category: {
          current: '',
          edited: false
        },
        description: {
          current: '',
          edited: false
        },
        assignedTo: {
          current: '',
          edited: false
        },
        status: {
          current: '',
          edited: false
        },
        priority: {
          current: '',
          edited: false
        }
      },
      comment: ''
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShallowChange = this.handleShallowChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({
      editTicket: !prevState.editTicket
    }));
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState(prevState => ({
      ticket: {
        ...prevState.ticket,
        [name]: {
          current: value,
          edited: true
        }
      }
    }));
  }

  handleShallowChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  handleCommentSubmit(e) {
    e.preventDefault();

    const { comment } = this.state;

    this.props.addComment(this.props.match.params.ticketId, comment);
    this.setState({
      comment: ''
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Get only values that were changed from the ticket state:
    let keys = Object.keys(this.state.ticket);
    let editedKeys = keys.filter(item => {
      return this.state.ticket[item].edited;
    });

    const values = editedKeys.reduce((group, item) => {
      group[item] = this.state.ticket[item].current;
      return group;
    }, {});

    // Edit ticket
    this.props.editTicket(this.props.match.params.ticketId, values);
    setTimeout(this.toggleEdit, 2000);
  }

  componentDidMount() {
    const { ticketId } = this.props.match.params;
    const { tickets } = this.props.tickets;

    if (tickets.length !== 0) {
      const ticket = this.props.tickets.tickets.filter(item => {
        return item._id === ticketId;
      })[0];

      this.props.setTicket(ticket);

      this.setState(prevState => ({
        ticket: {
          category: {
            ...prevState.category,
            current: ticket.category
          },
          description: {
            ...prevState.description,
            current: ticket.description
          },
          priority: {
            ...prevState.priority,
            current: ticket.priority
          },
          status: {
            ...prevState.status,
            current: ticket.status
          },
          assignedTo: {
            ...prevState.assignedTo,
            current: ticket.assignedTo
          }
        }
      }));
    }
  }

  render() {
    const { ticket } = this.props,
      { loading } = this.props.tickets;

    if (this.props.tickets.tickets.length === 0) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Navbar>
        {/* Ticket Properties */}

        <h1 className='h3 mb-3 text-gray-800 my-3'>Ticket</h1>
        <div className='row p-sm-4 mb-3 d-flex justify-content-center'>
          <img src='../../img/searching.svg' alt='Project building' />
        </div>

        <div className='row my-3'>
          <div className='col-lg-12 table-responsive'>
            <table className='table table-bordered'>
              <thead className='bg-gradient-purple'>
                <tr>
                  <th>Category</th>
                  <th className='toggle-collapse'>Description</th>
                  <th>Assigned To</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ticket && (
                  <tr>
                    <td>{ticket.category}</td>
                    <td className='toggle-collapse'>{ticket.description}</td>
                    <td>{ticket.assignedTo}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.status}</td>
                    <td>
                      <i className='far fa-edit' onClick={this.toggleEdit}></i>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* End ticket properties */}

        {/* Begin edit ticket */}

        {this.state.editTicket && (
          <Fragment>
            <Alert />
            <EditTicket
              toggle={this.toggleEdit}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              values={this.state.ticket}
              loading={loading}
            />
          </Fragment>
        )}

        {/* End edit ticket */}

        <div className='row mb-5'>
          {/* Begin ticket history */}

          <History ticket={ticket} loading={loading} />

          {/* End Ticket history */}

          {/* Begin comments */}
          <div className='col-lg-4 mb-3'>
            <div className='card shadow'>
              <div className='card-header bg-gradient-purple'>Comments</div>

              <div className='card-body'>
                <Alert />
                <AddComment
                  text={this.state.comment}
                  handleChange={this.handleShallowChange}
                  handleSubmit={this.handleCommentSubmit}
                  loading={loading}
                />

                <div className='table-responsive'>
                  <table
                    className='table table-bordered'
                    id='dataTable3'
                    width='100%'
                    cellSpacing='0'
                  >
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>User</th>
                        <th>Comment</th>
                        <th>Time</th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {ticket &&
                        ticket.comments.map(item => {
                          return (
                            <tr key={item._id}>
                              <td>{item.user}</td>
                              <td>{item.text}</td>
                              <td>{item.date}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* End comments */}
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  ticket: state.tickets.ticket,
  users: state.users.users
});

export default connect(mapStateToProps, {
  getTickets,
  setTicket,
  editTicket,
  addComment
})(Ticket);
