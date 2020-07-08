import OrsParamsParser from '@/support/map-data-services/ors-params-parser'
import OrsMapFilters from '@/resources/ors-map-filters'
import AppRouteData from '@/models/app-route-data'
import constants from '@/resources/constants'
import Utils from '@/support/utils'
import RouteUtils from '@/support/route-utils'
import store from '@/store/store'

/**
 * IsochronesMode class
 */
class IsochronesMode {
  buildAppRouteData (places, options = {}) {
    let appRouteData = store.getters.appRouteData || new AppRouteData()
    appRouteData.places = places

    OrsParamsParser.addFilters(options, OrsMapFilters, constants.services.isochrones)
    appRouteData.options = options
    appRouteData.options.zoom = constants.initialMapMaxZoom
    return appRouteData
  }

  /**
   * Build a directions route
   * @param {*} appRouteData
   * @returns {Object} route like {name: 'MapDirections', params: {...} }
   */
  getRoute = (appRouteData, options) => {
    let params = RouteUtils.buildRouteParams(appRouteData, options)
    // Build the route object
    let route = { name: 'MapIsochrones', params: params }
    return route
  }

  /**
   * Decode single place path
   * @param {*} currentRoute
   * @param {Object} data
   * @returns {AppRouteData}
   */
  decodePath = (currentRoute) => {
    let data = RouteUtils.decodeDataParam(currentRoute.params.data)
    let appRouteData = new AppRouteData()

    // Get coordinates and options from the param
    appRouteData.options = data.options

    // In the directions mode, the options parameter may contains an options object
    // that is expected to be used as the ORS API request options (avoid_polygons, avoid_features etc)
    // So, as they are stringfied on the url, we try to parse them back to an object
    if (appRouteData.options && appRouteData.options.options) {
      appRouteData.options.options = Utils.tryParseJson(appRouteData.options.options) || appRouteData.options.options
    }

    appRouteData.places = RouteUtils.getRoutePlaces(currentRoute)
    return appRouteData
  }
}
// export the class
export default IsochronesMode
