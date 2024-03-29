const path = require("path");
const fs = require("fs");
const { SassString } = require("sass");

const encode_svg = require("./lib/encode-svg");

module.exports = (basePath = "./") => ({
  "svg($filename, $mapping: ())": function (svgFileName, mapping) {
    const filename = path.resolve(basePath, svgFileName.getValue());
    let svg = fs.readFileSync(filename, "utf8");
    svg = encode_svg(svg);

    if (mapping.getLength() > 0) {
      for (let i = 0, l = mapping.getLength(); i < l; i++) {
        const key = mapping.getKey(i).getValue();
        const val = mapping.getValue(i);
        const value = val.dartValue ? val.dartValue.toString() : val.toString();

        svg = svg.replaceAll(`'$${key}'`, `'${encodeURIComponent(value)}'`);
      }
    }

    return new SassString('url("data:image/svg+xml,' + svg + '")');
  },
});
