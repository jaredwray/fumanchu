var assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const Fumanchu = require('../index.js');

describe('Fumanchu Template Test', function() {
    it('should render name correctly', function() {
        // Use Fumanchu instead of Handlebars
        const source = 'Hello, {{name}}!';
        const template = Fumanchu().compile(source);
           // Render the template with a context
        const result = template({ name: 'John' });

        // Assert the rendered output
        expect(result).to.equal('Hello, John!');
    });

    it('should return the sum of two numbers.', function() {
        var fn = Fumanchu().compile('{{add value 5}}');
        assert.equal(fn({value: 5}), '10');
    });
});

