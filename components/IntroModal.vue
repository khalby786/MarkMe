<template>
  <modal
    name="intro"
    :adaptive="true"
    :classes="'modal'"
    width="100%"
    height="100%"
    :styles="'background-color: var(--background-dark);border-radius: 0px;'"
    :transition="'fade'"
    :overlayTransition="''"
    :focusTrap="true"
    @before-close="beforeClose"
  >
    <div class="modal-content">
      <h1 class="title">#markme</h1>
      <p class="description">
        A simple, lightweight and beautiful Markdown editor and viewer.
      </p>
      <button class="links" @click="$store.commit('initTrue')">
        Get Started</button
      >&nbsp;
      <NuxtLink to="/about"><button class="links">About</button></NuxtLink>
      <div class="modal-links">
        <a href="https://github.com/khalby786/markme">github</a> ~
        <a href="https://khaleelgibran.com">khaleel gibran</a>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  methods: {
    beforeClose: function() {
      this.$store.commit("initTrue");
    }
  },
  mounted() {
    if (this.$store.state.isIntroModalShown === true) {
      this.$modal.show("intro");
      this.$store.commit("initFalse");
    } else {
      this.$modal.hide("intro");
      this.$store.commit("initTrue");
    }
  },
  computed: {
    isInit() {
      return this.$store.state.isInit;
    },
  },
  watch: {
    isInit: function (newValue, oldValue) {
      console.log("isInit changed!");
      if (newValue === true) {
        this.$modal.hide("intro");
      } else {
        this.$modal.show("intro");
      }
    },
  },
};
</script>

<style scoped>
/* modal stuff */

.title {
  font-family: "Fira Code", monospace;
  color: var(--border);
  margin-top: 0px;
}

.modal-links {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-dark);
}

.modal-content {
  max-width: 600px;
  margin: 100px auto;
}

.bmc-button {
  height: 25px;
  width: 210px;
  margin-top: 30px;
  display: inline-block;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.25s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
