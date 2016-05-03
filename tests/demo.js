'use strict';

var assert = require('chai').assert;

describe('make a search on Google', function () {
    it('should type & submit', function (done) {
        browser
            .url('http://www.google.nl')
            .click('input[name="q"]')
            .keys('Stroopwafel')
            .submitForm('#tsf')
            .call(done);
    });
});
