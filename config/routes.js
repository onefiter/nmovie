var _ = require('underscore')
var Index = require('../app/controllers/index')
var User = require('../app/controllers/user')
var Movie = require('../app/controllers/movie')

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
    app.get('/', Index.index)

    // signup
    app.post('/user/signup', User.signup)

    // signin
    app.post('/user/signin', User.signin)

    //logout
    app.post('/user/logout', User.logout)

    //userlist page
    app.get('/admin/userlist', User.list)

    //admin post movie
    app.post('/admin/movie/new', Movie.new)

    //detail page
    app.get('/movie/:id', Movie.detail)

    app.get('/admin/update/:id', Movie.update)

    //admin
    app.get('/admin/movie', Movie.save)

    // list page
    app.get('/admin/list', Movie.list)

    /**
     * delete 路由
     */
    app.delete('/admin/list', Movie.del)

}