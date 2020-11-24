import { ITransaction } from "@/interfaces";
import { DIDTypes } from "@uns/ts-sdk";
import { Identities } from "@uns/ark-crypto";
import { WalletService, UnikService } from "@/services";

export function getMilestone(config, height?: number): { [key: string]: any } {
  if (!height) {
    height = 1;
  }
  let milestoneIdx = 0;
  while (milestoneIdx < config.milestones.length - 1 && height >= config.milestones[milestoneIdx + 1].height) {
    milestoneIdx++;
  }

  return config.milestones[milestoneIdx];
}

export function getdidTypeFromRewardTransaction(transaction: ITransaction, isTokenEcoV2: boolean): DIDTypes {
  if (isTokenEcoV2) {
    // token eco v2: only individual are rewarded at Alive demand
    return DIDTypes.INDIVIDUAL;
  } else {
    // token eco v1: type is in transaction asset
    return parseInt(transaction.asset.nft.unik.properties.type);
  }
}

export function getFoundationAddress(config): string {
  const foundationPubKey = config.network.foundation.publicKey;
  return Identities.Address.fromPublicKey(foundationPubKey, config.network.pubKeyHash);
}
export async function getUniksInfos(transactions: ITransaction[]): Promise<Record<string, any>> {
  const senderAddresses = transactions.map((tx: ITransaction) => tx.sender);
  const recipientaddresses = transactions.map((tx: ITransaction) => tx.recipient);
  // remove duplicates
  const addresses = [...new Set(senderAddresses.concat(recipientaddresses))];
  if (addresses.length) {
    const wallets = await WalletService.search({ addresses: addresses }, 1, addresses.length);
    const singleUniksWallets = wallets.data.filter(
      (wallet) => wallet.attributes.tokens && Object.keys(wallet.attributes.tokens).length === 1,
    );
    if (singleUniksWallets.length) {
      const uniks = await UnikService.getUniks(
        singleUniksWallets.map((wallet) => Object.keys(wallet.attributes.tokens).shift()),
      );

      return uniks
        .filter((unik) => !!unik.defaultExplicitValue)
        .reduce(
          (uniksInfo, unik) => ({
            ...uniksInfo,
            [unik.ownerId]: { id: unik.id, type: unik.type, explicitValue: unik.defaultExplicitValue },
          }),
          {},
        );
    }
  }
}
