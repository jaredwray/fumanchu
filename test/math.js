'use strict';

require('mocha');
var assert = require('assert');
var hbs = require('handlebars').create();
var helpers = require('../helpers/helpers.js');
helpers.math({handlebars: hbs});

describe('math', function() {
  describe('add', function() {
    it('should return the sum of two numbers.', function() {
      var fn = hbs.compile('{{add value 5}}');
      assert.equal(fn({value: 5}), '10');
    });
    it('should return the sum of two variable numbers as strings.', function() {
      var fn = hbs.compile('{{add a b}}');
      assert.equal(fn({a: '5', b: '5'}), '10');
    });
    it('should return blank with undefined', function() {
      var fn = hbs.compile('{{add a b}}');
      assert.equal(fn({a: undefined, b: 5}), '');
    });
  });

  describe('average', function() {
    it('should return the average of a list of numbers:', function() {
      var fn = hbs.compile('{{avg 1 2 3 4}}');
      assert.equal(fn(), '2.5');
    });

    it('should return the average of an array of numbers:', function() {
      var fn = hbs.compile('{{avg array}}');
      assert.equal(fn({array: [1, 3, 6, 9]}), '4.75');
    });
  });

  describe('ceil', function() {
    it('should return the value rounded up to the nearest integer.', function() {
      var fn = hbs.compile('{{ceil value}}');
      assert.equal(fn({value: 5.6}), '6');
    });
  });

  describe('divide', function() {
    it('should return the division of two numbers.', function() {
      var fn = hbs.compile('{{divide value 5}}');
      assert.equal(fn({value: 5}), '1');
    });
  });

  describe('floor', function() {
    it('should return the value rounded down to the nearest integer.', function() {
      var fn = hbs.compile('{{floor value}}');
      assert.equal(fn({value: 5.6}), '5');
    });
  });

  describe('multiply', function() {
    it('should return the multiplication of two numbers.', function() {
      var fn = hbs.compile('{{multiply value 5}}');
      assert.equal(fn({value: 5}), '25');
    });
  });

  describe('remainder', function() {
    it('should return the remainder of two numbers.', function() {
      var fn = hbs.compile('{{remainder value 5}}');
      assert.equal(fn({value: 7}), '2');
    });

    it('should take the sign of the dividend.', function() {
      var fn = hbs.compile('{{remainder 5 -3}}');
      assert.equal(fn(), '2');
    });
  });

  describe('round', function() {
    it('should return the value rounded to the nearest integer.', function() {
      var fn = hbs.compile('{{round value}}');
      assert.equal(fn({value: 5.69}), '6');
    });
  });

  describe('subtract', function() {
    it('should return the difference of two numbers.', function() {
      var fn = hbs.compile('{{subtract value 5}}');
      assert.equal(fn({value: 5}), '0');
    });
  });

  describe('sum', function() {
    it('should return the sum of multiple numbers.', function() {
      var fn = hbs.compile('{{sum value 67 80}}');
      assert.equal(fn({value: 20}), '167');
    });
    it('should return the sum of multiple numbers.', function() {
      var fn = hbs.compile('{{sum 1 2 3}}');
      assert.equal(fn(), '6');
    });
    it('should return the total sum of array.', function() {
      var fn = hbs.compile('{{sum value}}');
      assert.equal(fn({value: [1, 2, 3]}), '6');
    });
    it('should return the total sum of array and numbers.', function() {
      var fn = hbs.compile('{{sum value 5}}');
      assert.equal(fn({value: [1, 2, 3]}), '11');
    });
  });

  describe('random', function() {
    it('should return a random number between two values.', function() {
      var fn = hbs.compile('{{random 5 10}}');
      assert(fn() >= 5);
      assert(fn() <= 10);
    });
  });
  describe('divide', function() {
    it('should throw an error when A is not valid.', function() {
      try {
        var fn = hbs.compile('{{divide a b}}');
        assert.equal(fn({a: undefined, b: 5}), '1');
      } catch (error) {
        assert(error);
      }
    });
    it('should throw an error when B is not valid.', function() {
      try {
        var fn = hbs.compile('{{divide a b}}');
        assert.equal(fn({a: 5, b: undefined}), '1');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('ceil', function() {
    it('should an error when the value is not a number', function() {
      try {
        var fn = hbs.compile('{{ceil value}}');
        assert.equal(fn({value: undefined}), '6');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('abs', function() {
    it('should an error when the value is not a number', function() {
      try {
        var fn = hbs.compile('{{abs value}}');
        assert.equal(fn({value: undefined}), '6');
      } catch (error) {
        assert(error);
      }
    });
    it('should an error when the value is not a number', function() {
      var fn = hbs.compile('{{abs value}}');
      assert.equal(fn({value: 1}), '1');
    });
  });
  describe('floor', function() {
    it('should return error with not a number.', function() {
      try {
        var fn = hbs.compile('{{floor value}}');
        assert.equal(fn({value: undefined}), '5');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('minus', function() {
    it('should do a simple minus', function() {
      var fn = hbs.compile('{{minus a b}}');
      assert.equal(fn({a: 10, b: 5}), '5');
    });
    it('should throw an error when A is not valid.', function() {
      try {
        var fn = hbs.compile('{{minus a b}}');
        assert.equal(fn({a: undefined, b: 5}), '1');
      } catch (error) {
        assert(error);
      }
    });
    it('should throw an error when A is not valid.', function() {
      try {
        var fn = hbs.compile('{{minus a b}}');
        assert.equal(fn({a: 5, b: undefined}), '1');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('modulo', function() {
    it('should return valid response', function() {
      var fn = hbs.compile('{{modulo a b}}');
      assert.equal(fn({a: 100, b: 5}), '0');
    });
    it('should return error with not a number.', function() {
      try {
        var fn = hbs.compile('{{modulo a b}}');
        assert.equal(fn({a: undefined, b: 5}), '5');
      } catch (error) {
        assert(error);
      }
    });
    it('should return error with not a number.', function() {
      try {
        var fn = hbs.compile('{{modulo a b}}');
        assert.equal(fn({a: 5, b: undefined}), '5');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('multiply', function() {
    it('should return error with undifined value on a', function() {
      try {
        var fn = hbs.compile('{{multiply a b}}');
        assert.equal(fn({a: undefined, b: 5}), '25');
      } catch (error) {
        assert(error);
      }
    });
    it('should return error with undifined value on b', function() {
      try {
        var fn = hbs.compile('{{multiply a b}}');
        assert.equal(fn({a: 5, b: undefined}), '25');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('plus', function() {
    it('should return error with undifined value on a', function() {
      try {
        var fn = hbs.compile('{{plus a b}}');
        assert.equal(fn({a: undefined, b: 5}), '25');
      } catch (error) {
        assert(error);
      }
    });
    it('should return error with undifined value on b', function() {
      try {
        var fn = hbs.compile('{{plus a b}}');
        assert.equal(fn({a: 5, b: undefined}), '25');
      } catch (error) {
        assert(error);
      }
    });
    it('add the values together', function() {
      var fn = hbs.compile('{{plus a b}}');
      assert.equal(fn({a: 5, b: 5}), '10');
    });
  });
  describe('random', function() {
    it('should return an error with an undefined value on min', function() {
      try {
        var fn = hbs.compile('{{random a b}}');
        assert(fn({a: undefined, b: 5}), '1');        
      } catch (error) {
        assert(error);
      }
    });
    it('should return an error with an undefined value on max', function() {
      try {
        var fn = hbs.compile('{{random a b}}');
        assert(fn({a: 5, b: undefined}), '1');        
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('round', function() {
    it('should return an error when the value is undefined', function() {
      try {
        var fn = hbs.compile('{{round value}}');
        assert.equal(fn({value: undefined}), '6');
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('subtract', function() {
    it('should return an error with an undefined value on min', function() {
      try {
        var fn = hbs.compile('{{subtract a b}}');
        assert(fn({a: undefined, b: 5}), '1');        
      } catch (error) {
        assert(error);
      }
    });
    it('should return an error with an undefined value on max', function() {
      try {
        var fn = hbs.compile('{{subtract a b}}');
        assert(fn({a: 5, b: undefined}), '1');        
      } catch (error) {
        assert(error);
      }
    });
  });
  describe('times', function() {
    it('should return a valid multiplication', function() {
      var fn = hbs.compile('{{times a b}}');
      assert(fn({a: 5, b: 5}), '25');        
    });
  });
});
