<template>
  <div class="scroll-text text-center w-full pt-10 pb-5">
    <a href="#" @click="scrollToTop()"
      >scroll to top <span class="animated-arrow">^</span></a
    >
  </div>
  <footer class="text-center footer-primary">
    <ContactLinks />
    <div class="text-center p-4 footer-secondary">
      2022: Designed and built by
      <a class="text-whitehite" href="https://github.com/mikepawlak/github.io"
        >me</a
      >
    </div>
  </footer>
</template>

<script>
import ContactLinks from "./shared/ContactLinks.vue";
export default {
  name: "AppFooter",
  components: { ContactLinks },
  mounted() {
    const inViewport = (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    };

    const Obs = new IntersectionObserver(inViewport);
    const obsOptions = {};

    // Attach observer to every [data-inviewport] element:
    const ELs_inViewport = document.querySelectorAll(".animated-arrow");
    ELs_inViewport.forEach((EL) => {
      Obs.observe(EL, obsOptions);
    });
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.footer-primary {
  background: #3ca5be;
  color: #f3f3f3;
  z-index: 2;
}
.footer-secondary {
  background: #3693ab;
  color: #f3f3f3;
}

.scroll-text {
  color: #f3f3f3;
  /* stop touch to search on mobile */
  user-select: none; /* standard */
  -moz-user-select: none; /* firefox specific */
  -webkit-user-select: none; /* Chrome, Opera and Safari*/
  -ms-user-select: none; /* IE, ms-edge */
}

.animated-arrow {
  vertical-align: middle;
  display: inline-block;
}

.animated-arrow.visible,
.animated-arrow:hover {
  -webkit-animation-name: wiggle;
  -ms-animation-name: wiggle;
  -ms-animation-duration: 1500ms;
  -webkit-animation-duration: 1500ms;
  -webkit-animation-iteration-count: 1;
  -ms-animation-iteration-count: 1;
  -webkit-animation-timing-function: ease-in-out;
  -ms-animation-timing-function: ease-in-out;
}

@-webkit-keyframes wiggle {
  0% {
    -webkit-transform: translateY(4px);
  }
  25% {
    -webkit-transform: translateY(-4px);
  }
  50% {
    -webkit-transform: translateY(4px);
  }
  75% {
    -webkit-transform: translateY(-4px);
  }
  100% {
    -webkit-transform: translateY(0px);
  }
}

@-ms-keyframes wiggle {
  0% {
    -ms-transform: translateY(4px);
  }
  25% {
    -ms-transform: translateY(-4px);
  }
  50% {
    -ms-transform: translateY(4px);
  }
  75% {
    -ms-transform: translateY(-4px);
  }
  100% {
    -ms-transform: translateY(0px);
  }
}

@keyframes wiggle {
  0% {
    transform: translateY(4px);
  }
  25% {
    transform: translateY(-4px);
  }
  50% {
    transform: translateY(4px);
  }
  75% {
    transform: rotate(-4px);
  }
  100% {
    transform: (0px);
  }
}
</style>
