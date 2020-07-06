<template>
  <img v-if="type" :src="unikLogo(type)" :class="`unik unik-${unikClass(type)}`" />
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { DIDType } from "@uns/ts-sdk";

@Component
export default class UnikTypeLogo extends Vue {
  @Prop({ required: true }) public type: DIDType;
}
</script>

<style scoped>
.unik {
  color: #ffffff;
  padding: 3px;
  font-size: 1.2em;
  margin-right: 0.2em;
  border-radius: 2px;
  width: 1em;
}

.unik.unik-individual {
  background-color: #c6c6ff;
}

.unik.unik-organization {
  background-color: #6263b1;
}

.unik.unik-network {
  background-color: #16c8c0;
}
</style>
