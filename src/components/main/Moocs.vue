<template lang="pug">
  
v-card.mt-10.pb-2(:class="{ 'rounded-lg': isMobile, 'rounded-xl': !isMobile }")
  v-container.secondary
    v-row.pl-8.pr-8(justify="center"
      justify-md="start"
      justify-lg="start"
      justify-xl="start"
      :class="{ 'pa-2': !isMobile }")
      h3.font-weight-black.white--text(:class="{ 'text-h5': isMobile, 'text-h4': !isMobile }") MOOCs
      v-spacer(v-if="!isMobile")
      v-btn(v-if="!isMobile"
        text
        large
        to="/moocs"
        color="white") More
  v-container(:class="{ 'pl-16': !isMobile, 'pr-16': !isMobile, 'pt-10': !isMobile, 'pb-10': !isMobile, 'pl-4': isMobile, 'pr-4': isMobile }")
    v-list(:two-line="isMobile" :three-line="!isMobile")
      v-alert.mt-2.ma-0.pa-0.pl-4.elevation-2(v-for="(mooc, midx) of displayMOOCs"
        :key="`mooc-${mooc.name}-${midx}`"
        colored-border
        v-ripple
        border="left"
        style="background-color: rgba(102, 102, 102, 0.06);"
        :color="fieldColor(mooc.field)")
        v-list-item.pa-0.ma-0
          v-list-item-avatar.ml-1(:size="isMobile ? 40 : 52")
            v-img(contain
              :src="`${require(`@/assets/images/icons/${mooc.icon}`)}`")
          v-list-item-content.d-flex.align-center
            v-container.pa-0
              v-row(align="center" no-gutters)
                v-col.text-truncate(cols="8"
                  md="9"
                  lg="9"
                  xl="9")
                  v-list-item-subtitle.mb-1.font-weight-bold.text-left.text-subtitle-1(v-if="!isMobile"
                    :class="`${fieldColor(mooc.field)}--text`") {{ mooc.field }}
                  v-list-item-title.text-wrap.text-left(:class="{ 'text-subtitle-1': isMobile, 'text-h6': !isMobile, 'mb-1': !isMobile }") {{ mooc.name }}
                  v-list-item-subtitle.text-left(v-if="isMobile") {{ mooc.completeTime | transferToLocaleString }}
                  v-list-item-subtitle.text-left(v-else) {{ mooc.organization }}
                v-col(cols="4"
                  md="3"
                  lg="3"
                  xl="3")
                  v-avatar(v-if="isMobile"
                    color="#8fb7f6").text-h6.white--text {{ mooc.score | truncateFloat }}
                  label(v-else) {{ mooc.completeTime | transferToLocaleString }}
</template>

<script>
import moocsData from '@/assets/moocs.json'

export default {
  name: 'MOOCs',
  data: function () {
    return {
      moocsData
    }
  },
  mounted: function () {
    this.moocsData.sort((a, b) => {
      return b.score - a.score
    })
  },
  computed: {
    displayMOOCs: function () {
      return this.moocsData.slice(0, 5)
    }
  },
  filters: {
    transferToLocaleString: function (value) {
      const temp = new Date(value)
      return `${temp.toLocaleString('en', { month: 'short' })} ${temp.getDate()}, ${temp.getFullYear()}`
    },
    truncateFloat: function (value) {
      let temp = value.toString().split('')
      const index = temp.findIndex(target => target === '.')
      temp = temp.slice(0, index)
      return temp.join('')
    }
  },
  methods: {
    fieldColor: function (field) {
      switch(field) {
        case 'Software Engineering':
          return 'primary' // this.$vuetify.theme.currentTheme.primary
        case 'Network Engineering':
          return 'secondary' // this.$vuetify.theme.currentTheme.secondary
        case 'Machine Learning':
          return 'error' // this.$vuetify.theme.currentTheme.error
        case 'Cybersecurity':
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

</style>