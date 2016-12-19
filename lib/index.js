var waterfall = require('agraddy.async.waterfall');

var mod = {};

mod = function(req, res, plugins, drop) {
	var lug = {};
	var list = [];

	// Before every function call the glue function so that req, res, and lug get passed
	plugins.forEach(function(item, i) {
		list.push(glue.bind(null, req, res, lug));
		list.push(item);
	});

	//waterfall(list, drop);
	waterfall(list, function(err) {
		drop(err, req, res, lug);
	});
}

function glue(req, res, lug, cb) {
	//console.log('glue');
	cb(null, req, res, lug);
}

module.exports = mod;
