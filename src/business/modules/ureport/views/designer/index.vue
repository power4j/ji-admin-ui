<template>
  <div>
    <d2-container-frame :src="designerUrl"/>
  </div>
</template>

<script>

export default {
  name: 'ureport-designer',
  data () {
    return {
      baseUrl: window.location.protocol + '//' + window.location.host + `${process.env.VUE_APP_API}/ureport/designer`
    }
  },
  computed: {
    designerUrl () {
      if (this.$route.params.file) {
        return this.baseUrl + `?_u=${this.$route.params.file}`
      }
      return this.baseUrl
    }
  }
}
</script>
