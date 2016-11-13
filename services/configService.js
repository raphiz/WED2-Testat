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
            db.update({ 'key': key}, {'key': key, 'value': value}, function (err, numReplaced) {
                callback(err);
            });
        }else{
            db.insert({'key': key, 'value': value}, function (err, config) {
                callback(err);
            });
        }
    });
}


module.exports = {get : get, set: set, all: all};
