import React, { Fragment } from 'react';
import Navbar from './Navbar';
import Alert from './Alert';
import { connect } from 'react-redux';
import {
  getTickets,
  getTicket,
  editTicket,
  addComment
} from '../../actions/tickets';
import getChartData from '../../utils/getChartData';
import EditTicket from '../create-forms/EditTicket';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import { MDBDataTable } from 'mdbreact';

function History({ ticket, loading, userNames }) {
  if (!ticket || loading) {
    return 'Loading';
  }

  const data = {
    columns: [
      {
        label: 'User',
        field: 'user',
        sort: 'asc'
      },
      {
        label: 'Description',
        field: 'desc',
        sort: 'asc'
      },
      {
        label: 'Time',
        field: 'time',
        sort: 'asc'
      }
    ],
    rows: ticket.history.map(item => {
      return {
        user: userNames[item.user],
        desc: item.description,
        time: moment(item.time).format('MM/DD/YYYY HH:mm a')
      };
    })
  };

  return (
    !loading &&
    ticket && (
      <div className='col-lg-8 mb-4'>
        <div className='card shadow'>
          <div className='card-header bg-gradient-purple'>History</div>
          <div className='card-body'>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
              voluptas officia voluptate omnis error minus rem vero porro
              accusantium quibusdam!
            </p>

            <MDBDataTable scrollX striped data={data} />
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

function Comments({ ticket, userNames, loading }) {
  if (!ticket || loading) {
    return 'Loading';
  }

  const data = {
    columns: [
      {
        label: 'User',
        field: 'user'
      },
      {
        label: 'Comment',
        field: 'text'
      },
      {
        label: 'Time',
        field: 'time',
        sort: 'asc'
      }
    ],
    rows: ticket.comments.map(item => {
      return {
        user: userNames[item.user],
        text: item.text,
        time: moment(item.date).format('MM/DD/YYYY HH:mm a')
      };
    })
  };

  return <MDBDataTable scrollX data={data} />;
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
    const { ticket } = this.props;

    this.setState(prevState => ({
      editTicket: !prevState.editTicket,
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

    this.props.getTicket(ticketId);
  }

  render() {
    const {
      ticket,
      userNames,
      users,
      tickets: { loading }
    } = this.props;

    if (loading) {
      return 'Loading...';
    } else if (!ticket) {
      return <Redirect to='/dashboard' />;
    }

    return (
      <Navbar>
        {/* Ticket Properties */}

        <h1 className='h3 mb-3 text-gray-800 my-3'>Ticket</h1>
        <div className='row p-sm-4 mb-3 d-flex justify-content-center'>
          <i className='fab fa-react fa-4x text-primary'></i>
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
                    <td>{userNames[ticket.assignedTo]}</td>
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
              users={users}
              loading={loading}
            />
          </Fragment>
        )}

        {/* End edit ticket */}

        <div className='row mb-5'>
          {/* Begin ticket history */}

          <History ticket={ticket} userNames={userNames} loading={loading} />

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

                <Comments
                  ticket={ticket}
                  userNames={userNames}
                  loading={loading}
                />
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
  users: state.users,
  userNames: state.users.idToName
});

export default connect(mapStateToProps, {
  getTickets,
  getTicket,
  editTicket,
  addComment
})(Ticket);
