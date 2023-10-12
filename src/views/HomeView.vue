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
              errorMessage="Invalid name. Name cannot contain numbers and must have at least 5 characters."
              :error="invalidName"
              required
              @blur="nameBlured = true"
            />
            <FormInput
              v-model="data.email"
              name="email"
              label="Email"
              placeholder="Your email"
              type="email"
              autocomplete="off"
              errorMessage="Invalid email address"
              :error="invalidEmail"
              required
              @blur="emailBlured = true"
            />
            <FormInput
              v-model="data.subject"
              name="subject"
              label="Subject"
              placeholder="Subject"
              autocomplete="off"
              minlength="2"
              maxlength="100"
            />
            <FormTextarea
              v-model="data.message"
              name="message"
              label="Message"
              placeholder="Write your message here"
              minlength="2"
              maxlength="500"
              autocomplete="off"
              rows="5"
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
      <pre> {{ data }} </pre>
    </section>
  </main>
</template>

<script setup>
import FormInput from "../components/FormInput.vue";
import FormTextarea from "../components/FormTextarea.vue";
import { ref, computed } from "vue";
import { validateName, validateEmail } from "../utils/validators.js";

const data = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
});

const nameBlured = ref(false);
const emailBlured = ref(false);

const invalidName = computed(() => {
  return Boolean(!data.value.name && nameBlured.value)  //no value but touched
    || Boolean(nameBlured.value && !validateName(data.value.name))  //value in incorrect format
});

const invalidEmail = computed(() => {
  return Boolean(!data.value.email && emailBlured.value)
    || Boolean(emailBlured.value && !validateEmail(data.value.email))
});

const send = () => {
  nameBlured.value = true;
  emailBlured.value = true;

  try {
    console.log('data', data.value);
  } catch (error) {
    console.log("error", error);
  }
}
</script>

<style lang="sass">
@import "../assets/main.sass"
.error
  border: 1px solid $error-color
.error-message
  color: $error-color
  font-size: 12px
</style>
