<template>
  <div>
    <label :for="name" class="font-weight-medium">{{ label }}</label>
    <v-text-field
      :value="modelValue"
      :name="name"
      :id="name"
      class="input"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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