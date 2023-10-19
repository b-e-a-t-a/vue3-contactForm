<script setup>
import HomeView from "./views/HomeView.vue"
</script>

<template>
  <v-app ref="app">
    <v-main
      class="d-flex align-center justify-center flex-wrap bg-teal-lighten-4"
      style="min-height: 100vh;"
    >
      <!-- <div class="container"> -->
      <HomeView />
      <!-- </div> -->
    </v-main>
  </v-app>
</template>

<style lang="sass">

.container
  min-height: 100vh
  margin: 0 auto
</style>
