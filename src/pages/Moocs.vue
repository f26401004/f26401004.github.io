<template lang="pug">

div.pa-3.page-background-default
  v-container.mt-12
    v-card.rounded-lg(two-line)
      v-card-text
        v-list(v-for="(field, index) of fields"
          :key="`moocs-${field}-${index}`"
          two-line)
          v-subheader.pa-0.font-weight-bold.text-body-1(:class="`${fieldColor(field)}--text`" style="height: 24px;") {{ field }}
          v-alert.mt-2.ma-0.pa-0.pl-4.elevation-2(v-for="(mooc, midx) of sortedMoocs[field]"
            :key="`mooc-${field}-${mooc.name}-${midx}`"
            colored-border
            v-ripple
            border="left"
            style="background-color: rgba(102, 102, 102, 0.06);"
            :color="fieldColor(field)")
            v-list-item.pa-0.ma-0
              v-list-item-avatar
                v-img(contain
                :src="`${require(`@/assets/images/icons/${mooc.icon}`)}`")
              v-list-item-content.d-flex.align-center
                v-container.pa-0
                  v-row(align="center" no-gutters)
                    v-col(cols="8"
                      md="9"
                      lg="9"
                      xl="9")
                      v-list-item-title.text-left(:class="{ 'text-subtitle-1': isMobile, 'text-h6': !isMobile, 'mb-1': !isMobile }") {{ mooc.name }}
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
  computed: {
    fields: function () {
      const temp = new Set()
      this.moocsData.forEach(target => {
        temp.add(target.field)
      })
      return [...temp]
    },
    sortedMoocs: function () {
      const result = {}
      this.fields.forEach(field => {
        result[field] = this.moocsData.filter(target => target.field === field)
      })
      return result
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
        case 'Artificial Intelligence':
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
