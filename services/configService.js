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

function add(key, value, callback) {
    db.insert({'key': key, 'value': value}, function (err, config) {
        callback(err, config);
    });
}


module.exports = {get : get, add: add, all: all};
