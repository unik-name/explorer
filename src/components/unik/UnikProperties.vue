<template>
  <Loader :data="properties">
    <table-component
      v-if="properties && properties.length > 0"
      :data="properties"
      :show-filter="false"
      :show-caption="false"
    >
      <table-column
        :label="$t('Key')"
        show="key"
        header-class="right-header-cell"
        cell-class="right-cell"
        :sortable="false"
        :filterable="false"
      />

      <table-column
        :label="$t('Value')"
        show="value"
        header-class="left-header-cell"
        cell-class="left-cell"
        :sortable="false"
        :filterable="false"
      />
    </table-component>

    <div
      v-else
      class="px-5 md:px-10"
    >
      <span>{{ $t("No properties") }}</span>
    </div>
  </Loader>
</template>

<script type="text/ecmascript-6">
const styles = {
  string: '#002b36',
  arrowSize: '12px'
}

export default {
  name: 'UnikProperties',

  props: {
    properties: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    styles: styles
  })
}
</script>
