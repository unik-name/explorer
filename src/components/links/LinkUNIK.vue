<template>
  <span>
    <RouterLink :to="{ name: 'unik', params: { id, unikname: truncate(unikname, 13, 'right') } }">
      <UnikDisplay style="color: inherit" v-tooltip="unikname" v-if="unikname" :unikname="unikname" :type="type" :truncate-unikname="truncateUnikname"/>
      <span v-tooltip="id" v-else>
        {{ truncate(id) }}
        </span>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DIDType } from '@uns/ts-sdk';
import UnikDisplay from "@/components/unik/UnikDisplay.vue";

@Component({
  components: { UnikDisplay },
})
export default class LinkUNIK extends Vue {
  @Prop({ required: true }) public id: string;
  @Prop({ required: true }) public type: DIDType;
  @Prop({ required: false }) public unikname: string;
  @Prop({ required: false, default: false }) public truncateUnikname: boolean;
}
</script>
