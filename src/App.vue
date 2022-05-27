<template>
  <AppJumbotron />
  <WorkHistory />
  <EducationHistory />
  <OtherExperience />
  <ContactMe />
  <AppFooter />
</template>

<script>
import AppJumbotron from "./components/AppJumbotron.vue";
import WorkHistory from "./components/WorkHistory.vue";
import EducationHistory from "./components/EducationHistory.vue";
import OtherExperience from "./components/OtherExperience.vue";
import ContactMe from "./components/ContactMe.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppJumbotron,
    WorkHistory,
    EducationHistory,
    OtherExperience,
    ContactMe,
    AppFooter,
  },
};
</script>

<style>
.card {
  color: #cddbe9;
  background: #1a2453;
  margin: 35px 0px 0px 0px;
  min-width: 800px;
  z-index: 2;
}

.color-primary {
  background: #1a2453;
}
.color-accent {
  background: #3ca5be;
}

.long-card {
  max-width: 1100px;
}

.btn-accent {
  background: #3ca5be !important;
}

.btn-accent:hover {
  background: #3693ab !important;
}

.btn-white {
  background: #cddbe9;
  color: #1a2453;
}

.btn-white:hover {
  background: #b8cce0;
}

@media screen and (max-width: 640px) {
  .card {
    width: 100%;
    min-width: 0px;
  }
}
</style>
