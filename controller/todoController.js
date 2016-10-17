module.exports.tododialog = function(req, res)
{
    var id = req.params.id;
    if (!id){
        // New todo...
        res.render("todo_details.hbs", {});
    }else{
        // TODO: load data for edit!
        console.log("LOAD " + id);
        res.render("todo_details.hbs", {});
    }
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
      res.redirect(302, '/');
  }
};

module.exports.listDialog = function(req, res)
{
    // TOOD: render list
    res.render("todo_list.hbs", {'todos': [1,2,3]});
};
