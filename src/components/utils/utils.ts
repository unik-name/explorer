import { ITransaction } from "@/interfaces";
import { DIDTypes } from "@uns/ts-sdk";

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
