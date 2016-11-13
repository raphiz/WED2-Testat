var Datastore = require('nedb');

var db = new Datastore({ filename: './data/config.db', autoload: true });

function all(callback) {
    db.find({}, function (err, config) {
        callback(err, config);
    });
}

function get(key, callback) {
    db.findOne({ key: key }, function (err, config) {
        callback(err, config);
    });
}

function set(key, value, callback) {
    get(key, function(err, config){
        if(config){
            db.update({ _id: config._id}, {'key': key, 'value': value}, function (err, config) {
                callback(err, config);
            });
        }else{
            db.insert({'key': key, 'value': value}, function (err, config) {
                callback(err, config);
            });
        }
    });
}


module.exports = {get : get, set: set, all: all};
