<template lang="pug">
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
  background: linear-gradient(90deg, map-get($colors, primary) 0%, map-get($colors, primary) 40%, map-get($colors, bg) 40%, map-get($colors, bg) 56%);
  color: #2c3e50;
  margin-top: 60px;
  min-width: 100vw;
  min-height: 100vh;
}

#app {
  display: flex;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
}
</style>
