var assert = require('assert');

describe('', function () {

    it('submits a search query', function(done) {

        browser
            .url('http://www.hotelspecials.nl/')
            .click('#searchfield')
            .keys('Haarlem')
            .submitForm('#searchbox')

            .call(done);

    });

    it('', function(done) {

        browser
            .getText('#pro_1258').then(function(text){
            	assert.strictEqual(text, 'Amrâth Grand Hotel Frans Hals');
            })
            .call(done);
    });
});