<template lang="pug">
  
div.pa-3.page-background-default
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container.mt-16.pl-0.pr-0
      job.ma-3(v-show="isDisplay.job")
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container.pl-0.pr-0
      activity.ma-3(v-show="isDisplay.activity")

</template>

<script>
import Job from '@/components/experiences/Job.vue'
import Activity from '@/components/experiences/Activity.vue'

export default {
  name: 'Experiences',
  components: {
    Job,
    Activity
  },
  data: function () {
    return {
      isDisplay: {
        job: false,
        activity: false
      }
    }
  },
  mounted: function () {
    Object.keys(this.isDisplay).forEach(key => {
      this.isDisplay[key] = true
    })
    console.log(this.isDisplay)
  }
}
</script>

<style lang="scss" scoped>

</style>