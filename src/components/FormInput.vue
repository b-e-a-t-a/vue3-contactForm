<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input
      :value="modelValue"
      :name="name"
      :id="name"
      class="input"
      :class="{'error': error}"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <div v-if="error" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: ""
  },
  modelValue: {
    type: [String],
    default: ""
  },
  name: {
    type: String,
    default: ""
  },
  errorMessage: {
    type: [String, Boolean],
    default: ""
  },
  error: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="sass" scoped>
</style>