<template lang="pug">

v-card.rounded-lg.mt-10.pb-5
  v-container.secondary
    v-row.pl-8.pr-8(justify="center"
      justify-md="start"
      justify-lg="start"
      justify-xl="start"
      :class="{ 'pa-2': !isMobile }")
      h3.font-weight-black.white--text(:class="{ 'text-h5': isMobile, 'text-h4': !isMobile }") Activity
  v-container.d-flex.justify-start(:class="{ 'pl-16': !isMobile, 'pr-16': !isMobile, 'pt-14': !isMobile, 'pl-4': isMobile, 'pr-4': isMobile }")
    v-tabs(v-model="currentActivityTab"
      show-arrows
      hide-slider
      color="error")
      v-tab(v-for="(type, index) of types"
        :key="`activity-type-tab-${type}`"
        color="error") {{ type }}
  v-tabs-items(v-model="currentActivityTab"
    :class="{ 'pl-16': !isMobile, 'pr-16': !isMobile, 'pb-8': !isMobile, 'pl-4': isMobile, 'pr-4': isMobile }")
    v-tab-item(v-for="(type, index) of types"
      :key="`activity-type-tab-item-${type}`")
      v-expansion-panels(:multiple="!isMobile")
        v-expansion-panel.elevation-2.pa-0(v-for="(item, idx) of displayActivities(type)"
          :key="`activity-item-${item.name}-${idx}`"
          :class="{ 'mt-2': idx !== 0}")
          v-expansion-panel-header.pa-2.pr-4.custom-list-item-activity(ripple)
            template(v-slot:actions)
              v-icon(color="error"
                :large="!isMobile") $expand 
            v-list.pa-0.custom-list-item-activity(:three-line="isMobile")
              v-list-item.pa-0
                v-list-item-avatar(:class="{ 'ml-4': isMobile, 'ml-8': !isMobile }")
                  v-img(contain
                    :src="require(`@/assets/images/icons/${item.icon}`)")
                v-list-item-content
                  v-list-item-title.pr-4.d-flex.align-center(:class="{ 'mb-2': isMobile }")
                    v-row(no-gutters
                      align="center")
                      v-col(cols="12"
                        md="9"
                        ld="9"
                        xl="9")
                        v-container.pa-0.d-inline-flex.align-center
                          h5.text-left.font-weight-medium.text-wrap(style="line-height: 120%;"
                            :class="isMobile ? `text-h6 error--text` : `text-h5 error--text`") {{ item.title }}
                        br(v-if="!isMobile")
                        v-container.pa-0.d-inline-flex.align-center(v-if="!isMobile")
                          label.text-left.text-wrap.grey--text {{ item.organization }}
                      v-col(v-if="!isMobile"
                        cols="12"
                        md="3"
                        ld="3"
                        xl="3")
                        v-container.d-flex.justify-end
                          time.text-body-1.error--text {{ item.period | transferToLength}}
                          time.text-body-1 ・{{ item.period | transferToRange }}
                  v-list-item-subtitle(v-if="isMobile")
                    p.mb-1.text-left {{ item.organization }}
                  div.d-flex(v-if="isMobile")
                    time.text-caption(class="error--text") {{ item.period | transferToLength}}
                    time.text-caption ・{{ item.period | transferToRange }}
          v-expansion-panel-content(:class="{ 'pl-16': !isMobile, 'pr-16': !isMobile }")
            v-container.pl-0.pr-0
              p.ma-0.text-left(v-html="item.content.description"
                :class="{ 'mb-2': !isMobile }")
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
                icon="mdi-trophy") <b>Honor</b>: {{ award }}
            v-container.pa-0(v-if="item.content.images.length > 0")
              gallery(:title="item.title"
                :images="transferToFilepath(item.content.images)")
                
</template>

<script>
import Gallery from '@/components/experiences/Gallery.vue'
import experienceData from '@/assets/experiences.json'

export default {
  name: 'Activity',
  components: {
    Gallery
  },
  data: function () {
    return {
      currentActivityTab: 'All',
      experienceData
    }
  },
  computed: {
    types: function () {
      let temp = new Set()
      this.experienceData['Activity'].forEach(target => {
        temp.add(target.tag)
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
        return require(`@/assets/images/projects/${target}`)
      })
    },
    displayActivities: function (type) {
      if (type === 'All') {
        return this.experienceData['Activity']
      }
      const result = []
      this.experienceData['Activity'].forEach(target => {
        if (target.tag === type) {
          result.push(target)
        }
      })
      return result
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-list-item-activity {
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    width: 6px;
    height: 100%;
    background-color: #FF6C6C;
  }
  background-color: #F6F6F6 !important;
}
</style>