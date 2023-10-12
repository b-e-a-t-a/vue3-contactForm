<template>
  <div class="loader"></div>
</template>

<style lang="sass" scoped>
@import "../assets/main.sass"

.loader
  border: 4px solid darken($color-winterling-superdark, 80%)
  border-radius: 50%
  border-right: 4px solid darken($placeholder-color, 30%)
  width: 18px
  height: 18px
  -webkit-animation: spin 3s linear infinite
  animation: spin 3s linear infinite

  @-webkit-keyframes spin
    0%
      -webkit-transform: rotate(0deg)
    100%
      -webkit-transform: rotate(360deg)

  @keyframes spin
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>