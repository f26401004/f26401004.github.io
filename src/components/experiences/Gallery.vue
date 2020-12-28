<template lang="pug">

v-carousel(hide-delimiters
  height="200px"
  :show-arrows-on-hover="slides.length !== 1"
  :show-arrows="slides.length !== 1")
  v-carousel-item(v-for="(slide, index) in slides"
    :key="`gallery-carousel-${title}-${index}`")
    v-row
      v-col(v-for="(image, idx) of images.slice(Math.min(index * numberPerSlide, images.length), Math.min((index + 1) * numberPerSlide, images.length))"
        :key="`gallery-carousel-col-${title}-${idx}`"
        :cols="isMobile ? 12 : 4")
        v-card(ripple)
          v-img(contain :src="images[index * numberPerSlide + idx]")
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    images: Array,
    title: String
  },
  data: function () {
    return {
      toggler: false,
      currentIndex: null
    }
  },
  computed: {
    slides: function () {
      if (this.isMobile) {
        return new Array(this.images.length).fill(0).map((target, index) => index)
      }
      const size = Math.ceil(this.images.length / 3)
      return new Array(size).fill(0).map((target, index) => index)
    },
    numberPerSlide: function () {
      return this.isMobile
        ? 1
        : 3
    }
  },
  methods: {
    openImageBox: function (index) {
      console.log(this.images)
      this.toggler = !this.toggler
      this.currentIndex = index
    },
  }
}
</script>

<style lang="scss" scoped>

</style>