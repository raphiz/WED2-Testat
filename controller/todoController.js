var todoService = require('../services/todoService.js');

module.exports.todoEditDialog = function(req, res, next)
{
    todoService.getById(req.params.id, function(err, todo){
        if (todo){
            res.render("todo_details.hbs", todo);
        }else{
            next(err);
        }
    });
};

function isValidTodo(raw){
    if(typeof raw.description === "undefined"){
        raw.description = "";
    }
    if (typeof raw.title === "undefined" ||
                raw.title.trim().length === 0) {
        raw.flash = "No title set";
        return false;
    }else if(typeof raw.importance === "undefined" ||
              parseInt(raw.importance) < 1 ||
              parseInt(raw.importance) > 5){
        raw.flash = "Importance must be set with a number between 1 and 5";
        return false;

    }else if(typeof raw.duedate === "undefined" ||
                !Date.parse(raw.duedate)){
        raw.flash = 'Due Date must be a valid date - eg. 2015-05-15';
        return false;
    }
    return true;
}

function parseRawTodo(raw, isNew){
    var todo = {
        title: raw.title,
        importance: raw.importance,
        duedate: Date.parse(raw.duedate),
        description: raw.description,
        complete: raw.complete !== undefined
    };
    if(isNew){
        todo.created = Date.now();
    }
    return todo;
}

module.exports.create = function(req, res)
{
  if(req.method === 'POST'){
      var raw = req.body;
      if(isValidTodo(raw)){
          todo = parseRawTodo(raw, true);
          todoService.insert(todo, function(err, todo){
               res.redirect('/');
          });
      }else{
          res.render("todo_details.hbs", raw);
      }
  }else{
      res.render("todo_details.hbs");
  }
};

module.exports.listDialog = function(req, res)
{
    var sortBy = res.locals.config.sortBy || undefined;
    var direction = res.locals.config.sortDirection || 'asc';
    var hideComplete = res.locals.config.hideComplete || false;
    todoService.loadAll(sortBy, direction, hideComplete, function(err, todos){
        res.render("todo_list.hbs", {'todos': todos});
    });
};

module.exports.update = function(req, res)
{
    var raw = req.body;
    if(isValidTodo(raw)){
        todo = parseRawTodo(raw, false);
        todoService.update(req.params.id, {$set: todo}, function(err, todo) {
            res.redirect('/');
        });
    }
};
