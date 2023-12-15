module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plgins: [
      'react-native-reanimated/plugin'
    ]
  }
}
