<template lang="pug">

v-card.rounded-lg.mt-16.pb-5
  v-row.ma-0.secondary.custom-section-figure
    img.custom-figure(:src="require('@/assets/figure.png')")
  v-container.pl-8.pr-8.mt-3
    v-row
      h3.text-h4.text-left.font-weight-black.primary--text Chun-Hao Huang
    v-row.mt-3.custom-section-info
      label.text-subtitle-2.primary--text(v-for="(type, index) of expertiseTypes"
        :key="`expertise-type-${type}-${index}`") {{ type }}
  v-tabs.pl-5.pr-5.mt-3(v-model="currentTab"
    height="32"
    active-class="custom-tab-active"
    background-color="#F6F6F6"
    fixed-tabs)
    v-tab.pa-0.text-body-2.font-weight-medium About
    v-tab.pa-0.text-body-2.font-weight-medium Focus Area
    v-tab.pa-0.text-body-2.font-weight-medium Education
  v-tabs-items.pl-5.pr-5.mt-3.custom-items-tabs(v-model="currentTab")
    v-tab-item
      v-card(flat)
        v-card-text.text-left.text-body-2 I am an experienced project leader specializing <b>software engineering</b>. Until now, I am trying to be an influencer with coding and problem-solving capabilities and apply my skills to real-world challenges.
    v-tab-item
      v-list
        v-list-item.elevation-2.pa-0.custom-list-item-focus-area(v-for="(area, index) of focusAreas"
          :key="`focus-areas-${area.name}-${index}`"
          dense
          :class="{ 'mt-2': index !== 0 }")
          v-list-item-content
            v-list-item-title.pl-2.text-left.primary--text {{ area.name }}
          v-list-item-icon.pr-4
            v-icon {{ area.icon }}
    v-tab-item
      v-list
        v-list-item.elevation-2.pa-0.d-flex.align-center.custom-list-item-edu(dense)
          v-list-item-content.pa-0
            v-row(align="center")
              v-col.pt-0.pb-0.pr-0(cols="5")
                label.font-weight-bold.text-body-2.primary--text BACHELOR
              v-col.pt-0.pb-0.pl-2(cols="7")
                p.ma-0.font-weight-medium.text-caption.text-left NCKU
                p.ma-0.font-weight-medium.text-caption.text-left.primary--text Computer Science
          v-btn.mr-2(icon)
            v-icon(color="primary") mdi-arrow-right
  v-row.pl-8.pr-8.mt-3
    v-btn(color="secondary"
      depressed
      style="width: 100%;"
      @click="downloadHandler")
      span Download CV
      v-icon(dark) mdi-download

</template>

<script>
export default {
  name: 'introduction',
  data: function () {
    return {
      expertiseTypes: ['Software', 'Network', 'AI'],
      focusAreas: [{
        name: 'Software Engineering',
        icon: 'mdi-monitor-cellphone'
      }, {
        name: 'Artificial Intelligence',
        icon: 'mdi-head-lightbulb'
      }, {
        name: 'Network Engineering',
        icon: 'mdi-router-network'
      }],
      currentTab: '',
      CVFile: require('@/assets/documents/CV_ver_2_5_compressed.pdf')
    }
  },
  methods: {
    downloadHandler: function () {
      // Obtain the url from blob by createObjectURL
      console.log(this.CVFile.default)
      const url = window.URL.createObjectURL(this.CVFile.default)
      // Use an a element and trigger click event
      const a = document.createElement('a')
      a.href = url
      a.download = 'Chun_Hao_Huang_CV.pdf'
      a.click()
      // Revoke the url we created
      window.URL.revokeObjectURL(url)
    }
  }
}
</script>

<style lang="scss" scoped>

.v-tab {
  text-transform: none !important;
}

.custom-tab-active {
  background-color: #2176FF;
  color: white;
  transition: .2s background-color ease-in-out,
    .2s color ease-in-out;
}
.custom-section {
  &-figure {
    width: 100%;
    height: 234px;
  }
  &-info {
    display: flex;
    align-items: center;
    &::before {
      content: "";
      display: block;
      width: 30px;
      height: 7px;
      background-color: #2176FF;
      margin-right: 8px;
    }

    label + label::before {
      content: '|';
      margin: 0 4px;
    }
  }

}
.custom-figure {
  position: absolute;
  top: -28px;
  left: 40px;
  width: 195px;
}

.custom-list-item {
  &-focus-area {
    &::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 40px;
      background-color: #2176FF;
    }
  }
  &-edu {
    &::before {
      content: "";
      display: inline-block;
      width: 7px;
      height: 52px;
      background-color: #2176FF;
    }
  }
}

.custom-items-tabs {
  height: 152px;
  overflow-y: auto;
}
</style>