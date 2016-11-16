var Datastore = require('nedb');

var db = new Datastore({ filename: './data/config.db', autoload: true });

function all(sessionID, callback) {
    db.find({sessionID : sessionID}, function (err, config) {
        callback(err, config);
    });
}

function get(sessionID, key, callback) {
    db.findOne({ key: key, sessionID : sessionID }, function (err, config) {
        callback(err, config);
    });
}

function set(sessionID, key, value, callback) {
    get(sessionID, key, function(err, config){
        if(config){
            db.update({'sessionID' : sessionID, 'key': key}, {'sessionID' : sessionID, 'key': key, 'value': value}, function (err, numReplaced) {
                callback(err);
            });
        }else{
            db.insert({'sessionID' : sessionID, 'key': key, 'value': value}, function (err, config) {
                callback(err);
            });
        }
    });
}


module.exports = {get : get, set: set, all: all};
