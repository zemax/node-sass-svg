// From https://github.com/yoksel/url-encoder/

module.exports = function ( data ) {
	var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;

	// Use single quotes instead of double to avoid encoding.
	if ( data.indexOf( '"' ) >= 0 ) {
		data = data.replace( /"/g, "'" );
	}

	data = data.replace( />\s{1,}</g, "><" );
	data = data.replace( /\s{2,}/g, " " );

	data = data.replace( symbols, encodeURIComponent );

	return data;
};
