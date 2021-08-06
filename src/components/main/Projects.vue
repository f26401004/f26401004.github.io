<template lang="pug">
  
v-card.mt-10.pb-5(:class="{ 'rounded-lg': isMobile, 'rounded-xl': !isMobile }")
  v-container.secondary
    v-row.pl-8.pr-8(justify="center"
      justify-md="start"
      justify-lg="start"
      justify-xl="start"
      :class="{ 'pa-2': !isMobile }")
      h3.font-weight-black.white--text(:class="{ 'text-h5': isMobile, 'text-h4': !isMobile }") Projects
      //- v-spacer(v-if="!isMobile")
      //- v-btn(v-if="!isMobile"
      //-   text
      //-   large
      //-   to="/projects"
      //-   color="white") More
  carousel(paginationActiveColor="#2176FF"
    paginationColor="rgba(33, 118, 255, 0.3)"
    :per-page="isMobile ? 1 : 3"
    :paginationPadding="12"
    :paginationSize="18"
    :class="{ 'pl-8': !isMobile, 'pr-8': !isMobile }")
    slide.d-flex.justify-center(v-for="(project, index) of displayProjects"
      :key="`project-${project.name}-${index}`"
      :class="{ 'pt-4': isMobile, 'pb-1': isMobile, 'pt-12': !isMobile, 'pb-8': !isMobile }")
      v-card.rounded(
        max-width="320px"
        min-height="534px"
        max-height="534px")
        v-img.custom-project-preview(:src="project.content.images | filterImage")
        v-card-title.pa-3
          h4.text-h6.text-left.text-truncate.font-weight-black.primary--text(style="word-break: break-word") {{ project.title }}
        v-divider
        v-container.d-flex.justify-start(style="overflow-x: auto; min-height: 56px;")
          v-chip(v-for="(tag, tidx) of project.tags"
            :key="`project-${project.name}-tag-${tag}-${tidx}`"
            ripple
            color="#F6F6F6") {{ tag }}
          label.grey--text(v-if="project.tags.length === 0") no tags
        v-card-text.pt-0.pb-0(v-scrollbar="{ damping: 0.2 }"
          style="height: 152px; max-height: 152px; overflow-y: auto;")
          p.text-left.text-body-1(v-html="project.content.description")
        v-card-actions.pl-4.pr-4
          p.text-left.text-body-1.ma-0(v-if="project.by.length > 0") <b>By</b>: {{ project.by }}
          //- v-spacer
          //- v-btn(text
          //-   color="secondary")
          //-   span More
          //-   v-icon mdi-arrow-right
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
      console.log(value)
      // Display default image if there is no preview image in the project
      if (value.length === 0) {
        const temp = require('@/assets/images/No_Preview.png')
        return temp
      }
      return require(`@/assets/images/${value[0]}`)
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