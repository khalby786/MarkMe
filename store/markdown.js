export const state = () => ({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
  katex: true
});

export const mutations = {
  toggleHtml(state) {
    state.html = !state.html;
  },
  toggleBreaks(state) {
    state.breaks = !state.breaks;
  },
  toggleLinkify(state) {
    state.linkify = !state.linkify;
  },
  toggleTypographer(state) {
    state.typographer = !state.typographer;
  }
};
