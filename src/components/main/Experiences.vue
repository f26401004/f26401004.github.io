<template lang="pug">

  
v-card.rounded-lg.mt-10.pb-5
  v-container.secondary
    v-row.pl-8.pr-8(justify="center"
      justify-md="start"
      justify-lg="start"
      justify-xl="start"
      :class="{ 'pa-2': !isMobile }")
      h3.font-weight-black.white--text(:class="{ 'text-h5': isMobile, 'text-h4': !isMobile }") Experiences
      v-spacer(v-if="!isMobile")
      v-btn(v-if="!isMobile"
        text
        large
        color="white") More
  v-container(v-for="(type, tidx) of Object.keys(displayExperienceData)"
    :key="`experience-type-${type}-${tidx}`"
    :class="{ 'pl-16': !isMobile, 'pr-16': !isMobile, 'pl-4': isMobile, 'pr-4': isMobile }")
    h4.text-left.font-weight-black(:class="transferToTypeStyle(type)") {{ type }}
    v-list(:three-line="isMobile")
      v-list-item.elevation-2.pa-0(v-for="(item, idx) of displayExperienceData[type]"
        :key="`${type}-item-${item.name}-${idx}`"
        :class="`custom-list-item-${type.toLowerCase()} ${idx !== 0 ? 'mt-2': ''}`"
        @click="")
        v-list-item-avatar(:class="{ 'ml-4': isMobile, 'ml-8': !isMobile }")
          v-img(contain
            :src="require(`@/assets/images/icons/${item.icon}`)")
        v-list-item-content
          v-list-item-title.pr-4.d-flex.align-center(:class="{ 'mb-2': isMobile }")
            v-row(no-gutters
              align="center")
              v-col(cols="12"
                md="5"
                ld="5"
                xl="5")
                v-container.pa-0.d-inline-flex.align-center
                  h5.text-left.font-weight-medium.text-wrap(style="line-height: 120%;"
                    :class="transferToTitleStyle(type)") {{ item.title }}
                  v-spacer(v-if="isMobile")
                  v-chip.ml-4(v-if="item.tags.length"
                    :small="isMobile"
                    ripple).grey--text {{ item.tags[0] }}
              v-col(cols="12"
                md="4"
                ld="4"
                xl="4")
                label.text-left.text-wrap(v-if="!isMobile") {{ item.organization }}
              v-col(cols="12"
                md="3"
                ld="3"
                xl="3")
                v-container.d-flex.justify-end(v-if="!isMobile")
                  time.text-caption(:class="`${colors[type]}--text`") {{ item.period | transferToLength}}
                  time.text-caption ・{{ item.period | transferToRange }}
          v-list-item-subtitle(v-if="isMobile")
            p.mb-1.text-left {{ item.organization }}
          div.d-flex(v-if="isMobile")
            time.text-caption(:class="`${colors[type]}--text`") {{ item.period | transferToLength}}
            time.text-caption ・{{ item.period | transferToRange }}

</template>

<script>
import experienceData from '@/assets/experiences.json'

export default {
  name: 'Experiences',
  data: function () {
    return {
      colors: {
        'Job': 'primary',
        'Activity': 'error'
      },
      experienceData
    }
  },
  computed: {
    displayExperienceData: function () {
      // Sort the experience by end time incrementally
      const jobs = this.experienceData['Job']
      jobs.sort((a, b) => {
        const timeA = a.period[1]
          ? new Date(a.period[1])
          : new Date()
        const timeB = b.period[1]
          ? new Date(b.period[1])
          : new Date()
        return timeB.getTime() - timeA.getTime()
      })
      const activities = this.experienceData['Activity']
      activities.sort((a, b) => {
        const timeA = a.period[1]
          ? new Date(a.period[1])
          : new Date()
        const timeB = b.period[1]
          ? new Date(b.period[1])
          : new Date()
        return timeB.getTime() - timeA.getTime()
      })
      return this.isMobile
        ? {
          'Job': jobs.slice(0, 2),
          'Activity': [activities[0]]
        }
        : {
          'Job': jobs.slice(0, 3),
          'Activity': activities.slice(0, 2),
        }
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
    transferToTypeStyle: function (value) {
      const temp = {}
      temp['text-h6'] = this.isMobile
      temp['text-h4'] = !this.isMobile
      temp[`${this.colors[value]}--text`] = true
      return temp
    },
    transferToTitleStyle: function (value) {
      const temp = {}
      temp['text-h6'] = this.isMobile
      temp['text-h5'] = !this.isMobile
      temp[`${this.colors[value]}--text`] = true
      return temp
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-list-item {

  &-job {
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

  &-activity {
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

}

</style>