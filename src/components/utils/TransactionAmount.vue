<template>
  <span v-if="isHandeledUNS" class="ml-auto">
    {{ unsAmount(handeledUns) }}
  </span>
  <span
    v-else
    :class="
      source > 0
        ? {
            'text-red': isFee ? isOutgoingFee : isOutgoing,
            'text-green': !isFee && isIncoming,
          }
        : ''
    "
    class="flex items-center whitespace-no-wrap"
  >
    <span
      v-tooltip="{
        trigger: 'hover click',
        content: source && price ? readableCurrency(source, price) : '',
        placement: tooltipPlacement,
      }"
      class="ml-auto"
    >
      <span v-if="!isFee && isIncoming && source > 0">+</span>
      <span v-else-if="(isFee ? isOutgoingFee : isOutgoing) && source > 0">-</span>
      {{ readableCrypto(source) }}
    </span>
    <SvgIcon
      v-if="showAmountInformation"
      v-tooltip="{
        trigger: 'hover click',
        content: $t('TRANSACTION.AMOUNT_TO_SELF', { amount: readableCrypto(amountToSelf) }),
      }"
      class="ml-2"
      name="information"
      view-box="0 0 16 16"
    />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ITransaction } from "@/interfaces";
import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction } from "@/enums";
import { mapGetters } from "vuex";
import { getdidTypeFromRewardTransaction, getFoundationAddress, getMilestone } from "./utils";
import { DIDHelpers, DIDTypes } from "@uns/ts-sdk";
import { Identities } from "@uns/ark-crypto";
import { BigNumber } from "@/utils";

@Component({
  computed: {
    ...mapGetters("network", ["height", "networkConfig"]),
  },
})
export default class TransactionAmount extends Vue {
  @Prop({ required: true }) public transaction: ITransaction;
  @Prop({ required: false, default: false }) public isFee: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;
  @Prop({ required: false, default: false }) public isHandeledUNS: boolean;

  private height: number;
  private initialBlockHeight = 0;
  private networkConfig;
  private foundationAddress: string = null;
  private isTokenEcoV2 = false;

  @Watch("height")
  public onHeightChanged(newValue: number, oldValue: number) {
    if (!oldValue) {
      this.setInitialBlockHeight();
      this.setTokenEco();
    }
  }

  private setfoundationAddress() {
    if (!this.foundationAddress && this.networkConfig) {
      this.foundationAddress = getFoundationAddress(this.networkConfig);
    }
  }

  private setInitialBlockHeight() {
    this.initialBlockHeight = this.height - this.transaction.confirmations;
  }

  private setTokenEco() {
    if (!this.initialBlockHeight) {
      this.setInitialBlockHeight();
    }
    if (this.networkConfig) {
      this.isTokenEcoV2 = !!getMilestone(this.networkConfig, this.initialBlockHeight).unsTokenEcoV2;
    }
  }

  get rewards() {
    this.setTokenEco();
    // @ts-ignore
    if (this.networkConfig && this.isUnsRewardedTransaction(this.transaction, this.isTokenEcoV2)) {
      const didType = getdidTypeFromRewardTransaction(this.transaction, this.isTokenEcoV2);
      return getMilestone(this.networkConfig, this.initialBlockHeight).voucherRewards[
        DIDHelpers.fromCode(didType).toLowerCase()
      ];
    }
  }

  get transactionTab() {
    return this.$store.getters["ui/walletTransactionTab"];
  }

  get address() {
    return this.$route.params.address || this.transaction.sender !== this.$route.params.address
      ? this.$route.params.address
      : undefined;
  }

  get showAmountInformation() {
    return (
      !this.isFee && this.transactionTab === "all" && this.address && this.amountToSelf && !this.amountToSelf.isZero()
    );
  }

  get source() {
    if (this.isFee) {
      return this.transaction.fee;
    }

    // @ts-ignore
    if (this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)) {
      // @ts-ignore
      return this.calculateMultipaymentAmount(this.transaction, this.address, this.transactionTab);
    }

    if (this.rewards) {
      // Foundation wallet
      this.setfoundationAddress();
      if (this.$route.params.address === this.foundationAddress) {
        return this.rewards.foundation;
      }
      return this.rewards.sender + this.rewards.forger;
    }

    return this.transaction.amount;
  }

  get amountToSelf() {
    // @ts-ignore
    if (
      this.transaction.sender === this.address &&
      // @ts-ignore
      this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)
    ) {
      // @ts-ignore
      return this.calculateMultipaymentAmount(this.transaction, this.address, "received");
    }
  }

  get price() {
    return this.transaction.price;
  }

  get isOutgoing() {
    // @ts-ignore
    if (this.isTimelock(this.transaction.type, this.transaction.typeGroup)) {
      return (
        (this.$route.params.address !== this.transaction.recipient &&
          this.transaction.lockStatus === CoreTransaction.TIMELOCK_CLAIM) ||
        (this.$route.params.address !== this.transaction.sender &&
          this.transaction.lockStatus === CoreTransaction.TIMELOCK_REFUND)
      );
    }

    // @ts-ignore
    if (this.isUnsUpdateService(this.transaction) || this.isUnsNftMintService(this.transaction)) {
      return true;
    }

    return this.transaction.sender === this.$route.params.address;
  }

  get isOutgoingFee() {
    return this.transaction.sender === this.$route.params.address;
  }

  get isIncoming() {
    // @ts-ignore
    if (this.isTimelock(this.transaction.type, this.transaction.typeGroup)) {
      return (
        this.$route.params.address !== this.transaction.sender &&
        this.transaction.lockStatus === CoreTransaction.TIMELOCK_CLAIM
      );
    }

    // @ts-ignore
    if (this.isMultiPayment(this.transaction.type, this.transaction.typeGroup)) {
      return (
        this.transaction.asset.payments.find((payment) => payment.recipientId === this.$route.params.address) &&
        (this.transactionTab === "received" || this.transaction.sender !== this.$route.params.address)
      );
    }

    if (this.rewards) {
      return true;
    }

    return (
      this.transaction.recipient === this.$route.params.address &&
      // @ts-ignore
      (this.isTransfer(this.transaction.type, this.transaction.typeGroup) ||
        // @ts-ignore
        this.isUnsUpdateService(this.transaction) ||
        // @ts-ignore
        this.isUnsNftMintService(this.transaction))
    );
  }

  get handeledUns(): string {
    let handeledUns: BigNumber = BigNumber.make(this.transaction.fee).plus(this.transaction.amount);
    if (this.rewards) {
      handeledUns = handeledUns.plus(this.rewards.sender).plus(this.rewards.forger);
    }
    console.log("handeledUns", handeledUns.toString());
    return handeledUns.toString();
  }
}
</script>
