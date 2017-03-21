var express = require('express')
var path = require('path')
var mongoose = require('mongoose') //引入mongoose模块
var _ = require('underscore')
var bodyParser = require('body-parser')
var Movie = require('./model/movie')
var port = process.env.PORT || 3000

//启动express服务
var app = express()

mongoose.connect('mongodb://localhost:27017/nmovie')

//指定视图所在路径
app.set('views', './views/pages')

//设置模板引擎
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.locals.moment = require('moment');
console.log('movie started on port ' + port);

/**
 * 路由的编写
 */

//index page
app.get('/', function(req, res) {

    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: ' 首页',
            movies: movies
        })
    })


})

//admin post movie
app.post('/admin/movie/new', function(req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj)
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            })
        })
    } else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        })
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        })
    }
})


//detail page
app.get('/movie/:id', function(req, res) {
    var id = req.params.id

    Movie.findById(id, function(err, movie) {
        if (err) {
            console.log(err)
        }
        res.render('detail', {
            title: movie.title,
            movie: movie
        })

    })



})

app.get('/admin/update/:id', function(req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: "后台更新页",
                movie: movie
            })
        })
    }
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
app.get('/admin/list', (req, res) => {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '电影 列表页',
            movies: movies
        })
    })
})

/**
 * delete 路由
 */
app.delete('/admin/list', function(req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({ _id: id }, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        })
    }
})