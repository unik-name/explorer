<template>
  <Loader :data="wallets">
    <TableWrapper
      v-bind="$attrs"
      :columns="columns"
      :rows="wallets"
      :no-data-message="$t('COMMON.NO_RESULTS')"
      @on-sort-change="emitSortChange"
    >
      <template slot-scope="data">
        <div v-if="data.column.field === 'originalIndex'">
          {{ getRank(data.row.originalIndex) }}
        </div>

        <div v-else-if="data.column.field === 'address'">
          <LinkWallet :address="data.row.address" :trunc="false" />
        </div>

        <div v-else-if="data.column.field === 'balance'">
          <span>
            {{ readableCrypto(cappedVoteBalance(data.row), true, truncateBalance ? 2 : 8) }}
          </span>
        </div>

        <div v-else-if="data.column.field === 'supply'">
          {{ supplyPercentage(data.row) }}
        </div>
      </template>
    </TableWrapper>
  </Loader>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISortParameters, IWallet } from "@/interfaces";
import { mapGetters } from "vuex";
import { BigNumber } from "@/utils";
import WalletVoters from "@/pages/Wallet/Voters.vue";
import { paginationLimit } from "@/constants";
import { getMilestone } from "../utils/utils";
import { DIDHelpers, DIDTypes } from "@uns/ts-sdk";

@Component({
  computed: {
    ...mapGetters("network", ["supply", "height", "networkConfig"]),
  },
})
export default class TableWalletsDesktop extends Vue {
  get truncateBalance() {
    return this.windowWidth < 700;
  }

  get columns() {
    const columns = [
      {
        label: this.$t("COMMON.RANK"),
        field: "originalIndex",
        type: "number",
        thClass: "start-cell w-32",
        tdClass: "start-cell w-32",
      },
      {
        label: this.getAddressColumnName(),
        field: "address",
      },
      {
        label: this.$t("COMMON.BALANCE"),
        field: "balance",
        type: "number",
        tdClass: "whitespace-no-wrap",
      },
      {
        label: this.$t("COMMON.SUPPLY"),
        field: "supply",
        type: "number",
        sortable: false,
        thClass: "end-cell w-24 not-sortable",
        tdClass: "end-cell w-24",
      },
    ];

    return columns;
  }
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public wallets: IWallet[] | null;
  @Prop({ required: true }) public total: string;

  private windowWidth = 0;
  private supply: string;
  private isCappedVotes = false;
  private height: number;
  private networkConfig;

  public mounted() {
    this.windowWidth = window.innerWidth;

    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }

  private setCappedVotesMilestone() {
    if (this.networkConfig) {
      this.isCappedVotes = !!getMilestone(this.networkConfig, this.height).voterMaximumWeight;
    }
  }

  public supplyPercentage(wallet: any): string {
    const balance = this.cappedVoteBalance(wallet);
    // @ts-ignore
    return this.percentageString(
      balance
        .dividedBy(this.total)
        .times(100)
        .toNumber(),
    );
  }

  public cappedVoteBalance(wallet: any): BigNumber {
    const balance = BigNumber.make(wallet.balance);
    this.setCappedVotesMilestone();

    const isTopWalletTable = this.total === this.supply;

    if (!isTopWalletTable && this.isCappedVotes && wallet.attributes.tokens) {
      const didType: DIDTypes = parseInt((Object.values(wallet.attributes.tokens).shift() as any).type);
      if (didType === DIDTypes.INDIVIDUAL) {
        const voteCap = BigNumber.make(
          getMilestone(this.networkConfig, this.height).voterMaximumWeight[DIDHelpers.fromCode(didType).toLowerCase()],
        );
        if (balance.isGreaterThanOrEqualTo(voteCap)) {
          return voteCap;
        }
      }
    }
    return balance;
  }

  private getRank(index: number) {
    const page = Number(this.$route.params.page) > 1 ? Number(this.$route.params.page) - 1 : 0;

    return page * paginationLimit + (index + 1);
  }

  private emitSortChange(params: ISortParameters[]) {
    this.$emit("on-sort-change", params[0]);
  }

  private getAddressColumnName() {
    return this.$router.currentRoute.name === WalletVoters.pageName
      ? this.$t("WALLET.DELEGATE.VOTERS_CRYPTO_ACCOUNT")
      : this.$t("WALLET.ADDRESS");
  }
}
</script>
