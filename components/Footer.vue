<template>
  <footer>
    <NuxtLink to="/about">
      <button v-tippy="{ animation: 'fade' }" content="About MarkMe!">
        <i class="bx bx-info-circle"></i>
      </button> </NuxtLink
    ><a href="https://github.com/khalby786/markme">
      <button v-tippy="{ animation: 'fade' }" content="GitHub">
        <i class="bx bxl-github"></i>
      </button>
    </a>
    <button>

    </button>

    <div class="right">
      <button>
        <i class="bx bx-plus"></i>
      </button>
      <button
        @click="showHtmlCode()"
        v-tippy="{ animation: 'fade' }"
        content="Toggle code preview"
      >
        <i class="bx bx-code"></i></button
      ><button
        @click="beauitfyHtml()"
        v-tippy="{ animation: 'fade' }"
        content="Format HTML code"
      >
        <i class="bx bx-bolt-circle"></i>
      </button>
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
    getWordCount: function () {
      var wom = this.$refs.htmlEditor.innerText.match(/\S+/g);
      return {
        words: wom ? wom.length : 0,
      };
    },
  },
  methods: {
    showHtmlCode() {
      console.log("kobe!");
      this.$root.$emit("showHtmlCode");
    },
    beauitfyHtml() {
      console.log("prettier intensifies")
      this.$root.$emit("beauitfyHtml");
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
  border-top: 3px solid var(--border);
  background-color: var(--background-dark);
  font-family: var(--monospace);
  padding: 0px;
  box-sizing: border-box;
  z-index: 9;
}

button {
  margin: 0px;
  padding-left: 7px;
  padding-right: 7px;
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
