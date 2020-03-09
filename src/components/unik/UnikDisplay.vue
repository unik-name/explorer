<template>
  <span :class="`unik unik-${unikClass(type)}`">
      <font-awesome-icon v-if="type" :icon="`${unikLogo(type)}`" />
      <span v-else>
        @
      </span>
      <span>
        {{ uniknameLabel }}
      </span>
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { DIDType, DIDHelpers, DIDTypes } from '@uns/ts-sdk';
import { truncate } from "../../utils/strings";
import { getUnikLogoName } from "../../utils/unik-utils";

const UNIKNAME_LENTH_TRUNCATE: number = 16;

@Component
export default class UnikDisplay extends Vue {
  @Prop({ required: true }) public unikname: string;
  @Prop({ required: false }) public type: DIDType;
  @Prop({ required: false, default: 28}) public iconWidth: number;
  @Prop({ required: false, default: 28}) public iconheight: number;
  @Prop({ required: false, default: false}) public truncateUnikname: boolean;



  get uniknameLabel(): string {
    let uniknameLabel = this.unikname;
    if (this.truncateUnikname) {
      uniknameLabel = truncate(uniknameLabel, UNIKNAME_LENTH_TRUNCATE + 3, "right");
    }
    return uniknameLabel;
  }
}

</script>

<style scoped>
.unik-logo {
    display: inline-block;
    margin-right: -0.4em;
}

.unik {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.unik > svg {
  color: #FFFFFF;
  padding: 3px;
  font-size: 1.4em;
  margin-right: 0.1em;
  border-radius: 2px;
}

.unik-individual > svg {
  background-color: #C6C6FF;
}

.unik-organization > svg {
  background-color: #6263B1;
}

.unik-network > svg {
  background-color: #16C8C0;
}

</style>>
