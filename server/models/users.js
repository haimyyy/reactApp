var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId;
var config = require('../config/constants');
var typeConstants = config.usersTypes;

var schema = new Schema({
        id: {type: String, default: ''},
        messages: [{
            message: {messageBody: String},
            //seen: {type: Boolean, default: false},
            //deleted: {type: Boolean, default: false},
        }]
    },
    {
        strict: true,
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

schema.statics.registerUser = function (user, callback) {
    var query = {
        id: user.id,
    };
    var options = {
        upsert: true, new: true, setDefaultsOnInsert: true
    }
    this.model('users').findOneAndUpdate(query, {$set:user}, options)
        .exec(function (err, result) {
            if (err) {
                return callback(err, result);
            }
            if (!result) {
                return callback({msg: 'not exist'}, false);
            }
            else {
                return callback(err, result);
            }
        });
}