<template>
  <div class="about">
    <NuxtLink to="/">back home</NuxtLink>
    <h1>about #markme</h1>
    <p>
      This project is a <b>work in progress</b>. Report bugs <a href="https://github.com/khalby786/markme/issues" target="_blank">here</a>
    </p>
    <p>
        A simple, lightweight and beautiful Markdown editor and viewer. 
    </p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
h1,
h2,
h3 {
  font-family: var(--monospace);
}

a {
    font-family: var(--monospace);
}

.about {
  margin: 15vw;
}
</style>