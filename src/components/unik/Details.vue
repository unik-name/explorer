<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <nav
      :class="dataView === 'information' ? 'mb-8 sm:mb-4' : 'mb-4'"
      class="flex items-end border-b mx-5 sm:mx-10"
    >
      <div
        :class="dataView === 'information' ? 'active-tab' : 'inactive-tab'"
        @click="dataView = 'information'"
      >
        {{ $t("Information") }}
      </div>
      <div
        :class="dataView === 'history' ? 'active-tab' : 'inactive-tab'"
        @click="dataView = 'history'"
      >
        {{ $t("History") }}
      </div>
    </nav>

    <div v-if="dataView === 'information'">
      <UnikInformation :unik="unik" />
    </div>

    <div v-if="dataView === 'history'">
      <UnikHistory :unik="unik" />
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { UnikInformation, UnikHistory } from '@/components/unik'

export default {
  name: 'UnikDetails',

  components: {
    UnikInformation,
    UnikHistory
  },

  props: {
    unik: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    dataView: 'information'
  })
}
</script>
