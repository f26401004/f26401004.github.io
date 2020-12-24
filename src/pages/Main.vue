<template lang="pug">

div.pa-3.page-background-default
  v-scroll-y-reverse-transition(hide-on-leave)
    introduction.ma-3(v-show="isDisplay.introduction")
  v-scroll-y-reverse-transition(hide-on-leave)
    v-row.mr-1(justify="end")
      v-btn.mr-2(icon
        link
        href="mailto:f26401004@gmail")
        v-icon(color="primary") mdi-email
      v-btn.mr-2(icon
        link
        href="https://www.facebook.com/profile.php?id=100007308796509"
        target="_blank")
        v-icon(color="primary") mdi-facebook
      v-btn.mr-2(icon
        link
        href="https://www.linkedin.com/in/f26401004/"
        target="_blank")
        v-icon(color="primary") mdi-linkedin
      v-btn.mr-2(icon
        link
        href="https://github.com/f26401004"
        target="_blank")
        v-icon(color="primary") mdi-github
  v-scroll-y-reverse-transition(hide-on-leave)
    skills.ma-3(v-show="isDisplay.skills")
</template>

<script>
import Introduction from '@/components/main/Introduction.vue'
import Skills from '@/components/main/Skills.vue'

export default {
  name: 'Main',
  components: {
    Introduction,
    Skills
  },
  data: function () {
    return {
      isDisplay: {
        introduction: false,
        skills: false
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