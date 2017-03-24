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

        app.locals.user = _user

        next()
    })


    // Index page 
    app.get('/', Index.index)

    //User page
    app.post('/user/signup', User.signup)
    app.post('/user/signin', User.signin)
    app.get('/signin', User.showSignin)
    app.get('/signup', User.showSignup)
    app.get('/logout', User.logout)
    app.get('/admin/userlist', User.list)

    //Movie page
    app.post('/admin/movie/new', Movie.new)
    app.get('/movie/:id', Movie.detail)
    app.get('/admin/update/:id', Movie.update)
    app.get('/admin/movie', Movie.save)
    app.get('/admin/list', Movie.list)

    /**
     * delete 路由
     */
    app.delete('/admin/list', Movie.del)

}