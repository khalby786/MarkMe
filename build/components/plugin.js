import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  Overlay: () => import('../..\\components\\Overlay.vue' /* webpackChunkName: "components/overlay" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
