<template>
  <span>
      <SvgIcon class="unik-logo" :view-box="`0 0 ${iconWidth} ${iconheight}`" stroke-width="2" :name="`unik-${type.toLowerCase()}`" />
      <span>
        @{{ unikname }}
      </span>
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { DIDType } from '@uns/ts-sdk';

@Component
export default class UnikDisplay extends Vue {
  @Prop({ required: true }) public unikname: string;
  @Prop({ required: true }) public type: DIDType;
  @Prop({ required: false, default: 28}) public iconWidth: number;
  @Prop({ required: false, default: 28}) public iconheight: number;

}
</script>

<style scoped>
.unik-logo {
    display: inline-block;
    margin-right: -0.4em;
}
</style>>
