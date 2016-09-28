function debounce(func, delay) {
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

function createVideo(src) {
    const result = this.get('result');
    const video = document.createElement('video');

    video.setAttribute('src', src);
    video.setAttribute('type', 'video/mp4');
    video.setAttribute('loop', true);
    video.play();

    result.insertBefore(video, result.firstChild);
}

function createMessage(value) {
    const result = this.get('result');
    const content = document.createTextNode('Brak gifów z wyrażeniem ' + value);

    result.appendChild(content);
}

function getValue() {
    const input = get('input');
    const value = input.value;
    const url = `http://api.giphy.com/v1/gifs/search?q=${value}&api_key=dc6zaTOxFJmzC`;

    fetch(url)
        .then(status)
        .then(json)
        .then(function(data) {
            if (data.data.length > 0) {
                for (let i = 0; i < data.data.length; i += 1) {
                    let src = data.data[i].images.looping.mp4;
                    this.createVideo(src);
                }
            } else {
                this.createMessage(value);
            }
        }).catch(function(error) {
          console.log('Request failed', error);
        });
}

function get(id) {
    return document.getElementById(id);
}

var form = get('form');

form.addEventListener('keypress', debounce(function() {
    return getValue();
}, 1000));