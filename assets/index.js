document.getElementsByClassName('gallery')[0].style.left = 0;
var currentSlide = document.getElementsByClassName('gallery__item--current')[0];

(function setRate() {

    var star = document.createElement('i');
        star.classList.add('material-icons');
        star.style.color = '#694E00';
        star.innerHTML = 'star';

    var allRates = document.getElementsByClassName('rate');

    var rate = allRates[0].getAttribute('data-rate');

    for (var i = 0; i < 5; i++) {
        allRates[0].appendChild(star.cloneNode(true));
    }

    for (var y = 0; y < rate; y++) {
        allRates[0].children[y].style.color = '#FFC107';
    }

})();

function galerySlide(side) {

    var gallery = document.getElementsByClassName('gallery')[0];

    if (side === 'left') {

        gallery.style.left = parseFloat(gallery.style.left) - 250 + 'px';

        currentSlide = currentSlide.nextSibling.nextSibling;

        currentSlide.style.transform = 'rotate3d(0, 1, 0, 0deg)';

        if (currentSlide.previousSibling.previousSibling) {

            currentSlide.previousSibling.previousSibling.style.transform = 'rotate3d(0, 1, 0, 40deg)';

        }

        if (currentSlide.nextSibling.nextSibling) {

            currentSlide.nextSibling.nextSibling.style.transform = 'rotate3d(0, 1, 0, -40deg)';

        }

    } else {

        gallery.style.left = parseFloat(gallery.style.left) + 250 + 'px';

        if (currentSlide !== null) {

            currentSlide = currentSlide.previousSibling.previousSibling;

        }

        if (currentSlide) {

            currentSlide.style.transform = 'rotate3d(0, 1, 0, 0deg)';

        }

        if (currentSlide !== null && currentSlide.previousSibling.previousSibling !== null) {

            currentSlide.previousSibling.previousSibling.style.transform = 'rotate3d(0, 1, 0, 40deg)';

        }

        if (currentSlide !== null && currentSlide.nextSibling.nextSibling !== null) {

            currentSlide.nextSibling.nextSibling.style.transform = 'rotate3d(0, 1, 0, -40deg)';

        }

    }

}

(function gallerySwipe() {

    var xDown = null;
    var yDown = null;

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                galerySlide('left');
            } else {
                galerySlide('right');
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);

})();
