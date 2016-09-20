var text = {

    result : get('result'),

    createTag(value) {
        var frag, tag;

        frag = document.createDocumentFragment();
        tag = document.createElement('button');

        tag.textContent = value;

        frag.appendChild(tag);
        text.result.insertBefore(frag, text.result.firstChild);
    },

    getValue(e) {
        var input = get('input'),
            value = input.value;

        if (value.includes(',')) {
            var a = value.split(',');
            for (var i = 0; i < a.length; i += 1) {
                text.createTag(a[i]);
            }
        } else {
            text.createTag(value);
        }

        input.value = '';

        // no bubble
        if (typeof e.stopPropagation === "function") {
            e.stopPropagation();
        }
        e.cancelBubble = true;

        // prevent default action
        if (typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        e.returnValue = false;
    }
};

function get(id) {
    return document.getElementById(id);
}

var send = get('send');

send.addEventListener('click', text.getValue, false);
