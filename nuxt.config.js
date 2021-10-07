export default {
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "MarkMe!",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          " A simple, lightweight and beautiful Markdown editor and viewer.",
      },
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/icon.png" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css",
        integrity:
          "sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET",
        crossorigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css",
      },
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/marked/marked.min.js", body: true },
      {
        src: "https://kit.fontawesome.com/98f54f160f.js",
        crossorigin: "anonymous",
        body: true,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.js",
        integrity:
          "sha384-GxNFqL3r9uRJQhR+47eDxuPoNE7yLftQM8LcxzgS4HT73tp970WS/wV5p8UzCOmb",
        crossorigin: "anonymous",
        defer: true,
      },
      {
        src: "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/contrib/auto-render.min.js",
        integrity:
          "sha384-vZTG03m+2yp6N6BNi5iM4rW4oIwk5DfcNdFfxkk9ZWpDriOkXX8voJBFrAO7MpVl",
        crossorigin: "anonymous",
        defer: true,
      },
    ],
  },

  plugins: [
    "~plugins/vue-js-modal.js",
    { src: "~plugins/nuxt-codemirror-plugin.js", ssr: false },
    { src: "~plugins/vue-tippy.js", ssr: false },
    { src: "~plugins/vue-simple-context-menu.js", ssr: false },
  ],

  css: [
    "codemirror/lib/codemirror.css",
    "codemirror/addon/merge/merge.css",
    "codemirror/theme/base16-dark.css",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: ['@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    // "@nuxtjs/auth-next",
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // loading indicator: https://nuxtjs.org/docs/features/loading/#the-loading-indicator-property
  loadingIndicator: {
    name: "pulse",
    color: "#ff6b6b",
    background: "#100e17",
  },

  loading: "~/components/LoadingBar.vue",
};
