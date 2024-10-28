'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var hbs = require('handlebars').create();
require('../helpers/helpers.js')({handlebars: hbs});

var libFiles = fs.readdirSync(path.join(__dirname, '../helpers/lib'))
  .map(function(fp) {
    return path.join('helpers/lib', fp);
  });

describe('fs', function() {
  describe('read', function() {
    it('should read a file from the file system', function() {
      var fn = hbs.compile('{{read filepath}}');
      assert.equal(fn({filepath: 'test/fixtures/read/a.txt'}), 'abc');
    });
  });

  describe('readdir', function() {
    it('should return an array of files', function() {
      var fn = hbs.compile('{{readdir dir}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), libFiles);
    });

    it('should work as a subexpression', function() {
      var fn = hbs.compile('{{match (readdir dir) "**/[a-c]*.js"}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), [
        'helpers/lib/array.js',
        'helpers/lib/code.js',
        'helpers/lib/collection.js',
        'helpers/lib/comparison.js'
      ]);
    });

    it('should filter using a custom filter function', function() {
      var fn = hbs.compile('{{readdir dir filter}}');
      function filter(arr) {
        return arr.filter(function(fp) {
          return /\.js$/.test(fp);
        });
      }

      assert.deepEqual(fn({dir: 'helpers/lib', filter: filter}).split(','), [
        path.join('helpers/lib', 'array.js'),
        path.join('helpers/lib', 'code.js'),
        path.join('helpers/lib', 'collection.js'),
        path.join('helpers/lib', 'comparison.js'),
        path.join('helpers/lib', 'date.js'),
        path.join('helpers/lib', 'fs.js'),
        path.join('helpers/lib', 'html.js'),
        path.join('helpers/lib', 'i18n.js'),
        path.join('helpers/lib', 'index.js'),
        path.join('helpers/lib', 'inflection.js'),
        path.join('helpers/lib', 'logging.js'),
        path.join('helpers/lib', 'markdown.js'),
        path.join('helpers/lib', 'match.js'),
        path.join('helpers/lib', 'math.js'),
        path.join('helpers/lib', 'md.js'),
        path.join('helpers/lib', 'misc.js'),
        path.join('helpers/lib', 'number.js'),
        path.join('helpers/lib', 'object.js'),
        path.join('helpers/lib', 'path.js'),
        path.join('helpers/lib', 'regex.js'),
        path.join('helpers/lib', 'string.js'),
        path.join('helpers/lib', 'url.js')
      ]);
    });

    it('should filter using a regex', function() {
      var fn = hbs.compile('{{readdir dir (toRegex "\\.js$")}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), [
        path.join('helpers/lib', 'array.js'),
        path.join('helpers/lib', 'code.js'),
        path.join('helpers/lib', 'collection.js'),
        path.join('helpers/lib', 'comparison.js'),
        path.join('helpers/lib', 'date.js'),
        path.join('helpers/lib', 'fs.js'),
        path.join('helpers/lib', 'html.js'),
        path.join('helpers/lib', 'i18n.js'),
        path.join('helpers/lib', 'index.js'),
        path.join('helpers/lib', 'inflection.js'),
        path.join('helpers/lib', 'logging.js'),
        path.join('helpers/lib', 'markdown.js'),
        path.join('helpers/lib', 'match.js'),
        path.join('helpers/lib', 'math.js'),
        path.join('helpers/lib', 'md.js'),
        path.join('helpers/lib', 'misc.js'),
        path.join('helpers/lib', 'number.js'),
        path.join('helpers/lib', 'object.js'),
        path.join('helpers/lib', 'path.js'),
        path.join('helpers/lib', 'regex.js'),
        path.join('helpers/lib', 'string.js'),
        path.join('helpers/lib', 'url.js')
      ]);
    });

    it('should filter using a glob pattern', function() {
      var fn = hbs.compile('{{readdir dir "helpers/lib/[a-d]*.js"}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), [
        path.join('helpers/lib', 'array.js'),
        path.join('helpers/lib', 'code.js'),
        path.join('helpers/lib', 'collection.js'),
        path.join('helpers/lib', 'comparison.js'),
        path.join('helpers/lib', 'date.js')
      ]);
    });

    it('should filter by fs.stat (files)', function() {
      var fn = hbs.compile('{{readdir dir "isFile"}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), libFiles.filter(function(fp) {
        return fp.indexOf(path.join('helpers/lib', 'util')) !== 0;
      }));
    });

    it('should filter by fs.stat (dirs)', function() {
      var fn = hbs.compile('{{readdir dir "isDirectory"}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), [
        path.join('helpers/lib', 'utils')
      ]);
    });

    it('should return the whole array when the filter is invalid', function() {
      var fn = hbs.compile('{{readdir dir "foo"}}');
      assert.deepEqual(fn({dir: 'helpers/lib'}).split(','), libFiles);
    });
  });
});
