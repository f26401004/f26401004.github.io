<template lang="pug">
  
v-card.rounded-lg.mt-10.pb-5
  v-row.ma-0.secondary
    v-container
      h3.text-h5.text-center.font-weight-black.white--text Projects
  carousel(paginationActiveColor="#2176FF"
    paginationColor="rgba(33, 118, 255, 0.3)"
    :per-page="1")
    slide.d-flex.justify-center.pt-6.pb-2(v-for="(project, index) of displayProjects"
      :key="`project-${project.name}-${index}`")
      v-card(
        max-width="90%"
        min-height="534px"
        max-height="534px")
        v-img.custom-project-preview(:src="project.images | filterImage")
        v-card-title.pt-2.pb-2.pl-4.pr-4
          h4.text-h6.text-left.font-weight-black.primary--text {{ project.name }}
          v-container.d-flex.justify-start.pa-0.pt-2
            v-chip(v-for="(tag, tidx) of project.tags"
              :key="`project-${project.name}-tag-${tag}-${tidx}`"
              color="#F6F6F6") {{ tag }}
        v-card-content
          v-container.pt-1.pb-2.pl-4.pr-4
            p.text-left {{ project.description }}
</template>

<script>
import projectData from '@/assets/projects.json'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Projects',
  components: {
    Carousel,
    Slide
  },
  data: function () {
    return {
      projectData
    }
  },
  computed: {
    displayProjects: function () {
      let temp = this.projectData.filter(target => !target.status)
      // Push the latest projects and make the number of projects that displays is at least 3
      if (temp.length < 3) {
        // Obtain and sort the finished projects
        const finishedProjects = this.projectData.filter(target => target.status)
        finishedProjects.sort((a, b) => {
          const timeA = new Date(a.status)
          const timeB = new Date(b.status)
          return timeB.getTime() - timeA.getTime()
        })
        // Cut the projects
        const fillingProjects = finishedProjects.slice(0, 3 - temp.length)
        temp = [...temp, ...fillingProjects]
      } else if (temp.length > 3) {
        temp = temp.slice(0, 3)
      }
      return temp
    }
  },
  filters: {
    filterImage: function (value) {
      // Display default image if there is no preview image in the project
      if (value.length === 0) {
        const temp = require('@/assets/images/projects/No_Preview.png')
        return temp
      }
      return require(value[0])
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-project-preview {
  width: 327px;
  height: 205px;
}

</style>