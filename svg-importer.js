var path          = require( 'path' );
var fs            = require( 'fs' );
var encode_svg    = require( './lib/encode-svg' );
var encode_colors = require( './lib/encode-colors' );

module.exports = function ( url, prev, done ) {
	var extension = url.split( '.' ).pop().toLocaleLowerCase();

	if ( extension !== 'svg' ) {
		return null;
	}

	var filename = path.resolve( path.dirname( prev ), url );

	var svg = fs.readFileSync( filename, 'utf8' );

	svg = encode_svg( svg );
	svg = encode_colors( svg );

	done( { contents: '&{background-image: url("data:image/svg+xml,' + svg + '");}' } );
};
