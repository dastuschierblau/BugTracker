import React from 'react';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import { getAllTickets, clearTickets } from '../../actions/tickets';
import Chart from 'chart.js';
import Loading from './Loading';
import getChartData from '../../utils/getChartData';

class LineGraph extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    const labels = Object.keys(this.props.data),
      data = labels.map(item => {
        return this.props.data[item];
      });

    const myChartRef = this.chartRef.current.getContext('2d');

    new Chart(myChartRef, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ticket Edits',
            lineTension: 0.3,
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointBorderColor: 'rgba(78, 115, 223, 1)',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: data
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [
            {
              time: {
                unit: 'date'
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              ticks: {
                maxTicksLimit: 10
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                maxTicksLimit: 5,
                padding: 10
              },
              gridLines: {
                color: 'rgb(234, 236, 244)',
                zeroLineColor: 'rgb(234, 236, 244)',
                drawBorder: false,
                borderDash: [2],
                zeroLineBorderDash: [2]
              }
            }
          ]
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10
        }
      }
    });
  }
  render() {
    return (
      <div>
        <canvas id='myChart' ref={this.chartRef} />
      </div>
    );
  }
}

class Doughnut extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext('2d');
    const labels = Object.keys(this.props.data),
      data = labels.map(item => {
        return this.props.data[item];
      });

    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#4e73df',
              '#1cc88a',
              '#f6c23e',
              '#36b9cc',
              '#e74a3b'
            ],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: 'rgba(234, 236, 244, 1)'
          }
        ]
      },
      options: {
        maintainAspectRatio: true,
        tooltips: {
          backgroundColor: 'rgb(255,255,255)',
          bodyFontColor: '#858796',
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80
      }
    });
  }
  render() {
    return (
      <div>
        <canvas id='myChart' ref={this.chartRef} />
      </div>
    );
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };
  }

  async componentDidMount() {
    if (this.props.tickets.length !== 0) {
      await this.props.clearTickets();
    }

    this.props.getAllTickets();
  }

  render() {
    const { tickets, loading } = this.props.tickets;

    if (loading) return <Loading />;

    let data = getChartData(this.props.tickets.tickets);

    return (
      <Navbar>
        {/* Page Heading */}
        <div className='d-sm-flex flex-column justify-content-center mb-4'>
          <h1 className='h3 my-3 text-gray-800'>Dashboard</h1>
          <p className='mb-4'>
            An overview of team activity and progress on all project tickets.
          </p>
        </div>

        <div className='row'>
          <div className='col-lg-8'>
            {/* Area Chart */}
            <div className='card shadow mb-4'>
              <div className='card-header text-primary font-weight-bold'>
                Activity
              </div>
              <div className='card-body'>
                <div className='chart-area mb-3'>
                  <LineGraph data={data.historyData} />
                </div>
                <p>
                  Overall team activity on tickets over the past 10 days.
                  Activity includes ticket creation, edits, and comment posts.
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
                  <Doughnut data={data.statusData} />
                </div>
                <p>
                  An overview of the status of tickets across all posted
                  projects.
                </p>
              </div>
            </div>
          </div>
          {/* End Donut Chart */}
        </div>

        {/* Footer */}
        <footer className='sticky-footer bg-white'>
          <div className='container my-auto'>
            <div className='copyright text-center my-auto'>
              <span>Copyright &copy; Emmett Slack 2020</span>
            </div>
          </div>
        </footer>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets
});

export default connect(mapStateToProps, { getAllTickets, clearTickets })(
  Dashboard
);
