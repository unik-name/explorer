<template>
  <span>
    <RouterLink
      :to="{ name: 'unik', params: { id } }"
      class="hidden md:inline-block"
    >
      <span
        v-if="length"
        v-tooltip="id"
      >{{ truncate(id, length) }}</span>
      <span v-else>{{ id }}</span>
    </RouterLink>
    <RouterLink
      :to="{ name: 'block', params: { id } }"
      class="md:hidden"
    >
      <span v-tooltip="id">{{ truncate(id) }}</span>
    </RouterLink>
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'LinkUNIK',

  props: {
    id: {
      type: String,
      required: true
    },
    length: {
      type: Number,
      required: false
    }
  }
}
</script>
