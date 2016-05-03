# Automated tests

For running automated tests we use [WebdriverIO](http://webdriver.io/), which is a NodeJS package that has [Selenium bindings](http://webdriver.io/api.html). [Grunt](http://gruntjs.com/) is the runner of the tests and [Sauce Labs](https://saucelabs.com/home) hosts the virtual machine on which we test. Often we want to test a case that involves our test/acceptance environment, which is only available in the internal network. By default Sauce Labs cannot see the internal network so we use Sauce Connect to create a tunnel and make the test environment visible in Sauce Labs. The tests are written in JavaScript, in your favorite text editor and executed through Terminal (Mac) or Command Prompt (Windows).

[WebdriveIO documentation](http://webdriver.io/api.html) (Selenium bindings and commands)

## Set-up

- Create a project directory somewhere in your computer. Please note that all the terminal commands from this page are run from the project directory.
- Clone this repository

### What you need

- A Sauce Labs account
- Your favorite text editor (mine is Atom)

### Download & Install

- [NodeJS](https://nodejs.org/download/)
- [Git](https://git-scm.com/downloads)

### Install grunt-cli globally

	npm install -g grunt-cli

### Install dependencies

	npm install

### Sauce Labs config

Edit config.json with the username and key of your Sauce Labs account.

`Hint:` You can find your sauce labs access key in [https://saucelabs.com/account/profile](https://saucelabs.com/account/profile)

### Sauce Connect

#### Set environment variables

For Mac:

	export SAUCE_USERNAME=your_sauce_labs_username
	export SAUCE_KEY=your_sauce_labs_access_key

For Windows:

	SETX SAUCE_USERNAME "your_sauce_labs_username"
	SETX SAUCE_KEY "your_sauce_labs_access_key"

#### Running Sauce Connect

To make a connection between our internal network and Sauce Labs virtual machines we use Sauce Connect. You can running with the following commands:

For Mac:

	cd sc/osx
	bin/sc -u $SAUCE_USERNAME -k $SAUCE_KEY

For Windows:

	cd sc\win\bin
	sc -u %SAUCE_USERNAME% -k %SAUCE_KEY%

`Hint:` You can run Sauce Connect also if you want to do manual testing from the internal network in Sauce Labs.

## Writing tests

Tests are written in JavaScript and each test is a .js file. Each test may contain multiple steps.

Tests that we want to run should be defined in test.json

	{
		"test1": {
			"tests": "tests/test1.js",
			"options": {
				"desiredCapabilities": {
					"name": "Job name that will appear in Sauce Labs",
					"browserName": "chrome"
				}
			}
		},
		"searchbox": {
			"tests": "tests/searchbox.js",
			"options": {
				"desiredCapabilities": {
					"name": "Test the searchbox",
					"browserName": "firefox"
				}
			}
		}
	}

### Example

A basic test with two steps looks like this:

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


The test script should be written in a way that is descriptive and easy to read and understand. The library that we are using makes it easy to write clean code.

The script starts with `describe('make a search on Google', function () { ... }` where 'searchbox test' is a clear title that describes the test.

Then, each step starts with `it('should type & submit', function(done) { ... }` where, same as in the test title, the first parameter is a clear description of the step. These descriptions will not appear in Sauce Labs, only in the terminal.

Inside each step we start with browser and we and with its method `.call(done)`. A minimum test could be `browser.call(done)` which opens the browser and then close it.

- More about [WebdriverIO methods](http://webdriver.io/api.html) (Selenium bindings and commands)

## Running tests

Tests needs to be run from the Terminal / Command Prompt. We use Grunt as task runner, so the command will look like this:

	grunt webdriver:test1

`test1` in this case is the test we want to run. The name test1 is defined in test.json

In parallel, while the test is running, the Sauce Labs is updating with live information in form of a live screencast or list of commands.
