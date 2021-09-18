<template>
  <div>
    <link
      rel="stylesheet"
      href="https://unpkg.com/blocks.css/dist/blocks.min.css"
    />
    <Nuxt />

    <Footer />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,700&display=swap");

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
  --border-dark: #00f5d4;
  --scrollbarBG: #100e17;
  --thumbBG: #90a4ae;
  font-weight: 400;
  transition: 150ms;
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

button {
  margin-top: 10px;
  margin-bottom: 10px;
  color: var(--foreground);
  font-family: var(--sans-serif);
  transition: 0.15s;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--border-dark);
  border-radius: 5px;
  font-size: 14px;
  border: none;
  box-shadow: 0 2.3px 1.9px rgba(0, 0, 0, 0.013),
    0 5.4px 4.3px rgba(0, 0, 0, 0.019), 0 9.7px 7.7px rgba(0, 0, 0, 0.023),
    0 16.1px 12.8px rgba(0, 0, 0, 0.027), 0 26.5px 21.2px rgba(0, 0, 0, 0.031),
    0 46.2px 37px rgba(0, 0, 0, 0.037), 0 100px 80px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}

button:hover {
  background-color: var(--border);
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
  width: 100%;
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

/* modal stuff */
.modal {
  border-radius: 0px;
  background-color: var(--background-dark);
  border: 5px solid var(--border);
  padding: 30px 30px;
}
</style>
