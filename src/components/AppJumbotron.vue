<template>
  <div class="flex justify-center">
    <div class="main card shadow-lg p-5 sm:p-10">
      <div class="main-wrapper">
        <p>Hello, my name is</p>
        <h1 class="text-8xl sm:text-9xl">&#60;Mike&#47;&#62;</h1>
        <p class="float-right">and I solve problems with code.</p>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <div class="sub card shadow-lg p-5 sm:p-10">
      <p>
        I am currently a <strong>Software Engineer</strong> in
        <strong>Madison, WI</strong>
      </p>
      <div
        class="mt-8 flex lg:mt-0 lg:flex-shrink-0 justify-center pt-5 sm:flex-row flex-col"
      >
        <div class="inline-flex rounded-md shadow btn btn-accent sm:w-1/2">
          <a
            href="/MikePawlak-Resume.pdf"
            download="MikePawlak-Resume"
            class="btn-link inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md"
          >
            Download Resume
          </a>
        </div>
        <div
          class="sm:ml-3 sm:mt-0 mt-3 inline-flex rounded-md shadow btn btn-white sm:w-1/2"
        >
          <a
            href="#contact"
            class="btn-link inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md"
          >
            Get In Touch
          </a>
        </div>
      </div>
      <ContactLinks />
    </div>
  </div>
</template>

<script>
import ContactLinks from "./shared/ContactLinks";
export default {
  name: "AppJumbotron",
  components: { ContactLinks },
};
</script>

<style scoped>
.main .main-wrapper {
  max-width: 600px;
  margin: 0px auto;
}
.main > h1 {
  margin-bottom: 0.2em;
  color: #f3f3f3;
}

.sub .btn-accent {
  background: #3ca5be;
}

.sub .btn-accent:hover {
  background: #3693ab;
}

.sub .btn-white {
  background: #cddbe9;
  color: #1a2453;
}

.sub .btn-white:hover {
  background: #b8cce0;
}

.sub {
  text-align: center;
}

.btn-link {
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 640px) {
  .btn {
    width: 100%;
  }
}
</style>
