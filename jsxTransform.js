
'use strict';
var through = require('through2');

module.exports = function (opt) {
	
	return through.obj(function (file, encoding, callback) {
	
			if (file.isNull()) {
				return callback(null, file);
			}
	
			if (file.isStream()) {
				return callback(createError(file, 'Streaming not supported'));
			}
			var str = transform(file.contents.toString());
			//console.log(str);
			file.contents = new Buffer(str);
			callback(null, file);
		}
	);
};

function transform(jsx) {
	return jsx.replace(/(template\s*\:\s*\[\s*)(<[\s\S]*>)(\s*\])/g, function(x, a, b, c) {
		return a + t(b) + c;
	});

	function t(str) {
		return str.replace(/'/g, function(x) {
			return '\\\'';
		}).replace(/^[\t ]*(?=<)/mg, function(x) {
			return x + "'";
		}).replace(/^\s*$/mg, '')	// 去空行
		.replace(/\n/mg, "',\n")		// 行末尾加',
		.replace(/$/g, "'");			// 末尾加'
	}
}
