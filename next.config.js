const withCSS = require('@zeit/next-css')
const withOffline = require('next-offline')

module.exports = withOffline(withCSS({
  target: 'serverless',
  transformManifest: (manifest) => [ '/', '/about', '/tips', '/offline' ].concat(manifest),
  generateSw: false,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    swSrc: 'sw.js'
  }
}))