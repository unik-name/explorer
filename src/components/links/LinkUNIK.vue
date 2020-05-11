<template>
  <span>
    <RouterLink :to="{ name: 'unik', params: { id, unikname: truncate(unikname, 13, 'right') } }">
      <UnikDisplay
        v-if="unikname"
        v-tooltip="unikname"
        style="color: inherit"
        :unikname="unikname"
        :type="type"
        :truncate-unikname="truncateUnikname"
      />
      <span v-else v-tooltip="id">
        {{ truncate(id) }}
      </span>
    </RouterLink>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { DIDType } from "@uns/ts-sdk";
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
