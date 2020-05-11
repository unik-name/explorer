<template>
  <span class="unik-display">
    <UnikTypeLogo v-if="type" :type="unikClass(type).toUpperCase()" />
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
import { DIDType, DIDHelpers, DIDTypes } from "@uns/ts-sdk";
import { truncate } from "../../utils/strings";
import UnikTypeLogo from "@/components/unik/UnikTypeLogo.vue";

const UNIKNAME_LENTH_TRUNCATE = 16;

@Component({
  components: { UnikTypeLogo },
})
export default class UnikDisplay extends Vue {
  @Prop({ required: true }) public unikname: string;
  @Prop({ required: false }) public type: DIDType;
  @Prop({ required: false, default: 28 }) public iconWidth: number;
  @Prop({ required: false, default: 28 }) public iconheight: number;
  @Prop({ required: false, default: false }) public truncateUnikname: boolean;

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
.unik-display {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
