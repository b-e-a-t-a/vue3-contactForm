<template>
  <main>
    <section>
      <transition name="form">
        <form @submit.prevent="send">
          <h1>Contact Form</h1>
          <fieldset>
            <FormInput
              v-model="data.name"
              name="name"
              label="Name"
              placeholder="Your name"
              minlength="5"
              maxlength="50"
              pattern="^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]"
              autocomplete="off"
              required
            />
            <FormInput
              v-model="data.email"
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
              autocomplete="off"
              required
            />
            <FormInput
              v-model="data.subject"
              name="subject"
              label="Subject"
              placeholder="Subject"
              autocomplete="off"
              maxlength="100"
            />
            <FormInput
              v-model="data.message"
              name="message"
              label="Message"
              placeholder="Write your message here"
              type="textarea"
              maxlength="500"
              required
            />
          </fieldset>

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

</style>
