'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

// Array utils
require('array-sort', 'sortBy');
require('arr-flatten', 'flatten');

// Html utils
require('to-gfm-code-block', 'block');
require('html-tag', 'tag');

// JavaScript language utils
require('kind-of', 'typeOf');

// matching utils
require('is-glob');
require('micromatch', 'mm');
utils.falsey = function falsey(val, keywords) {
    if (!val) {
      return true;
    }
  
    let words = keywords || [
      "0",
      "false",
      "nada",
      "nil",
      "nay",
      "nah",
      "negative",
      "no",
      "none",
      "nope",
      "nul",
      "null",
      "nix",
      "nyet",
      "uh-uh",
      "veto",
      "zero",
    ];
  
    if (!Array.isArray(words)) {
      words = [words];
    }
  
    const lower = typeof val === "string" ? val.toLowerCase() : null;
  
    for (const word of words) {
      if (word === val) {
        return true;
      }
      if (word === lower) {
        return true;
      }
    }
  
    return false;
  };

// Number utils
require('is-even');
require('is-number');

// Object utils
require('create-frame');
require('get-object');
require('get-value', 'get');
require('for-own');

// Path utils
require('relative');
require = fn;

/**
 * Expose `utils`
 */

module.exports = utils;
