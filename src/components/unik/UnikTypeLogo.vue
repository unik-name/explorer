<template>
  <font-awesome-icon v-if="type" :icon="`${unikLogo(type)}`" :class="`unik unik-${unikClass(type)}`" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { DIDType } from '@uns/ts-sdk';

@Component
export default class UnikTypeLogo extends Vue {
  @Prop({ required: true }) public type: DIDType;
}

</script>

<style scoped>
.unik {
  color: #FFFFFF;
  padding: 3px;
  font-size: 1.2em;
  margin-right: 0.2em;
  border-radius: 2px;
  width: 1em;
}

.unik.unik-individual {
  background-color: #C6C6FF;
}

.unik.unik-organization {
  background-color: #6263B1;
}

.unik.unik-network {
  background-color: #16C8C0;
}
</style>
