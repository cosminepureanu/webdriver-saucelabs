'use strict';

var assert = require('chai').assert;
var colors = require('colors');

module.exports = new Commands;

/**
 * @constructor
 */
function Commands() {

}

/**
 * Assert a value to be equal to an element text
 * @param {string} selector - CSS/XPath selector for the element
 * @param {string} assertion - Text that is asserted
 */
Commands.prototype.assert = function(selector, assertion) {
	it('Assert the text of "' + selector + '" to be equal to "' + assertion + '"', function(done){
		browser
			.getText(selector).then(function(value){
				assert.strictEqual(value, assertion);
			})
			.call(done);
	});
};

/**
 * Assert a value to be equal to an input value
 * @param {string} selector - CSS/XPath selector for the element
 * @param {string} assertion - Text that is asserted
 */
Commands.prototype.assertValue = function(selector, assertion) {
	it('Assert the value of "' + selector + '" to be equal to "' + assertion + '"', function(done){
		browser
			.getValue(selector).then(function(value){
				assert.equal(value, assertion);
			})
			.call(done);
	});
};

/**
 * Assert element to exists
 * @param {string} element - The element that needs to be checked
 */
Commands.prototype.assertElement = function(element) {
	it('Assert element "'+ element +'" to exists', function(done) {
		browser
			.element(element)
			.call(done);
	});
};

/**
 * Assert current URL to contain a string
 * @param {string} string - String that needs to be part of the URL
 */
Commands.prototype.assertPartOfUrl = function(string) {
	it('Assert "'+ string +'" to be part of the current URL', function(done) {
		browser
			.url().then(function(url){
				assert.include(url.value, string);
			})
			.call(done);
	});
};

/**
 * Click an element
 * @param {string} selector - element to be clicked
 * @param {number} times - nr of times the element should be clicked
 */
Commands.prototype.click = function(selector, times) {
	var description = 'Click ';

	if (!times) {
		times = 1;
	}else{
		if(times > 1) {
			description += times + ' times ';
		}
	}

	description += '"' + selector + '"';

	it(description, function(done){
		for(var i=0; i<times; i++) {
			browser.click(selector);
		}

		browser.call(done);
	});
};

/**
 * Fill a text field
 * @param {string} selector - Text field selector
 * @param {string} keys - Text to be added in the text field
 */
Commands.prototype.fill = function(selector, keys) {
	it('Fill "' + selector + '" with the text "' + keys + '"', function(done){
		browser
			.clearElement(selector)
			.click(selector)
			.keys(String(keys))
			.call(done);
	});
};

/**
 * Log a message in the terminal
 * @param {string} log - Log message
 */
var log = function(log) {
	console.log('    ' + colors.yellow('• ') + colors.yellow(log));
}

/**
 * Opens a specific URL
 * @param {string} url - URL
 */
Commands.prototype.openURL = function(url) {
	it('Open URL: ' + url, function(done) {
		browser
			.url(url)
			.call(done);
	});
}

/**
 * Select an option from a select element. If a string is provided, it will select the option by value.
 * If a number is provided, it will select the option by index.
 * @param {string} selector - CSS/XPath selector for the select element
 * @param {string|number} value - Value (string) or index (number) of the option element
 */
Commands.prototype.selectOption = function(selector, value) {
	if(typeof value === 'string'){
		it('Selects the value "' + value + '" from "' + selector + '"', function(done){
			browser
				.selectByValue(selector, value)
				.call(done);
		});
	}else if(typeof value === 'number'){
		it('Selects the index ' + value + ' from "' + selector + '"', function(done){
			browser
				.selectByIndex(selector, value)
				.call(done);
		});
	}
};

/**
 * Submit the form. If no selector is defined, the first <form> element will be submited
 * @param {string} selector - CSS selector for the form element
 */
Commands.prototype.submitForm = function(selector) {
	if(!selector) {
		selector = 'form';
	}

	it('Submit the form', function(done) {
		browser
			.submitForm(selector)
			.call(done);
	});
};

/**
 * Switch to the last tab
 */
Commands.prototype.switchTab = function() {
	var tabs;

	it('Switch to last tab', function(done) {
		browser
			.getTabIds(function(err, response) {
				tabs = response;
				this.switchTab(tabs[tabs.length -1 ]);
			})
			.call(done);
	});
};

/**
 * Pause the browser for 5sec
 */
Commands.prototype.wait = function() {
	it('Pauses', function(done) {
		browser
			.pause(5000)
			.call(done);
	});
};
