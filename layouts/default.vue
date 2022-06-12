<template>
  <div>
    <Nuxt />

    <Footer />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap");

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
  font-family: var(--sans-serif);
  --background: #bfedef;
  --background-dark: #100e17;
  --foreground: black;
  --foreground-dark: white;
  --test: black;
  --border: #ff6b6b;
  --border-dark: #222129;
  --scrollbarBG: #100e17;
  --thumbBG: #90a4ae;
  font-weight: 400;
  transition: 150ms;
}

body {
  margin: 0px;
}

.nuxt-link-exact-active {
  color: var(--border);
}

::-webkit-scrollbar {
  width: 11px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}

::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}

/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.default-theme {
  background-color: var(--background-dark);
  color: var(--foreground-dark);
}

.splitpanes__pane {
  background-color: var(--background-dark) !important;
  color: var(--foreground-dark) !important;
}

.splitpanes__splitter {
  background-color: var(--border-dark);
  position: relative;
}

.splitpanes__splitter:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: 0.4s;
}

.splitpanes--vertical > .splitpanes__splitter:before {
  left: -5px;
  right: -5px;
}

.splitpanes--horizontal > .splitpanes__splitter:before {
  top: -5px;
  bottom: -5px;
}

.splitpanes__splitter:hover:before {
  transition: 1s;
  background-color: var(--border);
}

.CodeMirror {
  height: calc(100vh - 40px) !important;
  background-color: var(--background-dark) !important;
}

button {
  margin-top: 10px;
  margin-bottom: 10px;
  color: gray;
  font-family: var(--sans-serif);
  transition: 0.15s;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--background-dark);
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid #2d2d2d;
  box-shadow: 0 2.3px 1.9px rgba(0, 0, 0, 0.013),
    0 5.4px 4.3px rgba(0, 0, 0, 0.019), 0 9.7px 7.7px rgba(0, 0, 0, 0.023),
    0 16.1px 12.8px rgba(0, 0, 0, 0.027), 0 26.5px 21.2px rgba(0, 0, 0, 0.031),
    0 46.2px 37px rgba(0, 0, 0, 0.037), 0 100px 80px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}

button:hover {
  background-color: rgba(30, 28, 38, 1);
  color: var(--foreground-dark);
  transition: 150ms;
}

.text-only {
  padding: 0px;
  border: none;
  margin: 0px;
  color: var(--border);
}

.text-only:hover {
  background-color: var(--background-dark);
  color: var(--border);
}

img {
  border-radius: 9px;
  max-width: 100%;
  box-shadow: 0 0px 2.2px rgba(0, 0, 0, 0.138), 0 0px 5.3px rgba(0, 0, 0, 0.198),
    0 0px 10px rgba(0, 0, 0, 0.245), 0 0px 17.9px rgba(0, 0, 0, 0.292),
    0 0px 33.4px rgba(0, 0, 0, 0.352), 0 0px 80px rgba(0, 0, 0, 0.49);
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

/* https://css-tricks.com/snippets/css/simple-and-nice-blockquote-styling/ */
blockquote {
  background: var(--background-dark);
  border-left: 10px solid var(--border);
  margin: 1.5em 0px;
  padding: 0px 10px;
  quotes: "\201C""\201D""\2018""\2019";
  font-family: "Merriweather", "Times New Roman", serif;
}

blockquote:before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}

blockquote p {
  display: inline;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

th {
  background-color: #eee;
}

tr:first-of-type th {
  width: 100px;
}

tr:first-of-type th:first-of-type {
  width: 25px;
}

td {
  border: 1px solid #ccc;
  height: 1.5em;
  overflow: scroll;
}

/* modal stuff */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modal {
  border-radius: 0px;
  background-color: var(--background-dark);
  /* border: 5px solid var(--border); */
  padding: 30px 30px;
  z-index: 8;
}

.vm--container {
  z-index: 8 !important;
}
</style>
