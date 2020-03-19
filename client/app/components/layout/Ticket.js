import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';

class Ticket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editTicket: false
    };

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({
      editTicket: !prevState.editTicket
    }));
  }

  componentDidMount() {
    const { ticketId } = this.props.match.params;

    //this.props.getTicket(ticketId);
  }

  render() {
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
                <tr>
                  <td>UI</td>
                  <td className='toggle-collapse'>
                    Cannot deselect cell without selecting another cell
                  </td>
                  <td>Toby Slack</td>
                  <td>Medium</td>
                  <td>Open</td>
                  <td>
                    <i className='far fa-edit' onClick={this.toggleEdit}></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* End ticket properties */}

        {/* Begin edit ticket */}
        {this.state.editTicket && (
          <div className='row mb-5'>
            <div className='col-lg-8 m-auto mb-4'>
              <div className='card shadow'>
                <div className='card-header bg-gradient-purple d-flex justify-content-between'>
                  Edit Ticket:
                  <i
                    onClick={this.toggleEdit}
                    className='fas fa-window-close fa-2x'
                  ></i>
                </div>
                <div className='card-body'>
                  <form action='post'>
                    <div className='form-group d-flex justify-content-between'>
                      <label>Category:</label>
                      <select name='category'>
                        <option value='UI'>UI</option>
                        <option value='database'>Database</option>
                        <option value='addFn'>Add Function</option>
                        <option value='redux'>Redux</option>
                        <option value='UX'>UX</option>
                      </select>
                    </div>
                    <div className='form-group d-flex flex-column'>
                      <label>Description:</label>
                      <textarea
                        name='description'
                        cols='30'
                        rows='5'
                      ></textarea>
                    </div>
                    <div className='form-group d-flex justify-content-between'>
                      <label>Assigned To:</label>
                      <select name='assigned'>
                        <option value='Toby Slack'>Toby Slack</option>
                        <option value='Brett Slack'>Brett Slack</option>
                        <option value='John Doe'>John Doe</option>
                        <option value='Emmett Slack'>Emmett Slack</option>
                      </select>
                    </div>
                    <div className='form-group d-flex justify-content-between'>
                      <label>Status:</label>
                      <select name='status'>
                        <option value='open'>Open</option>
                        <option value='in progress'>In Progress</option>
                        <option value='pending'>Pending Review</option>
                        <option value='stuck'>Stuck</option>
                        <option value='done'>Done</option>
                      </select>
                    </div>
                    <div className='form-group d-flex justify-content-between'>
                      <label>Priority</label>
                      <select name='priority'>
                        <option value='low'>Low</option>
                        <option value='medium'>Medium</option>
                        <option value='high'>High</option>
                      </select>
                    </div>
                    <input
                      type='submit'
                      className='btn btn-success'
                      value='Submit'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* End edit ticket */}

        {/* Begin ticket history */}
        <div className='row mb-5'>
          <div className='col-lg-8 mb-4'>
            <div className='card shadow'>
              <div className='card-header bg-gradient-purple'>History</div>
              <div className='card-body'>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempora voluptas officia voluptate omnis error minus rem vero
                  porro accusantium quibusdam!
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
                      <tr>
                        <td>Toby Slack</td>
                        <td>Changed status to in progress</td>
                        <td>2:42 PM March 11, 2020</td>
                      </tr>
                      <tr>
                        <td>Brett Slack</td>
                        <td>Added a comment.</td>
                        <td>4:21 PM March 11, 2020</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* End Ticket history */}

          {/* Begin comments */}
          <div className='col-lg-4 mb-3'>
            <div className='card shadow'>
              <div className='card-header bg-gradient-purple'>Comments</div>

              <div className='card-body'>
                <div className='add-comment p-sm-2 mb-3'>
                  <textarea
                    className='mb-3'
                    name='comment'
                    id='commentField'
                    cols='30'
                    rows='10'
                  ></textarea>
                  <button className='btn btn-success'>Add your comment</button>
                </div>

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
                      <tr>
                        <td>Toby Slack</td>
                        <td>
                          I having trouble with some of the CSS properties. Can
                          anyone help?
                        </td>
                        <td>2:42 PM March 11, 2020</td>
                      </tr>
                      <tr>
                        <td>Brett Slack</td>
                        <td>I have added a few classes that should help.</td>
                        <td>4:21 PM March 11, 2020</td>
                      </tr>
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

export default connect()(Ticket);
