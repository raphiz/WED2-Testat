var todoService = require('../services/todoService.js'); // Model

module.exports.todoEditDialog = function(req, res)
{
    todoService.getById(req.params.id, function(err, todo){
        // TODO: handle error: todo is null if invalid ID is given!
        res.render("todo_edit.hbs", todo);
    });
};

module.exports.create = function(req, res)
{
  var raw = req.body;

  // Set Optional fields:
  if(typeof raw.description === "undefined"){
      raw.description = "";
  }

  if (typeof raw.title === "undefined" || raw.title.trim().length === 0){
      raw.flash = "No title set";
      res.render("todo_details.hbs", raw);
  }else if(typeof raw.importance === "undefined" ||
            parseInt(raw.importance) < 1 ||
            parseInt(raw.importance) > 5){
      raw.flash = "Importance must be set with a number between 1 and 5";
      res.render("todo_details.hbs", raw);
  }else if(typeof raw.duedate === "undefined" ||
           !Date.parse(raw.duedate)){
    raw.flash = 'Due Date must be a valid date';
    res.render("todo_details.hbs", raw);
  }else{

      // TODO: is there a better solution?
      todo = {
          title: raw.title,
          importance: raw.importance,
          duedate: raw.duedate,
          description: raw.description,
          created: Date.now(),
          complete: false
      };
      todoService.insert(todo, function(err, todo){
          module.exports.listDialog(req, res);
      });
  }
};

module.exports.listDialog = function(req, res)
{
    todoService.loadAll(function(err, todos){
        if(err){
            console.log(err);
            // TODO: What now?
        }
        res.render("todo_list.hbs", {'todos': todos});
    });
};

module.exports.update = function(req, res)
{
    var raw = req.body;
    todo = {
        title: raw.title,
        importance: raw.importance,
        duedate: raw.duedate,
        description: raw.description,
        complete: false
    };
    todoService.update(req.params.id, todo, function(err, todo) {
        module.exports.listDialog(req, res);
    });
};
