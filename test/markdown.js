'use strict';

require('mocha');
var assert = require('assert');
var fs = require('fs');
var hbs = require('handlebars').create();
var helpers = require('../helpers/helpers.js');
var markdownHelper = require('../helpers/lib/markdown.js');
helpers.markdown({handlebars: hbs});

describe('markdown', function() {
  describe('markdown', function() {
    it('should render markdown using the {{#markdown}} block helper', function() {
      var template = hbs.compile('{{#markdown}}## {{../title}}{{/markdown}}');
      assert.equal(template({title: 'Markdown Test'}), '<h2>Markdown Test</h2>\n');
    });
    it('should define the object', function() {
      assert.equal(typeof markdownHelper.markdown, 'function');
    });
    it('should set the object', function() {
      markdownHelper.markdown = function() {};
      assert.equal(typeof markdownHelper.markdown, 'function');
    });
  });

  describe('helpers for markdown', function() {
    it('should apply the correct config', function() {
      var markdown = markdownHelper.helpersForMarkdown({html: true, breaks: true, highlight: function() {}});
      assert.equal(typeof markdown, 'function');
      var markdownAgain = markdownHelper.helpersForMarkdown('foo');
      assert.equal(typeof markdownAgain, 'string');
    });
    it('should the lang property', function() {
      var markdown = markdownHelper.helpersForMarkdown({html: true, breaks: true, highlight: function() {}});
      var md = '## foo\n\n```js\nvar foo = "bar";\n```';
      var locals = {};
      var options = {lang: 'en'};
      markdown(md, locals, options);
      assert.equal(typeof markdown, 'function');
    });
    it('test that highlighjs renders', function() {
      var result = markdownHelper.highlightFormMarkdown('var foo = "bar";', 'js');
      assert.equal(result, '<span class="hljs-keyword">var</span> foo = <span class="hljs-string">&quot;bar&quot;</span>;');
    });
    it('test that highlighjs no lang', function() {
      var result = markdownHelper.highlightFormMarkdown('var foo = "bar";');
      assert.equal(result, 'var foo <span class="hljs-operator">=</span> <span class="hljs-string">&quot;bar&quot;</span><span class="hljs-comment">;</span>');
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
