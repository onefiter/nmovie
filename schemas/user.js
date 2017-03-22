//1.引入mongoose模块
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

/**
 * 1.描述文档类型和数据结构
 * 
 */
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: {
        unique: true,
        type: String
    },

    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {
    var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    /**
     * @params SALT_WORK_FACTOR 加密的计算强度
     */
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)

                user.password = hash
                next()
            })
        })
        //这个next不能要，否则打印出的password不是加密以后的
        // next()
})

/**
 * 取出数据库中所有数据
 */
UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
}

module.exports = UserSchema