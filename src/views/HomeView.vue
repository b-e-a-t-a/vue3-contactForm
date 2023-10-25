<template>
  <main>
    <v-container>
      <v-sheet :elevation="24" rounded>
        <transition name="form">
          <v-form data-test="form"
            class="bg-white rounded pa-3 px-md-8 py-md-13"
            validate-on="input"
            @submit.prevent="send"
          >
            <h1
              data-test="header"
              class="text-h4 text-center font-weight-bold text-secondary text-uppercase"
            >
              Contact Form
            </h1>
            <fieldset>
              <FormInput
                data-test="new-name"
                v-model="data.name"
                name="name"
                label="Name"
                placeholder="Your name"
                :minlength="minLengthName"
                :maxlength="maxLengthName"
                pattern="^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]"
                autocomplete="off"
                :rules="nameRules"
              />
              <FormInput
                data-test="new-email"
                v-model="data.email"
                name="email"
                label="Email"
                placeholder="Your email"
                type="email"
                autocomplete="off"
                :rules="emailRules"
              />
              <FormInput
                data-test="new-subject"
                v-model="data.subject"
                name="subject"
                label="Subject"
                placeholder="Subject"
                autocomplete="off"
                :maxlength="maxLengthSubject"
                :rules="subjectRules"
              />
              <FormTextarea
                data-test="new-message"
                v-model="data.message"
                name="message"
                label="Message"
                placeholder="Write your message here"
                minlength="1"
                :maxlength="maxLengthMessage"
                autocomplete="off"
                rows="5"
                :rules="messageRules"
                :errorMessage="(data.message && data.message.length > maxLengthMessage) ? `Message must be maximum ${maxLengthMessage} characters` : 'This field cannot be empty'"
                :error="invalidMessage"
                @blur="messageBlured = true"
              />
            </fieldset>

            <v-btn
              type="submit"
              variant="elevated"
              color="secondary"
              block
              size="large"
              :loading="isLoading"
              :disabled="isLoading"
            >
              <span class="text-white font-weight-bold">Send</span>
            </v-btn>
          </v-form>
        </transition>
      </v-sheet>
    </v-container>

  </main>

  <TransitionGroup name="transform-translate">
    <Toast
      id="success"
      v-if="success"
      title="Your message has been sent successfully"
      @closeToast="success = false"
    />
    <Toast
      v-if="errorThrow && errorThrow.state && !errorThrow.message"
      error
      title="Please try again"
      @closeToast="errorThrow.state = false"
    />
    <Toast
      v-if="errorThrow && errorThrow.state && errorThrow.message"
      error
      :title="`Error: ${errorThrow.message}`"
      @closeToast="errorThrow.state = false"
    />
  </TransitionGroup>
</template>

<script setup>
import FormInput from "../components/FormInput.vue";
import FormTextarea from "../components/FormTextarea.vue";
import Toast from "../components/Toast.vue";
import { ref, computed, reactive } from "vue";
import { validateName, validateEmail } from "../utils/validators.js";

const minLengthName = 5;
const maxLengthName = 50;
const maxLengthSubject = 100;
const maxLengthMessage = 500;

const data = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
});

let errorThrow = reactive({
  state: false,
  message: null
});
const success = ref(false);
const isLoading = ref(false);

const messageBlured = ref(false);

const invalidMessage = computed(() => {
  return Boolean(!data.value.message && messageBlured.value)
  || Boolean(messageBlured.value && data.value.message && data.value.message.length > maxLengthMessage)
});

const nameRules = reactive([
  v => !!v || `Required field. Name must be at least ${minLengthName} characters`,
  v => (v.length >= minLengthName) || `Invalid name. Name must be at least ${minLengthName} characters`,
  v => (v.length <= maxLengthName) || `Invalid name. Name must be maximum ${maxLengthName} characters`,
  v => validateName(v) || "Invalid name. Name can contain letters and cannot contain numbers",
]);

const emailRules = reactive([
  v => !!v || `Required field`,
  v => (v.length && validateEmail(v)) || 'Invalid email address'
]);

const messageRules = reactive([
  v => !!v || 'This field cannot be empty',
  v => (v.length <= maxLengthMessage) || `Message must be maximum ${maxLengthMessage} characters`
]); // textarea to check rules

const subjectRules = reactive([
  v => !v || (v && v.length <= maxLengthSubject) || `Subject must be maximum ${maxLengthSubject} characters`
]);


const isFormValid = computed(() => {
  const valid = data.value.name &&
    data.value.email &&
    data.value.message &&
    !invalidMessage.value
  return valid;
});

const setBlurValues = (val) => {
  messageBlured.value = val;
};

const send = () => {
  setBlurValues(true);
  if (isFormValid.value) {
    isLoading.value = true;

    fetch(`https://5d9f7fe94d823c0014dd323d.mockapi.io/api/message`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then( async (response) => {

      if (response.ok) {
        response = await response.json()
        isLoading.value = false;
        data.value = {};
        setBlurValues(false);
        success.value = true;
      } else {
        isLoading.value = false;
        errorThrow.state = true;
        errorThrow.message = response.statusText;
      }
    })
    .catch( err => {
      errorThrow.state = true;
      errorThrow.message = err;
    });
  }
};
</script>

<style lang="sass">
//.error
//  border: 1px solid $error-color
//.error-message
//  color: $error-color
//  font-size: 12px
.loader
  display: flex
  justify-content: center
.transform-translate
  &-enter-active,
  &-leave-to
    opacity: 0
    transform: translateY(100%)
</style>
