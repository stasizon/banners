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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5JylbMF0uc3R5bGUubGVmdCA9IDA7XG52YXIgY3VycmVudFNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeV9faXRlbS0tY3VycmVudCcpWzBdO1xuXG4oZnVuY3Rpb24gc2V0UmF0ZSgpIHtcblxuICAgIHZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG4gICAgdmFyIGFsbFJhdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmF0ZScpO1xuXG4gICAgdmFyIHJhdGUgPSBhbGxSYXRlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmF0ZScpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgYWxsUmF0ZXNbMF0uYXBwZW5kQ2hpbGQoc3Rhci5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIH1cblxuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgcmF0ZTsgeSsrKSB7XG4gICAgICAgIGFsbFJhdGVzWzBdLmNoaWxkcmVuW3ldLnN0eWxlLmNvbG9yID0gJyNGRkMxMDcnO1xuICAgIH1cblxufSkoKTtcblxuZnVuY3Rpb24gZ2FsZXJ5U2xpZGUoc2lkZSkge1xuXG4gICAgdmFyIGdhbGxlcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5JylbMF07XG5cbiAgICBpZiAoc2lkZSA9PT0gJ2xlZnQnKSB7XG5cbiAgICAgICAgZ2FsbGVyeS5zdHlsZS5sZWZ0ID0gcGFyc2VGbG9hdChnYWxsZXJ5LnN0eWxlLmxlZnQpIC0gMjUwICsgJ3B4JztcblxuICAgICAgICBjdXJyZW50U2xpZGUgPSBjdXJyZW50U2xpZGUubmV4dFNpYmxpbmcubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgY3VycmVudFNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgwLCAxLCAwLCAwZGVnKSc7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRTbGlkZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nKSB7XG5cbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5wcmV2aW91c1NpYmxpbmcucHJldmlvdXNTaWJsaW5nLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgwLCAxLCAwLCA0MGRlZyknO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudFNsaWRlLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nKSB7XG5cbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5uZXh0U2libGluZy5uZXh0U2libGluZy5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlM2QoMCwgMSwgMCwgLTQwZGVnKSc7XG5cbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBnYWxsZXJ5LnN0eWxlLmxlZnQgPSBwYXJzZUZsb2F0KGdhbGxlcnkuc3R5bGUubGVmdCkgKyAyNTAgKyAncHgnO1xuXG4gICAgICAgIGlmIChjdXJyZW50U2xpZGUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgY3VycmVudFNsaWRlID0gY3VycmVudFNsaWRlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50U2xpZGUpIHtcblxuICAgICAgICAgICAgY3VycmVudFNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgwLCAxLCAwLCAwZGVnKSc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50U2xpZGUgIT09IG51bGwgJiYgY3VycmVudFNsaWRlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgY3VycmVudFNsaWRlLnByZXZpb3VzU2libGluZy5wcmV2aW91c1NpYmxpbmcuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDAsIDEsIDAsIDQwZGVnKSc7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50U2xpZGUgIT09IG51bGwgJiYgY3VycmVudFNsaWRlLm5leHRTaWJsaW5nLm5leHRTaWJsaW5nICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZS5uZXh0U2libGluZy5uZXh0U2libGluZy5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlM2QoMCwgMSwgMCwgLTQwZGVnKSc7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbihmdW5jdGlvbiBnYWxsZXJ5U3dpcGUoKSB7XG5cbiAgICB2YXIgeERvd24gPSBudWxsO1xuICAgIHZhciB5RG93biA9IG51bGw7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaFN0YXJ0KGV2dCkge1xuICAgICAgICB4RG93biA9IGV2dC50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgIHlEb3duID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3VjaE1vdmUoZXZ0KSB7XG4gICAgICAgIGlmICggISB4RG93biB8fCAhIHlEb3duICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHhVcCA9IGV2dC50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICAgIHZhciB5VXAgPSBldnQudG91Y2hlc1swXS5jbGllbnRZO1xuXG4gICAgICAgIHZhciB4RGlmZiA9IHhEb3duIC0geFVwO1xuICAgICAgICB2YXIgeURpZmYgPSB5RG93biAtIHlVcDtcblxuICAgICAgICBpZiAoIE1hdGguYWJzKCB4RGlmZiApID4gTWF0aC5hYnMoIHlEaWZmICkgKSB7Lyptb3N0IHNpZ25pZmljYW50Ki9cbiAgICAgICAgICAgIGlmICggeERpZmYgPiAwICkge1xuICAgICAgICAgICAgICAgIGdhbGVyeVNsaWRlKCdsZWZ0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdhbGVyeVNsaWRlKCdyaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qIHJlc2V0IHZhbHVlcyAqL1xuICAgICAgICB4RG93biA9IG51bGw7XG4gICAgICAgIHlEb3duID0gbnVsbDtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSwgZmFsc2UpO1xuXG59KSgpO1xuIl0sImZpbGUiOiJpbmRleC5qcyJ9
