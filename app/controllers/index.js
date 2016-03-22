// var mongoose = require('mongoose');
// var User = mongoose.model('User');

exports.index = function(req, res) {
	// console.log('jjj');
	res.render('index', {
		title: "首页"
	});
}