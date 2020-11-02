# node-sass-svg

Inline external **svg** files into **css** with node-sass, replacing **sass variables** colors.

The **svg** encoding is based on [yoksel encoding](http://yoksel.github.io/url-encoder) which is far lighter than using base64.

## Install

```
$ npm install --save-dev node-sass-svg
```

## Usage

You can use this as a custom function, a custom importer, or both.

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

Call it from the CLI:
```
node-sass --functions=node_modules/node-sass-svg/svg-function ...
```

### As a custom importer

This methods imports the svg directly as a _background-image: url('...');_

The main benefit is that the imported file is relative to the **scss** file.
Second great bonus is you can put **sass** variables for colors (expressed in #rrggbb format) in your **svg**

In **scss**
```
$red: #ff6666;
$green: #66ff66;
$blue: #6666ff;

.smileysheet {
	@import 'picto-smileysheet.svg';
}

```

Call it from the CLI:
```
node-sass --importer=node_modules/node-sass-svg/svg-importer ...
```

The downside is that it repeats the css selector.
