<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Owner") }}
        </div>
        <div class="truncate">
          <LinkWallet
            :address="unik.ownerId"
            :trunc="false"
          />
        </div>
      </div>

      <div class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("Creation date") }}
        </div>
        <div v-if="unik.creation">
          {{ readableTimestamp(unik.creation.unix) }}
        </div>
        <div v-else>
          <i>{{ $t("Not yet available" ) }}</i>
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Category") }}
        </div>
        <div v-if="unik.category">
          Individual
          <!--TODO: component category -->
        </div>
        <div v-else>
          <i>{{ $t("Not yet available" ) }}</i>
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("Status") }}
        </div>
        <div v-if="unik.status">
          Minted
          <!--TODO: component status -->
        </div>
        <div v-else>
          <i>{{ $t("Not yet available" ) }}</i>
        </div>
      </div>
    </div>

    <div class="px-5 sm:px-10">
      <div class="list-row">
        <div class="mr-4">
          {{ $t("Labels") }}
        </div>
      </div>
      <div
        v-if="unik.labels && unik.labels !== {}"
        class="py-2"
      >
        <Labels :labels="unik.labels" />
      </div>
      <div
        v-else
        class="py-2"
      >
        <i>{{ $t("No labels attached" ) }}</i>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'UnikDetails',

  props: {
    unik: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.list-row-border-b-no-wrap > div:last-child {
  text-align: right;
}
</style>
