# @zemax/sass-svg

Inline external **svg** files into **css** with node-sass, replacing **sass variables** colors.

The **svg** encoding is based on [yoksel encoding](http://yoksel.github.io/url-encoder) which is far lighter than using base64.

## Install

```
$ npm install --save-dev @zemax/sass-svg
```

## Usage

You can use this as a custom function.

Look at the _test/_ for simple examples. The result is [here](http://htmlpreview.github.io/?https://github.com/zemax/node-sass-svg/blob/master/test/index.html).

### As a custom function

This methods transforms the **svg** as a inline _url('...')_

The path is relative to the basePath defined in the declaration.

In **scss**:
```
.smiley {
	background-image: svg('test/src/components/picto-smiley.svg', ("red": $color-brand));
}
```

The function uses a SassMap as second argument for color replacements. This usage is now prefered as it permits the declaration of custom properties.

```
:root {
    --smiley: #{svg('test/src/components/picto-smiley.svg', ("red": $color-brand))};
}

.smiley {
	background-image: var(--smiley);
}
```

Use it with the [modern `sass` JS API](https://sass-lang.com/documentation/js-api/):
```js
const sass = require('sass');
const svg_function = require('@zemax/sass-svg/svg-function');

sass.compile('style.scss', {
	functions: svg_function(__dirname),
});
```
