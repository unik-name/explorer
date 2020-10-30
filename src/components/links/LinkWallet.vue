<template>
  <span class="flex items-center">
    <template v-if="isTransfer(type, typeGroup) || isTimelock(type, typeGroup)">
      <span v-if="showAsType">
        {{ $t(`TRANSACTION.TYPES.${isTransfer(type, typeGroup) ? "TRANSFER" : "TIMELOCK"}`) }}
      </span>
      <div v-else class="flex items-center w-full">
        <LinkAddress
          :address="address"
          :public-key="publicKey"
          :trunc="trunc"
          :tooltip-placement="tooltipPlacement"
          container-class="w-full"
        />
        <div v-if="isTimelock(type, typeGroup) && showTimelockIcon">
          <SvgIcon
            v-tooltip="{
              content: $t('WALLET.TIMELOCK_TRANSACTION'),
              placement: tooltipPlacement,
            }"
            class="ml-1"
            name="became-active"
            view-box="0 0 14 15"
          />
        </div>
      </div>
    </template>

    <span v-else-if="isSecondSignature(type, typeGroup)">{{ $t("TRANSACTION.TYPES.SECOND_SIGNATURE") }}</span>
    <span v-else-if="isDelegateRegistration(type, typeGroup)">{{ $t("TRANSACTION.TYPES.DELEGATE_REGISTRATION") }}</span>
    <span v-else-if="isVote(type, typeGroup)">
      <RouterLink
        v-if="votedDelegateAddress"
        v-tooltip="{
          content: votedDelegateAddress,
          placement: tooltipPlacement,
        }"
        :to="{ name: linkType, params: linkParameters }"
      >
        <span :class="`${getVoteColor} vote-label`"
          >{{ isUnvote ? $t("TRANSACTION.TYPES.UNVOTE") : $t("TRANSACTION.TYPES.VOTE") }}
          <UnikDisplay
            v-if="votedDelegate.unikname"
            class="ml-1"
            :unikname="votedDelegate.unikname"
            :type="votedDelegate.unikType"
            :truncate-unikname="true"
          />
          <span v-else>
            {{ votedDelegateUsername }}
          </span>
        </span>
      </RouterLink>
    </span>
    <span v-else-if="isMultiSignature(type, typeGroup)">{{ $t("TRANSACTION.TYPES.MULTI_SIGNATURE") }}</span>
    <span v-else-if="isIpfs(type, typeGroup)">{{ $t("TRANSACTION.TYPES.IPFS") }}</span>
    <span v-else-if="isMultiPayment(type, typeGroup)"
      >{{ $t("TRANSACTION.TYPES.MULTI_PAYMENT") }} ({{ multiPaymentRecipientsCount }})</span
    >
    <span v-else-if="isDelegateResignation(type, typeGroup)">{{ $t("TRANSACTION.TYPES.DELEGATE_RESIGNATION") }}</span>
    <span v-else-if="isTimelockClaim(type, typeGroup)">{{ $t("TRANSACTION.TYPES.TIMELOCK_CLAIM") }}</span>
    <span v-else-if="isTimelockRefund(type, typeGroup)">{{ $t("TRANSACTION.TYPES.TIMELOCK_REFUND") }}</span>
    <span v-else-if="isBusinessRegistration(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BUSINESS_REGISTRATION") }}</span>
    <span v-else-if="isBusinessResignation(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BUSINESS_RESIGNATION") }}</span>
    <span v-else-if="isBusinessUpdate(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BUSINESS_UPDATE") }}</span>
    <span v-else-if="isBridgechainRegistration(type, typeGroup)">{{
      $t("TRANSACTION.TYPES.BRIDGECHAIN_REGISTRATION")
    }}</span>
    <span v-else-if="isBridgechainResignation(type, typeGroup)">{{
      $t("TRANSACTION.TYPES.BRIDGECHAIN_RESIGNATION")
    }}</span>
    <span v-else-if="isBridgechainUpdate(type, typeGroup)">{{ $t("TRANSACTION.TYPES.BRIDGECHAIN_UPDATE") }}</span>

    <span v-else-if="isNftTransfer(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("UNIK.TRANSFER") }}
      </RouterLink>
    </span>
    <span v-else-if="isNftUpdate(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("UNIK.UPDATE") }}
      </RouterLink>
    </span>
    <span v-else-if="isNftMint(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("UNIK.CREATION") }}
      </RouterLink>
    </span>
    <span v-else-if="isUnsDiscloseExplicit(type, typeGroup)">
      <RouterLink
        v-tooltip="asset['disclose-demand'].payload.sub"
        :to="{ name: 'unik', params: { id: asset['disclose-demand'].payload.sub } }"
        >{{ $t("UNIK.DISCLOSE") }}
      </RouterLink>
    </span>
    <span v-else-if="isUnsDelegateRegistration(type, typeGroup)">{{
      $t("TRANSACTION.TYPES.UNS_DELEGATE_REGISTRATION")
    }}</span>
    <span v-else-if="isUnsDelegateResignation(type, typeGroup)">{{
      $t("TRANSACTION.TYPES.UNS_DELEGATE_RESIGNATION")
    }}</span>
    <span v-else-if="transaction && isIndividualCertifiedNftMint(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_CERTIFIED_NFT_MINT_INDIV") }}
      </RouterLink>
    </span>
    <span v-else-if="transaction && isOrganizationCertifiedNftMint(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_CERTIFIED_NFT_MINT_ORG") }}
      </RouterLink>
    </span>
    <span v-else-if="isUnsCertifiedNftMint(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_CERTIFIED_NFT_MINT") }}
      </RouterLink>
    </span>
    <span v-else-if="transaction && isUnsVerifyUrl(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_VERIFY_URL") }}
      </RouterLink>
    </span>
    <span v-else-if="transaction && isUnsAliveDemand(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_ALIVE_DEMAND") }}
      </RouterLink>
    </span>
    <span v-else-if="transaction && isUnsXPLevelDemand(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_XPLEVEL_DEMAND") }}
      </RouterLink>
    </span>
    <span v-else-if="transaction && isUnsPioneerDemand(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_PIONEER_CLAIM") }}
      </RouterLink>
    </span>
    <span v-else-if="transaction && isUnsUserPropertyUpdate(transaction)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_USER_PROPERTY") }}
      </RouterLink>
    </span>
    <span v-else-if="isUnsCertifiedNftUpdate(type, typeGroup)">
      <RouterLink v-tooltip="asset.nft.unik.tokenId" :to="{ name: 'unik', params: { id: asset.nft.unik.tokenId } }"
        >{{ $t("TRANSACTION.TYPES.UNS_CERTIFIED_NFT_UPDATE") }}
      </RouterLink>
    </span>
    <!-- By default we simply link to a recipient as we don't know this type / typegroup combination -->
    <div v-else>
      <span v-if="showAsType">{{ $t("TRANSACTION.TYPES.UNKNOWN") }}</span>
      <LinkAddress
        v-else
        :address="address"
        :public-key="publicKey"
        :trunc="trunc"
        :tooltip-placement="tooltipPlacement"
      />
    </div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ITransaction } from "@/interfaces";
