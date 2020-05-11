<template>
  <div v-if="unik" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("UNIK.SUMMARY") }}</ContentHeader>

    <template v-if="unikNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <NotFound :is-loading="isFetching" :data-id="unik.id" data-type="UNIK token" />

          <button :disabled="isFetching" class="mt-4 pager-button items-center" @click="fetchUnik">
            <span>{{ !isFetching ? $t("Reload this page") : $t("Loading...") }}</span>
          </button>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="mb-5">
        <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center">
          <div
            :class="
              `mr-6 flex-none${unik.type ? ` unik-icon-container unik-icon-container-${unikClass(unik.type)}` : ''}`
            "
          >
            <font-awesome-icon v-if="unik.type" class="unik-view-logo" :icon="unikLogo(unik.type)" />
            <SvgIcon v-else class="icon" name="unik" view-box="0 0 64 64" />
          </div>
          <div class="flex-auto min-w-0">
            <div :class="`${unik.defaultExplicitValue ? 'text-2xl text-white semibold' : 'text-grey'} mb-2`">
              <UnikDisplay v-if="unik.defaultExplicitValue" :unikname="unik.defaultExplicitValue" />
              <span v-else>
                {{ $t("UNIK.ID") }}
              </span>
            </div>
            <div class="flex">
              <div
                :class="
                  `${
                    unik.defaultExplicitValue ? 'text-grey' : 'text-xl text-white semibold'
                  } truncate unik-badge-container`
                "
              >
                <UnikTypeBadge :type="unik.type" />
                <span class="mr-2">{{ truncate(unik.id, 16, "right") }}</span>
              </div>
              <Clipboard v-if="unik.id" :value="unik.id" />
            </div>
          </div>
        </div>
      </section>

      <UnikDetails :unik="unik" />
    </template>
  </div>
</template>

<script lang="ts">
/* tslint:disable:no-console */
import { Vue, Prop, Component } from "vue-property-decorator";
import NotFound from "@/components/utils/NotFound.vue";
import UnikDetails from "@/components/unik/Details.vue";
import UnikDisplay from "@/components/unik/UnikDisplay.vue";
import UnikTypeBadge from "@/components/unik/UnikTypeBadge.vue";
import UnikService from "@/services/unik";
import { IUnik } from "../interfaces";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    NotFound,
    UnikDetails,
    UnikDisplay,
    UnikTypeBadge,
  },
})
export default class Unik extends Vue {
  private unik: IUnik | null = null;
  private unikNotFound = false;
  private isFetching = false;

  public async beforeRouteEnter(to, from, next) {
    try {
      const unik: IUnik = await UnikService.find(to.params.id);
      next((vm) => {
        vm.setUnik(unik);
      });
    } catch (e) {
      next((vm) => {
        console.log(e.message || e.data.error);
        vm.unikNotFound = true;
        vm.unik = { id: to.params.id };
      });
    }
  }

  public async beforeRouteUpdate(to, from, next) {
    try {
      const unik: IUnik = await UnikService.find(to.params.id);
      this.setUnik(unik);
      next();
    } catch (e) {
      console.log(e.message || e.data.error);

      this.unikNotFound = true;
      this.unik = { id: to.params.id };
    }
  }

  private setUnik(unik) {
    this.unik = unik;
  }

  private async fetchUnik() {
    this.isFetching = true;

    try {
      const unik = await UnikService.find(this.unik.id);
      this.setUnik(unik);
      this.unikNotFound = false;
    } catch (e) {
      console.log(e.message || e.data.error);
    } finally {
      this.isFetching = false;
    }
  }
}
</script>

<style>
.unik-icon-container {
  padding: 8px 10px;
  border-radius: 1px;
}

.unik-icon-container.unik-icon-container-individual {
  background-color: #c6c6ff;
}

.unik-icon-container.unik-icon-container-organization {
  background-color: #6263b1;
}

.unik-icon-container.unik-icon-container-network {
  background-color: #47a09f;
}

.unik-icon-container .unik-view-logo {
  font-size: 2.5em;
  padding: 0.05em;
  color: #fff;
}

.unik-badge-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
