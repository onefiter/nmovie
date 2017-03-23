var express = require('express')
var path = require('path')
var mongoose = require('mongoose') //引入mongoose模块
var bodyParser = require('body-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var morgan = require('morgan')
var port = process.env.PORT || 3000

//启动express服务
var app = express()
var dbUrl = 'mongodb://localhost:27017/nmovie'
mongoose.connect(dbUrl)
    //解决 mpromise (mongoose's default promise library) is deprecated,
    //plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

//指定视图所在路径
app.set('views', './views/pages')

//设置模板引擎
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'nmovie',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))

//设置入口文件
if ('development' === app.get('env')) {
    app.set('showStackError', true)
    app.use(morgan(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}

app.locals.moment = require('moment');
console.log('movie started on port ' + port);
require('./config/routes')(app)