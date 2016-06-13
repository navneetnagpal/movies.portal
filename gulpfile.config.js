'use strict';
var GulpConfig = (function() {
    function gulpConfig() {
        this.source = './src/';
        this.appScripts = [this.source,'**/*.js'].join('');
        this.dist = './src/build/';
        this.tests = './test/';
        this.autoprefixer = ['last 2 versions','ie >= 9'];

    }
    return gulpConfig;
})();
module.exports = GulpConfig;