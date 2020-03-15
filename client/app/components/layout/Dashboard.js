import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

class Dashboard extends React.Component {
  render() {
    return (
      <div id='wrapper'>
        <Sidebar />

        <div id='content-wrapper' className='d-flex flex-column'>
          <Topbar />

          <div className='container-fluid'>
            {/* Page Heading */}
            <div className='d-sm-flex flex-column justify-content-center mb-4'>
              <h1 className='h3 my-3 text-gray-800'>Dashboard</h1>
              <p className='mb-4'>
                An overview of team activity and progress on all project
                tickets.
              </p>
            </div>

            <div className='row'>
              <div className='col-lg-8'>
                {/* Area Chart */}
                <div className='card shadow'>
                  <div className='card-header text-primary font-weight-bold'>
                    Activity
                  </div>
                  <div className='card-body'>
                    <div className='chart-area mb-3'>
                      <canvas id='myAreaChart'></canvas>
                    </div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Veniam ducimus illo sapiente excepturi ipsa sit minima,
                      molestias cumque eos assumenda.
                    </p>
                  </div>
                </div>
                {/* End Area Chart */}
              </div>
              <div className='col-lg-4'>
                {/* Donut Chart */}
                <div className='card shadow mb-4'>
                  <div className='card-header text-primary font-weight-bold'>
                    Ticket Statuses
                  </div>
                  <div className='card-body'>
                    <div className='chart-area mb-3'>
                      <canvas id='myDonutChart'></canvas>
                    </div>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Veniam ducimus illo sapiente excepturi ipsa sit minima,
                      molestias cumque eos assumenda.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Donut Chart */}
            </div>
            {/* End of .container-fluid */}
          </div>
          {/* End of Main Content */}

          {/* Footer */}
          <footer className='sticky-footer bg-white'>
            <div className='container my-auto'>
              <div className='copyright text-center my-auto'>
                <span>Copyright &copy; Emmett Slack 2020</span>
              </div>
            </div>
          </footer>
        </div>
        {/* End of content wrapper */}
      </div>
    );
  }
}

export default Dashboard;
