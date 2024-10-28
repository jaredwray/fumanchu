'use strict';

require('mocha');
var assert = require('assert');
var utils = require('../helpers/lib/utils');
var HTML = require('../helpers/lib/utils/html');
const { expect } = require('chai');

describe('utils', function() {
  describe('chop', function() {
    it('should return an empty string if undefined', function() {
      assert.equal(utils.chop(), '');
    });
    it('should remove non-word characters from start of string', function() {
      assert.equal(utils.chop('- foo bar baz'), 'foo bar baz');
    });
    it('should remove non-word characters from end of string', function() {
      assert.equal(utils.chop('foo bar baz _- '), 'foo bar baz');
    });
    it('should throw an error if it is over 1000 characters long', function() {
      var str = 'foo bar baz _- '.repeat(1001);
      assert.throws(function() {
        utils.chop(str);
      }, /utils\.chop\(\) regex is too long!/);
    });
  });

  describe('changecase', function() {
    it('should return an empty string if undefined', function() {
      assert.equal(utils.changecase(), '');
    });
    it('should lowercase a mixed case string', function() {
      assert.equal(utils.changecase('fooBarBazQux'), 'foobarbazqux');
    });
    it('should lowercase a single character', function() {
      assert.equal(utils.changecase('f'), 'f');
      assert.equal(utils.changecase('A'), 'a');
    });
  });

  describe('falsey', function() {
    it('should return true if the value is falsey', function() {
      assert(utils.falsey(''));
      assert(utils.falsey('0'));
      assert(utils.falsey('false'));
      assert(utils.falsey('nada'));
      assert(utils.falsey('nil'));
      assert(utils.falsey('nay'));
      assert(utils.falsey('nah'));
      assert(utils.falsey('negative'));
      assert(utils.falsey('no'));
      assert(utils.falsey('none'));
      assert(utils.falsey('nope'));
      assert(utils.falsey('nul'));
      assert(utils.falsey('null'));
      assert(utils.falsey('nix'));
      assert(utils.falsey('nyet'));
      assert(utils.falsey('uh-uh'));
      assert(utils.falsey('veto'));
      assert(utils.falsey('zero'));
    });
    it('should return values on an array of keywords', function() {
      assert(utils.falsey('zero', ['zero']));
      assert(utils.falsey('zero'));
      assert(utils.falsey('Zero'));
      expect(utils.falsey('zero', ['zero', 'one'])).to.be.true;
      expect(utils.falsey('Zero', ['zero', 'one'])).to.be.true;
    });
    it('should be false if the keywords are not not set correctly', function() {
      expect(utils.falsey('false', 1)).to.be.false;
    });
  });

  describe('html', function() {
    describe('condense', function() {
      it('should condense multiple newlines into a single newline', function() {
        assert.equal(HTML.condense('foo\r\n  \r\n  bar\n'), 'foo\n\nbar\n');
      });
    });

    describe('padcomments', function() {
      it('should add newlines around comments', function() {
        assert.equal(HTML.padcomments('<!-- foo -->'), '\n<!-- foo -->');
      });
    });

    describe('parseAttributes', function() {
      it('should parse attributes', function() {
        assert.equal(HTML.parseAttributes({a: 'b', c: 200 }), 'a="b" c="200"');
      });
    });

    describe('toAttributes', function() {
      it('should convert an object hash into html attributes', function() {
        var hash = {disabled: true, display: 'hidden', class: 'fade'};
        assert.equal(HTML.toAttributes(hash), ' disabled display="hidden" class="fade"');
      });
    });
  });
});
