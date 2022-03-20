import $ from 'jquery'
import {   Chart,  ArcElement,  LineElement,BarElement,PointElement,BarController,BubbleController,  DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,  LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip} from 'chart.js';
import 'chartjs-adapter-moment'
Chart.defaults.font.family = 'Nunito, "Helvetica Neue", Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
Chart.register(  ArcElement,LineElement,BarElement,PointElement,BarController,BubbleController,DoughnutController,LineController,PieController,PolarAreaController,RadarController,ScatterController,CategoryScale,LinearScale,LogarithmicScale,RadialLinearScale,TimeScale,TimeSeriesScale,Decimation,Filler,Legend,Title,Tooltip);
import sassVariables from '../../css/app.scss'

const config = {
  type: 'line',
  responsive: true,
  data: {
    datasets: [{
      label: 'Transactions',
      yAxisID: 'transaction',
      data: [],
      fill: false,
      backgroundColor: sassVariables.primary,
      borderColor: sassVariables.primary,
      lineTension: 0.3
    }]
  },
  options: {   
    scales: {
      x: {     
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'YYYY-MM-DD',
          stepSize: 1
        }        
      },
      y: {
        id: 'transaction'  
      }
    }, 
    plugins: { 
        title: {
          display: true,
          text: 'Transactions History'
        },
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: ({datasetIndex, yLabel}, {datasets}) => {
              const label = datasets[datasetIndex].label
              if (datasets[datasetIndex].yAxisID === 'time') {
                return `${label}: ${yLabel}`
              } else if (datasets[datasetIndex].yAxisID === 'transaction') {
                return `${label}: ${yLabel}`
              } else {
                return yLabel
              }
            }
          }
        }
      }
  }
}

class TransactionHistoryChart {
  constructor (el) {
    this.transaction = {
      label: 'Transactions'       
    }

    config.data.datasets = [this.transaction]
    this.chart = new Chart(el, config)
  }

  update (transactionHistoryData) {
    if (transactionHistoryData) {
      this.transaction.data = getTransactionHistoryData(transactionHistoryData)

      const max = Math.ceil(Math.max(...this.transaction.data.map(d => d.y)) * 1.2)
      const min = Math.ceil(Math.min(...this.transaction.data.map(d => d.y)) * 0.2)

      const ticks = [max, Math.ceil(max * 0.75), Math.ceil(max * 0.5), Math.ceil(max * 0.25)]
      config.options.scales.y.ticks = {
        autoSkip: false,
        maxTicksLimit: 4,
        startAtZero: 0,
        callback: (value) => {
          return Math.abs(value) > 999 ? Math.floor(Math.sign(value) * ((Math.abs(value) / 1000).toFixed(1))) + 'k' : Math.sign(value) * Math.abs(value)
        },
        max,
        min
      }

      config.options.scales.y.afterBuildTicks =  ticks
      

      //config.options.scales.yAxes[0].beforeUpdate = () => {}

      this.chart.update()
    }
  }
}

function getTransactionHistoryData (transactionHistoryData) {
  return transactionHistoryData.map(txHistoryData => ({
    x: txHistoryData[0].replace('T00:00:00.000000', ''),
    y: `${txHistoryData[1]}`
  }))
}

export function createTransactionHistoryChart (el) {
  const dataPath = el.dataset.transaction_history_chart_home_path
  const $chartError = $('[data-chart-error-message-transaction]')
  const $chartLoading = $('[data-chart-loading-message-transaction]')
  const $chartContainer = $('[data-chart-container-transaction]')

  const chart = new TransactionHistoryChart(el)
  $.getJSON(dataPath, {type: 'JSON'})
    .done(data => {
      const transactionHistoryData = JSON.parse(data.transaction_data)
    //  $(el).show()
    $chartContainer.show()
      chart.update(transactionHistoryData)
    })
    .fail(() => {
      $chartError.show()
    })
    .always(() => {
      $chartLoading.hide()
    })
  return chart
}
