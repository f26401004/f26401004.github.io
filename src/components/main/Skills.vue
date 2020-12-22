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
    v-tabs-items.pl-5.pr-5.mt-3(v-model="currentSkillIndex")
      v-tab-item(v-for="(type, index) of Object.keys(skillData)"
        :key="`skill-tab-${type}-${index}`") {{ type }}
</template>

<script>
import skillData from '@/assets/skills.json'

export default {
  name: 'Skills',
  data: function () {
    return {
      skillData,
      currentSkillIndex: 0
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
  width: 100%;
  height: 100%;
  background-size: 65%;
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
    background-color: map-get($colors, secondary);
    mix-blend-mode: hue;
  }
}

</style>