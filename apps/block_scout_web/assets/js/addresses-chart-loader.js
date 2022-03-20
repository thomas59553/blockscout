import $ from 'jquery'
import { createAddressTotalHistoryChart } from './lib/address_total_history_chart'

(function () {
  const AddressTotalHistoryChart = $('[data-chart="addressTotalHistoryChart"]')[0]
  if (AddressTotalHistoryChart) {
    window.addressTotalHistoryChart = createAddressTotalHistoryChart(AddressTotalHistoryChart)
  }
   
})()
