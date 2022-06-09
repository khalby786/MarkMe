export const state = () => ({
  isIntroModalShown: true,
  isInit: false
});

export const mutations = {
  showIntroModal(state) {
    state.isIntroModalShown = true;
  },
  hideIntroModal(state) {
    state.isIntroModalShown = false;
  },
  initTrue(state) {
    state.isInit = true;
  },
  initFalse(state) {
    state.isInit = false;
  }
};
