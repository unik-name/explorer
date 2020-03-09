import { DIDType } from '@uns/ts-sdk';
import { getUnikLogoName, getUnikClass, getUnikTypeReadableLabelTranslationKey } from '@/utils/unik-utils';

export default {
  methods: {
    unikLogo(type: DIDType): string {
      return getUnikLogoName(type);
    },
    unikClass(type: DIDType): string {
      return getUnikClass(type);
    },
    unikTypeReadableLabelTranslationKey(type: DIDType): string {
      return getUnikTypeReadableLabelTranslationKey(type);
    }
  },
};
