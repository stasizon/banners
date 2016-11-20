var startAnimation = document.createElement('div');
    startAnimation.id = 'startAnimation';
    document.getElementById('banner').appendChild(startAnimation);

var backgroundAnimation = document.createElement('div');
    backgroundAnimation.id = 'backgroundAnimation';
    startAnimation.appendChild(backgroundAnimation);

var logoAnimation = document.createElement('div');
    logoAnimation.id = 'logoAnimation';
    logoAnimation.classList.add('banner__logo');
    backgroundAnimation.appendChild(logoAnimation);

for (var i = 0; i < images.length; i++) {

    var previewImage = document.createElement('img');
    previewImage.src = images[i];
    previewImage.classList.add('preview');

    startAnimation.appendChild(previewImage);

}

setTimeout(function () {

    document.getElementById('startAnimation').remove();

}, 5500);
