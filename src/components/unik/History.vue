<template>
  <div class="px-5 sm:px-10">
    <div class="hidden sm:block">
      <TableTransactionsDetailDesktop :transactions="transactions" />
    </div>
    <div class="sm:hidden">
      <TableTransactionsDetailMobile :transactions="transactions" />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  name: 'UnikHistory',

  props: {
    unik: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return ({
      transactions: null
    })
  },

  beforeMount () {
    this.getTransactions()
  },

  methods: {
    async getTransactions () {
      this.transactions = null
      const { data } = await TransactionService[`byUnik`](
        this.unik.id
      )
      this.transactions = data
    }
  }
}
</script>
