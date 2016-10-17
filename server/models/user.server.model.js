/**
 * @file
 * @author tommyzqfeng
 * @date 2016/10/11
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const oAuthTypes = [];

const validatePresenceOf = value => value && value.length;

/* User Schema */
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Please input your username'
    },
    hashed_password: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        default: '',
        match: [/.+\@.+\..+/, '请填写有效的邮箱地址']
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    roles: {
        type: [{type: String, enum:['user', 'admin']}],
        default: ['user']
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: false,
        required: 'IsActive is required'
    }
});

/* Virtuals */
UserSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

/* Validations */
UserSchema.path('username')
    .validate(function (username) {
    if (this.skipValidation()) return true;
    return username.length;
}, '用户名不能为空');

UserSchema.path('email')
    .validate(function (email) {
    if (this.skipValidation()) return true;
    return email.length;
}, '邮箱不能为空');

UserSchema.path('email')
    .validate(function (email, fn) {
    const User = mongoose.model('User');
    if (this.skipValidation()) fn(true);

    if (this.isNew || this.isModified('email')) {
        User.find({email: email}).exec(function (err, users) {
            fn(!err && user.length ===0);
        })
    } else fn(true);
}, '邮箱已存在');

UserSchema.path('hashed_password')
    .validate(function (hash_passwore) {
    if (this.skipValidation()) return true;
    return hash_passwore.length && this._password.length;
}, '密码不能为空');

/* Defines a pre hook for the document. */
UserSchema.pre('save', function (next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password) && !this.skipValidation()) {
        next(new Error('密码错误'));
    } else {
        next();
    }
});

/* Methods */
UserSchema.methods = {
    /**
     * 验证密码是否正确
     * @param plaintext
     * @returns {boolean}
     */
    authenticate: function (plaintext) {
        return this.encryptPassword(plaintext) == this.hashed_passport;
    },

    /**
     * 盐值
     * @returns {string}
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) +'';
    },

    /**
     * 加密密码
     * @param password
     * @returns {*}
     */
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    /**
     * 如果采用OAuth，则不用验证
     * @returns {number}
     */
    skipValidation: function () {
        return ~oAuthTypes.indexOf(this.provider);
    }
}

/* Static */
UserSchema.static = {
    /**
     * 配置查询的load函数
     * @param options 配置criteria(查询条件)、select(查询集合)两个属性
     * @param cb
     * @returns {Promise|Array|{index: number, input: string}|*|{npmUpdate}}
     */
    load: function (options, cb) {
        options.select = option.select || 'name username';
        return this.findOne(options.criteria)
            .select(options.select)
            .exec(cb);
    }
}

mongoose.model('User', UserSchema);

