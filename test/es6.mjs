import {createHandlebars, helpers, handlebars, Handlebars} from '../dist/index.js';
import {expect} from 'chai';

describe('testing es6 examples', function() {
    it('should get the handlebars from an es6 import', async function() {
        const fumanchu = await createHandlebars();

        // Use Fumanchu instead of Handlebars
        const source = 'Hello, {{name}}!';
        const template = fumanchu.compile(source);
           // Render the template with a context
        const result = template({ name: 'John' });

        // Assert the rendered output
        expect(result).to.equal('Hello, John!');
        
        //testing the export of handlebarHelpers
        expect(helpers).to.be.a('function');

        //testing the export of handlebarHelpers
        expect(handlebars.compile).to.not.be.undefined;

        //test the Handlebars object
        expect(Handlebars.create).to.not.be.undefined;
    });
});