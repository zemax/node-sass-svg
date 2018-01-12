module.exports = function ( data ) {
	return data.replace( /\'\$([^']*)\'/g, '\'%23#{str-slice(quote($$$1),2)}\'' );
}
