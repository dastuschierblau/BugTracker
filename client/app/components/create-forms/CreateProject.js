import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import Alert from '../layout/Alert';
import { createProject } from '../../actions/projects';

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: ''
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

  handleSubmit(e) {
    const { name, description } = this.state;
    const { history } = this.props;

    e.preventDefault();
    let project = {
      name,
      description
    };

    this.props.createProject(project, history);
  }

  render() {
    return (
      <Navbar>
        <div className='d-sm-flex flex-column align-items-center justify-content-between my-4'>
          <div className='card shadow no-border mb-4'>
            <div className='card-header bg-primary text-white'>
              <h1>Create a Project</h1>
            </div>
            <div className='card-body'>
              <Alert />
              <form action='post' className='form'>
                <div className='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <input
                    type='text'
                    className='form-control'
                    onChange={this.handleChange}
                    name='name'
                    placeholder='Name the project'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Description:</label>
                  <textarea
                    onChange={this.handleChange}
                    name='description'
                    placeholder='Enter a description of the project.'
                  />
                </div>
                <input
                  type='submit'
                  className='form-control'
                  disabled={!this.state.name || !this.state.description}
                  onClick={this.handleSubmit}
                  className='btn btn-success'
                  value='Submit'
                />
              </form>
            </div>
          </div>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { createProject })(
  withRouter(CreateProject)
);
