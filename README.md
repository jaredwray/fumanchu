![Fumanchu](site/logo.svg "Fumanchu")


# fumanchu
Handlebars + Helpers Together

[![tests](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml/badge.svg)](https://github.com/jaredwray/fumanchu/actions/workflows/tests.yaml)
[![codecov](https://codecov.io/gh/jaredwray/fumanchu/graph/badge.svg?token=gtYw78huva)](https://codecov.io/gh/jaredwray/fumanchu)
[![npm version](https://img.shields.io/npm/v/@jaredwray/fumanchu.svg)](https://npmjs.com/package/@jaredwray/fumanchu)
[![GitHub license](https://img.shields.io/github/license/jaredwray/fumanchu)](https://github.com/jaredwray/fumanchu/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dm/@jaredwray/fumanchu)](https://npmjs.com/package/@jaredwray/fumanchu)

[Handlebars](https://github.com/handlebars-lang/handlebars.js) + [Handlebars-helpers](https://github.com/helpers/handlebars-helpers) (helpers are now maintained in this project) combined into a single package. Easily use it as a drop in replacement when using handlebars directly. More than 180 Handlebars helpers in ~20 categories. Helpers can be used with Assemble, Generate, Verb, Ghost, gulp-handlebars, grunt-handlebars, consolidate, or any node.js/Handlebars project. Currently **189 helpers** in **20 categories**! 🎉

# Table of Contents
* [Using in Nodejs](#using-in-nodejs)
* [Just using Handlebar Helpers](#using-handlebars-helpers)
* [Helpers](#helpers)
  * [array](https://fumanchu.org/docs/legacy-helpers/array/)
  * [code](https://fumanchu.org/docs/legacy-helpers/code/)
  * [comparison](https://fumanchu.org/docs/legacy-helpers/comparison/)
  * [collection](https://fumanchu.org/docs/legacy-helpers/collection/)
  * [date](https://fumanchu.org/docs/legacy-helpers/date/)
  * [fs](https://fumanchu.org/docs/legacy-helpers/fs/)
  * [html](https://fumanchu.org/docs/legacy-helpers/html/)
  * [i18n](https://fumanchu.org/docs/legacy-helpers/i18n/)
  * [inflection](https://fumanchu.org/docs/legacy-helpers/inflection/)
  * [logging](https://github.com/jonathas/logging-helpers)
  * [markdown](https://fumanchu.org/docs/legacy-helpers/markdown/)
  * [match](https://fumanchu.org/docs/legacy-helpers/match/)
  * [math]()(https://fumanchu.org/docs/legacy-helpers/math/)
  * **[misc](#misc)** ([code](lib/misc.js) | [unit tests](test/misc.js))
  * **[number](#number)** ([code](lib/number.js) | [unit tests](test/number.js))
  * **[object](#object)** ([code](lib/object.js) | [unit tests](test/object.js))
  * **[path](#path)** ([code](lib/path.js) | [unit tests](test/path.js))
  * **[regex](#regex)** ([code](lib/regex.js) | [unit tests](test/regex.js))
  * **[string](#string)** ([code](lib/string.js) | [unit tests](test/string.js))
  * **[url](#url)** ([code](lib/url.js) | [unit tests](test/url.js))
* [How to Contribute](#how-to-contribute)
* [License and Copyright](#license-and-copyright)

# Usage Nodejs

```bash
npm install @jaredwray/fumanchu --save
```

```javascript
var {handlebars, helpers} = require('@jaredwray/fumanchu');
helpers({ handlebars: handlebars });
var template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
var html = template({foo: 'bar'});
console.log(html);
```

If using it with es6 you can access `handlebars` and `helpers`:

```javascript
import {handlebars, helpers} from '@jaredwray/fumanchu';
helpers({ handlebars: handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html);
```

If you want to just get an instance of handlebars via `createHandlebars` you can do the following **(it is async)**:

```javascript
import {createHandlebars} from '@jaredwray/fumanchu';
const handlebars = await createHandlebars(); //this will return a handlebars instance with all helpers
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html); // <p>Foo is bar</p>
```

It's just that easy! No need to add Handlebars to your project, it's already included.

# Using Handlebars Helpers

If you only want to use handlebar helpers you can easily do that by doing the following:

```javascript
var {helpers} = require('@jaredwray/fumanchu');
var handlebars = require('handlebars');
var helpersFunction = await helpers();
helpersFunction({ handlebars: handlebars });
var fn = handlebars.compile('{{add value 5}}');
console.log(fn); // 10
```

If using it with es6 you can access `helpers` via destructuring:

```javascript
import {helpers} from '@jaredwray/fumanchu';
import handlebars from 'handlebars';
const helpersFunction = await helpers();
helpersFunction({ handlebars: handlebars });
const template = handlebars.compile('{{#if (eq foo "bar")}}<p>Foo is bar</p>{{/if}}');
const html = template({foo: 'bar'});
console.log(html); // <p>Foo is bar</p>
```
# All helpers

### [date helpers](#date)

Visit the: [code](lib/date.js) | [unit tests](test/date.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+date+helpers))

* **[year](#year)** ([code](lib/date.js#L15) | [no tests])
* **[date](#date)** ([code](lib/date.js#Lundefined) | [no tests])
* **[moment](#moment)** ([code](lib/date.js#L24) | [no tests])

### [fs helpers](#fs)

Visit the: [code](lib/fs.js) | [unit tests](test/fs.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+fs+helpers))

* **[fileSize](#fileSize)** ([code](lib/fs.js#L14) | [no tests])
* **[read](#read)** ([code](lib/fs.js#L29) | [tests](test/fs.js#L16))
* **[readdir](#readdir)** ([code](lib/fs.js#L42) | [tests](test/fs.js#L23))

### [html helpers](#html)

Visit the: [code](lib/html.js) | [unit tests](test/html.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+html+helpers))

* **[attr](#attr)** ([code](lib/html.js#L23) | [tests](test/html.js#L13))
* **[css](#css)** ([code](lib/html.js#L45) | [tests](test/html.js#L21))
* **[js](#js)** ([code](lib/html.js#L89) | [tests](test/html.js#L69))
* **[sanitize](#sanitize)** ([code](lib/html.js#L121) | [tests](test/html.js#L98))
* **[ul](#ul)** ([code](lib/html.js#L135) | [tests](test/html.js#L108))
* **[ol](#ol)** ([code](lib/html.js#L154) | [tests](test/html.js#L115))
* **[thumbnailImage](#thumbnailImage)** ([code](lib/html.js#L176) | [tests](test/html.js#L122))

### [i18n helpers](#i18n)

Visit the: [code](lib/i18n.js) | [unit tests](test/i18n.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+i18n+helpers))

* **[i18n](#i18n)** ([code](lib/i18n.js#L18) | [tests](test/i18n.js#L11))

### [inflection helpers](#inflection)

Visit the: [code](lib/inflection.js) | [unit tests](test/inflection.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+inflection+helpers))

* **[inflect](#inflect)** ([code](lib/inflection.js#L30) | [tests](test/inflection.js#L9))
* **[ordinalize](#ordinalize)** ([code](lib/inflection.js#L58) | [tests](test/inflection.js#L22))

### [logging helpers](#logging)

Visit the: [code](lib/logging.js) | [unit tests](test/logging.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+logging+helpers))

* **[log](#log)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[ok](#ok)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[success](#success)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[info](#info)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[warning](#warning)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[warn](#warn)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[error](#error)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[danger](#danger)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[bold](#bold)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[_debug](#_debug)** ([code](lib/logging.js#Lundefined) | [no tests])
* **[_inspect](#_inspect)** ([code](lib/logging.js#Lundefined) | [no tests])

### [markdown helpers](#markdown)

* **[markdown](#markdown)** ([code](lib/markdown.js#Lundefined) | [tests](test/markdown.js#L10))
* **[md](#md)** ([code](lib/markdown.js#L55) | [tests](test/markdown.js#L18))

### [match helpers](#match)

Visit the: [code](lib/match.js) | [unit tests](test/match.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+match+helpers))

* **[match](#match)** ([code](lib/match.js#L23) | [tests](test/match.js#L13))
* **[isMatch](#isMatch)** ([code](lib/match.js#L47) | [tests](test/match.js#L61))
* **[mm](#mm)** ([code](lib/match.js#L56) | [tests](test/match.js#L67))

### [math helpers](#math)

Visit the: [code](lib/math.js) | [unit tests](test/math.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+math+helpers))

* **[abs](#abs)** ([code](lib/math.js#L15) | [test](test/math.js#L149))
* **[add](#add)** ([code](lib/math.js#L31) | [tests](test/math.js#L10))
* **[avg](#avg)** ([code](lib/math.js#L54) | [tests](test/math.js#L25))
* **[ceil](#ceil)** ([code](lib/math.js#L69) | [tests](test/math.js#L29))
* **[divide](#divide)** ([code](lib/math.js#L84) | [tests](test/math.js#L36))
* **[floor](#floor)** ([code](lib/math.js#L102) | [tests](test/math.js#L43))
* **[minus](#minus)** ([code](lib/math.js#L118) | [tests](test/math.js#L169))
* **[modulo](#modulo)** ([code](lib/math.js#L137) | [tests](test/math.js#L191))
* **[multiply](#multiply)** ([code](lib/math.js#L157) | [tests](test/math.js#L50))
* **[plus](#plus)** ([code](lib/math.js#L175) | [tests](test/math.js#L231))
* **[random](#random)** ([code](lib/math.js#L194) | [tests](test/math.js#L102))
* **[remainder](#remainder)** ([code](lib/math.js#L212) | [tests](test/math.js#L57))
* **[round](#round)** ([code](lib/math.js#L224) | [tests](test/math.js#L69))
* **[subtract](#subtract)** ([code](lib/math.js#L241) | [tests](test/math.js#L76))
* **[sum](#sum)** ([code](lib/math.js#L263) | [tests](test/math.js#L83))
* **[times](#times)** ([code](lib/math.js#L286) | [tests](test/math.js#L299))

### [misc helpers](#misc)

Visit the: [code](lib/misc.js) | [unit tests](test/misc.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+misc+helpers))

* **[frame](#frame)** ([code](lib/misc.js#L11) | [tests](test/misc.js#L1))
* **[option](#option)** ([code](lib/misc.js#L26) | [tests](test/misc.js#L20))
* **[noop](#noop)** ([code](lib/misc.js#L39) | [tests](test/misc.js#L13))
* **[typeOf](#typeOf)** ([code](lib/misc.js#L59) | [tests](test/misc.js#L38))
* **[withHash](#withHash)** ([code](lib/misc.js#L71) | [tests](test/misc.js#L38))

### [number helpers](#number)

Visit the: [code](lib/number.js) | [unit tests](test/number.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+number+helpers))

* **[bytes](#bytes)** ([code](lib/number.js#L24) | [tests](test/number.js#L10))
* **[addCommas](#addCommas)** ([code](lib/number.js#L61) | [tests](test/number.js#L84))
* **[phoneNumber](#phoneNumber)** ([code](lib/number.js#L74) | [tests](test/number.js#L30))
* **[toAbbr](#toAbbr)** ([code](lib/number.js#L92) | [tests](test/number.js#L91))
* **[toExponential](#toExponential)** ([code](lib/number.js#L130) | [tests](test/number.js#L59))
* **[toFixed](#toFixed)** ([code](lib/number.js#L153) | [tests](test/number.js#L37))
* **[toFloat](#toFloat)** ([code](lib/number.js#L169) | [tests](test/number.js#L77))
* **[toInt](#toInt)** ([code](lib/number.js#L179) | [tests](test/number.js#L70))
* **[toPrecision](#toPrecision)** ([code](lib/number.js#L196) | [tests](test/number.js#L48))

### [object helpers](#object)

Visit the: [code](lib/object.js) | [unit tests](test/object.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+object+helpers))

* **[extend](#extend)** ([code](lib/object.js#L18) | [tests](test/object.js#L15))
* **[forIn](#forIn)** ([code](lib/object.js#L55) | [tests](test/object.js#L33))
* **[forOwn](#forOwn)** ([code](lib/object.js#L81) | [tests](test/object.js#L50))
* **[toPath](#toPath)** ([code](lib/object.js#L106) | [tests](test/object.js#L87))
* **[get](#get)** ([code](lib/object.js#L128) | [tests](test/object.js#L77))
* **[getObject](#getObject)** ([code](lib/object.js#L149) | [tests](test/object.js#L77))
* **[hasOwn](#hasOwn)** ([code](lib/object.js#L167) | [tests](test/object.js#L126))
* **[isObject](#isObject)** ([code](lib/object.js#L183) | [tests](test/object.js#L144))
* **[JSONparse](#JSONparse)** ([code](lib/object.js#L201) | [tests](test/object.js#L164))
* **[JSONstringify](#JSONstringify)** ([code](lib/object.js#L218) | [no tests])
* **[merge](#merge)** ([code](lib/object.js#L235) | [tests](test/object.js#L156))
* **[parseJSON](#parseJSON)** ([code](lib/object.js#L254) | [no tests])
* **[pick](#pick)** ([code](lib/object.js#L267) | [tests](test/object.js#L171))
* **[stringify](#stringify)** ([code](lib/object.js#L290) | [tests](test/object.js#L199))

### [path helpers](#path)

Visit the: [code](lib/path.js) | [unit tests](test/path.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+path+helpers))

* **[absolute](#absolute)** ([code](lib/path.js#L20) | [tests](test/path.js#L13))
* **[dirname](#dirname)** ([code](lib/path.js#L40) | [tests](test/path.js#L25))
* **[relative](#relative)** ([code](lib/path.js#L59) | [tests](test/path.js#L32))
* **[basename](#basename)** ([code](lib/path.js#L81) | [tests](test/path.js#L47))
* **[stem](#stem)** ([code](lib/path.js#L100) | [tests](test/path.js#L58))
* **[extname](#extname)** ([code](lib/path.js#L119) | [tests](test/path.js#L69))
* **[resolve](#resolve)** ([code](lib/path.js#L138) | [tests](test/path.js#L145))
* **[segments](#segments)** ([code](lib/path.js#L166) | [tests](test/path.js#L80))

### [regex helpers](#regex)

Visit the: [code](lib/regex.js) | [unit tests](test/regex.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+regex+helpers))

* **[toRegex](#toRegex)** ([code](lib/regex.js#L19) | [tests](test/regex.js#10))
* **[test](#test)** ([code](lib/regex.js#L42) | [tests](test/regex.js#15))

### [string helpers](#string)

Visit the: [code](lib/string.js) | [unit tests](test/string.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+string+helpers))

* **[append](#append)** ([code](lib/string.js#L22) | [tests](test/string.js#L9))
* **[camelcase](#camelcase)** ([code](lib/string.js#L41) | [tests](test/string.js#L10))
* **[capitalize](#capitalize)** ([code](lib/string.js#L60) | [tests](test/string.js#L25))
* **[capitalizeAll](#capitalizeAll)** ([code](lib/string.js#L77) | [tests](test/string.js#L36))
* **[center](#center)** ([code](lib/string.js#L95) | [tests](test/string.js#L47))
* **[chop](#chop)** ([code](lib/string.js#L125) | [tests](test/string.js#L58))
* **[dashcase](#dashcase)** ([code](lib/string.js#L143) | [tests](test/string.js#L73))
* **[dotcase](#dotcase)** ([code](lib/string.js#L162) | [tests](test/string.js#L88))
* **[downcase](#downcase)** ([code](lib/string.js#L182) | [tests](test/string.js#L391))
* **[ellipsis](#ellipsis)** ([code](lib/string.js#L202) | [tests](test/string.js#L103))
* **[hyphenate](#hyphenate)** ([code](lib/string.js#L223) | [tests](test/string.js#L118))
* **[isString](#isString)** ([code](lib/string.js#L240) | [tests](test/string.js#L129))
* **[lowercase](#lowercase)** ([code](lib/string.js#L256) | [tests](test/string.js#L151))
* **[occurrences](#occurrences)** ([code](lib/string.js#L278) | [tests](test/string.js#L162))
* **[pascalcase](#pascalcase)** ([code](lib/string.js#L303) | [tests](test/string.js#L173))
* **[pathcase](#pathcase)** ([code](lib/string.js#L323) | [tests](test/string.js#L188))
* **[plusify](#plusify)** ([code](lib/string.js#L343) | [tests](test/string.js#L203))
* **[prepend](#prepend)** ([code](lib/string.js#L363) | [tests](test/string.js#L409))
* **[raw](#raw)** ([code](lib/string.js#L385) | [tests](test/string.js#L465))
* **[remove](#remove)** ([code](lib/string.js#L413) | [tests](test/string.js#L416)
* **[removeFirst](#removeFirst)** ([code](lib/string.js#L432) | [tests](test/string.js#L422))
* **[replace](#replace)** ([code](lib/string.js#L452) | [tests](test/string.js#L222))
* **[replaceFirst](#replaceFirst)** ([code](lib/string.js#L473) | [tests](test/string.js#L428))
* **[reverse](#reverse)** ([code](lib/string.js#L492) | [tests](test/string.js#L241))
* **[sentence](#sentence)** ([code](lib/string.js#L509) | [tests](test/string.js#L252))
* **[snakecase](#snakecase)** ([code](lib/string.js#L528) | [tests](test/string.js#L263))
* **[split](#split)** ([code](lib/string.js#L547) | [tests](test/string.js#L278))
* **[startsWith](#startsWith)** ([code](lib/string.js#L572) | [tests](test/string.js#L293))
* **[titleize](#titleize)** ([code](lib/string.js#L596) | [tests](test/string.js#L312))
* **[trim](#trim)** ([code](lib/string.js#L623) | [tests](test/string.js#L323))
* **[trimLeft](#trimLeft)** ([code](lib/string.js#L639) | [tests](test/string.js#L436))
* **[trimRight](#trimRight)** ([code](lib/string.js#L657) | [tests](test/string.js#L441))
* **[truncate](#truncate)** ([code](lib/string.js#L680) | [tests](test/string.js#L338))
* **[truncateWords](#truncateWords)** ([code](lib/string.js#L712) | [tests](test/string.js#L447)))
* **[upcase](#upcase)** ([code](lib/string.js#L742) | [tests](test/string.js#458))
* **[uppercase](#uppercase)** ([code](lib/string.js#L763) | [tests](test/string.js#L362))

### [url helpers](#url)

Visit the: [code](lib/url.js) | [unit tests](test/url.js) | [issues](https://github.com/jonathas/handlebars-helpers/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+url+helpers))

* **[encodeURI](#encodeURI)** ([code](lib/url.js#L19) | [tests](test/url.js#L31))
* **[escape](#escape)** ([code](lib/url.js#L34) | [tests](test/url.js#L81))
* **[decodeURI](#decodeURI)** ([code](lib/url.js#L48) | [tests](test/url.js#L38))
* **[url_encode](#url_encode)** ([code](lib/url.js#L59) | [tests](test/url.js#L89))
* **[url_decode](#url_decode)** ([code](lib/url.js#L68) | [tests](test/url.js#L93))
* **[urlResolve](#urlResolve)** ([code](lib/url.js#L82) | [tests](test/url.js#L11))
* **[urlParse](#urlParse)** ([code](lib/url.js#L94) | [tests](test/url.js#L45))
* **[stripQuerystring](#stripQuerystring)** ([code](lib/url.js#L106) | [tests](test/url.js#L24))
* **[stripProtocol](#stripProtocol)** ([code](lib/url.js#L126) | [tests](test/url.js#L53))



### [{{embed}}](lib/code.js#L23)

Embed code from an external file as preformatted text.

**Params**

* `filepath` **{String}**: filepath to the file to embed.
* `language` **{String}**: Optionally specify the language to use for syntax highlighting.
* `returns` **{String}**

**Example**

```html
{{embed 'path/to/file.js'}}
<!-- optionally specify the language to use -->
{{embed 'path/to/file.hbs' 'html')}}
```

### [{{gist}}](lib/code.js#L45)

Embed a GitHub Gist using only the id of the Gist

**Params**

* `id` **{String}**
* `returns` **{String}**

**Example**

```html
{{gist "12345"}}
```

### [{{jsfiddle}}](lib/code.js#L60)

Generate the HTML for a jsFiddle link with the given `params`

**Params**

* `params` **{Object}**
* `returns` **{String}**

**Example**

```html
{{jsfiddle id="0dfk10ks" tabs="true"}}
```







### [{{sanitize}}](lib/html.js#L121)

Strip HTML tags from a string, so that only the text nodes are preserved.

**Params**

* `str` **{String}**: The string of HTML to sanitize.
* `returns` **{String}**

**Example**

```html
{{sanitize "<span>foo</span>"}}
<!-- results in: 'foo' -->
```

### [{{ul}}](lib/html.js#L135)

Block helper for creating unordered lists (`<ul></ul>`)

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

### [{{ol}}](lib/html.js#L154)

Block helper for creating ordered lists  (`<ol></ol>`)

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

### [{{thumbnailImage}}](lib/html.js#L176)

Returns a `<figure>` with a thumbnail linked to a full picture

**Params**

* `context` **{Object}**: Object with values/attributes to add to the generated elements:
* `context.alt` **{String}**
* `context.src` **{String}**
* `context.width` **{Number}**
* `context.height` **{Number}**
* `returns` **{String}**: HTML `<figure>` element with image and optional caption/link.





## misc

### [{{option}}](lib/misc.js#L26)

Return the given value of `prop` from `this.options`.

**Params**

* `prop` **{String}**
* `returns` **{any}**

**Example**

```html
<!-- context = {options: {a: {b: {c: 'ddd'}}}} -->
{{option "a.b.c"}}
<!-- results => `ddd` -->
```

### [{{noop}}](lib/misc.js#L39)

Block helper that renders the block without taking any arguments.

**Params**

* `options` **{Object}**
* `returns` **{String}**

### [{{typeOf}}](lib/misc.js#L59)

Get the native type of the given `value`

**Params**

* `value` **{any}**
* `returns` **{String}**: Returns the type of value.

**Example**

```html
{{typeOf 1}}
//=> 'number'
{{typeOf "1"}}
//=> 'string'
{{typeOf "foo"}}
//=> 'string'
```

### [{{withHash}}](lib/misc.js#L71)

Block helper that builds the context for the block
from the options hash.

**Params**

* `options` **{Object}**: Handlebars provided options object.

## number

### [{{bytes}}](lib/number.js#L24)

Format a number to it's equivalent in bytes. If a string is passed, it's length will be formatted and returned.

**Examples:**

* `'foo' => 3 B`
* `13661855 => 13.66 MB`
* `825399 => 825.39 kB`
* `1396 => 1.4 kB`

**Params**

* `number` **{Number|String}**
* `returns` **{String}**

### [{{addCommas}}](lib/number.js#L61)

Add commas to numbers

**Params**

* `num` **{Number}**
* `returns` **{Number}**

### [{{phoneNumber}}](lib/number.js#L74)

Convert a string or number to a formatted phone number.

**Params**

* `num` **{Number|String}**: The phone number to format, e.g. `8005551212`
* `returns` **{Number}**: Formatted phone number: `(800) 555-1212`

### [{{toAbbr}}](lib/number.js#L92)

Abbreviate numbers to the given number of `precision`. This is for
general numbers, not size in bytes.

**Params**

* `number` **{Number}**
* `precision` **{Number}**
* `returns` **{String}**

### [{{toExponential}}](lib/number.js#L130)

Returns a string representing the given number in exponential notation.

**Params**

* `number` **{Number}**
* `fractionDigits` **{Number}**: Optional. An integer specifying the number of digits to use after the decimal point. Defaults to as many digits as necessary to specify the number.
* `returns` **{Number}**

**Example**

```html
{{toExponential number digits}};
```

### [{{toFixed}}](lib/number.js#L153)

Formats the given number using fixed-point notation.

**Params**

* `number` **{Number}**
* `digits` **{Number}**: (Optional) The number of digits to appear after the decimal point; this may be a value between 0 and 20. If this argument is omitted, it is treated as 0.
* `returns` **{String}**: A string representing the given number using fixed-point notation.

**Example**

```html
{{toFixed "1.1234" 2}}
//=> '1.12'
```

### [{{toFloat}}](lib/number.js#L169)

**Params**

* `number` **{Number}**
* `returns` **{Number}**

### [{{toInt}}](lib/number.js#L179)

**Params**

* `number` **{Number}**
* `returns` **{Number}**

### [{{toPrecision}}](lib/number.js#L196)

Returns a string representing the `Number` object to the specified precision.

**Params**

* `number` **{Number}**
* `precision` **{Number}**: (Optional) An integer specifying the number of significant digits. If precison is not between 1 and 100 (inclusive), it will be coerced to `0`.
* `returns` **{String}**: A string representing a Number object in fixed-point or exponential notation rounded to precision significant digits.

**Example**

```html
{{toPrecision "1.1234" 2}}
//=> '1.1'
```

## object

### [{{extend}}](lib/object.js#L18)

Extend the context with the properties of other objects.
A shallow merge is performed to avoid mutating the context.

**Params**

* `objects` **{Object}**: One or more objects to extend.
* `returns` **{Object}**

### [{{forIn}}](lib/object.js#L55)

Block helper that iterates over the properties of
an object, exposing each key and value on the context.

**Params**

* `context` **{Object}**
* `options` **{Object}**
* `returns` **{String}**

### [{{forOwn}}](lib/object.js#L81)

Block helper that iterates over the **own** properties of
an object, exposing each key and value on the context.

**Params**

* `obj` **{Object}**: The object to iterate over.
* `options` **{Object}**
* `returns` **{String}**

### [{{toPath}}](lib/object.js#L106)

Take arguments and, if they are string or number, convert them to a dot-delineated object property path.

**Params**

* `prop` **{String|Number}**: The property segments to assemble (can be multiple).
* `returns` **{String}**

### [{{get}}](lib/object.js#L128)

Use property paths (`a.b.c`) to get a value or nested value from
the context. Works as a regular helper or block helper.

**Params**

* `prop` **{String}**: The property to get, optionally using dot notation for nested properties.
* `context` **{Object}**: The context object
* `options` **{Object}**: The handlebars options object, if used as a block helper.
* `returns` **{String}**

### [{{getObject}}](lib/object.js#L149)

Use property paths (`a.b.c`) to get an object from
the context. Differs from the `get` helper in that this
helper will return the actual object, including the
given property key. Also, this helper does not work as a
block helper.

**Params**

* `prop` **{String}**: The property to get, optionally using dot notation for nested properties.
* `context` **{Object}**: The context object
* `returns` **{String}**

### [{{hasOwn}}](lib/object.js#L167)

Return true if `key` is an own, enumerable property of the given `context` object.

**Params**

* `key` **{String}**
* `context` **{Object}**: The context object.
* `returns` **{Boolean}**

**Example**

```html
{{hasOwn context key}}
```

### [{{isObject}}](lib/object.js#L183)

Return true if `value` is an object.

**Params**

* `value` **{String}**
* `returns` **{Boolean}**

**Example**

```html
{{isObject "foo"}}
//=> false
```

### [{{JSONparse}}](lib/object.js#L201)

Parses the given string using `JSON.parse`.

**Params**

* `string` **{String}**: The string to parse

**Example**

```html
<!-- string: '{"foo": "bar"}' -->
{{JSONparse string}}
<!-- results in: { foo: 'bar' } -->
```

### [{{JSONstringify}}](lib/object.js#L218)

Stringify an object using `JSON.stringify`.

**Params**

* `obj` **{Object}**: Object to stringify
* `returns` **{String}**

**Example**

```html
<!-- object: { foo: 'bar' } -->
{{JSONstringify object}}
<!-- results in: '{"foo": "bar"}' -->
```

### [{{merge}}](lib/object.js#L235)

Deeply merge the properties of the given `objects` with the
context object.

**Params**

* `object` **{Object}**: The target object. Pass an empty object to shallow clone.
* `objects` **{Object}**
* `returns` **{Object}**

### [{{pick}}](lib/object.js#L267)

Pick properties from the context object.

**Params**

* `properties` **{Array|String}**: One or more properties to pick.
* `context` **{Object}**
* `options` **{Object}**: Handlebars options object.
* `returns` **{Object}**: Returns an object with the picked values. If used as a block helper, the values are passed as context to the inner block. If no values are found, the context is passed to the inverse block.

## path

### [{{absolute}}](lib/path.js#L20)

Get the directory path segment from the given `filepath`.

**Params**

* `ext` **{String}**
* `returns` **{String}**

**Example**

```html
{{absolute "docs/toc.md"}}
<!-- results in: 'docs' -->
```

### [{{dirname}}](lib/path.js#L40)

Get the directory path segment from the given `filepath`.

**Params**

* `ext` **{String}**
* `returns` **{String}**

**Example**

```html
{{dirname "docs/toc.md"}}
<!-- results in: 'docs' -->
```

### [{{relative}}](lib/path.js#L59)

Get the relative filepath from `a` to `b`.

**Params**

* `a` **{String}**
* `b` **{String}**
* `returns` **{String}**

**Example**

```html
{{relative a b}}
```

### [{{basename}}](lib/path.js#L81)

Get the file extension from the given `filepath`.

**Params**

* `ext` **{String}**
* `returns` **{String}**

**Example**

```html
{{basename "docs/toc.md"}}
<!-- results in: 'toc.md' -->
```

### [{{stem}}](lib/path.js#L100)

Get the "stem" from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{stem "docs/toc.md"}}
<!-- results in: 'toc' -->
```

### [{{extname}}](lib/path.js#L119)

Get the file extension from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{extname "docs/toc.md"}}
<!-- results in: '.md' -->
```

### [{{resolve}}](lib/path.js#L138)

Resolve an absolute path from the given `filepath`.

**Params**

* `filepath` **{String}**
* `returns` **{String}**

**Example**

```html
{{resolve "docs/toc.md"}}
<!-- results in: '/User/dev/docs/toc.md' -->
```

### [{{segments}}](lib/path.js#L166)

Get specific (joined) segments of a file path by passing a range of array indices.

**Params**

* `filepath` **{String}**: The file path to split into segments.
* `returns` **{String}**: Returns a single, joined file path.

**Example**

```html
{{segments "a/b/c/d" "2" "3"}}
<!-- results in: 'c/d' -->

{{segments "a/b/c/d" "1" "3"}}
<!-- results in: 'b/c/d' -->

{{segments "a/b/c/d" "1" "2"}}
<!-- results in: 'b/c' -->
```

## regex

### [{{toRegex}}](lib/regex.js#L19)

Convert the given string to a regular expression.

**Params**

* `str` **{String}**
* `returns` **{RegExp}**

**Example**

```html
{{toRegex "foo"}}
<!-- results in: /foo/ -->
```

### [{{test}}](lib/regex.js#L42)

Returns true if the given `str` matches the given regex. A regex can be passed on the context, or using the [toRegex](#toregex) helper as a subexpression.

**Params**

* `str` **{String}**
* `returns` **{RegExp}**

**Example**

```html
{{test "bar" (toRegex "foo")}}
<!-- results in: false -->
{{test "foobar" (toRegex "foo")}}
<!-- results in: true -->
{{test "foobar" (toRegex "^foo$")}}
<!-- results in: false -->
```

## string

### [{{append}}](lib/string.js#L22)

Append the specified `suffix` to the given string.

**Params**

* `str` **{String}**
* `suffix` **{String}**
* `returns` **{String}**

**Example**

```html
<!-- given that "item.stem" is "foo" -->
{{append item.stem ".html"}}
<!-- results in:  'foo.html' -->
```

### [{{camelcase}}](lib/string.js#L41)

camelCase the characters in the given `string`.

**Params**

* `string` **{String}**: The string to camelcase.
* `returns` **{String}**

**Example**

```html
{{camelcase "foo bar baz"}};
<!-- results in:  'fooBarBaz' -->
```

### [{{capitalize}}](lib/string.js#L60)

Capitalize the first word in a sentence.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{capitalize "foo bar baz"}}
<!-- results in:  "Foo bar baz" -->
```

### [{{capitalizeAll}}](lib/string.js#L77)

Capitalize all words in a string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{capitalizeAll "foo bar baz"}}
<!-- results in:  "Foo Bar Baz" -->
```

### [{{center}}](lib/string.js#L95)

Center a string using non-breaking spaces

**Params**

* `str` **{String}**
* `spaces` **{String}**
* `returns` **{String}**

### [{{chop}}](lib/string.js#L125)

Like trim, but removes both extraneous whitespace **and non-word characters** from the beginning and end of a string.

**Params**

* `string` **{String}**: The string to chop.
* `returns` **{String}**

**Example**

```html
{{chop "_ABC_"}}
<!-- results in:  'ABC' -->

{{chop "-ABC-"}}
<!-- results in:  'ABC' -->

{{chop " ABC "}}
<!-- results in:  'ABC' -->
```

### [{{dashcase}}](lib/string.js#L143)

dash-case the characters in `string`. Replaces non-word characters and periods with hyphens.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{dashcase "a-b-c d_e"}}
<!-- results in:  'a-b-c-d-e' -->
```

### [{{dotcase}}](lib/string.js#L162)

dot.case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{dotcase "a-b-c d_e"}}
<!-- results in:  'a.b.c.d.e' -->
```

### [{{downcase}}](lib/string.js#L182)

Lowercase all of the characters in the given string. Alias for [lowercase](#lowercase).

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{downcase "aBcDeF"}}
<!-- results in:  'abcdef' -->
```

### [{{ellipsis}}](lib/string.js#L202)

Truncates a string to the specified `length`, and appends it with an elipsis, `…`.

**Params**

* `str` **{String}**
* `length` **{Number}**: The desired length of the returned string.
* `returns` **{String}**: The truncated string.

**Example**

```html
{{ellipsis (sanitize "<span>foo bar baz</span>"), 7}}
<!-- results in:  'foo bar…' -->
{{ellipsis "foo bar baz", 7}}
<!-- results in:  'foo bar…' -->
```

### [{{hyphenate}}](lib/string.js#L223)

Replace spaces in a string with hyphens.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{hyphenate "foo bar baz qux"}}
<!-- results in:  "foo-bar-baz-qux" -->
```

### [{{isString}}](lib/string.js#L240)

Return true if `value` is a string.

**Params**

* `value` **{String}**
* `returns` **{Boolean}**

**Example**

```html
{{isString "foo"}}
<!-- results in:  'true' -->
```

### [{{lowercase}}](lib/string.js#L256)

Lowercase all characters in the given string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{lowercase "Foo BAR baZ"}}
<!-- results in:  'foo bar baz' -->
```

### [{{occurrences}}](lib/string.js#L278)

Return the number of occurrences of `substring` within the given `string`.

**Params**

* `str` **{String}**
* `substring` **{String}**
* `returns` **{Number}**: Number of occurrences

**Example**

```html
{{occurrences "foo bar foo bar baz" "foo"}}
<!-- results in:  2 -->
```

### [{{pascalcase}}](lib/string.js#L303)

PascalCase the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{pascalcase "foo bar baz"}}
<!-- results in:  'FooBarBaz' -->
```

### [{{pathcase}}](lib/string.js#L323)

path/case the characters in `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{pathcase "a-b-c d_e"}}
<!-- results in:  'a/b/c/d/e' -->
```

### [{{plusify}}](lib/string.js#L343)

Replace spaces in the given string with pluses.

**Params**

* `str` **{String}**: The input string
* `returns` **{String}**: Input string with spaces replaced by plus signs

**Example**

```html
{{plusify "foo bar baz"}}
<!-- results in:  'foo+bar+baz' -->
```

### [{{prepend}}](lib/string.js#L363)

Prepends the given `string` with the specified `prefix`.

**Params**

* `str` **{String}**
* `prefix` **{String}**
* `returns` **{String}**

**Example**

```html
<!-- given that "val" is "bar" -->
{{prepend val "foo-"}}
<!-- results in:  'foo-bar' -->
```

### [{{raw}}](lib/string.js#L385)

Render a block without processing mustache templates inside the block.

**Params**

* `options` **{Object}**
* `returns` **{String}**

**Example**

```html
{{{{#raw}}}}
{{foo}}
{{{{/raw}}}}
<!-- results in:  '{{foo}}' -->
```

### [{{remove}}](lib/string.js#L413)

Remove all occurrences of `substring` from the given `str`.

**Params**

* `str` **{String}**
* `substring` **{String}**
* `returns` **{String}**

**Example**

```html
{{remove "a b a b a b" "a "}}
<!-- results in:  'b b b' -->
```

### [{{removeFirst}}](lib/string.js#L432)

Remove the first occurrence of `substring` from the given `str`.

**Params**

* `str` **{String}**
* `substring` **{String}**
* `returns` **{String}**

**Example**

```html
{{remove "a b a b a b" "a"}}
<!-- results in:  ' b a b a b' -->
```

### [{{replace}}](lib/string.js#L452)

Replace all occurrences of substring `a` with substring `b`.

**Params**

* `str` **{String}**
* `a` **{String}**
* `b` **{String}**
* `returns` **{String}**

**Example**

```html
{{replace "a b a b a b" "a" "z"}}
<!-- results in:  'z b z b z b' -->
```

### [{{replaceFirst}}](lib/string.js#L473)

Replace the first occurrence of substring `a` with substring `b`.

**Params**

* `str` **{String}**
* `a` **{String}**
* `b` **{String}**
* `returns` **{String}**

**Example**

```html
{{replace "a b a b a b" "a" "z"}}
<!-- results in:  'z b a b a b' -->
```

### [{{reverse}}](lib/string.js#L492)

Reverse a string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{reverse "abcde"}}
<!-- results in:  'edcba' -->
```

### [{{sentence}}](lib/string.js#L509)

Sentence case the given string

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{sentence "hello world. goodbye world."}}
<!-- results in:  'Hello world. Goodbye world.' -->
```

### [{{snakecase}}](lib/string.js#L528)

snake_case the characters in the given `string`.

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{snakecase "a-b-c d_e"}}
<!-- results in:  'a_b_c_d_e' -->
```

### [{{split}}](lib/string.js#L547)

Split `string` by the given `character`.

**Params**

* `string` **{String}**: The string to split.
* `returns` **{String}** `character`: Default is an empty string.

**Example**

```html
{{split "a,b,c" ","}}
<!-- results in:  ['a', 'b', 'c'] -->
```

### [{{startsWith}}](lib/string.js#L572)

Tests whether a string begins with the given prefix.

**Params**

* `prefix` **{String}**
* `testString` **{String}**
* `options` **{String}**
* `returns` **{String}**

**Example**

```html
{{#startsWith "Goodbye" "Hello, world!"}}
  Whoops
{{else}}
  Bro, do you even hello world?
{{/startsWith}}
```

### [{{titleize}}](lib/string.js#L596)

Title case the given string.

**Params**

* `str` **{String}**
* `returns` **{String}**

**Example**

```html
{{titleize "this is title case"}}
<!-- results in:  'This Is Title Case' -->
```

### [{{trim}}](lib/string.js#L623)

Removes extraneous whitespace from the beginning and end of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```html
{{trim " ABC "}}
<!-- results in:  'ABC' -->
```

### [{{trimLeft}}](lib/string.js#L639)

Removes extraneous whitespace from the beginning of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```html
{{trim " ABC "}}
<!-- results in:  'ABC ' -->
```

### [{{trimRight}}](lib/string.js#L657)

Removes extraneous whitespace from the end of a string.

**Params**

* `string` **{String}**: The string to trim.
* `returns` **{String}**

**Example**

```html
{{trimRight " ABC "}}
<!-- results in:  ' ABC' -->
```

### [{{truncate}}](lib/string.js#L680)

Truncate a string to the specified `length`. Also see [ellipsis](#ellipsis).

**Params**

* `str` **{String}**
* `limit` **{Number}**: The desired length of the returned string.
* `suffix` **{String}**: Optionally supply a string to use as a suffix to denote when the string has been truncated. Otherwise an ellipsis (`…`) will be used.
* `returns` **{String}**: The truncated string.

**Example**

```html
truncate("foo bar baz", 7);
<!-- results in:  'foo bar' -->
truncate(sanitize("<span>foo bar baz</span>", 7));
<!-- results in:  'foo bar' -->
```

### [{{truncateWords}}](lib/string.js#L712)

Truncate a string to have the specified number of words. Also see [truncate](#truncate).

**Params**

* `str` **{String}**
* `limit` **{Number}**: The desired length of the returned string.
* `suffix` **{String}**: Optionally supply a string to use as a suffix to denote when the string has been truncated.
* `returns` **{String}**: The truncated string.

**Example**

```html
truncateWords("foo bar baz", 1);
<!-- results in:  'foo…' -->
truncateWords("foo bar baz", 2);
<!-- results in:  'foo bar…' -->
truncateWords("foo bar baz", 3);
<!-- results in:  'foo bar baz' -->
```

### [{{upcase}}](lib/string.js#L742)

Uppercase all of the characters in the given string. Alias for [uppercase](#uppercase).

**Params**

* `string` **{String}**
* `returns` **{String}**

**Example**

```html
{{upcase "aBcDeF"}}
<!-- results in:  'ABCDEF' -->
```

### [{{uppercase}}](lib/string.js#L763)

Uppercase all of the characters in the given string. If used as a block helper it will uppercase the entire block. This helper does not support inverse blocks.

**Params**

* `str` **{String}**: The string to uppercase
* `options` **{Object}**: Handlebars options object
* `returns` **{String}**

**Example**

```html
{{uppercase "aBcDeF"}}
<!-- results in:  'ABCDEF' -->
```

## url

### [{{encodeURI}}](lib/url.js#L19)

Encodes a Uniform Resource Identifier (URI) component
by replacing each instance of certain characters by
one, two, three, or four escape sequences representing
the UTF-8 encoding of the character.

**Params**

* `str` **{String}**: The un-encoded string
* `returns` **{String}**: The endcoded string

### [{{escape}}](lib/url.js#L34)

Escape the given string by replacing characters with escape sequences.
Useful for allowing the string to be used in a URL, etc.

**Params**

* `str` **{String}**
* `returns` **{String}**: Escaped string.

### [{{decodeURI}}](lib/url.js#L48)

Decode a Uniform Resource Identifier (URI) component.

**Params**

* `str` **{String}**
* `returns` **{String}**

### [{{url_encode}}](lib/url.js#L59)

Alias for [encodeURI](#encodeuri).

### [{{url_decode}}](lib/url.js#L68)

Alias for [decodeURI](#decodeuri).

### [{{urlResolve}}](lib/url.js#L82)

Take a base URL, and a href URL, and resolve them as a
browser would for an anchor tag.

**Params**

* `base` **{String}**
* `href` **{String}**
* `returns` **{String}**

### [{{urlParse}}](lib/url.js#L94)

Parses a `url` string into an object.

**Params**

* `str` **{String}**: URL string
* `returns` **{String}**: Returns stringified JSON

### [{{stripQuerystring}}](lib/url.js#L106)

Strip the query string from the given `url`.

**Params**

* `url` **{String}**
* `returns` **{String}**: the url without the queryString

### [{{stripProtocol}}](lib/url.js#L126)

Strip protocol from a `url`. Useful for displaying media that may have an 'http' protocol on secure connections.

**Params**

* `str` **{String}**
* `returns` **{String}**: the url with http protocol stripped

**Example**

```html
<!-- url = 'http://foo.bar' -->
{{stripProtocol url}}
<!-- results in: '//foo.bar' -->
```

***

## Utils

The following utils are exposed on `.utils`.

### [{{changecase}}](lib/utils/index.js#L54)

Change casing on the given `string`, optionally passing a delimiter to use between words in the returned string.

**Params**

* `string` **{String}**: The string to change.
* `returns` **{String}**

**Example**

```html
utils.changecase('fooBarBaz');
//=> 'foo bar baz'

utils.changecase('fooBarBaz' '-');
//=> 'foo-bar-baz'
```

### [{{random}}](lib/utils/index.js#L80)

Generate a random number

**Params**

* `min` **{Number}**
* `max` **{Number}**
* `returns` **{Number}**

## How to Contribute
clone the repository locally and run 'npm i' in the root. Now that you've set up your workspace, you're ready to contribute changes to the `fumanchu` repository you can refer to the [CONTRIBUTING](CONTRIBUTING.md) guide. If you have any questions please feel free to ask by creating an issue and label it `question`.

To test the legacy helpers, you can run `npm run test:legacy` to run the tests. If you want to test the new helpers, you can run `npm run test`.

## License and Copyright
[MIT](LICENSE) and codebase after 2023 will be copyright of Jared Wray.

This is a fork of [handlebars-helpers]() which is licensed under MIT. Initial copyright of handlebars-helpers: `2013-2015, 2017, Jon Schlinkert, Brian Woodward`. Thank you so much for your effort and building this! We have also continued to list all contributors in `package.json` to ensure that they are recognized.
