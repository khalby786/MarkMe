<template>
  <footer>
    <NuxtLink to="/about">About</NuxtLink>
    · <a href="https://github.com/khalby786/markme">GitHub</a>

    <div class="right"></div>
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
};
</script>

<style scoped>
footer {
  height: 20px;
  padding: 10px;
  position: fixed;
  left: 0px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  border-top: 1px solid var(--border);
  background-color: var(--background-dark);
  font-family: var(--monospace);
}

.right {
  display: inline-block;
  float: right;
  margin-right: 20px;
}
</style>