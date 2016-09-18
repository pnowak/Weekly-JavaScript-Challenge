var count = {
    c : get('count'),
    last : function () {
        var txt = count.c.textContent,
            parts = txt.split(':');

        parts[1] = lastRead();
        count.c.textContent = parts[0] + ': ' + parts[1];
    }
};

function lastRead() {
    localStorage.lastRead = (new Date()).toUTCString();
    return new Date(Date.parse(localStorage.lastRead));
}

function populateStorage(id) {
    localStorage.setItem(id, get(id).value);
}

var debounce = function(func, delay) {
    var inDebounce = undefined;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(inDebounce);
        return inDebounce = setTimeout(function() {
            return func.apply(context, args);
        }, delay);
    }
}

var form = get('form');

form.addEventListener('change', debounce(function() {
    return populateStorage('wystawiona');
}, 3000));

form.addEventListener('change', count.last);

function get(id) {
    return document.getElementById(id);
}
