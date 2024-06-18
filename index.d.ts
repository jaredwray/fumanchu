import { TemplateDelegate, RuntimeOptions, HelperDelegate, TemplateSpecification, compile, registerHelper } from 'handlebars';

declare module 'handlebars' {
    interface Handlebars {
        create(): typeof Handlebars;
    }
}

declare namespace Helpers {
    type HelperFunction = (options?: { handlebars: typeof Handlebars }) => void;
}

declare const handlebars: {
    compile: typeof compile;
    registerHelper: typeof registerHelper;
    TemplateDelegate: typeof TemplateDelegate;
    RuntimeOptions: typeof RuntimeOptions;
    HelperDelegate: typeof HelperDelegate;
    TemplateSpecification: typeof TemplateSpecification;
    create: typeof HandlebarsLib.create;
}

declare const helpers: Helpers.HelperFunction;

declare const handlebarHelpers: Helpers.HelperFunction;

export = handlebars;
export { handlebarHelpers };
