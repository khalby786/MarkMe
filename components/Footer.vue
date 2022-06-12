<template>
  <footer>
    <button
      v-if="isInit === true"
      @click="takeMeHome()"
      v-tippy="{ animation: 'fade' }"
      content="Country roads, take me home!"
    >
      <i class="bx bx-home"></i></button
    ><button
      v-if="isInit === true"
      v-tippy="{ animation: 'fade' }"
      content="Edit preferences"
    >
      <i class="bx bx-cog"></i>
    </button>
    &nbsp;<button v-if="isInit === true">
      <i class="bx bx-plus"></i></button
    ><button
      v-if="isInit === true"
      v-tippy="{ animation: 'fade' }"
      content="View document statistics"
    >
      <i class="bx bx-line-chart"></i>
    </button>

    <div class="right">
      <button
        v-if="isInit === true"
        @click="showHtmlCode()"
        v-tippy="{ animation: 'fade' }"
        content="Toggle code preview"
      >
        <i class="bx bx-code"></i></button
      ><button
        v-if="isInit === true"
        @click="beauitfyHtml()"
        v-tippy="{ animation: 'fade' }"
        content="Format HTML code"
      >
        <i class="bx bx-bolt-circle"></i>
      </button>
      &nbsp;
      <NuxtLink to="/about">
        <button v-tippy="{ animation: 'fade' }" content="About MarkMe!">
          <i class="bx bx-info-circle"></i>
        </button> </NuxtLink
      ><a href="https://github.com/khalby786/markme">
        <button v-tippy="{ animation: 'fade' }" content="GitHub">
          <i class="bx bxl-github"></i>
        </button>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      words: 0,
    };
  },
  methods: {
    takeMeHome: function () {
      this.$store.commit("initFalse");
      this.$store.commit("showIntroModal");
    },
    getWordCount: function () {
      var wom = this.$refs.htmlEditor.innerText.match(/\S+/g);
      return {
        words: wom ? wom.length : 0,
      };
    },
    showHtmlCode() {
      console.log("kobe!");
      this.$root.$emit("showHtmlCode");
    },
    beauitfyHtml() {
      console.log("prettier intensifies");
      this.$root.$emit("beauitfyHtml");
    },
  },
  computed: {
    isInit() {
      return this.$store.state.isInit;
    },
  },
};
</script>

<style scoped>
footer {
  height: 40px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  border-top: 1px solid var(--border-dark);
  background-color: var(--background-dark);
  font-family: var(--monospace);
  padding: 0px;
  box-sizing: border-box;
  z-index: 9;
}

button {
  margin: 0px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
  border-radius: 0px;
  border: none;
  font-size: 20px;
  vertical-align: middle;
}

button > i {
  vertical-align: top;
}

.right {
  /* display: inline;
  float: right; 
  margin-right: 20px;*/
  display: inline;
  float: right;
  vertical-align: top;
}

.right > i {
  vertical-align: top;
}
</style>
