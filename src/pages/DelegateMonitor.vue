<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.DELEGATE_MONITOR.TITLE") }}</ContentHeader>

    <section class="page-section py-5 md:py-10">
      <nav class="mx-5 sm:mx-10 mb-4 border-b flex items-end overflow-x-auto">
        <div class="type-container individual">
          <div class="type">
            <UnikTypeBadge :type="INDIV_TYPE" />
          </div>
          <div class="type-tab-container">
            <div
              :class="activeTab === 'active' && activeType === INDIV_TYPE ? 'active-tab' : 'inactive-tab'"
              @click="
                activeTab = 'active';
                activeType = INDIV_TYPE;
              "
            >
              {{ $t("PAGES.DELEGATE_MONITOR.ACTIVE") }}
            </div>
            <div
              :class="activeTab === 'standby' && activeType === INDIV_TYPE ? 'active-tab' : 'inactive-tab'"
              @click="
                activeTab = 'standby';
                activeType = INDIV_TYPE;
              "
            >
              {{ $t("PAGES.DELEGATE_MONITOR.STANDBY") }}
            </div>
          </div>
        </div>

        <div class="type-container organization">
          <div class="type">
            <UnikTypeBadge :type="ORG_TYPE" />
          </div>
          <div class="type-tab-container">
            <div
              :class="activeTab === 'active' && activeType === ORG_TYPE ? 'active-tab' : 'inactive-tab'"
              @click="
                activeTab = 'active';
                activeType = ORG_TYPE;
              "
            >
              {{ $t("PAGES.DELEGATE_MONITOR.ACTIVE") }}
            </div>
            <div
              :class="activeTab === 'standby' && activeType === ORG_TYPE ? 'active-tab' : 'inactive-tab'"
              @click="
                activeTab = 'standby';
                activeType = ORG_TYPE;
              "
            >
              {{ $t("PAGES.DELEGATE_MONITOR.STANDBY") }}
            </div>
          </div>
        </div>

        <div class="type-container network">
          <div class="type">
            <UnikTypeBadge :type="NETWORK_TYPE" />
          </div>
          <div class="type-tab-container">
            <div
              :class="activeTab === 'active' && activeType === NETWORK_TYPE ? 'active-tab' : 'inactive-tab'"
              @click="
                activeTab = 'active';
                activeType = NETWORK_TYPE;
              "
            >
              {{ $t("PAGES.DELEGATE_MONITOR.ACTIVE") }}
            </div>
          </div>
        </div>

        <div class="type-container resigned">
          <div class="type">
            <UnikTypeLogo :type="INDIV_TYPE" />
            <UnikTypeLogo :type="ORG_TYPE" />
            <UnikTypeLogo :type="NETWORK_TYPE" />
          </div>
          <div class="type-tab-container">
            <div :class="activeTab === 'resigned' ? 'active-tab' : 'inactive-tab'" @click="activeTab = 'resigned'">
              {{ $t("PAGES.DELEGATE_MONITOR.RESIGNED") }}
            </div>
          </div>
        </div>
      </nav>

      <TableDelegates
        :delegates="delegates"
        :active-tab="activeTab"
        :sort-query="sortParams[activeTab]"
        @on-sort-change="onSortChange"
      />

      <div v-if="delegates && delegates.length === activeDelegates" class="mx-5 sm:mx-10 mt-5 md:mt-10 flex flex-wrap">
        <RouterLink
          :to="{
            name: activeTab === 'resigned' ? 'delegates-resigned' : 'delegates',
            params: { page: activeTab === 'standby' ? 5 : 3 },
          }"
          tag="button"
          class="button-lg"
        >
          {{ $t("PAGINATION.SHOW_MORE") }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { IDelegate, ISortParameters } from "@/interfaces";
import { MonitorHeader, ForgingStats } from "@/components/monitor";
import UnikTypeLogo from "@/components/unik/UnikTypeLogo.vue";
import UnikTypeBadge from "@/components/unik/UnikTypeBadge.vue";
import DelegateService from "@/services/delegate";
import { DIDType } from "@uns/ts-sdk";

@Component({
  components: { UnikTypeLogo, UnikTypeBadge },
  computed: {
    ...mapGetters("network", ["height", "activeDelegates"]),
  },
})
export default class DelegateMonitor extends Vue {
  private delegates: IDelegate[] | null = null;
  private activeTab = "active";
  private INDIV_TYPE: DIDType = "INDIVIDUAL";
  private ORG_TYPE: DIDType = "ORGANIZATION";
  private NETWORK_TYPE: DIDType = "NETWORK";
  private activeType: DIDType = this.INDIV_TYPE;
  private height: number;

  get sortParams() {
    return this.$store.getters["ui/delegateSortParams"];
  }

  set sortParams(params: ISortParameters) {
    this.$store.dispatch("ui/setDelegateSortParams", {
      ...this.sortParams,
      [this.activeTab]: {
        field: params.field,
        type: params.type,
      },
    });
  }

  @Watch("height")
  public async onHeightChanged() {
    await this.setDelegates();
  }

  @Watch("activeTab")
  @Watch("activeType")
  public async onActiveTabOrTypeChanged() {
    this.delegates = null;
    await this.setDelegates();
  }

  public async created() {
    await this.setDelegates();
  }

  private async setDelegates() {
    if (this.height) {
      // @ts-ignore
      this.delegates = await DelegateService[this.activeTab](this.activeType);
    }
  }

  private onSortChange(params: ISortParameters) {
    this.sortParams = params;
  }
}
</script>

<style scoped>
.inactive-tab,
.active-tab {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 0px;
}

.type-container {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #f3f3f399;
  border: 1px solid var(--theme-border);
  border-bottom: none;
}

.type-container .type-tab-container,
.type-container .type {
  display: flex;
  width: 100%;
  justify-content: center;
}

.type-container .type {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0.5em;
}

.type-container .type-tab-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.type-container.individual .type {
  background-color: #c6c6ff;
}

.type-container.organization .type {
  background-color: #6163b1;
}

.type-container.network .type {
  background-color: #15c8c0;
}

.type-container.resigned .type {
  background-color: #f0eeee;
  font-size: 1.2em;
}

.unik-badge {
  margin-right: 0px;
}
</style>