import UnikDisplay from "@/components/unik/UnikDisplay.vue";
import WalletVoters from "@/pages/Wallet/Voters.vue";
import LinkAddress from "./LinkAddress.vue";

@Component({
  components: {
    UnikDisplay,
    LinkAddress,
  },
  computed: {
    ...mapGetters("delegates", ["delegates"]),
  },
})
export default class LinkWallet extends Vue {
  @Prop({ required: false, default: "" }) public address: string;
  @Prop({ required: false, default: null }) public asset: { [key: string]: [any] } | null;
  @Prop({ required: false, default: "" }) public publicKey: string;
  @Prop({ required: false, default: 0 }) public type: number;
  @Prop({ required: false, default: 1 }) public typeGroup: number;
  @Prop({ required: false, default: true }) public trunc: boolean;
  @Prop({ required: false, default: "top" }) public tooltipPlacement: string;
  @Prop({ required: false, default: false }) public simple: boolean;
  @Prop({ required: false, default: false }) public showTimelockIcon: boolean;
  @Prop({ required: false, default: false }) public showAsType: boolean;
  @Prop({ required: false, default: null }) public transaction: ITransaction | null;

  private delegates: IDelegate[];

  get getVoteColor(): string {
    return this.isUnvote ? "text-red" : "text-green";
  }

  get isUnvote(): boolean {
    if (this.asset && this.asset.votes) {
      const vote = this.asset.votes[0];
      return vote.charAt(0) === "-";
    }
    return false;
  }

  get votePublicKey(): string {
    if (this.asset && this.asset.votes) {
      const vote = this.asset.votes[0];
      return vote.substr(1);
    }
    return "";
  }

  get votedDelegate(): IDelegate | null {
    return this.votePublicKey ? this.delegates.find((d) => d.publicKey === this.votePublicKey) : null;
  }

  get votedDelegateAddress(): string {
    return this.votedDelegate
      ? this.votedDelegate.unikname
        ? this.votedDelegate.username
        : this.votedDelegate.address
      : "";
  }

  get votedDelegateUsername(): string {
    return this.votedDelegate
      ? this.votedDelegate.unikname
        ? `@${this.votedDelegate.unikname}`
        : this.votedDelegate.username
      : "";
  }

  get multiPaymentRecipientsCount(): number {
    if (this.asset && this.asset.payments) {
      return this.asset.payments.length;
    }
    return 0;
  }

  get linkType() {
    return this.votedDelegate.unikname ? "unik" : "wallet";
  }

  get linkParameters() {
    if (this.votedDelegate.unikname) {
      return {
        id: this.votedDelegate.username,
        unikname: this.votedDelegate.unikname,
      };
    } else {
      return {
        address: this.votedDelegateAddress,
      };
    }
  }
}
</script>

<style>
.vote-label {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.vote-label .unik svg {
  margin-left: 6px;
  margin-right: 2px;
}
</style>
