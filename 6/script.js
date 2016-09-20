'use strict';

class Tag {

    constructor() {}

    get(id) {
        return document.getElementById(id);
    }

    createTag(value) {
        const result = this.get('result');
        const frag = document.createDocumentFragment();
        const tag = document.createElement('li');
        const content = document.createTextNode(value);
        const close = document.createElement('a').addEventListener( 'click', function() {
            console.log('usuniemy cię');
        } );

        tag.appendChild(content);
        frag.appendChild(tag);
        result.insertBefore(frag, result.firstChild);
    }

    getValue(e) {
        const input = this.get('input');
        const value = input.value;

        if (value.includes(',')) {
            let a = value.split(',');
            for (let i = 0; i < a.length; i += 1) {
                this.createTag(a[i]);
            }
        } else {
            this.createTag(value);
        }

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

const tag = new Tag();

const send = tag.get('send');

send.addEventListener('click', (e) => { tag.getValue(e) }, false);
