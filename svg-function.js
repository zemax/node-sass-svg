const path = require("path");
const fs = require("fs");
const { SassString } = require("sass");

const encode_svg = require("./lib/encode-svg");

module.exports = (basePath = "./") => ({
  "svg($filename, $mapping: ())": function ([svgFileName, mapping]) {
    const filename = path.resolve(basePath, svgFileName.text);
    let svg = fs.readFileSync(filename, "utf8");
    svg = encode_svg(svg);

    for (const [keyValue, val] of mapping.contents) {
      const key = keyValue.text;
      const value = val.text !== undefined ? val.text : val.toString();

      svg = svg.replaceAll(`'$${key}'`, `'${encodeURIComponent(value)}'`);
    }

    return new SassString('url("data:image/svg+xml,' + svg + '")');
  },
});
