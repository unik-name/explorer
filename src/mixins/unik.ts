import { DIDType } from "@uns/ts-sdk";
import { getUnikClass, getUnikTypeReadableLabelTranslationKey } from "@/utils/unik-utils";

export default {
  methods: {
    unikLogo(type: DIDType): string {
      return require(`@/assets/images/unik/unik-${type.toLowerCase()}.png`);
    },
    unikClass(type: DIDType): string {
      return getUnikClass(type);
    },
    unikTypeReadableLabelTranslationKey(type: DIDType): string {
      return getUnikTypeReadableLabelTranslationKey(type);
    },
  },
};
