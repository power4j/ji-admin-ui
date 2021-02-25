<template>
  <div>
    <d2-container-frame :src="frameUrl"/>
  </div>
</template>

<script>
export default {
  name: 'frame-context',
  data () {
    return {
    }
  },
  computed: {
    frameUrl () {
      return this.$route.meta.frameUrl
    }
  },
  created () {
    console.log(JSON.stringify(this.$route))
  }
}
</script>
