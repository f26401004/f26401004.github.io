<template lang="pug">
v-app
  router-view
</template>

<script>
export default {
  name: 'App',
  components: {
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
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

#app {
  display: flex;
  justify-content: center;
  background: linear-gradient(90deg, #2176FF 0%, #2176FF 40%, #E5E5E5 40%, #E5E5E5 56%);
  color: #2c3e50;
  margin-top: 60px;
  min-width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
