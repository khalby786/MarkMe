import Vue from 'vue'
import { wrapFunctional } from './index'

const components = {
  Footer: () => import('../..\\components\\Footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c)),
  Overlay: () => import('../..\\components\\Overlay.vue' /* webpackChunkName: "components/overlay" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
