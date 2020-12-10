module.exports = {
  pwa: {
    name: 'Genshin Impact build simulator',
    themeColor: '#4A90E2',
    msTileColor: '#4A90E2',
    manifestOptions: {
      background_color: '#4A90E2'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Build Simulator";
        return args;
      })
  }
}