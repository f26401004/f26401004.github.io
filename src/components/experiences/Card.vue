<template lang="pug">

v-sheet.rounded-lg.custom-card(outlined
  v-ripple
  elevation="2"
  :color="cardColor"
  style="overflow: hidden;")
  v-hover(v-slot:default="{ hover }")
    v-card(tile
      flat
      :color="cardColor")
      v-img(:src="previewImage"
        :height="isMobile ? '170px' : '320px'")
        v-expand-transition(v-if="!isMobile")
          v-container.pa-0.transition-fast-in-fast-out.custom-card--reveal(v-if="hover")
            v-sheet.pa-0.custom-card-background(:class="cardColor")
            v-sheet.pa-8.custom-card-content
              v-card-title.d-block.pa-0.white--text
                h5.font-weight-black.text-subtitle-1.text-left(style="line-height: 100%;") {{ activity.tag }}
                h3.font-weight-black.text-h4.text-left(style="word-break: break-word") {{ activity.title }}
              v-card-text.pa-0.white--text
                p.mb-0.text-left.text-h6 {{ activity.organization }}
      v-card-title.d-block.white--text(v-if="isMobile")
        h5.font-weight-black.text-caption.text-left(style="line-height: 100%;") {{ activity.tag }}
        h3.font-weight-black.text-subtitle-1.text-left(style="word-break: break-word") {{ activity.title }}

</template>

<script>
export default {
  name: 'Card',
  props: {
    activity: Object
  },
  computed: {
    previewImage: function () {
      if (this.activity.content.images.length === 0) {
        return require('@/assets/images/projects/No_Preview.png')
      }
      return require(`@/assets/images/projects/${this.activity.contnet.images[0]}`)
    },
    cardColor: function () {
      switch(this.activity.tag) {
        case 'Learning':
          return 'primary' // this.$vuetify.theme.currentTheme.primary
        case 'Leadership':
          return 'secondary' // this.$vuetify.theme.currentTheme.secondary
        case 'Volunteer':
          return 'light-green' // this.$vuetify.theme.currentTheme.error
        case 'Other':
          return 'purple'
        default:
          return 'primary' // this.$vuetify.theme.currentTheme.primary
      }
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