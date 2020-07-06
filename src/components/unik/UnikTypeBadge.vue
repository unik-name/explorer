<template>
  <span :class="`unik-badge unik-badge-${unikClass(type)}`">
    <img v-if="type" :src="unikLogo(type)" alt="" class="unik-view-logo" />
    {{ $t(unikTypeReadableLabelTranslationKey(type)) }}
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { DIDType } from "@uns/ts-sdk";

@Component
export default class UnikTypeBadge extends Vue {
  @Prop({ required: false }) public type: DIDType;
}
</script>

<style scoped>
.unik-badge {
  padding: 0.25em 1em;
  border-radius: 20px;
  color: #fff;
  display: flex;
  flex-direction: row;
  margin-right: 0.5em;
}

.unik-badge img {
  margin-right: 0.5em;
  width: 1.2em;
}

.unik-badge.unik-badge-individual {
  background-color: #c6c6ff;
}

.unik-badge.unik-badge-organization {
  background-color: #6263b1;
}

.unik-badge.unik-badge-network {
  background-color: #16c8c0;
}</style
>>
