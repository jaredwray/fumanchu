/*!
* helper-md <https://github.com/jonschlinkert/helper-md>
*
* Copyright (c) 2014 Jon Schlinkert, contributors.
* Licensed under the MIT License
*/

'use strict';

require('mocha');
var assert = require('assert');
var handlebars = require('handlebars');
var Templates = require('templates');
var hljs = require('highlight.js');
var md = require('../lib/md.js');
var _ = require('lodash');
var app;

describe('sync', function() {
  beforeEach(function() {
    app = new Templates();

    app.helper('md', md.sync);
    app.engine('md', require('engine-base'));
    app.option('engine', 'md');

    app.create('page');
    app.create('partial', {viewType: ['partial']});
    app.create('include', {viewType: ['partial']});

    app.include('one', {content: '# heading <%= name %>', data: {name: 'one'}});
    app.partial('two', {content: '# heading <%= name %>', data: {name: 'two'}});
  });

  it('should convert markdown on the `content` property of a template to HTML:', function(cb) {
    app.page('home.md', {content: '<%= md("one") %>'});

    app.render('home.md', function(err, view) {
      if (err) return cb(err);
      assert.equal(view.content, '<h1>heading one</h1>\n');
      cb();
    });
  });

  it('should support rendering markdown from a file:', function() {
    assert.equal(md.sync('helpers/test/fixtures/a.md'), '<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });

  describe('handlebars:', function() {
    it('should support rendering markdown from a file:', function() {
      handlebars.registerHelper('md', md.sync);
      assert.equal(handlebars.compile('{{{md "helpers/test/fixtures/a.md"}}}')(), '<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
    });

    it('should use the `render` function passed on the locals to render templates in partials :', function() {
      handlebars.registerHelper('md', md.sync);
      var locals = {name: 'CCC', compile: handlebars.compile};
      assert.equal(handlebars.compile('{{{md "helpers/test/fixtures/c.md"}}}')(locals), '<h1>CCC</h1>\n<p>This is CCC</p>\n');
    });
  });
});

describe('async', function() {
  beforeEach(function() {
    app = new Templates();

    app.asyncHelper('md', md);
    app.engine('md', require('engine-base'));
    app.option('engine', 'md');

    app.create('page');
    app.create('partial', {viewType: ['partial']});
    app.create('include', {viewType: ['partial']});

    app.include('one', {content: '# heading <%= name %>', data: {name: 'one'}});
    app.partial('two', {content: '# heading <%= name %>', data: {name: 'two'}});
  });

  it('should convert markdown on the `content` property of a template to HTML:', function(cb) {
    app.page('home.md', {content: '<%= md("one") %>'});

    app.render('home.md', function(err, view) {
      if (err) return cb(err);
      assert.equal(view.content, '<h1>heading one</h1>\n');
      cb();
    });
  });

  it('should support rendering from a file', function(cb) {
    app.page('home.md', {content: '<%= md("helpers/test/fixtures/d.md") %>'});

    app.render('home.md', {name: 'DDD'}, function(err, view) {
      if (err) return cb(err);
      assert.equal(view.content, '<h1>DDD</h1>\n<p>This is DDD</p>\n');
      cb();
    });
  });

  it('should use sync helper when a callback is not passed:', function(cb) {
    app.helper('md2', md);
    app.page('home.md', {content: '<%= md2("one") %>'});

    app.render('home.md', function(err, view) {
      if (err) return cb(err);
      assert.equal(view.content, '<h1>heading one</h1>\n');
      cb();
    });
  });
});

describe('lodash:', function() {
  it('should work as a lodash mixin:', function() {
    _.mixin({md: md.sync});
    assert.equal(_.template('<%= _.md("helpers/test/fixtures/a.md") %>', {})(), '<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });

  it('should work when passed to lodash on the locals:', function() {
    assert.equal(_.template('<%= _.md("helpers/test/fixtures/a.md") %>')({md: md.sync}), '<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });

  it('should work as a lodash import:', function() {
    var settings = {imports: {md: md.sync}};
    assert.equal(_.template('<%= _.md("helpers/test/fixtures/a.md") %>', {}, settings)(), '<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });
});

describe('highlight:', function(argument) {
  it('should support syntax highlighting', function() {
    var actual = md.sync('helpers/test/fixtures/e.md', {
      highlight: function(code, lang) {
        try {
          try {
            if(lang) {
            return hljs.highlight(code,{language: lang}).value;
            } else {
              return hljs.highlightAuto(code).value;
            }
          } catch (err) {
            if (!/Unknown language/i.test(err.message)) {
              throw err;
            }
            return hljs.highlightAuto(code).value;
          }
        } catch (err) {
          return code;
        }
      }
    });
    assert.equal(actual, '<h1>EEE</h1>\n<pre><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">message</span> = <span class="hljs-string">\'This is an alert\'</span>;\nalert(<span class="hljs-keyword">message</span>);\n</code></pre>\n');
  });
});