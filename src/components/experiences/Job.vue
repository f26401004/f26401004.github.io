<template lang="pug">

v-card.rounded-lg.mt-10.pb-5
  v-container.secondary
    v-row.pl-8.pr-8(justify="center"
      justify-md="start"
      justify-lg="start"
      justify-xl="start"
      :class="{ 'pa-2': !isMobile }")
      h3.font-weight-black.white--text(:class="{ 'text-h5': isMobile, 'text-h4': !isMobile }") Job
  v-container
    v-expansion-panels(v-if="isMobile")
      v-expansion-panel.elevation-2.pa-0(v-for="(item, idx) of displayJobs('All')"
        :key="`job-item-${item.name}-${idx}`"
        :class="{ 'mt-2': idx !== 0}")
        v-expansion-panel-header.pa-2.pr-4.custom-list-item-job(ripple)
          template(v-slot:actions)
            v-icon(color="primary") $expand 
          v-list.pa-0.custom-list-item-job(three-line)
            v-list-item.pa-0
              v-list-item-avatar.ml-4
                v-img(contain
                  :src="require(`@/assets/images/icons/${item.icon}`)")
              v-list-item-content
                v-list-item-title.mb-2.pr-4.d-flex.align-center
                  v-container.pa-0.d-inline-flex.align-center
                    h5.text-left.text-h6.font-weight-medium.text-wrap.primary--text(style="line-height: 120%;") {{ item.title }}
                v-list-item-subtitle
                  p.mb-1.text-left {{ item.by }}
                div.d-flex
                  time.text-caption(class="primary--text") {{ item.period | transferToLength}}
                  time.text-caption ・{{ item.period | transferToRange }}
        v-expansion-panel-content
          v-container.pl-0.pr-0
            p.ma-0.text-left(v-html="item.content.description")
          v-container.pa-0
            v-alert.text-left(v-for="(contribution, idx) of item.content.contributions"
              :key="`experience-${contribution}-${idx}`"
              dark
              color="primary"
              icon="mdi-thumb-up") <b>Contribution</b>: {{ contribution }}
            v-alert.text-left(v-for="(award, idx) of item.content['awards/honors']"
              :key="`experience-${award}-${idx}`"
              dark
              color="secondary"
              icon="mdi-trophy")
              b Honor
              span(v-html="award")
          v-container.pa-0(v-if="item.content.images.length > 0")
            gallery(:title="item.title"
              :images="transferToFilepath(item.content.images)")
    v-container(v-else)
      v-row
        v-col(cols="3")
          v-tabs(v-model="currentJob"
            vertical
            style="max-width: 100%;")
            v-tab.d-flex(v-for="(item, idx) of displayJobs('All')"
              :key="`job-item-${item.name}-${idx}`"
              style="height: 64px; width: 100%; word-break: break-word; white-space: normal;")
              v-row(no-gutters)
                v-col(cols="3")
                  v-avatar(size="36")
                    v-img(contain
                      :src="require(`@/assets/images/icons/${item.icon}`)")
                v-col.d-flex.justify-left.align-center(cols="9")
                  label.text-left.text-capitalize  {{ item.title }}
        v-col(cols="9")
          v-tabs-items(v-model="currentJob")
            v-tab-item(v-for="(item, idx) of displayJobs('All')"
              :key="`job-tab-item-${item.name}-${idx}`")
              v-card.pl-0.pr-0.text-left(outlined)
                v-card-text
                  v-chip.text-h6.mb-2.white--text(:color="transferToColor(item.type)") {{ item.type }}
                  h3.font-weight-bold.text-h4.text-left.primary--text.mb-2 {{ item.title }}
                  div.d-flex.align-center
                    label.font-weight-bold.text-body-1.text-left.mr-2 {{ item.by }}
                    time.text-body-1(class="primary--text") {{ item.period | transferToLength}}
                    time.text-body-1 ・{{ item.period | transferToRange }}
              v-container(v-if="item.content.images.length > 0")
                gallery(:title="item.title"
                  :images="transferToFilepath(item.content.images)")
              perfect-scrollbar(style="max-height: 360px;")
                v-container
                  p.ma-0.text-left(v-html="item.content.description")
                v-container
                  v-alert.d-flex.text-left(v-for="(contribution, cidx) of item.content.contributions"
                    :key="`experience-${contribution}-${cidx}`"
                    dark
                    color="primary"
                    icon="mdi-thumb-up")
                    b Contribution
                    span :&nbsp;
                    span(v-html="contribution")
                  v-alert.text-left(v-for="(award, aidx) of item.content['awards/honors']"
                    :key="`experience-${award}-${aidx}`"
                    dark
                    color="secondary"
                    icon="mdi-trophy")
                    b Honor
                    span :&nbsp;
                    span(v-html="award")
</template>

<script>
import Gallery from '@/components/experiences/Gallery.vue'
import experienceData from '@/assets/experiences.json'

export default {
  name: 'Job',
  components: {
    Gallery
  },
  data: function () {
    return {
      currentJob: 0,
      experienceData
    }
  },
  computed: {
    types: function () {
      let temp = new Set()
      this.experienceData['Job'].forEach(target => {
        temp.add(target.type)
      })
      return ['All', ...temp]
    }
  },
  filters: {
    transferToLength: function (value) {
      const startTime = new Date(value[0])
      const endTime = value[1]
        ? new Date(value[1])
        : new Date()
      let diff = (endTime.getFullYear() - startTime.getFullYear()) * 12
      diff = diff - startTime.getMonth()
      diff = diff + endTime.getMonth() + 1
      return diff > 1 
        ? `${diff} months`
        : `${diff} month`
    },
    transferToRange: function (value) {
      const startTime = new Date(value[0])
      const endTime = value[1]
        ? new Date(value[1])
        : null
      return endTime
        ? `${startTime.toLocaleString('en', { month: 'short' })} ${startTime.getFullYear()} – ${endTime.toLocaleString('en', { month: 'short' })} ${endTime.getFullYear()}`
        : `${startTime.toLocaleString('en', { month: 'short' })} ${startTime.getFullYear()} – present`
    }
  },
  methods: {
    transferToFilepath: function (values) {
      return  values.map(target => {
        console.log(`@/assets/images/${target}`)
        return require(`@/assets/images/${target}`)
      })
    },
    displayJobs: function (type) {
      if (type === 'All') {
        return this.experienceData['Job']
      }
      const result = []
      this.experienceData['Job'].forEach(target => {
        if (target.type === type) {
          result.push(target)
        }
      })
      return result
    },
    displayActivities: function (type) {
      if (type === 'All') {
        return this.experienceData['Activity']
      }
      const result = []
      this.experienceData['Activity'].forEach(target => {
        if (target.type === type) {
          result.push(target)
        }
      })
      return result
    },
    transferToColor: function (value) {
      switch(value) {
        case 'Software Engineering':
          return 'primary' // this.$vuetify.theme.currentTheme.primary
        case 'Network Engineering':
          return 'secondary' // this.$vuetify.theme.currentTheme.secondary
        case 'Machine Learning':
          return 'error' // this.$vuetify.theme.currentTheme.error
        case 'Cybersecurity':
          return 'light-green' // this.$vuetify.theme.currentTheme.error
        case 'Entrepreneurship':
          return 'light-blue'
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

.custom-list-item-job {
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 6px;
    height: 100%;
    background-color: #2176FF;
  }
  background-color: #F6F6F6 !important;
}
</style>