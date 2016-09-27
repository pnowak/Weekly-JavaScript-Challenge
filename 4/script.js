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

function getValue() {
    const input = get('input');
    const value = input.value;
    const url = 'http://api.giphy.com/v1/gifs/search?q=' + value + '&api_key=dc6zaTOxFJmzC';

    console.log(url);
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

fetch('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC')
  .then(status)
  .then(json)
  .then(function(data) {
    console.log('Request succeeded with JSON response', data);
  }).catch(function(error) {
    console.log('Request failed', error);
  });


function get(id) {
    return document.getElementById(id);
}

var form = get('form');

form.addEventListener('keypress', debounce(function() {
    return getValue();
}, 3000));