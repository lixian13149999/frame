// 引入express模块
var express = require('express')
var path = require('path') //引入路径管理

// 设置端口(prosess是环境变量,用来获取全局变量,或者我们传入的参数)
var port = process.env.PORT || 3000

//启动一个web服务器
var app = express()

app.set('views', './app/views') //设置视图目录
app.set('view engine', 'jade') //设置模板引擎
	// 对传入到前端的页面进行格式化
app.use(express.bodyParser())
	//设置静态资源样式的目录
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port) //设置监听的端口3000

console.log('Node started on port ' + port)


// 编写路由
// index page
app.get('/', function(req, res) {
	//render用来返回首页,前一个参数是地址,后一个参数是返回的数据
	res.render('index', {
		title: '首页数据'
	})
})