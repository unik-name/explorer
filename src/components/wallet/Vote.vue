<template>
  <div v-if="isVoting" class="WalletVote">
    <div class="list-row-border-t">
      <div>{{ $t("WALLET.VOTING_FOR") }}</div>
      <div>
        <LinkUNIK v-if="votedDelegate.unikname" :id="votedDelegate.username" :unikname="votedDelegate.unikname" :type="votedDelegate.unikType"></LinkUNIK>
        <LinkWallet v-else-if="votedDelegate.address" :address="votedDelegate.address">
          <span class="truncate">{{ votedDelegate.username }}</span>
        </LinkWallet>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IWallet } from "@/interfaces";
import LinkUNIK from "@/components/links/LinkUNIK.vue";

@Component({
  components: { LinkUNIK },
})
export default class WalletVote extends Vue {
  @Prop({ required: true }) public wallet: IWallet;

  private view = "public";
  private knownWallets: { [key: string]: string };

  get votedDelegate() {
    return this.$store.getters["delegates/byPublicKey"](this.wallet.vote) || {};
  }

  get isVoting() {
    return !!this.wallet.vote;
  }
}
</script>

<style scoped></style>
