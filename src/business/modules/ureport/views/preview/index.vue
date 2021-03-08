<template>
  <div>
    <d2-container-frame :src="previewUrl"/>
  </div>
</template>

<script>

export default {
  name: 'ureport-preview',
  data () {
    return {
      baseUrl: window.location.protocol + '//' + window.location.host + `${process.env.VUE_APP_API}/ureport/preview`
    }
  },
  computed: {
    previewUrl () {
      return this.baseUrl + `?_u=${this.$route.params.file}`
    }
  }
}
</script>
