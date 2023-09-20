'use strict';

require('mocha');
var assert = require('assert');
var hbs = require('handlebars').create();
var helpers = require('../helpers.js');
helpers.regex({handlebars: hbs});

describe('regex', function() {
  it('should do a regex on toRegex', function() {
    var fn = hbs.compile('{{toRegex "^Hello World"}}');
    assert.equal(fn(), '/^Hello World/');
  });

  it('should do a test on regex', function() {
    var fn = hbs.compile('{{test "bar" (toRegex "foo")}}');
    assert.equal(fn(), 'false');
  });

  it('should do a test on regex with throw', function() {
    try {
      hbs.compile('{{test "bar" {}}}');
    } catch (err) {
      assert.equal(err.message, 'expected a regular expression');
    }
  });
});
