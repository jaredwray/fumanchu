import {handlebars, helpers} from '../index.js';
import {expect} from 'chai';

describe('testing es6 examples', function() {
    it('should get the handlebars from an es6 import', function() {
        // Use Fumanchu instead of Handlebars
        const source = 'Hello, {{name}}!';
        const template = handlebars.compile(source);
           // Render the template with a context
        const result = template({ name: 'John' });

        // Assert the rendered output
        expect(result).to.equal('Hello, John!');
        expect(helpers).to.be.a('function');
        expect(helpers).to.be.a('function');
    });
});