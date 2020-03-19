import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTickets } from '../../actions/tickets';
import { setProject } from '../../actions/projects';

class Tickets extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { projectId } = this.props.match.params;

    this.props.setProject(projectId);
    this.props.getTickets(projectId);
  }

  render() {
    const { project, manager } = this.props.location.state;
    if (!project) return <Redirect to='/projects' />;

    return (
      <div>
        <div className='card shadow my-3'>
          <div className='card-header bg-gradient-purple'>{project.name}</div>
          <div className='card-body'>
            <p>{project.description}</p>
            <div className='d-flex justify-content-between'>
              <div>{project.date}</div>
              <div>{`Manager: ${manager.name}`}</div>
            </div>
          </div>
        </div>

        {!this.props.tickets.loading && (
          <div className='card'>
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
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Category</th>
                      <th className='toggle-collapse'>Description</th>
                      <th>Assigned To</th>
                      <th>Priority</th>
                      <th>Status</th>
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
                          <td>{ticket.assignedTo}</td>
                          <td>{ticket.priority}</td>
                          <td>{ticket.status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets
});

export default connect(mapStateToProps, { getTickets, setProject })(Tickets);
