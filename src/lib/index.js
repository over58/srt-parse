/**
 * @desc a toast plugin for mobile
 */
import ToastComponent from './toast.vue'
var Toast = {}
Toast.install = (Vue, options) => {
  console.log('-------当调用了Vue.use之后就执行了install方法-------')
  var opt = {
    defaultType: 'center',
    duration: '3000'
  }
  Object.assign(opt, options)
  Vue.prototype.$toast = (message, option) => {
    let callback = ''
    // 设置局部配置
    if (typeof option === 'object') {
      Object.assign(opt, option)
    } else if (typeof option === 'function') {
      callback = option
    }

    const ToastController = Vue.extend(ToastComponent)

    var instance = new ToastController().$mount(document.createElement('div'))
    instance.message = message
    instance.visible = true
    document.body.appendChild(instance.$el)
    setTimeout(function () {
      instance.visible = false
      setTimeout(() => {
        document.body.removeChild(instance.$el)
        callback && callback()
      }, 500)
    }, opt.duration)
  };
  // 后期扩展
  ['show', 'success', 'info', 'error'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (tips, option) {
      return Vue.prototype.$toast(tips, option)
    }
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Toast)
}
export default Toast
