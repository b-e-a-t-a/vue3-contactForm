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
              errorMessage="This field cannot be empty"
              :error="invalidMessage"
              required
              @blur="messageBlured = true"
            />
          </fieldset>

          <button type="submit" :disabled="isLoading">
            <span v-if="isLoading" class="loader">
              <Loader />
            </span>
            <span v-else>Send</span>
          </button>
        </form>
      </transition>
    </section>
  </main>
</template>

<script setup>
import FormInput from "../components/FormInput.vue";
import FormTextarea from "../components/FormTextarea.vue";
import Loader from "../components/Loader.vue";
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
const messageBlured = ref(false);

const isLoading = ref(false);

const invalidName = computed(() => {
  return Boolean(!data.value.name && nameBlured.value)  //no value but touched
    || Boolean(nameBlured.value && !validateName(data.value.name))  //value in incorrect format
});

const invalidEmail = computed(() => {
  return Boolean(!data.value.email && emailBlured.value)
    || Boolean(emailBlured.value && !validateEmail(data.value.email))
});

const invalidMessage = computed(() => {
  return Boolean(!data.value.message && messageBlured.value)
});

const isFormValid = computed(() => {
  const valid = data.value.name &&
    data.value.message &&
    !invalidEmail.value
  return valid;
});

const send = () => {
  nameBlured.value = true;
  emailBlured.value = true;
  messageBlured.value = true;
  if (isFormValid.value) {
    isLoading.value = true;

    fetch(`https://5d9f7fe94d823c0014dd323d.mockapi.io/api`, {
      method: 'POST',
      body: JSON.stringify(data.value),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then( async (response) => {

      if (response.ok) {
        response = await response.json()
        console.log('response json', response);
        isLoading.value = false;
        data.value = {};
        nameBlured.value = false;
        emailBlured.value = false;
        messageBlured.value = false;
        // notification
      } else {
        console.log('not success', response.status, response.statusText)
        isLoading.value = false;
        // notification
        throw new Error('not success', response.statusText);
      }
    })
    .catch( error => {
      console.log('error', error);
      // notification
    });
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
.loader
  display: flex
  justify-content: center
</style>
