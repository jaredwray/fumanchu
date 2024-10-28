import {createHandlebars, helpers, handlebars} from '../dist/index.js';
import {expect} from 'chai';

describe('testing es6 examples', function() {
    it('should get the handlebars from an es6 import', async function() {
        const handlebars = await createHandlebars();

        // Use Fumanchu instead of Handlebars
        const source = 'Hello, {{name}}!';
        const template = handlebars.compile(source);
           // Render the template with a context
        const result = template({ name: 'John' });

        // Assert the rendered output
        expect(result).to.equal('Hello, John!');
        
        //testing the export of handlebarHelpers
        expect(helpers).to.be.a('function');

        //testing the export of handlebarHelpers
        expect(handlebars).to.not.be.undefined;
    });
});