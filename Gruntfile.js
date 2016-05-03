var _ = require('lodash'),
    webdriverConfig,
    testConfig,
    sauceConfig;

module.exports = function(grunt) {
    sauceConfig = grunt.file.readJSON('./config.json');
    testConfig = grunt.file.readJSON('./test.json');

    webdriverConfig = _.assign({
        options: {
            host: 'ondemand.saucelabs.com',
            port: 80,
            user: sauceConfig.username,
            key: sauceConfig.key,
            // desiredCapabilities: {
                // 'tunnel-identifier': 'Sauce Connect'
            // }
        }
    }, testConfig);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webdriver: webdriverConfig
    });

    // Each plugin must be loaded following this pattern
    grunt.loadNpmTasks('grunt-webdriver');

    // grunt.registerTask('test', ['webdriver']);
};
