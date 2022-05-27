<template>
  <li>
    <div class="md:flex flex-start">
      <div
        class="color-accent w-6 h-6 flex items-center justify-center rounded-full -ml-3"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          class="text-white w-3 h-3"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M18 4.5h-4v-2l-2-2H8l-2 2v2H2c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-11c0-1.1-.9-2-2-2Zm-6 0H8v-2h4v2Z"
          ></path>
        </svg>
      </div>
      <div
        class="work-block block p-6 rounded-lg shadow-lg sm:w-full ml-6 mr-2 mb-10"
      >
        <div class="flex justify-between mb-4">
          <h3 class="text-xl">{{ workItem.company }}</h3>
          <em v-if="workItem.time != ''">{{ workItem.time }}</em>
        </div>
        <div class="mb-5">
          <span v-for="(tech, index) in workItem.technologyUsed" :key="tech">
            {{ tech }}
            <span v-if="index != workItem.technologyUsed.length - 1">, </span>
          </span>
        </div>
        <ul>
          <li v-for="role in workItem.roles" :key="role">
            <div class="display-inline">
              <h4 class="font-bold text-l">{{ role.title }}</h4>
              <em class="ml-5" v-if="role.time != ''">{{ role.time }}</em>
            </div>
            <p v-if="role.highlights.length != 0" class="font-semibold ml-5">
              Highlights
            </p>
            <ul class="ml-5" v-if="role.highlights.length != 0">
              <li
                class="highlight-list-item"
                v-for="hg in role.highlights"
                :key="hg"
              >
                {{ hg }}
              </li>
            </ul>
            <p class="font-semibold ml-5">Responsibilities</p>
            <p class="ml-5">{{ role.responsibilities }}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "WorkHistoryItem",
  props: ["workItem"],
};
</script>

<style scoped>
.work-block {
  background: #cddbe9;
  color: #2c272b;
}
.work-block h3 {
  color: #1a2453;
  font-weight: bold;
}
.highlight-list-item {
  list-style: inside;
}
</style>
