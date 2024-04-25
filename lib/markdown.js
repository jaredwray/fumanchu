'use strict';
const hljs = require('highlight.js');
const utils = require('handlebars-utils');
const Remarkable = require('remarkable');

/**
 * Expose markdown `helpers` (for performance we're using getters so
 * that the helpers are only loaded if called)
 */

var helpers = module.exports;
var markdown;

/**
 * Block helper that converts a string of inline markdown to HTML.
 *
 * ```handlebars
 * {{#markdown}}
 * # Foo
 * {{/markdown}}
 * <!-- results in: <h1>Foo</h1> -->
 * ```
 * @name .markdown
 * @param {Object} `context`
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

Object.defineProperty(helpers, 'markdown', {
  configurable: true,
  enumerable: true,
  set: function(val) {
    markdown = val;
  },
  get: function() {
    // this is defined as a getter to avoid calling this function
    // unless the helper is actually used
    return markdown || (markdown = this.helpersForMarkdown());
  }
});

/**
 * Read a markdown file from the file system and inject its contents after
 * converting it to HTML.
 *
 * ```handlebars
 * {{md "foo/bar.md"}}
 * ```
 * @param {Object} `context`
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

helpers.md = require('helper-md');


helpers.helpersForMarkdown = function(config) {
  const defaults = { html: true, breaks: true, highlight: helpers.highlightFormMarkdown };
  if (typeof config === 'string' || utils.isOptions(config)) {
    return markdown.apply(defaults, arguments);
  }

  function markdown(str, locals, options) {
    if (typeof str !== 'string') {
      options = locals;
      locals = str;
      str = true;
    }

    if (utils.isOptions(locals)) {
      options = locals;
      locals = {};
    }

    const ctx = utils.context(this, locals, options);
    let opts = utils.options(this, locals, options);
    opts = Object.assign({}, defaults, config, opts);

    if (opts.hasOwnProperty('lang')) {
      opts.langPrefix = opts.lang;
    }

    const md = new Remarkable(opts);
    const val = utils.value(str, ctx, options);
    return md.render(val);
  }
  return markdown;
};

helpers.highlightFormMarkdown = function(code, lang) {
  if(lang) {
    return hljs.highlight(code, {language: lang}).value;
  } 
  return hljs.highlightAuto(code).value;
}
