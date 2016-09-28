'use strict';

class Tag {

    get(id) {
        return document.getElementById(id);
    }

    createTag(value) {
        const result = this.get('result');
        const tag = document.createElement('li');
        const content = document.createTextNode(value);

        return new Promise(
            function(resolve, reject) {
                tag.appendChild(content);
                resolve(result.insertBefore(tag, result.firstChild));
            }
        ).then(
            function(val) {
                val.insertAdjacentHTML('beforeend', '<button class="close">x</button>');
                return val;
        }).then(
            function(val) {
                localStorage.setItem(val.textContent, val.textContent);
        })
        .catch(
            function(reason) {
                console.log('Handle rejected promise ('+ reason +').');
        });
    }

    closeTag(e) {
        const src = e.target;
        const parent = src.parentNode;

        if (src.nodeName.toLowerCase() === "button") {
            localStorage.removeItem(parent.textContent);
            parent.parentNode.removeChild(parent); 
        }
    }

    getValue(e) {
        const input = this.get('input');
        const value = input.value;

        if (value.trim() === '') {
            throw new Error('Empty input');
        }

        if (value.includes(',')) {
            let a = value.split(',');
            for (let i = 0; i < a.length; i += 1) {
                if (a[i].trim() === '') {
                    continue;
                }
                this.createTag(a[i]);
            }
        } else {
            this.createTag(value);
        }

        input.value = '';
    }

    getLocal() {
        let tags = localStorage;
        for (let tag in tags) {
            tag = tag.substr(0, tag.lastIndexOf('x'));
            this.createTag(tag);
        }
    }
};

const tag = new Tag();

const send = tag.get('send');
const result = tag.get('result');

send.addEventListener('click', (e) => { tag.getValue(e) }, false);
result.addEventListener( 'click', (e) => { tag.closeTag(e) }, false);

window.onload  = tag.getLocal();