<template lang="pug">

v-sheet.rounded-lg.custom-card(outlined
  v-ripple
  elevation="2"
  :color="color"
  style="overflow: hidden;")
  v-hover(v-slot:default="{ hover }")
    v-card(tile
      flat
      :color="color")
      v-img(:src="previewImage"
        :height="isMobile ? '170px' : '320px'")
        v-expand-transition(v-if="!isMobile")
          v-container.pa-0.transition-fast-in-fast-out.custom-card--reveal(v-if="hover")
            v-sheet.pa-0.custom-card-background(:class="color")
            v-sheet.pa-8.custom-card-content
              v-card-title.d-block.pa-0.white--text
                h5.font-weight-black.text-subtitle-1.text-left(style="line-height: 100%;") {{ item.type }}
                h3.font-weight-black.text-h4.text-left(style="word-break: break-word") {{ item.title }}
              v-card-text.pa-0.white--text
                p.mb-0.text-left.text-h6 {{ item.by }}
      v-card-title.d-block.white--text(v-if="isMobile")
        h5.font-weight-black.text-caption.text-left(style="line-height: 100%;") {{ item.type }}
        h3.font-weight-black.text-subtitle-1.text-left(style="word-break: break-word") {{ item.title }}

</template>

<script>
export default {
  name: 'Card',
  props: {
    item: Object,
    color: String,
    prefixURL: String
  },
  computed: {
    previewImage: function () {
      if (this.item.content.images.length === 0) {
        return require('@/assets/images/No_Preview.png')
      }
      return require(`@/assets/images/${this.item.content.images[0]}`)
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-card {
  border: 4px solid rgba(0, 0, 0, .12);
  box-sizing: content-box;
  &--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &-background, &-content {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-content {
    background: transparent;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  &-background {
    opacity: .8;
  }
}

@media (min-width: 960px) {
  .custom-card {
    border-bottom: 24px solid rgba(0, 0, 0, .12);
  }
}

</style>