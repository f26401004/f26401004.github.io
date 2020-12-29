<template lang="pug">

div.pa-3.page-background-default
  v-container.d-flex.flex-wrap.justify-end.mt-16.pt-0.pb-0
    v-chip.ma-2.font-weight-medium(v-for="(type, index) of types"
      :key="`project-type-${type}-${index}`"
      dark
      ripple
      elevation="2"
      :color="type | transferToChipColor") {{ type }}
  v-scroll-y-reverse-transition(hide-on-leave)
    v-container
      v-row(v-show="isDisplay")
        v-col(v-for="(project, index) of projectData"
          :key="`project-${project.name}-${index}`"
          cols="12"
          md="4"
          lg="4"
          xl="4")
          card(:project="project")

</template>

<script>
import Card from '@/components/projects/Card.vue'
import projectData from '@/assets/projects.json'

export default {
  name: 'Projects',
  components: {
    Card
  },
  data: function () {
    return {
      isDisplay: false,
      projectData
    }
  },
  computed: {
    types: function () {
      const temp = new Set()
      this.projectData.forEach(target => {
        temp.add(target.type)
      })
      return [...temp]
    }
  },
  filters: {
    transferToChipColor: function (value) {
      switch(value) {
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
  },
  mounted: function () {
    this.isDisplay = true
  }
}
</script>

<style lang="scss" scoped>

</style>
