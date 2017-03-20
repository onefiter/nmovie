var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
    //启动express服务
var app = express()
    //指定视图所在路径
app.set('views', './views/pages')
    //设置模板引擎
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'bower_components')))
app.listen(port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log('movie started on port ' + port);

/**
 * 路由的编写
 */

//index page
app.get('/', function(req, res) {
    res.render('index', {
        title: ' 首页',
        movies: [{
                title: '机械战警',
                _id: 1,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            }, {
                title: '机械战警',
                _id: 2,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'

            }, {
                title: '机械战警',
                _id: 3,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
            }, {
                title: '机械战警',
                _id: 4,
                poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'

            }

        ]

    })

})

//detail page
app.get('/movie/:id', function(req, res) {
    res.render('detail', {
        title: '电影详情页',
        movie: {
            director: '何塞·帕迪利亚',
            country: '美国',
            title: '机械战警',
            year: 2014,
            language: '英语',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映'

        }
    })

})

//admin
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
        title: '电影 后台录入页',
        movie: {
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }

    })

})

// list page
app.get('/admin/list', function(req, res) {
    res.render('list', {
        title: '电影 列表页',
        movies: [{
            title: '机械战警',
            director: '何塞·帕迪利亚',
            _id: 1,
            country: '美国',
            year: 2014,
            language: '英语',
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映'


        }]
    })

})