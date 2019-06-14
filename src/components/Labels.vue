<template>
  <json-view
    :data="labels"
    :max-depth="1"
    :styles="styles"
    root-key=""
  />
</template>

<script type="text/ecmascript-6">
const styles = {
  string: '#002b36',
  arrowSize: '12px'
}

export default {
  name: 'Labels',

  props: {
    labels: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    styles: styles
  })
}
</script>
