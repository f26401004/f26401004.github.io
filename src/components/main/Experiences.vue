<template lang="pug">

  
v-card.rounded-lg.mt-10.pb-5
  v-container.secondary
    v-row(justify="center")
      h3.text-h5.font-weight-black.white--text Experiences
  v-container(v-for="(type, tidx) of Object.keys(displayExperienceData)"
    :key="`experience-type-${type}-${tidx}`")
    h4.text-h6.text-left.font-weight-black(:class="`${colors[type]}--text`") {{ type }}
    v-list(three-line)
      v-list-item.elevation-2.pa-0(v-for="(item, idx) of displayExperienceData[type]"
        :key="`${type}-item-${item.name}-${idx}`"
        :class="`custom-list-item-${type.toLowerCase()} ${idx !== 0 ? 'mt-2': ''}`"
        @click="")
        v-list-item-avatar.ml-4
          div.custom-experience-icon(:style="{ 'background-image': `url('${require(`@/assets/images/icons/${item.icon}`)}')` }")
        v-list-item-content
          v-list-item-title.pr-4.mb-2.d-inline-flex.align-center
            h5.text-h6.text-left.font-weight-normal.text-wrap(style="line-height: 120%;"
              :class="`${colors[type]}--text`") {{ item.title }}
            v-spacer
            v-chip(v-if="item.tags.length"
              small).grey--text {{ item.tags[0] }}
          v-list-item-subtitle
            p.mb-1.text-left {{ item.organization }}
          div.d-flex
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
      return {
        'Job': jobs.slice(0, 2),
        'Activity': [activities[0]]
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
      width: 7px;
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
      width: 7px;
      height: 100%;
      background-color: #FF6C6C;
    }
    background-color: #F6F6F6 !important;
  }

}

.custom-experience-icon {
  width: 36px;
  height: 36px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

</style>