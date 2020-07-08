import Vue from 'vue'
import Router from 'vue-router'
import loader from '@/support/loader'
import store from '@/store/store'
import resolver from '@/support/routes-resolver'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: resolver.homeUrl(),
  // We use the feature-by-folder strategy, so
  // each component declares its routes and
  // these routes are loaded below, with the loader helper
  routes: []
})

router.beforeEach((to, from, next) => {
  if (!store.getters.dataAcquired) {
    store.dispatch('fetchApiInitialData').then(() => {
      next()
    })
  } else {
    next()
  }
})

// load and get all routes from components with name following the pattern *.route.js
let pageRoutes = loader.load(require.context('@/pages/', true, /\.route\.js$/))

pageRoutes.forEach(pageRoute => {
  if (Array.isArray(pageRoute)) {
    router.addRoutes(pageRoute)
  } else {
    router.addRoute(pageRoute)
  }
})

export default router
