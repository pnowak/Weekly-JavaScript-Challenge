var count = {
    c : get('count'),
    last : function () {
        var txt = count.c.textContent,
            parts = txt.split(':');

        parts[1] = lastRead();
        count.c.textContent = parts[0] + ': ' + parts[1];
    }
};

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
    return savethestuffLocal();
}, 3000));

form.addEventListener('change', count.last);

function lastRead() {
    localStorage.lastRead = (new Date()).toUTCString();
    return new Date(Date.parse(localStorage.lastRead));
}

function savethestuffLocal() {
    var data = {
        firstname: '',
        lastname: '',
        kulica: '',
        kmiasto: '',
        kkod: '',
        name: '',
        fulica: '',
        fmiasto: '',
        fkod: '',
        nip: '',
        money: '',
        wystawiona: '',
        doreczona: '',
        spozniona: '',
        oplacona: ''
    };
    localStorage.data = JSON.stringify(data);
    var data = JSON.parse(localStorage.data),
        prop;
    for (prop in data) {
        if (data.hasOwnProperty(prop)) {
            localStorage.setItem(prop, get(prop).value);
        }
    }
}

function getthestuffLocal() {
    var data = JSON.parse(localStorage.data),
        prop; console.log(data);
    for (prop in data) {
        if (data.hasOwnProperty(prop)) {
            get(prop).value = localStorage.getItem(prop);
        }
    }
}

function get(id) {
    return document.getElementById(id);
}

window.onload  = getthestuffLocal();