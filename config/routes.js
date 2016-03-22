var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');

// user controller
module.exports = function(app) {
	// index route
	app.get('/', Index.index);

	//user route
	app.post('/signup', User.signup);
	app.get('/user/list', User.list);
}