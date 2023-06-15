<template>
  <div class="flex justify-center">
    <div class="long-card card shadow-lg p-5 sm:p-10">
      <h2 class="text-2xl font-bold mb-6 -ml-3">Work Experience</h2>

      <ol class="border-l-2 accent-border">
        <WorkHistoryItem
          v-for="workItem in workItems"
          :key="workItem"
          :work-item="workItem"
        />
      </ol>
    </div>
  </div>
</template>

<script>
import WorkHistoryItem from "./workHistory/WorkHistoryItem.vue";

export default {
  name: "WorkHistory",
  components: { WorkHistoryItem },
  data() {
    return {
      workItems: [
        {
          company: "Measurabl",
          time: "Aug 2022 - July 2023",
          technologyUsed: [
            "Java Spring",
            "Rails",
            "AWS",
            "Github Actions",
            "Jenkins",
          ],
          roles: [
            {
              title: "Software Engineer",
              time: "",
              highlights: [
                "Created automated process for updating and deploying customer facing documentation.",
                "Developed process for automated api performance, and E2E testing.",
              ],
              responsibilities:
                "Develop and maintain customer facing data api as part of a 4 developer team. Originally focused on Java Spring service but later moved into developing in both Java and Rails, as well as helping maintain automated deployment, testing, and monitoring services.",
            },
          ],
        },
        {
          company: "Entegral",
          time: "Jan 2020 - Aug 2022",
          technologyUsed: [
            "Java",
            "Java Spring",
            "Angular",
            "NestJS",
            "GCP",
            "Kubernetes",
            "Helm",
            "Rabbitmq",
          ],
          roles: [
            {
              title: "Software Engineer",
              time: "",
              highlights: [
                "Made several changes to Jenkins Pipelines to automate maintenance steps and alerting used across the enterprise.",
                "Transitioned several apis to Kubernetes on GCP, including configuring Helm deployments, Jenkins Pipeline builds, and GCP namespace and ingress configurations. ",
              ],
              responsibilities:
                "Develop and maintain various apis, jobs, and workflows hosted on GCP.",
            },
          ],
        },
        {
          company: "Fleet Farm",
          time: "Oct 2018 - Jan 2020",
          technologyUsed: [
            "JavaEE",
            "Java Spring",
            "Hibernate",
            "Oracle SQL",
            "Angular",
            "Sass",
            "NodeJS",
          ],
          roles: [
            {
              title: "Development Lead",
              time: "Jul 2019 - Jan 2020",
              highlights: [
                "Led transition of multiple teams to agile workflows",
                "Led the development of Fleet Farm's first mobile application through entire SDLC, leading to significant improvements in back-of-house inventory management.",
              ],
              responsibilities:
                "Act as technical lead on all enterprise web projects for Fleet Farm. Lead an 8 person agile team through all steps of the SDLC.",
            },
            {
              title: "Software Engineer",
              time: "Oct 2018 - Jul 2019",
              highlights: [
                "Acted as lead developer in several projects, including migrations of legacy code, new development, and uplifting projects",
                "Developed and implemented documentation process improvement including outage handling process",
              ],
              responsibilities:
                "Maintain existing, and develop new internal web based applications primarily with an employee facing focus. Work with product owners, QA, and other engineers to steer projects through SDLC.",
            },
          ],
        },
        {
          company: "Dealersocket",
          time: "Dec 2017 - Oct 2018",
          technologyUsed: ["PHP", "JavaScript", "HTML/CSS", "MySQL"],
          roles: [
            {
              title: "Senior Website Support Developer",
              time: "",
              highlights: [
                "Created best practices and documentation utilized by entire website support staff",
                "Built API hooks for third-party plugins currently used across website footprint.",
                "Guided high priority clients through website redesign, utilizing both technical aptitude and effective communication",
              ],
              responsibilities:
                "Maintained websites for existing customers, built out newly requested features, integrated third party plugins, and guided clients through redesigns. Lead project teams with as many as 5 employees to implement changes across several websites.",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.accent-border {
  --tw-border-opacity: 1;
  border-color: #3ca5be;
}
</style>
