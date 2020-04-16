<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.NETWORK_MONITOR.TITLE") }}</ContentHeader>

    <MonitorHeader />

    <section class="page-section py-5 md:py-10">

      <ForgingStats :delegates="delegates || []" />

      <TableDelegates
        :delegates="delegates"
        @on-sort-change="() => {}"
        :disable-ranking="true"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ISortParameters } from "@/interfaces";
import DelegateService from "@/services/delegate";
import { MonitorHeader, ForgingStats } from "@/components/monitor";

@Component({
  components: {
    MonitorHeader,
    ForgingStats,
  },
  computed: {
    ...mapGetters("network", ["height"]),
  },
})
export default class NetworkMonitor extends Vue {
  private delegates: IDelegate[] | null = null;
  private activeTab: string = "active";
  private height: number;

  @Watch("height")
  public async onHeightChanged() {
    await this.setDelegates();
  }

  public async created() {
    await this.setDelegates();
  }

  private async setDelegates() {
    if (this.height) {
      // @ts-ignore
      this.delegates = await DelegateService.active();
    }
  }
}
</script>
