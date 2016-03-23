// 引入express模块
var express = require('express');

//ajax上传文件用到的插件-------------------------
var morgan = require('morgan');
//ajax上传文件用到的插件-------------------------

var path = require('path'); //引入路径管理

// 这个中间件能把post传递的值初始化成一个json格式的对象
var bodyParser = require("body-parser");

// 设置端口(prosess是环境变量,用来获取全局变量,或者我们传入的参数)
var port = process.env.PORT || 3000;

/*定义数据库相关信息*/
//引入mongoose模块
var mongoose = require('mongoose');
// 引入mongodb连接器
//定义链接路径
var dbUrl = 'mongodb://localhost/frame';
/*链接数据库*/
// 调用connect方法,创建数据库(同时传入本地的连接地址和数据库名称)
mongoose.connect(dbUrl);

//定义一个web服务器
var app = express();

//之前说这个是做上传处理的框架,但实际使用来看好像不是,
//这个框架好强大,暂时还不知道这个是做什么的
var fs = require('fs');
//这里定义了model的路径
var models = __dirname + '/app/models';
var walk = function(path) {
	fs
		.readdirSync(path)
		.forEach(function(file) {
			var newPath = path + '/' + file;
			var stat = fs.statSync(newPath);

			if (stat.isFile()) {
				if (/(.*)\.(js|coffee)/.test(file)) {
					require(newPath);
				}
			} else if (stat.isDirectory()) {
				walk(newPath);
			}
		})
}

//执行载入映射的位置
walk(models);

//ajax上传文件用到的插件-------------------------
app.use(morgan('dev'));
//ajax上传文件用到的插件-------------------------

app.set('views', './app/views'); //设置视图目录
app.set('view engine', 'jade'); //设置模板引擎
//设置静态资源样式的目录
app.use(express.static(path.join(__dirname, 'public')));
// console.log(__dirname)
//设置格式化post传入值的方法
app.use(bodyParser.urlencoded({
	extended: true
}));

//格式化代码
app.locals.pretty = true;

//加入路径的配置文件
require('./config/routes')(app);

app.listen(port) //设置监听的端口3000

console.log('Node started on port ' + port);

// app.get('/env', function(req, res) {
// 	console.log("process.env.VCAP_SERVICES: ", process.env.VCAP_SERVICES);
// 	console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);
// 	console.log("process.env.VCAP_APPLICATION: ", process.env.VCAP_APPLICATION);
// 	res.json({
// 		code: 200,
// 		msg: {
// 			VCAP_SERVICES: process.env.VCAP_SERVICES,
// 			DATABASE_URL: process.env.DATABASE_URL
// 		}
// 	});
// });