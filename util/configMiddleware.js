var configService = require('../services/configService.js');

module.exports = function (req, res, next) {
    configService.all(req.sessionID, function(err, config){
      if (!err){
          // Map list to a single config object
          configuration = {};
          config.forEach(function(element){
              configuration[element.key] =  element.value;
          });
          res.locals.config = configuration;
          next();
      }else{
          var exception = new Error('Failed to load config');
          exception.status = 500;
          next(exception);
      }
});
};
