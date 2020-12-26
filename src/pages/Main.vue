<template lang="pug">

div.pa-3.page-background-default
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      introduction.ma-3(v-show="isDisplay.introduction")
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      v-row.mr-1(justify-xs="end"
        justify-sm="center"
        justify-md="center"
        justify-lg="center"
        justify-xl="center")
        v-btn.mr-2(icon
          link
          :x-large="!isMobile"
          href="mailto:f26401004@gmail")
          v-icon(color="primary") mdi-email
        v-btn.mr-2(icon
          link
          :x-large="!isMobile"
          href="https://www.facebook.com/profile.php?id=100007308796509"
          target="_blank")
          v-icon(color="primary") mdi-facebook
        v-btn.mr-2(icon
          link
          :x-large="!isMobile"
          href="https://www.linkedin.com/in/f26401004/"
          target="_blank")
          v-icon(color="primary") mdi-linkedin
        v-btn.mr-2(icon
          link
          :x-large="!isMobile"
          href="https://github.com/f26401004"
          target="_blank")
          v-icon(color="primary") mdi-github
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      skills.ma-3(v-show="isDisplay.skills")
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      experiences.ma-3(v-show="isDisplay.experiences")
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      projects.ma-3(v-show="isDisplay.projects")
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      moocs.ma-3(v-show="isDisplay.moocs")
</template>

<script>
import Introduction from '@/components/main/Introduction.vue'
import Skills from '@/components/main/Skills.vue'
import Experiences from '@/components/main/Experiences.vue'
import Projects from '@/components/main/Projects.vue'
import Moocs from '@/components/main/Moocs.vue'

export default {
  name: 'Main',
  components: {
    Introduction,
    Skills,
    Experiences,
    Projects,
    Moocs
  },
  data: function () {
    return {
      isDisplay: {
        introduction: false,
        skills: false,
        experiences: false,
        projects: false,
        moocs: false
      }
    }
  },
  mounted: function () {
    Object.keys(this.isDisplay).forEach(key => {
      this.isDisplay[key] = true
    })
  },
  methods: {
    emailHandler: function () {},

  }
}
</script>

<style lang="scss" scoped>

</style>