<template>
  <div
    v-if="unik"
    class="max-w-2xl mx-auto md:pt-5"
  >
    <ContentHeader>{{ $t("UNIK summary") }}</ContentHeader>

    <template v-if="unikNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <NotFound
            :data-id="unik.id"
            data-type="UNIK token"
          />

          <button
            :disabled="isFetching"
            class="mt-4 pager-button items-center"
            @click="fetchUnik"
          >
            <span>{{ !isFetching ? $t('Reload this page') : $t('Loading...') }}</span>
          </button>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="mb-5">
        <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center">
          <div class="mr-6 flex-none">
            <img
              class="block"
              src="@/assets/images/icons/unik.svg"
            >
          </div>
          <div class="flex-auto min-w-0">
            <div class="text-grey mb-2">
              {{ $t("UNIK ID") }}
            </div>
            <div class="flex">
              <div class="text-xl text-white semibold truncate">
                <span class="mr-2">{{ unik.id }}</span>
              </div>
              <Clipboard
                v-if="unik.id"
                :value="unik.id"
              />
            </div>
          </div>
        </div>
      </section>

      <UnikDetails :unik="unik" />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import NotFound from '@/components/utils/NotFound'
import UnikDetails from '@/components/unik/Details'
import UnikService from '@/services/unik'

export default {
  components: {
    NotFound,
    UnikDetails
  },

  data: () => ({
    unik: {},
    unikNotFound: false,
    isFetching: false
  }),

  async beforeRouteEnter (to, from, next) {
    try {
      const unik = await UnikService.find(to.params.id)
      next(vm => {
        vm.setUnik(unik)
      })
    } catch (e) {
      next(vm => {
        console.log(e.message || e.data.error)

        vm.unikNotFound = true
        vm.unik = { id: to.params.id }
      })
    }
  },

  async beforeRouteUpdate (to, from, next) {
    this.unik = {}

    try {
      const unik = await UnikService.find(to.params.id)
      this.setUnik(unik)
      next()
    } catch (e) {
      console.log(e.message || e.data.error)

      this.unikNotFound = true
      this.unik = { id: to.params.id }
    }
  },

  methods: {
    async fetchUnik () {
      this.isFetching = true

      try {
        const unik = await UnikService.find(this.unik.id)
        this.setUnik(unik)
        this.unikNotFound = false
      } catch (e) {
        console.log(e.message || e.data.error)
      } finally {
        this.isFetching = false
      }
    },

    setUnik (unik) {
      this.unik = unik
    }
  }
}
</script>
