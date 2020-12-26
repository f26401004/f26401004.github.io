<template lang="pug">

v-card.mt-16(:class="{ 'rounded-lg': isMobile, 'rounded-xl': !isMobile }")
  v-row.fill-height
    v-col.pt-0.pb-0(cols="12"
      md="5"
      lg="5"
      xl="5")
      v-container.fill-height.secondary(:class="{ 'rounded-t-lg': isMobile, 'rounded-l-xl': !isMobile }")
        v-row.custom-section-figure
          v-img.custom-figure(:src="require('@/assets/figure.png')")
    v-col(cols="12"
      md="7"
      lg="7"
      xl="7"
      :class="{ 'pa-8': !isMobile }")
      v-container.pl-9.pr-9
        v-row(justify="start")
          h3.font-weight-black.primary--text(:class="{ 'text-h4': isMobile, 'text-h3': !isMobile }") Chun-Hao Huang
        v-row.mt-3.custom-section-info(justify="start")
          label.font-weight-medium.primary--text(v-for="(type, index) of expertiseTypes"
            :key="`expertise-type-${type}-${index}`"
            :class="{ 'text-subtitle-2': isMobile, 'text-subtitle-1': !isMobile }") {{ type }}
      v-container.pl-6.pr-6
        v-tabs(v-model="currentTab"
          :height="isMobile ? 32 : 40"
          active-class="custom-tab-active"
          background-color="#F6F6F6"
          style="max-width: 478px !important;"
          fixed-tabs)
          v-tab.pa-0.font-weight-medium(:class="{ '.text-body-2': isMobile, '.text-h1': !isMobile }") About
          v-tab.pa-0.text-body-2.font-weight-medium Focus Area
          v-tab.pa-0.text-body-2.font-weight-medium Education
        v-tabs-items(v-model="currentTab"
          style="max-width: 478px !important;"
          :style="{ 'min-height': isMobile ? '180px' : '224px'}")
          v-tab-item
            v-card(flat)
              v-card-text.pl-0.pr-0.font-weight-light.text-left.black--text(:class="{ 'text-body-2': isMobile, 'text-body-1': !isMobile }"
                :style="{ 'line-height': isMobile ? '160%' : '200%' }") I am an experienced project leader specializing <b>software engineering</b>. Until now, I am trying to be an influencer with coding and problem-solving capabilities and apply my skills to real-world challenges.
          v-tab-item
            v-container.pl-0.pr-0
              v-list
                v-list-item.elevation-2.pa-0.custom-list-item-focus-area(v-for="(area, index) of focusAreas"
                  :key="`focus-areas-${area.name}-${index}`"
                  :dense="isMobile"
                  :class="{ 'mt-2': index !== 0 }"
                  @click="")
                  v-list-item-content
                    v-list-item-title.font-weight-bold.text-left.primary--text(:class="{ 'text-subtitle-2': isMobile, 'pl-4': isMobile, 'text-subtitle-1': !isMobile, 'pl-8': !isMobile }") {{ area.name }}
                  v-list-item-icon.pr-4
                    v-icon {{ area.icon }}
          v-tab-item
            v-container.pl-0.pr-0
              v-list(two-line)
                v-list-item.elevation-2.pa-0.d-flex.align-center.custom-list-item-edu(key="degree")
                  v-list-item-content.pa-1
                    v-row(align="center")
                      v-col.pt-0.pb-0.pr-0(cols="5")
                        label.font-weight-bold.text-body-2.primary--text BACHELOR
                      v-col.pt-0.pb-0.pl-2(cols="7")
                        p.ma-0.font-weight-medium.text-caption.text-left NCKU
                        p.ma-0.text-caption.text-left.primary--text Computer Science
                  v-btn.mr-2(icon
                    @click="isDisplayTranscript = true")
                    v-icon(color="primary") mdi-chevron-right
                  transition(name="custom-expand-transition")
                    v-container.elevation-2.pa-0.d-flex.align-center.custom-list-item-transcript.primary(v-if="isDisplayTranscript")
                      v-btn.ml-2(icon
                        @click="isDisplayTranscript = false")
                        v-icon(color="white") mdi-chevron-left
                      v-list-item-content.pr-2
                        label.font-weight-bold.text-body-1.text-right.white--text(style="line-height: 100%;") GPA: 3.98/4.30
                        label.text-caption.text-right.white--text(style="line-height: 100%;") Credit: 151/151
                      v-btn.mr-2(icon)
                        v-icon(color="white"
                          @click="downloadHandler('Bachelor_Transcript')") mdi-file
      v-container.pt-0
        v-row.pl-6.pr-6
          v-btn(color="secondary"
            depressed
            tile
            :large="isMobile"
            :x-large="!isMobile"
            :style="{ 'width': isMobile ? '100%' : 'auto'}"
            @click="downloadHandler('CV')")
            span.text-button Download CV
            v-icon.ml-2(dark) mdi-download

</template>

<script>
import b64toBlob from '@/plugins/b64toBlob.js'

export default {
  name: 'Introduction',
  data: function () {
    return {
      expertiseTypes: ['Software', 'AI', 'Network'],
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
      files: {
        'CV': require('@/assets/documents/CV_ver_2_5_compressed.pdf'),
        'Bachelor_Transcript': require('@/assets/documents/bachelor_transcript_compressed.pdf'),
      },
      isDisplayTranscript: false
    }
  },
  methods: {
    downloadHandler: function (filename) {
      // Obtain the base64 string of the file
      const file = this.files[filename].default.slice(28)
      // Transfer the file from base64 to blob
      const blob = b64toBlob(file, 'application/pdf')
      // Obtain the url from blob by createObjectURL
      const url = window.URL.createObjectURL(blob)
      // Use an a element and trigger click event
      const a = document.createElement('a')
      a.href = url
      a.download = `Chun_Hao_Huang_${filename}.pdf`
      a.click()
      // Revoke the url we created
      window.URL.revokeObjectURL(url)
    }
  }
}
</script>

<style lang="scss" scoped>


@media only screen and (max-width: 600px) {
  .custom-figure {
    position: absolute;
    top: -26px;
    left: 40px;
    width: 195px;
    height: 262px;

    /deep/ & > .v-image__image {
      background-position: center top !important;
    }
  }
}

@media only screen and (min-width: 601px) {
  .custom-figure {
    position: absolute;
    top: -34px;
    left: 62px;
    width: 380px;
  }
}


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
    height: 212px;
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

.custom-list-item {
  &-focus-area {
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 7px;
      height: 100%;
      background-color: #2176FF;
    }
  }
  &-edu {
    overflow: hidden;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      display: block;
      width: 7px;
      height: 100%;
      background-color: #2176FF;
    }
  }
}

.custom-expand-transition {
  &-enter, &-leave-to {
    transform: translateX(-100%);
  }
  &-enter-active, &-leave-active {
    position: absolute;
  }
}
.custom-list-item-transcript {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.2s transform cubic-bezier(0.83, 0, 0.17, 1);
  transform-origin: left;
}

</style>