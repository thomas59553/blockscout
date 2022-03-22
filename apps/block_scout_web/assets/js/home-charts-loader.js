import $ from 'jquery'
import { createTransferHistoryChart } from './lib/transfer_history_chart'
import { createTransactionHistoryChart } from './lib/transaction_history_chart'
import { createAddressTotalHistoryChart } from './lib/address_total_history_chart'


(function () {

  const AddressTotalHistoryChart = $('[data-chart="addressTotalHistoryChart"]')[0]
  if (AddressTotalHistoryChart) {
    window.addressTotalHistoryChart = createAddressTotalHistoryChart(AddressTotalHistoryChart)
  }
  

  const TransactionsTotalHistoryChart = $('[data-chart="transactionsTotalHistoryChart"]')[0]
  if (TransactionsTotalHistoryChart) {
    window.transactionsTotalHistoryChart = createTransactionHistoryChart(TransactionsTotalHistoryChart)
  }


  const TransfersTotalHistoryChart = $('[data-chart="transfersTotalHistoryChart"]')[0]
  if (TransfersTotalHistoryChart) {
    window.transfersTotalHistoryChart = createTransferHistoryChart(TransfersTotalHistoryChart)
  }
   
})()
