var Intex = require('../app/controllers/index');

module.exports = function(app) {
	app.get('/', Intex.index)
}