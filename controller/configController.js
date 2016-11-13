var configService = require('../services/configService.js');

module.exports.setSortBy = function(req, res) {
    var newSortBy = req.params.by;
    var newDirection = 'asc';
    var validSortBy = ['byFinishDate', 'byImportance', 'byCreateDate'];

    if(validSortBy.indexOf(newSortBy) > -1){
        var currentSortBy = res.locals.config.sortBy || '';
        var currentDirection = res.locals.config.sortDirection || 'asc';

        if(newSortBy == currentSortBy){
            newDirection = currentDirection === 'asc' ? 'desc': 'asc';
        }

        // res.locals.config.sortBy = newSortBy;
        // res.locals.config.sortDirection = newDirection;

        // TODO: only update what's neccessary!
        configService.set('sortBy', newSortBy, function(err, config){
            configService.set('sortDirection', newDirection, function(err, config){
                res.redirect('/');
            });
        });
    }else{
        res.redirect('/');
    }
};
