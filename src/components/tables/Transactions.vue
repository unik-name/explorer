<template>
  <Loader :data="transactions">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="transactions"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'id'">
          <LinkTransaction
            :id="data.row.id"
            :smart-bridge="data.row.vendorField"
            :show-smart-bridge-icon="showSmartBridgeIcon"
          />
        </div>

        <div v-else-if="data.column.field === 'timestamp.unix'">
          <span>
            {{ readableTimestamp(data.row.timestamp.unix) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'sender' && uniksInfos[data.row.sender]">
          <LinkUNIK
            :id="uniksInfos[data.row.sender].id"
            :unikname="uniksInfos[data.row.sender].explicitValue"
            :type="uniksInfos[data.row.sender].type"
          />
        </div>

        <div v-else-if="data.column.field === 'sender'">
          <LinkWallet :address="data.row.sender" />
        </div>

        <div v-else-if="data.column.field === 'recipient'">
          <LinkWallet
            :address="data.row.recipient"
            :type="data.row.type"
            :asset="data.row.asset"
            :type-group="data.row.typeGroup"
            :show-timelock-icon="true"
            :transaction="data.row"
            :unik-infos="uniksInfos[data.row.recipient]"
            :show-as-type="true"
          />
          <div v-if="data.row.vendorField" class="vendorfield">
            {{ data.row.vendorField }}
          </div>
        </div>

        <div v-else-if="data.column.field === 'amount'">
          <TransactionAmount :transaction="data.row" />
        </div>

        <div v-else-if="data.column.field === 'fee'">
          <TransactionAmount :transaction="data.row" :is-fee="true" />
        </div>

        <div v-else-if="data.column.field === 'confirmations'">
          <div class="flex items-center justify-end whitespace-no-wrap">
            <div
              v-if="data.row.confirmations <= activeDelegates"
              class="flex items-center justify-end whitespace-no-wrap text-green"
            >
              <span class="inline-block mr-2">{{ readableNumber(data.row.confirmations) }}</span>
              <SvgIcon class="flex-none icon" name="became-active" view-box="0 0 16 16" />
            </div>
            <div v-else>
              <div v-tooltip="readableNumber(data.row.confirmations) + ' ' + $t('COMMON.CONFIRMATIONS')">
                {{ $t("TRANSACTION.WELL_CONFIRMED") }}
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="data.column.field === 'handeled'">
          <TransactionAmount :transaction="data.row" :is-handeled-u-n-s="true" />
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ISortParameters, ITransaction } from "@/interfaces";
import CryptoCompareService from "@/services/crypto-compare";
import { getUniksInfos } from "../utils/utils";
import store from "@/store";

@Component({
  computed: {
    ...mapGetters("network", ["activeDelegates", "isListed"]),
    ...mapGetters("currency", { currencySymbol: "symbol" }),
  },
})
export default class TableTransactionsDesktop extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public transactions: ITransaction[] | null;
  @Prop({ required: false, default: false }) public showConfirmations: boolean;
  @Prop({ required: false, default: true }) public handeledUNS: boolean;

  private activeDelegates: IDelegate[];
  private isListed: boolean;
  private currencySymbol: string;
  private uniksInfos: Record<string, any> = {};

  get columns() {
    const feeClasses = ["hidden", "lg:table-cell"];
    const textClasses = ["cell-smartbridge"];

    feeClasses.push(this.showConfirmations ? "pr-10 xl:pr-4" : "end-cell");

    const columns = [
      {
        label: this.$t("COMMON.ID"),
        field: "id",
        thClass: "start-cell",
        tdClass: "start-cell",
      },
      {
        label: this.$t("COMMON.TIMESTAMP"),
        field: "timestamp.unix",
        type: "number",
        thClass: "text-left hidden md:table-cell",
        tdClass: "text-left hidden md:table-cell wrap-timestamp",
      },
      {
        label: this.$t("TRANSACTION.FROM"),
        field: "sender",
        tdClass: "break-all",
      },
      {
        label: this.$t("TRANSACTION.RECIPIENT_OR_TYPE"),
        field: "recipient",
        tdClass: "break-all",
        thClass: "mr-50 not-sortable",
      },
    ];
    if (this.handeledUNS) {
      columns.push({
        label: store.getters["network/symbol"],
        field: "handeled",
        type: "number",
        thClass: "end-cell lg:base-cell text-right",
        tdClass: "end-cell lg:base-cell text-right",
      });
    } else {
      columns.push(
        {
          label: this.$t("TRANSACTION.FLOW"),
          field: "amount",
          type: "number",
          thClass: "end-cell lg:base-cell",
          tdClass: "end-cell lg:base-cell",
        },
        {
          label: this.$t("TRANSACTION.FEE"),
          field: "fee",
          type: "number",
          thClass: feeClasses.join(" "),
          tdClass: feeClasses.join(" "),
        },
      );
    }

    if (this.showConfirmations) {
      columns.push({
        label: this.$t("COMMON.CONFIRMATIONS"),
        field: "confirmations",
        type: "number",
        // @ts-ignore
        sortable: false,
        thClass: "end-cell hidden xl:table-cell not-sortable",
        tdClass: "end-cell hidden xl:table-cell",
      });
    }

    return columns;
  }

  get showSmartBridgeIcon() {
    return this.transactions!.some((transaction) => {
      return !!transaction.vendorField;
    });
  }

  @Watch("transactions")
  public async onTransactionsChanged() {
    await this.prepareTransactions();
    if (this.transactions) {
      this.uniksInfos = await getUniksInfos(this.transactions);
    }
  }

  @Watch("currencySymbol")
  public async onCurrencySymbolChanged() {
    await this.updatePrices();
  }

  public async created() {
    await this.prepareTransactions();
  }

  private async prepareTransactions() {
    await this.updatePrices();
  }

  private async fetchPrice(transaction: ITransaction) {
    transaction.price = await CryptoCompareService.dailyAverage(transaction.timestamp.unix);
  }

  private async updatePrices() {
    if (!this.transactions) {
      return;
    }

    if (this.isListed) {
      const promises = this.transactions.map(this.fetchPrice);
      await Promise.all(promises);
    }
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
}

.vendorfield {
  @apply .ml-auto .truncate;
  max-width: 250px;
  margin: 5px 0px 0px 8px;
}

.wrap-timestamp {
  white-space: normal;
}

@media (min-width: 870px) {
  .wrap-timestamp {
    white-space: nowrap;
  }
}
</style>
