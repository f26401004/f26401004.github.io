<template lang="pug">

div.pa-3.page-background-default
  v-container.mt-16
    v-card.mt-6.rounded-lg(two-line
      style="overflow: hidden")
      v-card-text.pa-0
        v-container.pa-0
          v-row.ma-0
            v-col.pa-8.black(v-if="!isMobile"
              cols="0"
              md="9"
              lg="9"
              xl="9")
              embed(width="100%"
                height="100%"
                type="application/pdf"
                :src="currentMOOC.file | transferToFilepath")
            v-col(cols="12"
              md="3"
              lg="3"
              xl="3")
              div.pa-4(v-scrollbar="{ damping: 0.2 }"
                style="overflow-y: auto"
                :style="{ 'height': isMobile ? '' : '750px', 'max-height': isMobile ? '' : '750px' }")
                v-list(v-for="(field, index) of fields"
                  :key="`moocs-${field}-${index}`"
                  two-line)
                  v-subheader.pa-0.font-weight-bold.text-h6(:class="`${fieldColor(field)}--text`" style="height: 24px;") {{ field }}
                  v-alert.mt-4.ma-0.pa-0.elevation-2(v-for="(mooc, midx) of sortedMoocs[field]"
                    :key="`mooc-${field}-${mooc.name}-${midx}`"
                    v-ripple
                    style="background-color: rgba(102, 102, 102, 0.06);"
                    :colored-border="isMobile"
                    :border="isMobile ? 'left': null"
                    :color="isMobile ? fieldColor(field) : ''"
                    :class="{ 'pl-4': isMobile, 'rounded-lg': !isMobile }"
                    @click="clickHandler(field, midx)")
                    v-list-item.pa-0.ma-0(v-if="isMobile")
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
                              v-list-item-title.text-left.text-subtitle-1 {{ mooc.name }}
                              v-list-item-subtitle.text-left {{ mooc.completeTime | transferToLocaleString }}
                            v-col(cols="4"
                              md="3"
                              lg="3"
                              xl="3")
                              v-avatar.text-h6.white--text(color="#8fb7f6") {{ mooc.score | truncateFloat }}
                    v-container.ma-0.pa-4.d-flex.flex-wrap.justify-center.align-center.rounded-lg(v-else
                      style="height: 200px;"
                      :class="`${currentMOOCIndex === midx && currentMOOCField === mooc.field ? fieldColor(field) : ''}`")
                      v-img(contain
                        max-width="48px"
                        max-height="48px"
                        :src="`${require(`@/assets/images/icons/${mooc.icon}`)}`")
                      v-container
                        h4.text-center.text-h6(style="line-height: 100%"
                          :class="{ 'white--text': currentMOOCIndex === midx && currentMOOCField === mooc.field }") {{ mooc.name }}
                        h6.mt-2.text-center.text-caption(style="width: 100%"
                          :class="{ 'white--text': currentMOOCIndex === midx && currentMOOCField === mooc.field }") {{ mooc.organization }}
</template>

<script>
import moocsData from '@/assets/moocs.json'

export default {
  name: 'MOOCs',
  data: function () {
    return {
      currentMOOCIndex: 0,
      currentMOOCField: '',
      isMounted: false,
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
    },
    currentMOOC: function () {
      if (!this.isMounted) {
        return {}
      }
      return this.sortedMoocs[this.currentMOOCField][this.currentMOOCIndex]
    }
  },
  filters: {
    transferToLocaleString: function (value) {
      const temp = new Date(value)
      return `${temp.toLocaleString('en', { month: 'short' })} ${temp.getDate()}, ${temp.getFullYear()}`
    },
    transferToFilepath: function (value) {
      return require(`@/assets/documents/moocs/${value}`).default
    },
    truncateFloat: function (value) {
      let temp = value.toString().split('')
      const index = temp.findIndex(target => target === '.')
      temp = temp.slice(0, index)
      return temp.join('')
    }
  },
  mounted: function () {
    // Initialize the field of mooc
    this.currentMOOCField = this.fields[0]
    this.isMounted = true
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
    },
    clickHandler: function (field, index) {
      this.currentMOOCIndex = index
      this.currentMOOCField = field
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
