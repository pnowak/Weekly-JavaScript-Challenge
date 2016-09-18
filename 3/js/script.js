var keys = {
    handleKeypress: function (e) {
        e = e || window.event; // IE
        
        if (e.which) {
            count.keys.push(e.which);
            keys.fire('textwrite', keys);
        }
    },
    handleKeydown: function (e) {
        e = e || window.event; // IE
        
        if (e.which === 8 || e.which === 46) {
            count.keys.pop(e.which);
            keys.fire('textdelete', keys);
        }
    },
    valueLength : function (e) {
        e = e || window.event; // IE

        if (e.ctrlKey && e.which === 86) {
            console.log('ctrl+v!');
            count.keys.push(e.which);
            keys.fire('copypast', keys);
        }
    }
};

var count = {
    c : get('count'),
    send : get('sendButton'),
    keys : [],
    length : function () {
        var txt = this.c.textContent,
            parts = txt.split(' '),
            len = this.keys.length;

        parts[0] = parseInt(parts[0], 10) - len;
        this.c.textContent = parts[0] + ' ' + parts[1] + ' ' + parts[2];
    },
    countDown : function () {
        var txt = this.c.textContent,
            parts = txt.split(' ');

        parts[0] = parseInt(parts[0], 10) - 1;
        this.c.textContent = parts[0] + ' ' + parts[1] + ' ' + parts[2];
    },
    countUp : function () {
        var txt = this.c.textContent,
            parts = txt.split(' ');

        parts[0] = parseInt(parts[0], 10) + 1;
        this.c.textContent = parts[0] + ' ' + parts[1] + ' ' + parts[2];
    },
    reset : function () {
        var txt = this.c.textContent,
            parts = txt.split(' ');

        parts[0] = 35;
        this.c.textContent = parts[0] + ' ' + parts[1] + ' ' + parts[2];
    }
};

var ransom = {
    message : [],
    getValue : function (e) {
        var input = get('inputMessage'),
            value = input.value,
            array = value.split('');

        ransom.fire('value', ransom);
        ransom.fire('reset', ransom);

        input.value = '';

        if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
        }
        e.cancelBubble = true;

        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        e.returnValue = false;
    }
};

window.onkeypress = keys.handleKeypress;
window.onkeydown = keys.handleKeydown;

function get(id) {
    return document.getElementById(id);
}
