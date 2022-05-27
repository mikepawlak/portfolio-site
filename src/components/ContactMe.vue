<template>
  <div class="flex justify-center" id="contact">
    <div class="long-card card shadow-lg p-5 sm:p-10">
      <h2 class="text-2xl font-bold mb-6 -ml-3">Get In Touch</h2>
      <div
        class="contact-block block p-6 rounded-lg shadow-lg sm:w-full mr-2 mb-10"
      >
        <div class="mt-10 sm:mt-0">
          <form
            method="POST"
            action="/contact"
            @submit.prevent="onSubmit"
            @keydown="errors.clear($event.target.name)"
            v-if="!submitted"
          >
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-700"
                  >Name</label
                >
                <input
                  v-model="name"
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="name"
                  required
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label
                  for="last-name"
                  class="block text-sm font-medium text-gray-700"
                  >Company Name</label
                >
                <input
                  v-model="company"
                  type="text"
                  name="company"
                  id="company"
                  autocomplete="company"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-6 sm:col-span-4">
                <label
                  for="email-address"
                  class="block text-sm font-medium text-gray-700"
                  >Email address</label
                >
                <input
                  v-model="email"
                  type="text"
                  name="email-address"
                  id="email-address"
                  required
                  autocomplete="email"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="col-span-6">
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700"
                  >Message</label
                >
                <textarea
                  v-model="message"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="message"
                  required
                  rows="3"
                  placeholder="Your message"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-end pt-5">
              <button
                type="submit"
                :disabled="errors.any()"
                class="inline-flex btn-accent justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Send
              </button>
            </div>
            <p class="italic text-red-700" v-if="errors.get('internal')">
              Something went wrong, please reload the page and try again or just
              email me at
              <a href="mailto:mpawlak719@gmail.com">mpawlak719@gmail.com</a>.
            </p>
          </form>
          <div v-if="submitted">
            <h2 class="font-bold">Thank you for your interest</h2>
            <p class="italic">
              I will be contacting you shortly to follow up on your message.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

class Errors {
  constructor() {
    this.errors = {};
  }

  get(field) {
    if (this.errors[field]) {
      return this.errors[field].msg;
    }
  }
  any() {
    return Object.keys(this.errors).length > 0 ? true : false;
  }
  load(err) {
    this.errors = err;
  }
  clear(field) {
    delete this.errors[field];
  }
}

export default {
  name: "ContactMe",
  data() {
    return {
      name: "",
      company: "",
      email: "",
      subject: "",
      message: "",
      errors: new Errors(),
      submitted: false,
    };
  },
  methods: {
    onSubmit() {
      console.log("submitting here");
      axios
        .post("http://localhost:8000/contact", this.$data)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.submitted = true;
        })
        .catch((err) => {
          this.errors.load(err.response.data.errors);
        });
    },
  },
};
</script>

<style scoped>
.contact-block {
  background: #cddbe9;
  color: #2c272b;
}
</style>
