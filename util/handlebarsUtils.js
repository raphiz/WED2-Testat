module.exports.ifeqHelper = function(a, b, opts) {
    if (a === b) return opts.fn(this);
    return opts.inverse(this);
};

module.exports.formatDateHelper = function(date, opts) {
    if(date){
        if(typeof(date) === 'number'){
            date = new Date(date);
        }else if (typeof(date) == 'string') {
            return date;
        }
        return date.getFullYear() + '-' + (date.getMonth() + 1)  + '-' + date.getDate();
    }
    return "";
};
