import $ from 'jquery'
import { createTransactionHistoryChart } from './lib/transaction_history_chart'

(function () {
  const TransactionsTotalHistoryChart = $('[data-chart="transactionsTotalHistoryChart"]')[0]
  if (TransactionsTotalHistoryChart) {
    window.transactionsTotalHistoryChart = createTransactionHistoryChart(TransactionsTotalHistoryChart)
  }
   
})()
