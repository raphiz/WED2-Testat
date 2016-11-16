var moment = require('moment');

module.exports.ifeqHelper = function(a, b, opts) {
    if (a === b) return opts.fn(this);
    return opts.inverse(this);
};

module.exports.printStars = function(a, opts) {
    var str = "";

    for (var i = 1; i <= a; i++) {
        str += "*";
    }
    return str;
};

module.exports.formatDateHelper = function(date, opts) {
    var withMoment = opts.hash.moment || false;
    if(date){
        if(typeof(date) === 'number'){
            date = new Date(date);
        }else if (typeof(date) == 'string') {
            return date;
        }
        if(withMoment){
            return moment(date, "YYYYMMDD").fromNow();
        }else {
            return date.getFullYear() +
                   ((date.getMonth() >= 9) ? '-' : '-0') + (date.getMonth() + 1)  +
                   ((date.getDate() > 9) ? '-' : '-0') + date.getDate();
        }
    }
    return "";
};
