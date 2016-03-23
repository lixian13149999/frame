//进入上传页面的的方法
exports.toupload = function(req, res) {
	res.render('fileupload/toupload', {
		// title: "首页"
	});
}

var multiparty = require('multiparty')
var fs = require('fs')
var util = require('util');



exports.upload = function(req, res) {
	// console.log('进入upload方法')
	var size = 0;
	var fileName = '';
	var count = 0;
	var oldPath = '';
	var newPath = '';
	// 通过multiparty创建form对象
	var form = new multiparty.Form()
	form.on('error', function(err) {
		console.log('Error parsing form: ' + err.stack);
	});

	form.on('part', function(part) {
		if (!part.filename) return;
		size = part.byteCount;
		fileName = part.filename;
		part.on('error', function(err) {
			console.log('part error');
			return;
		});
	});

	form.on('file', function(name, file) {
		oldPath = file.path;
		newPath = __dirname + '/uploads/' + file.originalFilename;

		//重命名为真实文件名
		fs.rename(oldPath, newPath, function(err) {
			if (err) {
				console.log('rename error: ' + err);
			} else {
				console.log('rename ok');
			}
		});

		res.json({
			code: 200,
			msg: {
				// url: 'http://' + req.headers.host
				url: newPath
			}
		});
		// res.redirect('/toupload');
	})

	form.on('close', function() {
		console.log('Upload completed!');
		res.json({
			code: 200,
			msg: {
				// url: 'http://' + req.headers.host
				url: newPath
			}
		});
	});

	// Parse req 
	form.parse(req);
}



exports.ajaxupload = function(req, res) {
	console.log('=============================================');
	console.log(req.files);
	console.log('=============================================');

	//get filename
	var filename = req.files.inputFile.originalFilename || path.basename(req.files.files.ws.path);
	console.log('filename:')
	console.log(filename)

	//copy file to a public directory
	// var targetPath = path.dirname(__filename) + '/public/' + filename;
	var oldPath = req.files.inputFile.path;
	var newPath = __dirname + '/uploads/' + filename;
	console.log(oldPath)
	console.log(newPath)
		//copy file
		// fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));
	fs.rename(oldPath, newPath, function(err) {
		if (err) {
			console.log('rename error: ' + err);
		} else {
			console.log('rename ok');
		}
	});

	res.json({
		code: 200,
		msg: {
			url: 'http://' + req.headers.host
		}
	});
}