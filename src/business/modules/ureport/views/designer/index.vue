<template>
  <div>
    <d2-container-frame :src="designerUrl"/>
  </div>
</template>

<script>
import util from '@/libs/util.js'

export default {
  name: 'ureport-designer',
  data () {
    return {
      baseUrl: window.location.protocol + '//' + window.location.host + `${process.env.VUE_APP_API}/ureport/designer`
    }
  },
  computed: {
    designerUrl () {
      let url = this.baseUrl + `?x-api-token=${util.cookies.get('token')}`
      if (this.$route.params.file) {
        url = url + `&_u=${this.$route.params.file}`
      }
      console.log(url)
      return url
    }
  }
}
</script>
