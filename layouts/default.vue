<template>
  <div>
    <link rel="stylesheet" href="https://unpkg.com/blocks.css/dist/blocks.min.css" />
    <Nuxt />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap');

html {
  --sans-serif: "Inter", "Helvetica", sans-serif;
  --monospace: "Fira Code", monospace;
  font-size: 15px;
  line-height: 1.4;
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  background-color: var(--background-dark);
  color: var(--foreground-dark);
  unicode-bidi: isolate; 
  --background: #BFEDEF;
  --background-dark: #100e17;
  --foreground: black;
  --foreground-dark: white;
  --test: black;
  --border: #ff6b6b;
  --border-dark: #00F5D4;
  --scrollbarBG: #100e17;
  --thumbBG: #90A4AE;
}

body::-webkit-scrollbar {
  width: 11px;
}

body::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}

body::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}

.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}

.page-enter, .page-leave-to {
  opacity: 0;
}

button {
  padding: 10px 20px;
  border: 2px solid var(--border);
  border-radius: 3px;
  color: var(--foreground-dark);
  background-color: var(--background-dark);
  font-family: var(--monospace);
  cursor: pointer;
  transition: 150ms;
  margin-top: 10px;
  margin-bottom: 10px;
}

button:hover {
  background-color: var(--foreground-dark);
  color: var(--background-dark);
  transition: 150ms;
}

.accent {
  background-color: var(--border);
  color: var(--background-dark);
  border: 2px solid var(--foreground-dark);
  font-weight: bold;
}

li {
  margin-top: 3px;
  margin-bottom: 3px;
}

a {
  color: var(--border);
  text-decoration: none;
}
</style>
