/* ./src/composables/uiStyle */
import store from '@/store'

export const getUIStyle = () => {
    ZWJSBridge.onReady(() => {
    console.log('zwjsbrige 可调用')
    ZWJSBridge.getUiStyle()
      .then((result: any) => {
        const { uiStyle } = result
        console.log('1111111111111',result, uiStyle);
        // store.dispatch('SetUIStyle~11111', uiStyle)
        // console.log(`store存储为: ${store.getters.uiStyle}`)
    })
      .catch((error: any) => {
        console.error(error, 'mgopToolError')
        // store.dispatch('SetUIStyle', 'normal')
      })
  })
}