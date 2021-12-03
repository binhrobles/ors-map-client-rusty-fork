import { mount } from '@vue/test-utils'
import constants from '@/resources/constants'
import Share from '@/fragments/forms/map-form/components/share/Share'
import I18nBuilder from '@/i18n/i18n-builder'
import AppLoader from '@/app-loader'
import store from '@/store/store'

// Solves the 'RegeneratorRuntime is not defined' issue according to
// https://stackoverflow.com/questions/28976748/regeneratorruntime-is-not-defined
import '@babel/polyfill'

describe('Share', () => {
  it('should render share component and toggle short url', async (done) => {
    let directionsUrl = `${constants.orsPublicHost}/#/directions/Mannheim,BW,Germany/Heidelberg,BW,Germany/data/%7B"coordinates":"8.492765,49.488789;8.692416,49.401247","options":%7B"zoom":8,"profile":"driving-car","preference":"recommended"%7D%7D`
    var shareProps = {
      url: directionsUrl
    }

    await new AppLoader().fetchApiInitialData()
    const wrapper = mount(Share, {i18n: I18nBuilder.build(), store: store, propsData: shareProps })

    expect(wrapper.contains('.share-container')).toBe(true)
    expect(wrapper.findComponent(Share).exists()).toBe(true)
    await wrapper.find('.open-share-btn').trigger('click')

    let shareModal = document.querySelector('.share-modal')
    expect(shareModal).toBeDefined()
    expect(shareModal).not.toBeNull()

    let shareUrlInput = shareModal.querySelector('input[type="text"]')
    let shareUrlTextarea = shareModal.querySelector('textarea')
    expect(shareUrlInput.value).toBe(directionsUrl)
    let iframeCode = `<iframe style='border:none' width='100%' height='100%'  src="${directionsUrl}/embed/en-us"></iframe>`
    expect(shareUrlTextarea.value).toContain(iframeCode)    
    await wrapper.find('.toggle-short-url').trigger('click')

    await shareModal.__vue__.$nextTick()
    await new Promise(resolve => setTimeout(resolve, 1000))
    shareUrlInput = shareModal.querySelector('input[type="text"]')
    expect(shareUrlInput.value).toContain('https://bit.ly/')
    done()  
  })
})
