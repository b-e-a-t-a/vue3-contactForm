<template>
  <header>
    <h1>Contact Form App</h1>
  </header>
  <main>
    <div class="wrapper">
      <section class="form">
        FORM
        <transition name="form">
          <form prevent.default="submit">
            <FormInput
              v-model="data.name"
              label="Name"
              placeholder="Your name"
            />

            <FormInput
              v-model="data.email"
              label="Email"
              placeholder="Your email"
            />

            <FormInput
              v-model="data.subject"
              label="Subject"
              placeholder="Subject"
            />

            <FormInput
              v-model="data.message"
              label="Message"
              placeholder="Write your message here"
            />

            <button type="submit">
              <span>Submit</span>
            </button>
          </form>
        </transition>
      </section>

      <section>
        SUMMARY
        <pre> data </pre>
      </section>
    </div>
  </main>
</template>

<script setup>
import FormInput from "../components/FormInput.vue";
import { ref } from "vue";

const data = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
});

</script>

<style lang="sass">
.wrapper
  min-height: 100vh
  padding: 0 20px
  display: flex
  flex-direction: column
  flex: 1
  position: relative

h1
  text-transform: uppercase
  text-align: center

@media (min-width: 1024px)
  .wrapper
    min-height: 100vh
    display: flex
    place-items: flex-start
    flex-wrap: wrap
</style>
