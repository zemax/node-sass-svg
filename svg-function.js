var types      = require( 'node-sass' ).types;
var fs         = require( 'fs' );
var encode_svg = require( './lib/encode-svg' );

module.exports = {
	'svg($filename)': function ( filename_sass ) {
		var filename = filename_sass.getValue();
		var svg      = fs.readFileSync( filename, 'utf8' );

		var encoded = encode_svg( svg );
		return new types.String( 'url("data:image/svg+xml,' + encoded + '")' );
	}
};
