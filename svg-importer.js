const path = require( 'path' );
const fs   = require( 'fs' );

const encode_svg    = require( './lib/encode-svg' );
const encode_colors = require( './lib/encode-colors' );

module.exports = function ( url, prev, done ) {
    const extension = url.split( '.' ).pop().toLocaleLowerCase();
    
    if ( extension !== 'svg' ) {
        return null;
    }
    
    const filename = path.resolve( path.dirname( prev ), url );
    
    let svg = fs.readFileSync( filename, 'utf8' );
    svg     = encode_svg( svg );
    svg     = encode_colors( svg );
    
    done( { contents: '&{background-image: url("data:image/svg+xml,' + svg + '");}' } );
};
