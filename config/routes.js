var _ = require('underscore')
var Movie = require('../model/movie')
var User = require('../model/user')

module.exports = function(app) {
    /**
     * 路由的编写
     */

    //pre handle user
    app.use(function(req, res, next) {
        var _user = req.session.user
        if (_user) {
            app.locals.user = _user

        }
        return next()

    })


    //index page
    app.get('/', function(req, res) {
        var _user = req.session.user


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

    // signup
    app.post('/user/signup', function(req, res) {
        var _user = req.body.user
        var user = new User(_user)
        User.find({ name: _user.name }, function(err, user) {
            if (err) {
                console.log(error)
            }
            if (user) {
                return res.redirect('/')
            } else {
                user.save(function(err, user) {
                    if (err) {
                        console.log(err)
                    }
                    res.redirect('/admin/userlist');
                })
            }
        })

    })

    //userlist page
    app.get('/admin/userlist', function(req, res) {
        User.fetch(function(err, users) {
            if (err) {
                console.log(err)
            }
            console.log(users)
            res.render('userlist', {
                title: '用户列表页 ',
                users: users
            })

        })
    })

    //signin

    app.post('/user/signin', function(req, res) {
        var _user = req.body.user
        var name = _user.name
        var password = _user.password

        User.findOne({ name: name }, function(err, user) {
            if (err) {
                console.log(err)
            }

            if (!user) {
                return res.redirect('/')
            }
            user.comparePassword(password, function(err, isMatch) {
                if (err) {
                    console.log(err)
                }

                if (isMatch) {
                    req.session.user = user

                    return res.redirect('/')
                } else {
                    console.log('password is not matched')
                }
            })
        })
    })

    //logout
    app.get('/logout', function(req, res) {
        delete req.session.user
        delete app.locals.user
        res.redirect('/')
    })

}