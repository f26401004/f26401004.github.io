<template lang="pug">
  
v-card.mt-10(:class="{ 'rounded-lg': isMobile, 'rounded-xl': !isMobile }")
  v-row.fill-height(no-gutters)
    v-col.pt-0.pb-0(xs="12"
      sm="5"
      md="5"
      lg="5"
      xl="5")
      v-container.secondary(:class="{ 'rounded-t-lg': isMobile, 'rounded-tl-xl': !isMobile  }")
        v-row(justify="center")
          h3.text-h5.font-weight-black.white--text Personal Skills
      v-container.pa-0(style="overflow: hidden;"
        :class="{ 'rounded-bl-xl': !isMobile, 'secondary': isMobile }")
        v-carousel(v-model="currentSkillIndex"
          continuous
          hide-delimiter-background
          class="custom-carousel"
          :height="isMobile ? '60vw' : '530px'")
          v-carousel-item(v-for="(type, index) of Object.keys(skillData)"
            :key="`carousel-skill-${type}-${index}`")
            v-sheet.d-flex.align-center.justify-center(color="transparent"
              flat
              height="90%")
              div.custom-skill-preview(:style="{ 'background-image': `url('${require(`@/assets/images/${type.replace(' ', '').toLowerCase()}.svg`)}')` }")
    v-col.pt-0.pb-0(xs="12"
      sm="7"
      md="7"
      lg="7"
      xl="7")
      v-container.primary(:class="{ 'rounded-tr-xl': !isMobile }")
        v-row(justify="center")
          h3.text-sm-h6.text-md-h5.text-lg-h5.text-xl-h5.font-weight-black.white--text {{ currentSkill }}
      v-container(style="overflow-y: auto;"
        :style="{ 'height': isMobile ? 'auto' : '530px' }")
        v-tabs-items.pa-1.mt-3(v-model="currentSkillIndex")
          v-tab-item(v-for="(type, tidx) of Object.keys(skillData)"
            :key="`skill-tab-${type}-${tidx}`")
            v-expansion-panels(:multiple="!isMobile")
              v-expansion-panel(v-for="(skill, sidx) of skillData[currentSkill]"
                :key="`${currentSkill}-${skill.name}-${sidx}`")
                v-expansion-panel-header.pt-3.pb-3.pl-4.pr-4(style="background-color: rgba(102, 102, 102, 0.06);")
                  v-row.pa-0.ma-0(justify="center"
                    align="center")
                    v-col.pa-0.ma-0(cols="2" md="1" lg="1" xl="1")
                      v-icon(color="primary"
                        :dense="isMobile"
                        :large="!isMobile") {{ skill.icon }}
                    v-col.pa-0.ma-0(cols="10" md="11" lg="11" xl="11")
                      p.mb-0.font-weight-bold.primary--black(:class="{ 'text-h6': !isMobile }") {{ skill.name }}
                      v-rating(readonly
                        v-model="skill.level"
                        dense
                        length="10"
                        :size="isMobile ? '14px' : '20px'"
                        background-color="grey darken-1"
                        color="secondary")
                v-expansion-panel-content.pt-4
                  v-row(justify="start")
                    v-chip.ma-1(v-for="(label, lidx) of skill.labels"
                      :key="`${currentSkill}-${label}-${lidx}`"
                      outlined
                      :small="isMobile"
                      color="primary") {{ label }} 
</template>

<script>
import skillData from '@/assets/skills.json'

export default {
  name: 'Skills',
  data: function () {
    return {
      skillData,
      currentSkillIndex: 0,
    }
  },
  computed: {
    currentSkill: function () {
      const types = Object.keys(this.skillData)
      return types[this.currentSkillIndex]
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-skill-preview {
  width: 90%;
  height: 90%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: normal hue;
  // &::after {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   display: block;
  //   content: "";
  //   width: 100%;
  //   height: 100%;
  //   background-color: #FDCA40;
  //   mix-blend-mode: hue;
  // }
}


/deep/ .custom-carousel .v-carousel__controls__item.v-btn {
  color: rgba(33, 118, 255, 0.5) !important;
}

/deep/ .custom-carousel .v-carousel__controls__item.v-btn.v-btn--active {
  color: #2176FF !important;
}

/deep/ .custom-carousel .v-carousel__controls__item.v-btn.v-btn--active:before {
  opacity: 0 !important;
}

/deep/ .custom-carousel .v-carousel__controls__item.v-btn:hover {
  color: #2176FF !important;
}

/deep/ .custom-carousel .v-carousel__controls__item.v-btn:hover:before {
  opacity: 0 !important;
}

/deep/ .custom-carousel .v-carousel__controls__item .v-icon {
  opacity: 1 !important;
}


</style>