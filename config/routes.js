var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var File = require('../app/controllers/file');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// user controller
module.exports = function(app) {
	// index route
	app.get('/', Index.index);
	app.get('/tosignin', Index.tosignin);
	app.post('/signin', Index.signin);

	//user route
	app.post('/signup', User.signup);
	app.get('/user/list', User.list);


	//file upload
	app.get('/toupload', File.toupload);
	app.post('/upload', File.upload);
	app.post('/ajaxupload', multipartMiddleware, File.ajaxupload);
}