import React from 'react';
import getChartData from '../../utils/getChartData';

export default class LineGraph extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    let { data } = this.props;

    const history = getChartData(data).historyData;

    const labels = Object.keys(history),
      chartData = labels.map(item => {
        return history[item];
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
            data: chartData
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
    if (!this.props.data || this.props.loading) {
      return 'Loading...';
    }
    return (
      <div>
        <canvas id={this.props.chartId} ref={this.chartRef} />
      </div>
    );
  }
}
