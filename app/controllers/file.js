//进入上传页面的的方法
exports.toupload = function(req, res) {
	res.render('fileupload/toupload', {
		// title: "首页"
	});
}

var multiparty = require('multiparty')
var fs = require('fs')
var util = require('util');
var moment = require('moment');
var path = require('path');


exports.upload = function(req, res) {
	var oldPath = '';
	var newPath = '';
	// var dirName = __dirname.substring(0, __dirname.length - 16) + '/public/uploads';
	// 通过multiparty创建form对象
	var form = new multiparty.Form()
	form.on('error', function(err) {
		console.log('Error parsing form: ' + err.stack);
	});

	form.on('file', function(name, file) {
		oldPath = file.path;
		//拼接想要上传到的路径
		var rootDir = getRootDir();
		var fileDir = '/public/uploads' + getFileDir(file.originalFilename);
		// 对拼接的路径进行进一步的处理
		var newPath = rootDir + fileDir;
		// newPath = dirName + getFileDir(file.originalFilename);

		//重命名为真实文件名
		fs.rename(oldPath, newPath, function(err) {
			if (err) {
				console.log('rename error: ' + err);
			} else {
				console.log('rename ok');
			}
		});

		// res.json({
		// 	code: 200,
		// 	msg: {
		// 		url: newPath
		// 	}
		// });
		res.redirect('/toupload');
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

function getFileDir(fileName) {
	fileNameArr = fileName.split('.'); //根据.拆分文件名
	fileTypeIndex = fileNameArr.length - 1; //获取文件的后缀
	var fileType = fileNameArr[fileTypeIndex]; //获取文件的后缀名
	var backDir = ''

	//判断文件的格式,并根据不同的格式选择不同的上传路径
	//注: 目前只区分了图片格式和其他格式
	if (fileType == 'bmp' || fileType == 'jpg' || fileType == 'tiff' || fileType == 'gif' || fileType == 'pcx' || fileType == 'tga' || fileType == 'exif' || fileType == 'fpx' || fileType == 'svg' || fileType == 'psd' || fileType == 'cdr' || fileType == 'pcd' || fileType == 'dxf' || fileType == 'ufo' || fileType == 'eps' || fileType == 'ai' || fileType == 'raw') {
		backDir = '/img'
	} else {
		backDir = '/files'
	}
	//创建时间对象,用来获取时间戳
	var d = new Date();
	var mathNum = Math.random() * 100;
	// 拼接以时间戳和随机数生成的文件名
	backDir += '/' + moment(d).format('YYYYMMDDHHmmssSSSS') + parseInt(mathNum);
	// 拼接后缀
	backDir += '.' + fileType;
	return backDir;
}

//获取项目的根路径
function getRootDir() {
	return path.dirname(path.dirname(__dirname));
	// console.log();
	// __dirname;
}


exports.ajaxupload = function(req, res) {
	//get filename
	// 获取文件名
	var filename = req.files.inputFile.originalFilename || path.basename(req.files.files.ws.path);
	var oldPath = req.files.inputFile.path;
	//拼接想要上传到的路径
	var rootDir = getRootDir();
	var fileDir = '/public/uploads' + getFileDir(filename);
	// 对拼接的路径进行进一步的处理
	var newPath = rootDir + fileDir;
	// 执行移动文件的方法
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
			url: fileDir
		}
	});
}