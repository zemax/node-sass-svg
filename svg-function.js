const path  = require( 'path' );
const fs    = require( 'fs' );
const types = require( 'sass' ).types;

const encode_svg = require( './lib/encode-svg' );

module.exports = ( basePath = './' ) => ({
    'svg($filename, $mapping: ())': function ( svgFileName, mapping ) {
        const filename = path.resolve( basePath, svgFileName.getValue() );
        let svg        = fs.readFileSync( filename, 'utf8' );
        svg            = encode_svg( svg );
        
        if ( mapping instanceof types.Map ) {
            for ( let i = 0, l = mapping.getLength(); i < l; i++ ) {
                const key   = mapping.getKey( i ).getValue();
                const value = mapping.getValue( i ).toString();
                
                svg = svg.replace( `'$${key}'`, `'${encodeURIComponent( value )}'` );
            }
        }
        
        return new types.String( 'url("data:image/svg+xml,' + svg + '")' );
    }
});
