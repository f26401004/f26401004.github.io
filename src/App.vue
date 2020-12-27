<template lang="pug">
v-app
  v-app-bar(color="transparent"
    flat
    absolute
    style="transition: .2s transform ease-in-out;"
    :class="{ 'custom-transition-drawer': isMobile && isDisplayDrawer }")
    v-container.d-flex.mt-8
      div.d-flex.align-center
        v-img.mr-4(:max-width="isMobile ? '20%' : '32px'" contain :src="require('@/assets/logo.svg')")
        label.font-weight-black.text-left.text-uppercase.white--text(style="line-height: 100%;"
          :style="{ 'width': isMobile ? '70%' : '200px' }"
          :class="{ 'text-h6': isMobile, 'text-body-1': !isMobile }") Jack Huang
      v-spacer
      v-container.d-flex.justify-end(v-if="!isMobile")
        v-btn.ma-2(text
          tile
          large
          color="primary"
          :class="{ 'custom-button-active': currentRouteIndex === 0 }")
          span(:class="{ 'black--text': currentRouteIndex !== 0 }") Home
        v-btn.ma-2(text
          tile
          large
          color="primary"
          :class="{ 'custom-button-active': currentRouteIndex === 1 }")
          span(:class="{ 'black--text': currentRouteIndex !== 1 }") Experiences
        v-btn.ma-2(text
          tile
          large
          color="primary"
          :class="{ 'custom-button-active': currentRouteIndex === 2 }")
          span(:class="{ 'black--text': currentRouteIndex !== 2 }") Projects
        v-btn.ma-2(text
          tile
          large
          color="primary"
          :class="{ 'custom-button-active': currentRouteIndex === 3 }")
          span(:class="{ 'black--text': currentRouteIndex !== 3 }") MOOCs
        v-btn.ma-2(text
          tile
          large
          color="primary"
          :class="{ 'custom-button-active': currentRouteIndex === 4 }")
          span(:class="{ 'black--text': currentRouteIndex !== 4 }") Contact
      v-app-bar-nav-icon(v-else
        @click="isDisplayDrawer = true").dark--text
  v-navigation-drawer(v-if="isMobile"
    v-model="isDisplayDrawer"
    right
    app
    temporary
    dark
    color="#333333"
    height="100vh"
    width="50vw"
    overlay-opacity="0")
    v-list(flat
      rounded
      dense)
      v-list-item(active-class="custom-list-item-active-menu" to="/")
        v-list-item-content.font-weight-medium.text-center
          span Home
      v-list-item(active-class="custom-list-item-active-menu" to="/experiences")
        v-list-item-content.font-weight-medium.text-center
          span Experiences
      v-list-item(active-class="custom-list-item-active-menu" to="/projects")
        v-list-item-content.font-weight-medium.text-center
          span Projects
      v-list-item(active-class="custom-list-item-active-menu" to="/moocs")
        v-list-item-content.font-weight-medium.text-center
          span MOOCs
      v-list-item(active-class="custom-list-item-active-menu" to="/contact")
        v-list-item-content.font-weight-medium.text-center
          span Contact
  v-main
    router-view(
      style="transition: .2s transform ease-in-out;"
      :class="{ 'custom-transition-drawer': isMobile && isDisplayDrawer, 'pt-8': isMobile }")
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: function () {
    return {
      isDisplayDrawer: false
    }
  },
  computed: {
    currentRouteIndex: function () {
      switch(this.$route.path) {
        case '/':
          return 0
        case '/experiences':
          return 1
        case '/projects':
          return 2
        case '/moocs':
          return 3
        case '/contact':
          return 4
        default:
          return 0
      }
    }
  }
}
</script>

<style lang="scss">

body {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 100vw;
}

#app {
  display: flex;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 100vw;
  margin: 0;
  padding: 0;
}

.custom-transition-drawer {
  transform: translateX(-50vw) !important;
}

.custom-list-item-active-menu {
  background-color: #2176FF;
  color: white;
  transition: .2s background-color ease-in-out,
    .2s color ease-in-out;
}


.page-background-default {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: linear-gradient(90deg, #2176FF 0%, #2176FF 45%, #E5E5E5 45%, #E5E5E5 100%);
}


@media (min-width: 960px) {
  .container {
    max-width: 1280px !important;
  }
  .page-background-default {
    background: linear-gradient(90deg, #2176FF 0%, #2176FF 33%, rgba(102, 102, 102, 0.06) 33%, rgba(102, 102, 102, 0.06) 100%) !important;
  }
}


.VueCarousel-dot-container {
  margin-top: 0 !important;
  & > button {
    margin-top: 12px !important;
  }
}

.custom-button-active {
  &::after {
    transition: .2s all ease-in-out;
    position: absolute;
    top: calc(100% - 6px);
    left: 30%;
    content: "";
    width: 40%;
    height: 6px;
    background: #2176FF;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
}
</style>
