<template>
  <div class="flex justify-center">
    <div class="long-card card shadow-lg p-5 sm:p-10">
      <h2 class="text-2xl font-bold mb-6 -ml-3">Education</h2>
      <div
        class="edu-block block p-6 rounded-lg shadow-lg sm:w-full mr-2 mb-10"
      >
        <div class="flex justify-between mb-4">
          <h3 class="text-xl">University of Wisconsin Oshkosh</h3>
        </div>
        <div>
          <p>
            <b>Bachelor's of Science, Political Science</b>, <em>2011- 2017</em>
          </p>
          <p class="mb-5">
            Emphasized the study of digital communications in campaign politics
          </p>
          <ul>
            <li class="highlight-list-item">
              Senior seminar included analysis of political campaign website UX
              meta-study
            </li>
            <li class="highlight-list-item">
              Worked with International Politics professor in independent study
              and built tool to scrape text of 103 national constitutions from
              the internet and generate CSV files for textual analysis. Also
              participated in analysis using R and SPSS.
            </li>
            <li class="highlight-list-item">
              Courses completed include OOP, Design Patterns, and Java.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EducationHistory",
};
</script>

<style scoped>
.edu-block {
  background: #cddbe9;
  color: #2c272b;
}

.edu-block h3 {
  color: #1a2453;
  font-weight: bold;
}

.highlight-list-item {
  list-style: inside;
}
</style>
