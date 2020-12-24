<template lang="pug">
  
v-card.rounded-lg.mt-10.pb-5
  v-row.ma-0.secondary
    v-container
      h3.text-h5.text-center.font-weight-black.white--text Personal Skills
    v-carousel(v-model="currentSkillIndex"
      continuous
      hide-delimiter-background
      delimiter-icon="mdi-circle-outline"
      height="60vw")
      v-carousel-item(v-for="(type, index) of Object.keys(skillData)"
        :key="`carousel-skill-${type}-${index}`")
        v-sheet(color="secondary"
          flat
          height="80%")
          div.custom-skill-preview(:style="{ 'background-image': `url(${require(`@/assets/images/${type.replace(' ', '').toLowerCase()}.svg`)})` }")
  v-row.ma-0.primary
    v-container
      h4.text-h6.text-center.font-weight-black.white--text {{ currentSkill }}
  v-container
    v-tabs-items.pa-1.mt-3(v-model="currentSkillIndex")
      v-tab-item(v-for="(type, tidx) of Object.keys(skillData)"
        :key="`skill-tab-${type}-${tidx}`")
        v-expansion-panels
          v-expansion-panel(v-for="(skill, sidx) of skillData[currentSkill]"
            :key="`${currentSkill}-${skill.name}-${sidx}`")
            v-expansion-panel-header.pt-3.pb-3.pl-4.pr-4
              v-row.pa-0.ma-0(justify="center"
                align="center")
                v-col.pa-0.ma-0(cols="2")
                  v-icon(color="primary"
                    dense) {{ skill.icon }}
                v-col.pa-0.ma-0(cols="10")
                  p.mb-1.font-weight-bold.primary--black {{ skill.name }}
                  v-rating(readonly
                    dense
                    v-model="skill.level"
                    length="10"
                    size="14px"
                    background-color="grey darken-1"
                    color="secondary")
            v-expansion-panel-content
              v-row(justify="start")
                v-chip.ma-1(v-for="(label, lidx) of skill.labels"
                  :key="`${currentSkill}-${label}-${lidx}`"
                  outlined
                  small
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
      console.log(this.skillData[types[this.currentSkillIndex]][0])
      return types[this.currentSkillIndex]
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-skill-preview {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: #FDCA40;
    mix-blend-mode: hue;
  }
}

</style>