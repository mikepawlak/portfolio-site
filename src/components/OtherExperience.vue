<template>
  <div class="flex justify-center">
    <div class="long-card card shadow-lg p-5 sm:p-10">
      <h2 class="text-2xl font-bold mb-6 -ml-3">Volunteer Experience</h2>
      <div
        class="exp-block block p-6 rounded-lg shadow-lg sm:w-full mr-2 mb-10"
      >
        <div class="flex justify-between mb-4">
          <h3 class="text-xl">Computer Science Teaching Assistant - TEALS</h3>
          <em>Jun 2019 - Dec 2019</em>
        </div>
        <div>
          Supported Appleton West High School's Intro to Computer Science course
          approximately one to two times per week by working with students on
          assignments. Also worked with a team to provide resources to students
          and supported teaching staff with lessons.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherExperience",
};
</script>

<style scoped>
.exp-block {
  background: #cddbe9;
  color: #2c272b;
}
.exp-block h3 {
  color: #1a2453;
  font-weight: bold;
}
</style>
