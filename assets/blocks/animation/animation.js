for (var i = 0; i < images.length; i++) {

    var previewImage = document.createElement('img');
    previewImage.src = images[i];
    previewImage.classList.add('preview');

    document.getElementById('startAnimation').appendChild(previewImage);

}

setTimeout(function () {

    document.getElementById('startAnimation').remove();

}, 5500);
