<template>
  <span :class="`unik-badge unik-badge-${unikClass(type)}`">
    <font-awesome-icon class="unik-view-logo" v-if="type" :icon="unikLogo(type)" />
    {{ $t(unikTypeReadableLabelTranslationKey(type)) }}
  </span>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { DIDType } from '@uns/ts-sdk';

@Component
export default class UnikTypeBadge extends Vue {
  @Prop({ required: false }) public type: DIDType;
}

</script>

<style scoped>
.unik-badge {
  padding: 0.25em 1em;
  border-radius: 20px;
  color: #FFF;
  display: flex;
  flex-direction: row;
  margin-right: 0.5em;
}

.unik-badge svg {
  margin-right: 0.5em;
  font-size: 1.2em;
}

.unik-badge.unik-badge-individual {
  background-color: #C6C6FF;
}

.unik-badge.unik-badge-organization {
  background-color: #6263B1;
}

.unik-badge-container .unik-badge.unik-badge-network {
  background-color: #16C8C0;
}
</style>>
