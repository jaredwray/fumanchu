'use strict';

require('mocha');
var assert = require('assert');
var fs = require('fs');
var hbs = require('handlebars').create();
var helpers = require('../helpers.js');
var markdownHelper = require('../lib/markdown.js');
helpers.markdown({handlebars: hbs});

describe('markdown', function() {
  describe('markdown', function() {
    it('should render markdown using the {{#markdown}} block helper', function() {
      var template = hbs.compile('{{#markdown}}## {{../title}}{{/markdown}}');
      assert.equal(template({title: 'Markdown Test'}), '<h2>Markdown Test</h2>\n');
    });
    it('should define the object', function() {
      markdownHelper.markdown = require('helper-for-markdown')();
      assert.equal(typeof markdownHelper.markdown, 'function');
    });
  });

  describe('md', function() {
    it('should render markdown from a file using the {{md}} inline helper', function() {
      var expected = fs.readFileSync('test/expected/simple.html', 'utf8');
      var template = hbs.compile('{{{md fp}}}');
      var actual = template({fp: 'test/fixtures/simple.md'});
      assert.equal(actual, expected);
    });
  });
});
