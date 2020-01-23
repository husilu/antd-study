// 基于customize和react-app-rewired的定制化配置文件
const { override, addLessLoader, addDecoratorsLegacy, fixBabelImports } = require('customize-cra');


module.exports = override(
  addLessLoader({
    javascriptEnabled: true
  }),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
)