<template>
  <div>
    <d2-container-frame :src="previewUrl"/>
  </div>
</template>

<script>
import util from '@/libs/util.js'

export default {
  name: 'ureport-preview',
  data () {
    return {
      baseUrl: window.location.protocol + '//' + window.location.host + `${process.env.VUE_APP_API}/ureport/preview`
    }
  },
  computed: {
    previewUrl () {
      const url = this.baseUrl + `?x-api-token=${util.cookies.get('token')}&_u=${this.$route.params.file}`
      console.log(url)
      return url
    }
  }
}
</script>
