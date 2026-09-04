const path = require( "path" );
const fs   = require( "fs" );
const sass = require( 'sass' );

const svg_function = require( '../svg-function' );

console.log( sass.info );
[
    {
        'inFile':  path.join( __dirname, "src/styles.scss" ),
        'outFile': path.join( __dirname, "dist/styles.css" )
    }
].forEach(
    ( { inFile, outFile } ) => {
        let result;

        try {
            result = sass.compile(
                inFile,
                {
                    style:     'expanded',
                    sourceMap: false,

                    functions: Object.assign( {}, svg_function( __dirname ) ),
                } );
        } catch ( error ) {
            console.log( "*** sass error ***", error );
            return;
        }

        fs.writeFile(
            outFile,
            result.css,
            ( error ) => {
                if ( error ) {
                    console.log( "*** write error ***", error );
                    return;
                }

                console.log( "  ", outFile, fs.statSync( outFile ).size + ' bytes', '[built]' );
            } );
    }
);
