<template>
  <span>
    <RouterLink :to="{ name: 'unik', params: { id, unikname } }">
      <span v-tooltip="id">{{ truncate(unikname ? unikname : id) }}</span>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LinkUNIK extends Vue {
  @Prop({ required: true }) public id: string;
  @Prop({ required: false }) public unikname: string;
  @Prop({ required: false, default: 0 }) public length: number;
}
</script>
