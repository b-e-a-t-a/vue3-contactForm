<template>
  <div
    class="toast"
    role="alert"
    :class="{ 'toast-error': error }"
  >
    <div class="toast-container">
      <h3 v-if="title">
        <i v-if="error">Your message has not been sent!</i>
        {{ title }}
      </h3>
      <section class="toast-content">
        <slot name="content" />
      </section>
      <button @click="handleToastClosed">
        <span> X </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  error: {
    type: Boolean,
    required: false
  }
});

const emit = defineEmits(["close-toast"]);

setTimeout(() => emit("close-toast"), 5000);

function handleToastClosed() {
  emit("close-toast");
}

</script>

<style lang="sass" scoped>

.toast
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background: $success-color
  padding: 2.5rem 0
  transition: all .3s
  z-index: 10
  &-container
    display: flex
    justify-content: space-between
    align-items: center
    h3
      padding-left: 1rem
      font-weight: 600
      margin: 1rem auto
  span
    color: black
    font-size: 1.5rem
  button
    border: none
    position: absolute
    top: .8rem
    right: .8rem
    cursor: pointer
    &:active, &:hover
      border: none
      span
        color: grey

  &-error
    background-color: $warning-color
    color: black
    span
      color: black
      font-size: 1.5rem
    button
      &:active, &:hover
        span
          color: grey
</style>