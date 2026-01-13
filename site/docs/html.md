---
title: Html Helpers
description: >
    Helpers for generating and manipulating HTML elements in templates.
order: 12
---

### {{attr}}

Stringify attributes from the options hash into an HTML attribute string.

**Params**

* `options` **{Object}**: Options object with a `hash` property containing key-value pairs
* `returns` **{String}**: Space-prefixed attribute string, or empty string if no attributes

**Example**

```handlebars
<div{{attr class="container" id="main"}}></div>
```

**Output**

```html
<div class="container" id="main"></div>
```

You can also use variables:

```handlebars
<!-- With context: { btnClass: "btn-primary" } -->
<button{{attr class=btnClass type="submit"}}>Click</button>
```

**Output**

```html
<button class="btn-primary" type="submit">Click</button>
```

### {{css}}

Generate `<link>` tags for stylesheets. Supports both CSS and LESS files.

**Params**

* `list` **{String|Array}**: One or more stylesheet paths/URLs
* `returns` **{String}**: One or more `<link>` tags

**Example**

Single stylesheet:

```handlebars
{{css "styles/main.css"}}
```

**Output**

```html
<link type="text/css" rel="stylesheet" href="styles/main.css">
```

Multiple stylesheets:

```handlebars
<!-- With context: { stylesheets: ["reset.css", "theme.css", "app.css"] } -->
{{css stylesheets}}
```

**Output**

```html
<link type="text/css" rel="stylesheet" href="reset.css">
<link type="text/css" rel="stylesheet" href="theme.css">
<link type="text/css" rel="stylesheet" href="app.css">
```

LESS files are automatically detected:

```handlebars
{{css "styles/theme.less"}}
```

**Output**

```html
<link type="text/css" rel="stylesheet/less" href="styles/theme.less">
```

### {{js}}

Generate `<script>` tags for JavaScript or CoffeeScript files.

**Params**

* `context` **{String|Array|Object}**: Script path(s) or options object with `src` attribute
* `returns` **{String}**: One or more `<script>` tags

**Example**

Single script:

```handlebars
{{js "app.js"}}
```

**Output**

```html
<script src="app.js"></script>
```

Multiple scripts:

```handlebars
<!-- With context: { scripts: ["vendor.js", "utils.js", "app.js"] } -->
{{js scripts}}
```

**Output**

```html
<script src="vendor.js"></script>
<script src="utils.js"></script>
<script src="app.js"></script>
```

Using the `src` attribute:

```handlebars
{{js src="bundle.js"}}
```

**Output**

```html
<script src="bundle.js"></script>
```

CoffeeScript files are automatically detected:

```handlebars
{{js "app.coffee"}}
```

**Output**

```html
<script type="text/coffeescript" src="app.coffee"></script>
```

### {{sanitize}}

Strip all HTML tags from a string, preserving only the text content.

**Params**

* `str` **{String}**: The string containing HTML to sanitize
* `returns` **{String}**: Plain text with all HTML tags removed

**Example**

```handlebars
{{sanitize "<p>Hello <strong>World</strong>!</p>"}}
```

**Output**

```
Hello World!
```

Useful for displaying user content safely:

```handlebars
<!-- With context: { userComment: "<script>alert('xss')</script>Nice post!" } -->
<p>{{sanitize userComment}}</p>
```

**Output**

```html
<p>Nice post!</p>
```

### {{ul}}

Block helper for creating unordered lists.

**Params**

* `context` **{Array}**: Array of items to render as list items
* `options` **{Object}**: Options object; supports HTML attributes via hash
* `returns` **{String}**: Complete `<ul>` element with `<li>` children

**Example**

With an array of strings:

```handlebars
<!-- With context: { fruits: ["Apple", "Banana", "Cherry"] } -->
{{#ul fruits}}{{this}}{{/ul}}
```

**Output**

```html
<ul><li>Apple</li>
<li>Banana</li>
<li>Cherry</li></ul>
```

With objects and custom attributes:

```handlebars
<!-- With context: { users: [{name: "Alice"}, {name: "Bob"}] } -->
{{#ul users class="user-list"}}{{name}}{{/ul}}
```

**Output**

```html
<ul class="user-list"><li>Alice</li>
<li>Bob</li></ul>
```

### {{ol}}

Block helper for creating ordered lists.

**Params**

* `context` **{Array}**: Array of items to render as list items
* `options` **{Object}**: Options object; supports HTML attributes via hash
* `returns` **{String}**: Complete `<ol>` element with `<li>` children

**Example**

```handlebars
<!-- With context: { steps: ["Mix ingredients", "Bake at 350°F", "Let cool"] } -->
{{#ol steps class="recipe-steps"}}{{this}}{{/ol}}
```

**Output**

```html
<ol class="recipe-steps"><li>Mix ingredients</li>
<li>Bake at 350°F</li>
<li>Let cool</li></ol>
```

### {{thumbnailImage}}

Generate a `<figure>` element with a thumbnail image, optional link to full-size image, and optional caption.

**Params**

* `context` **{Object}**: Configuration object with the following properties:
  * `id` **{String}**: Unique identifier for the figure element
  * `alt` **{String}**: Alt text for the image
  * `thumbnail` **{String}**: URL of the thumbnail image
  * `size` **{Object}**: Object with `width` and `height` properties
  * `full` **{String}** *(optional)*: URL of the full-size image (creates a link if provided)
  * `caption` **{String}** *(optional)*: Caption text for the image
  * `classes` **{Object}** *(optional)*: CSS classes for `figure`, `image`, and `link` elements
* `returns` **{String}**: Complete `<figure>` element

**Example**

Basic thumbnail with link and caption:

```handlebars
{{thumbnailImage image}}
```

With context:

```json
{
  "image": {
    "id": "hero",
    "alt": "Mountain landscape",
    "thumbnail": "/images/mountain-thumb.jpg",
    "size": { "width": 200, "height": 150 },
    "full": "/images/mountain-full.jpg",
    "caption": "View from the summit"
  }
}
```

**Output**

```html
<figure id="image-hero">
<a href="/images/mountain-full.jpg" rel="thumbnail">
<img alt="Mountain landscape" src="/images/mountain-thumb.jpg" width="200" height="150">
</a>
<figcaption>View from the summit</figcaption>
</figure>
```

With custom CSS classes:

```json
{
  "image": {
    "id": "profile",
    "alt": "User avatar",
    "thumbnail": "/avatars/user.jpg",
    "size": { "width": 100, "height": 100 },
    "full": "/avatars/user-large.jpg",
    "classes": {
      "figure": ["avatar-container", "rounded"],
      "image": ["avatar-img"],
      "link": ["avatar-link"]
    }
  }
}
```

**Output**

```html
<figure id="image-profile" class="avatar-container rounded">
<a href="/avatars/user-large.jpg" rel="thumbnail" class="avatar-link">
<img alt="User avatar" src="/avatars/user.jpg" width="100" height="100" class="avatar-img">
</a>
</figure>
```
