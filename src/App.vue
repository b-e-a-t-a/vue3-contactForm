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
  background-color: $primary-light-color
  width: 100%
  padding: 10px 40px
  max-width: 1024px
  margin: 0 auto

</style>
