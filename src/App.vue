<template lang="pug">
v-app
  v-app-bar(color="transparent"
    flat
    absolute
    collapse-on-scroll
    scroll-target=".page-background-default"
    style="transition: .2s transform ease-in-out;"
    :class="{ 'custom-transition-drawer': isDisplayDrawer }")
    v-spacer
    v-app-bar-nav-icon(@click="isDisplayDrawer = true").dark--text
  v-navigation-drawer(v-model="isDisplayDrawer"
    right
    app
    temporary
    dark
    color="#333333"
    height="100vh"
    width="51vw"
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
  router-view(
    style="transition: .2s transform ease-in-out;"
    :class="{ 'custom-transition-drawer': isDisplayDrawer }")
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

</style>
