<script setup>
import HomeView from "./views/HomeView.vue"
</script>

<template>
  <div class="container">
    <HomeView />
  </div>
</template>

<style lang="sass">
@import './assets/main.sass'

.container
  min-height: 100vh
  margin: 0 auto
  display: flex
  align-items: center
  justify-content: center
  flex-wrap: wrap
  background-color: $color-winterling
  //width: 100%
  //max-width: 1024px
@media (min-width: 1024px)

</style>
