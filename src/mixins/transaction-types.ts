import { CoreTransaction, MagistrateTransaction, TypeGroupTransaction, NftTransaction, UNSTransaction } from "@/enums";
import { ITransaction } from "@/interfaces";
import { BigNumber } from "@/utils";
import {
  BADGE_PIONEER_KEY,
  BADGE_XP_LEVEL_KEY,
  DIDTypes,
  LifeCycleGrades,
  LIFE_CYCLE_PROPERTY_KEY,
  VERIFIED_URL_KEY_PREFIX,
} from "@uns/ts-sdk";

const isCoreTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.CORE;
};

const isMagistrateTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.MAGISTRATE;
};

const isNFTTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.NFT;
};

const isUNSTypeGroup = (typeGroup: number): boolean => {
  return typeGroup === TypeGroupTransaction.UNS;
};

export default {
  methods: {
    isTransfer(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TRANSFER;
    },

    isSecondSignature(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.SECOND_SIGNATURE;
    },

    isDelegateRegistration(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_REGISTRATION;
    },

    isVote(type: number, typeGroup: number): boolean {
      return (
        (isCoreTypeGroup(typeGroup) && type === CoreTransaction.VOTE) ||
        (isUNSTypeGroup(typeGroup) && type === UNSTransaction.VOTE)
      );
    },

    isMultiSignature(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_SIGNATURE;
    },

    isIpfs(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.IPFS;
    },

    isDelegateResignation(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.DELEGATE_RESIGNATION;
    },

    isMultiPayment(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.MULTI_PAYMENT;
    },

    isTimelock(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK;
    },

    isTimelockClaim(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_CLAIM;
    },

    isTimelockRefund(type: number, typeGroup: number): boolean {
      return isCoreTypeGroup(typeGroup) && type === CoreTransaction.TIMELOCK_REFUND;
    },

    isBusinessRegistration(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_REGISTRATION;
    },

    isBusinessResignation(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_RESIGNATION;
    },

    isBusinessUpdate(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BUSINESS_UPDATE;
    },

    isBridgechainRegistration(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_REGISTRATION;
    },

    isBridgechainResignation(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_RESIGNATION;
    },

    isBridgechainUpdate(type: number, typeGroup: number): boolean {
      return isMagistrateTypeGroup(typeGroup) && type === MagistrateTransaction.BRIDGECHAIN_UPDATE;
    },

    isNftMint(type: number, typeGroup: number): boolean {
      return isNFTTypeGroup(typeGroup) && type === NftTransaction.NFT_MINT;
    },

    isNftTransfer(type: number, typeGroup: number): boolean {
      return isNFTTypeGroup(typeGroup) && type === NftTransaction.NFT_TRANSFER;
    },

    isNftUpdate(type: number, typeGroup: number): boolean {
      return isNFTTypeGroup(typeGroup) && type === NftTransaction.NFT_UPDATE;
    },

    isUnsDiscloseExplicit(type: number, typeGroup: number): boolean {
      return isUNSTypeGroup(typeGroup) && type === UNSTransaction.DISCLOSE_EXPLICIT;
    },
    isUnsDelegateRegistration(type: number, typeGroup: number): boolean {
      return isUNSTypeGroup(typeGroup) && type === UNSTransaction.DELEGATE_REGISTRATION;
    },
    isUnsDelegateResignation(type: number, typeGroup: number): boolean {
      return isUNSTypeGroup(typeGroup) && type === UNSTransaction.DELEGATE_RESIGNATION;
    },
    isUnsCertifiedNftMint(type: number, typeGroup: number): boolean {
      return isUNSTypeGroup(typeGroup) && type === UNSTransaction.CERTIFIED_NFT_MINT;
    },
    isIndividualCertifiedNftMint(transaction): boolean {
      const type = transaction.asset.nft.unik.properties.type;
      return (
        this.isUnsCertifiedNftMint(transaction.type, transaction.typeGroup) && type === DIDTypes.INDIVIDUAL.toString()
      );
    },
    isOrganizationCertifiedNftMint(transaction): boolean {
      const type = transaction.asset.nft.unik.properties.type;
      return (
        this.isUnsCertifiedNftMint(transaction.type, transaction.typeGroup) && type === DIDTypes.ORGANIZATION.toString()
      );
    },
    isNetworkCertifiedNftMint(transaction): boolean {
      const type = transaction.asset.nft.unik.properties.type;
      return (
        this.isUnsCertifiedNftMint(transaction.type, transaction.typeGroup) && type === DIDTypes.NETWORK.toString()
      );
    },
    isVoucherUnsCertifiedNftMint(transaction: ITransaction): boolean {
      return !!(
        this.isUnsCertifiedNftMint(transaction.type, transaction.typeGroup) &&
        transaction.asset.nft.unik.properties.UnikVoucherId
      );
    },
    isUnsNftMintService(transaction: ITransaction): boolean {
      return (
        this.isUnsCertifiedNftMint(transaction.type, transaction.typeGroup) &&
        !BigNumber.make(this.transaction.amount).isZero()
      );
    },
    isUnsCertifiedNftUpdate(type: number, typeGroup: number): boolean {
      return isUNSTypeGroup(typeGroup) && type === UNSTransaction.CERTIFIED_NFT_UPDATE;
    },
    isUnsUpdateService(transaction: ITransaction): boolean {
      return (
        this.isUnsCertifiedNftUpdate(transaction.type, transaction.typeGroup) &&
        !BigNumber.make(this.transaction.amount).isZero()
      );
    },
    isUnsAliveDemand(transaction: ITransaction): boolean {
      return (
        this.isUnsCertifiedNftUpdate(transaction.type, transaction.typeGroup) &&
        transaction.asset.nft.unik.properties[LIFE_CYCLE_PROPERTY_KEY] === LifeCycleGrades.LIVE.toString()
      );
    },
    isUnsEverlastingDemand(transaction: ITransaction): boolean {
      return (
        this.isUnsCertifiedNftUpdate(transaction.type, transaction.typeGroup) &&
        transaction.asset.nft.unik.properties[LIFE_CYCLE_PROPERTY_KEY] === LifeCycleGrades.EVERLASTING.toString()
      );
    },
    isUnsRewardedTransaction(transaction: ITransaction, isTokenEcov2: boolean): boolean {
      if (isTokenEcov2) {
        return this.isUnsAliveDemand(transaction) && BigNumber.make(this.transaction.amount).isZero();
      } else {
        return this.isVoucherUnsCertifiedNftMint(transaction);
      }
    },
    isUnsVerifyUrl(transaction: ITransaction): boolean {
      const pattern = new RegExp(VERIFIED_URL_KEY_PREFIX);
      return (
        this.isUnsUpdateService(transaction) &&
        Object.keys(transaction.asset.nft.unik.properties).some((propkey) => pattern.test(propkey))
      );
    },
    isUnsXPLevelDemand(transaction: ITransaction): boolean {
      return this.isUnsUpdateService(transaction) && !!transaction.asset.nft.unik.properties[BADGE_XP_LEVEL_KEY];
    },
    isUnsPioneerDemand(transaction: ITransaction): boolean {
      return this.isUnsUpdateService(transaction) && !!transaction.asset.nft.unik.properties[BADGE_PIONEER_KEY];
    },
    isUnsUserPropertyUpdate(transaction: ITransaction): boolean {
      const pattern = new RegExp("usr/");
      return (
        this.isUnsCertifiedNftUpdate(transaction.type, transaction.typeGroup) &&
        Object.keys(transaction.asset.nft.unik.properties).some((propkey) => pattern.test(propkey))
      );
    },
  },
};
