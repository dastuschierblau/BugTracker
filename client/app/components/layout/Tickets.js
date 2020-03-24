import React, { Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTickets } from '../../actions/tickets';
import { setProject } from '../../actions/projects';
import CreateTicket from '../create-forms/CreateTicket';
import Moment from 'react-moment';

class Tickets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addTicket: false
    };

    this.toggleTicket = this.toggleTicket.bind(this);
  }

  componentDidMount() {
    const { projectId } = this.props.match.params;

    this.props.setProject(projectId);
    this.props.getTickets(projectId);
  }

  toggleTicket() {
    this.setState(prevState => ({
      addTicket: !prevState.addTicket
    }));
  }

  render() {
    const { project, manager } = this.props.location.state;
    const { userNames } = this.props;

    if (!project) return <Redirect to='/projects' />;

    return (
      <div>
        <div className='card shadow my-3'>
          <div className='card-header bg-gradient-purple'>{project.name}</div>
          <div className='card-body'>
            <p>{project.description}</p>
            <div className='d-flex justify-content-between'>
              <div>
                <Moment format='MM/DD/YYYY'>{project.date}</Moment>
              </div>
              <div>{`Manager: ${manager.name}`}</div>
            </div>
          </div>
        </div>

        {!this.props.tickets.loading && (
          <Fragment>
            <div className='card mb-4'>
              <div className='card-header bg-gradient-purple'>Tickets:</div>
              <div className='card-body'>
                <div className='table-responsive'>
                  <table
                    className='table table-bordered'
                    id='dataTable'
                    width='100%'
                    cellSpacing='0'
                  >
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th className='toggle-collapse'>Description</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tfoot>
                      <tr>
                        <th>Category</th>
                        <th className='toggle-collapse'>Description</th>
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </tfoot>
                    <tbody>
                      {this.props.tickets.tickets.map(ticket => {
                        return (
                          <tr key={ticket._id}>
                            <td>{ticket.category}</td>
                            <td className='toggle-collapse'>
                              {ticket.description}
                            </td>
                            <td>{userNames[ticket.assignedTo]}</td>
                            <td>{ticket.priority}</td>
                            <td>{ticket.status}</td>
                            <td>
                              <Link
                                to={{
                                  pathname: `/tickets/${ticket._id}`,
                                  state: {
                                    project: this.props.match.params.projectId
                                  }
                                }}
                              >
                                <i className='fas fa-arrow-right text-success'></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <button className='btn btn-success' onClick={this.toggleTicket}>
              Add Ticket
            </button>

            {this.state.addTicket && (
              <CreateTicket toggle={this.toggleTicket} />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
  userNames: state.users.idToName
});

export default connect(mapStateToProps, { getTickets, setProject })(Tickets);
