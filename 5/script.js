'use strict';

class Select {

    constructor() {
        console.log(this);
    }

    getSelect() {
        return document.getElementsByTagName('select')[0];
    }

    
};

const tag = new Select();