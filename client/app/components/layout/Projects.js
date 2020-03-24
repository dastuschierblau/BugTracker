import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Alert from './Alert';
import Tickets from './Tickets';
import Loading from './Loading';
import CreateProject from '../create-forms/CreateProject';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projects';
import { getUsers } from '../../actions/users';
import { setAlert } from '../../actions/alert';
import Moment from 'react-moment';

class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProject: null,
      createProject: false
    };

    this.checkAuthorized = this.checkAuthorized.bind(this);
  }

  componentDidMount() {
    this.props.getProjects();
    this.props.getUsers();
  }

  checkAuthorized(user) {
    if (user.role !== 'admin' && user.role !== 'manager') {
      this.props.setAlert(
        'Not Authorized. You must be an admin or project manager to access this functionality.',
        'danger'
      );
    } else {
      this.setState(prevState => ({
        createProject: !prevState.createProject
      }));
    }
  }

  render() {
    const { loading, projectList } = this.props.projects;
    const { users } = this.props.users;
    const { user } = this.props.auth;

    if (loading) {
      return <Loading />;
    }

    return (
      <Navbar>
        {/* Start Route for list of all projects */}
        <Route
          exact
          path='/projects'
          render={() => {
            return (
              <Fragment>
                {/* Page Heading */}
                <div className='mb-4'>
                  <h1 className='h3 my-3'>Projects</h1>
                </div>

                <Alert />
                <button
                  className='btn btn-success mb-2'
                  onClick={() => {
                    this.checkAuthorized(user);
                  }}
                >
                  Create a Project
                </button>
                {this.state.createProject && <CreateProject user={user} />}

                <div className='row'>
                  {!loading &&
                    projectList.map(item => {
                      return (
                        <div
                          key={item._id}
                          className='project card shadow col-lg-12 p-0 mb-3'
                        >
                          <div className='card-header bg-gradient-purple d-flex justify-content-between align-items-center'>
                            {item.name}
                            <Link
                              to={{
                                pathname: `${this.props.match.url}/${item._id}`,
                                state: {
                                  project: projectList.filter(project => {
                                    return project._id === item._id;
                                  })[0],
                                  manager: users.filter(user => {
                                    return user._id === item.manager;
                                  })[0]
                                }
                              }}
                            >
                              <i className='fas fa-arrow-right fa-2x'></i>
                            </Link>
                          </div>

                          <div className='card-body'>
                            <p>{item.description}</p>
                            <div className='d-flex justify-content-between'>
                              <div>
                                <Moment format='MM/DD/YYYY'>{item.date}</Moment>
                              </div>
                              <div>
                                Manager:{' '}
                                {users
                                  .filter(user => {
                                    return user._id === item.manager;
                                  })
                                  .map(user => user.name)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Fragment>
            );
          }}
        />
        {/* End Route for list of all projects */}

        {/* Start Route for individual project */}
        <Route path={`/projects/:projectId`} component={Tickets} />
        {/* End Route for individual project */}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects,
  users: state.users,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjects, getUsers, setAlert })(
  Projects
);
