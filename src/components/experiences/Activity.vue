<template lang="pug">

div
  v-card.rounded-lg.mt-10.pb-5(v-if="isMobile")
    v-container.secondary
      v-row.pl-8.pr-8(justify="center"
        justify-md="start"
        justify-lg="start"
        justify-xl="start")
        h3.font-weight-black.white--text.text-h5 Activity
    v-container
      v-expansion-panels
        v-expansion-panel.elevation-2.pa-0(v-for="(item, idx) of displayActivities('All')"
          :key="`activity-item-${item.name}-${idx}`"
          :class="{ 'mt-2': idx !== 0}")
          v-expansion-panel-header.pa-2.pr-4.custom-list-item-activity(ripple)
            template(v-slot:actions)
              v-icon(color="error") $expand 
            v-list.pa-0.custom-list-item-activity(three-line)
              v-list-item.pa-0
                v-list-item-avatar.ml-4
                  v-img(contain
                    :src="require(`@/assets/images/icons/${item.icon}`)")
                v-list-item-content
                  v-list-item-title.pr-4.mb-2.d-flex.align-center
                    v-row(no-gutters
                      align="center")
                      v-col(cols="12"
                        md="9"
                        ld="9"
                        xl="9")
                        v-container.pa-0.d-inline-flex.align-center
                          h5.text-left.font-weight-medium.text-wrap.text-h6.error--text(style="line-height: 120%;") {{ item.title }}
                  v-list-item-subtitle
                    p.mb-1.text-left {{ item.organization }}
                  div.d-flex
                    time.text-caption(class="error--text") {{ item.period | transferToLength}}
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
                icon="mdi-trophy") <b>Honor</b>: {{ award }}
            v-container.pa-0(v-if="item.content.images.length > 0")
              gallery(:title="item.title"
                :images="transferToFilepath(item.content.images)")
  v-container(v-else)
    v-row(align="center")
      v-divider
      h3.font-weight-black.text-h4.ma-4.error--text Activity
      v-divider
    v-sheet.rounded-xl(color="transparent")
      v-container.d-flex.flex-wrap.justify-end.pt-0.pb-0
        v-chip.ma-2.font-weight-medium(v-for="(type, index) of types.splice(1)"
          :key="`project-type-${type}-${index}`"
          dark
          ripple
          elevation="2"
          :color="type | transferToColor") {{ type }}
      v-container  
        v-row
          v-col(v-for="(activity, index) of displayActivities('All')"
            :key="`activity-${activity.name}-${index}`"
            cols="12"
            md="4"
            lg="4"
            xl="4")
            card(:item="activity"
              :color="activity.type | transferToColor")
</template>

<script>
import Gallery from '@/components/experiences/Gallery.vue'
import Card from '@/components/Card.vue'
import experienceData from '@/assets/experiences.json'

export default {
  name: 'Activity',
  components: {
    Gallery,
    Card
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
    },
    transferToColor: function (value) {
      switch(value) {
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