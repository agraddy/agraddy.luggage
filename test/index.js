var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var luggage = require('../');

var req = {};
var res = response();

luggage(req, res, [header, header2], drop);

function header(req, res, lug, cb) {
	res.setHeader('X-Test1', 'test');
	cb();
}

function header2(req, res, lug, cb) {
	res.setHeader('X-Test2', 'test');
	cb();
}

function drop(err, req, res, lug) {
	tap.assert.deepEqual(res._headers[0], {"X-Test1": "test"}, 'Header plugin should be called.');
	tap.assert.deepEqual(res._headers[1], {"X-Test2": "test"}, 'Header plugin should call both header functions.');
}

req2 = {};
res2 = response();
luggage(req2, res2, [fail, header], drop2);

function fail(req, res, lug, cb) {
	cb(new Error('Fail'));
}

function drop2(err, req, res, lug) {
	tap.assert.equal(err.message, 'Fail', 'Should short circuit on error.');
	tap.assert.equal(res._headers.length, 0, 'Header plugin should not be called.');
}



// TODO: Eventually work based on the number of arguments passed in the first luggage plugin and then add lug to the end
// This would make it usable for items other than just req, res



