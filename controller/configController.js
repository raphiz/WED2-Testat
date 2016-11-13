var configService = require('../services/configService.js');

module.exports.setSortBy = function(req, res) {
    var newSortBy = req.params.by;
    var newDirection = 'asc';
    var validSortBy = ['duedate', 'importance', 'created'];

    if(validSortBy.indexOf(newSortBy) > -1){
        var currentSortBy = res.locals.config.sortBy || '';
        var currentDirection = res.locals.config.sortDirection || 'asc';

        if(newSortBy == currentSortBy){
            newDirection = currentDirection === 'asc' ? 'desc': 'asc';
        }

        // TODO: only update what's neccessary!
        configService.set('sortBy', newSortBy, function(err){
            configService.set('sortDirection', newDirection, function(err){
                res.redirect('/');
            });
        });
    }else{
        res.redirect('/');
    }
};

module.exports.toggleHideComplete = function(req, res){
    var current = res.locals.config.hideComplete || false;
    configService.set('hideComplete', !current, function(err){
        res.redirect('/');
    });
};

module.exports.toggleStyle = function(req, res){
    var current = res.locals.config.darkStyle || false;
    configService.set('darkStyle', !current, function(err){
        res.redirect('/');
    });
};
