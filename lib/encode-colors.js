module.exports = function ( data ) {
	return data.replace( /\'\$([^']*)\'/g, '\'%23#{str-slice(inspect($$$1),2)}\'' );
}
