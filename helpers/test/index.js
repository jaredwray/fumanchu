var assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const {createHandlebars, fumanchu} = require('../../dist/index.js');

describe('Fumanchu Template Test', function() {
    it('should render name correctly', async function() {
        const Fumanchu = await createHandlebars();

        // Use Fumanchu instead of Handlebars
        const source = 'Hello, {{name}}!';
        const template = Fumanchu.compile(source);
           // Render the template with a context
        const result = template({ name: 'John' });

        // Assert the rendered output
        expect(result).to.equal('Hello, John!');
    });

    it('should return the sum of two numbers.', async function() {
        const Fumanchu = await createHandlebars();
        var fn = Fumanchu.compile('{{add value 5}}');
        assert.equal(fn({value: 5}), '10');
    });

    it('should have the helper class exported', function() {
        var helpers = require('../../dist/index.js').helpers;
        const HandlebarsLib = require('handlebars');
        const handlebars = HandlebarsLib.create();
        helpers({ handlebars: handlebars });
        var fn = handlebars.compile('{{add value 5}}');
        assert.equal(fn({value: 5}), '10');
    });

    it('should have the handlebars object exported', function() {
        var {handlebars, helpers} = require('../../dist/index.js');
        helpers({ handlebars: handlebars });
        var fn = handlebars.compile('{{add value 5}}');
        assert.equal(fn({value: 5}), '10');
    });

    it('does fumanchu register year', function() {
        var handlebars = fumanchu();
        var fn = handlebars.compile('{{year}}');
        assert.equal(fn(), new Date().getFullYear().toString());
    });
});

