// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

const CONFIG = {
  headless: false,
  api: {
    port: process.env.PORT || 3000,
    timeout: 120000 // 2 minutes
  },
  ui: {
    port: process.env.PORT || 3000,
    path: '/'
  },
  adapter: 'sqlite'
}

module.exports = CONFIG;
