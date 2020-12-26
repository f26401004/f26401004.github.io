<template lang="pug">
  
v-card.rounded-lg.mt-10.pb-5
  v-container.secondary
    v-row(justify="center")
      h3.text-h5.font-weight-black.white--text MOOCs
  v-container
    v-list(two-line)
      v-list-item.elevation-2.pa-0.custom-list-item-moocs(v-for="(mooc, index) of displayMOOCs"
        :key="`moocs-${mooc.name}-${index}`"
        :class="{ 'mt-2': index !== 0 }"
        @click="")
        v-list-item-avatar.ml-5
          v-img(contain
            :src="`${require(`@/assets/images/icons/${mooc.icon}`)}`")
        v-list-item-content.d-flex.align-center
          v-container.pa-0
            v-row(align="center" no-gutters)
              v-col(cols="8")
                v-list-item-title.text-left.text-subtitle-1 {{ mooc.name }}
                v-list-item-subtitle.text-left {{ mooc.date | transferToLocaleString }}
              v-col(cols="4")
                v-avatar(color="#8fb7f6").text-h6.white--text {{ mooc.score | truncateFloat }}
</template>

<script>
import moocsData from '@/assets/moocs.json'

export default {
  name: 'MOOCs',
  data: function () {
    return {
      moocsData
    }
  },
  mounted: function () {
    this.moocsData.sort((a, b) => {
      return b.score - a.score
    })
  },
  computed: {
    displayMOOCs: function () {
      return this.moocsData.slice(0, 5)
    }
  },
  filters: {
    transferToLocaleString: function (value) {
      const temp = new Date(value)
      return `${temp.toLocaleString('en', { month: 'short' })} ${temp.getDate()}, ${temp.getFullYear()}`
    },
    truncateFloat: function (value) {
      let temp = value.toString().split('')
      const index = temp.findIndex(target => target === '.')
      temp = temp.slice(0, index)
      return temp.join('')
    }
  }
}
</script>

<style lang="scss" scoped>

.custom-list-item {
  &-moocs {
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

</style>