<template lang="pug">
v-app
  v-app-bar(
    absolute
    style="transition: .2s all ease-in-out; z-index: 1000;"
    :elevation="isScroll ? 2 : 0"
    :class="{ 'custom-transition-drawer': isMobile && isDisplayDrawer }"
    :color="isScroll ? 'primary': 'transparent'")
    v-container.d-flex
      div.d-flex.align-center(style="z-index: 1010;")
        v-img.mr-4(:max-width="isMobile ? '15%' : '32px'" contain
          :src="require('@/assets/logo.svg')")
        label.font-weight-black.text-left.text-uppercase.white--text(style="line-height: 100%;"
          :style="{ 'width': isMobile ? '60%' : '200px' }"
          :class="{ 'text-subtitle-1': isMobile, 'text-h6': !isMobile }") Jack Huang
      v-spacer
      v-container.d-flex.justify-end(v-if="!isMobile")
        v-btn.ma-2(text
          rounded
          large
          link
          to="/"
          :color="isScroll ? 'white' : 'primary'")
          span(:class="{ 'black--text': currentRouteIndex !== 0 }") Home
        v-btn.ma-2(text
          rounded
          large
          link
          to="/experiences"
          :color="isScroll ? 'white' : 'primary'")
          span(:class="{ 'black--text': currentRouteIndex !== 1 }") Experiences
        v-btn.ma-2(text
          rounded
          large
          link
          to="/projects"
          :color="isScroll ? 'white' : 'primary'")
          span(:class="{ 'black--text': currentRouteIndex !== 2 }") Projects
        v-btn.ma-2(text
          rounded
          large
          link
          to="/moocs"
          :color="isScroll ? 'white' : 'primary'")
          span(:class="{ 'black--text': currentRouteIndex !== 3 }") MOOCs
        v-btn.ma-2(text
          rounded
          large
          link
          to="/contact"
          :color="isScroll ? 'white' : 'primary'")
          span(:class="{ 'black--text': currentRouteIndex !== 4 }") Contact
      v-app-bar-nav-icon(v-else
        :class="{ 'dark--text': !isScroll, 'white--text': isScroll }"
        @click="isDisplayDrawer = true")
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
    div(style="max-height: 100vh;"
      v-scrollbar="{ damping: 0.2 }"
      ref="scrollbar")
      vue-page-transition(name="overlay-left-full")
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
      isDisplayDrawer: false,
      diffHeight: 0
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
    },
    isScroll: function () {
      return this.diffHeight > 0
    }
  },
  watch: {
    $route: function () {
      // Scroll to top when route changes
      setTimeout(() => {
        this.$refs.scrollbar.$scrollbar.scrollTop = 0
      }, 300)
    }
  },
  mounted: function () {
    this.$refs.scrollbar.addEventListener('scroll', this.scrollYEvent)
  },
  methods: {
    scrollYEvent: function () {
      this.diffHeight = this.$refs.scrollbar.$scrollbar.scrollTop
    }
  },
  destroyed: function () {
    this.$refs.scrollbar.removeEventListener('scroll', this.scrollYEvent)
  }
}
</script>

<style lang="scss">

html {
  overflow-y: hidden !important;
}
body {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
}

#app {
  display: flex;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
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

// .custom-button-active {
//   &::after {
//     transition: .2s all ease-in-out;
//     position: absolute;
//     top: calc(100% - 6px);
//     left: 30%;
//     content: "";
//     width: 40%;
//     height: 6px;
//     background: #2176FF;
//     border-top-left-radius: 6px;
//     border-top-right-radius: 6px;
//   }
// }

.ps__rail-x,
.ps__rail-y {
  z-index: 9998;
}

.overlay-top, .overlay-bottom, .overlay-left, .overlay-right {
  background: url("./assets//logo.svg"), #2176FF !important;
  background-position: 50% 50% !important;
  background-size: 18vh, cover !important;
  background-repeat: no-repeat !important;
  z-index: 9999;
}
.overlay-top,
.overlay-left,
.overlay-bottom,
.overlay-right {
  transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1) !important;
}


.v-item-group .v-slide-group__content {
  width: 100% !important;
}

</style>
