const install = Vue => {
  // components register
  // 全局导入组件
  const requireComponent = require.context(
    // 其组件目录的相对路径
    '../packages',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /.(vue|js)$/
  )
  requireComponent.keys().forEach(fileName => {
    const component = requireComponent(fileName)
    const config = component.default || component
    const name = config.name
    Vue.component(name, config)
  })
}

export default {
  install
}