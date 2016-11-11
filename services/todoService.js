var Datastore = require('nedb');

var db = new Datastore({ filename: './data/todos.db', autoload: true });

function loadAll(callback){
    db.find({}, function(err, todos){
        callback(err, todos);
    });
}

function insert(todo, callback){
    db.insert(todo, function(err, newTodo){
        callback(err, newTodo);
    });
}

function update(id, todo, callback){
    db.update({_id: id}, todo, {}, function (err, todo) {
        callback(err, todo);
    });
}

function getById(id, callback){
    db.findOne({_id: id}, function(err, todo){
        callback(err, todo);
    });
}

module.exports = {loadAll:loadAll, insert:insert, update:update, getById:getById}; // definiert wir die Funktionen gegen aussen heissen
