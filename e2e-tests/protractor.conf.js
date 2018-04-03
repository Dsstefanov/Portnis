//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '**/*.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,
  directConnect:true,

  baseUrl: 'http://localhost:8000',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
