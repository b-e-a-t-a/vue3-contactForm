<template>
  <div class="form-input">
    <label :for="name">{{ label }}</label>
    <input
      :value="modelValue"
      :name="name"
      :id="name"
      class="input"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    >
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
  }
})
</script>

<style lang="sass" scoped>
</style>