function setRate(rate) {

    var star = document.createElement('i');
        star.classList.add('material-icons');
        star.style.color = '#694E00';
        star.innerHTML = 'star';

    var allRates = document.getElementsByClassName('rate');

    rate = rate || allRates[0].getAttribute('data-rate');

    for (var i = 0; i < 5; i++) {
        allRates[0].appendChild(star.cloneNode(true));
    }

    for (var y = 0; y < rate; y++) {
        allRates[0].children[y].style.color = '#FFC107';
    }

}

function initGallery(slides) {

    var slider = document.getElementById('slider');

    (function addSlides() {

        for (var i = 0; i < slides.length; i++) {

            var slide = document.createElement('div');

            slide.classList.add('gallery__item');
            slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';

            slider.appendChild(slide);
        }

    })();

    var bannerWidth = parseFloat(getComputedStyle(document.getElementById('banner')).width);
    var bannerPosition = document.getElementById('banner').getBoundingClientRect().left;
    var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);

    var getSliderOffset = function() {
        return parseFloat(slider.style.left);
    }

    var initDisplace = (bannerWidth / 2) - (slideWidth / 2) * (slider.children.length / 2) + 55;

    var firstClickPosition;
    var lastClickPosition = initDisplace;

    function calculateTransform(e, x) {

        if (x) {
            slider.style.left = x - 10 + 'px';
        } else {
            slider.style.left = -((firstClickPosition || 0)  - (e.clientX || e.touches.clientX)) - 25 + 'px';
        }

        var calculateDistance = function(slideNumber) {

            var slideOffset = slider.children[slideNumber].offsetParent.offsetLeft + (slideWidth * slideNumber) - 40 * slideNumber - 125;

            return slideOffset;
        }

        function rotateSlide(distance) {

            var deg = -distance / 5;

            if (deg < -40) {
                return -40;
            }

            if (deg > -40 && deg < 40) {
                return deg;
            }

            if (deg > 40) {
                return 40;
            }

        }

        function scaleSlide(distance) {

            var depth = 320;

            var zDisplace = +distance + depth / 2;

            if (zDisplace > depth / 2) {
                return depth - zDisplace;
            }

            return zDisplace;

        }

        function calculateSlideLayer(distance) {

            var depth = 400;

            var zIndex = -distance + depth / 2;

            if (zIndex > depth / 2) {
                return depth - zIndex;
            }

            return zIndex;

        }

        for (var i = 0; i < slider.children.length; i++) {

            slider.children[i].style.transform =
            'rotateY(' + rotateSlide(calculateDistance(i)) + 'deg)' +
            'translateZ(' + scaleSlide(calculateDistance(i)) + 'px)';

            slider.children[i].style.zIndex = calculateSlideLayer(calculateDistance(i));

        }


    }


    function toFixedPosition() {

        function getBreakPoints() {

            var points = [];

            for (var i = 0; i < slider.children.length; i++) {
                points[i] = -200 * i + 220;
            }

            return points;

        }

        var breakPoints = getBreakPoints();

        if (getSliderOffset() > 150) {

            calculateTransform(false, 150);

        }

        for (var y = 0; y < slider.children.length; y++) {

            if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {

                for (var i = 0; i < slider.children.length; i++) {
                    slider.children[i].style.transition = 'all 0.5s';

                    slider.style.transition = 'all 0.5s';
                }

                calculateTransform(false, breakPoints[y] - slideWidth / 2);

                setTimeout(function (y) {
                    calculateTransform(false, breakPoints[y] - slideWidth / 2);
                    console.log('www');
                }, 400, y);


                setTimeout(function () {

                    for (var z = 0; z < slider.children.length; z++) {
                        slider.children[z].style.transition = 'none';
                    }

                    slider.style.transition = 'none';

                }, 700);

            }

        }

        if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {

            console.log(breakPoints[breakPoints.length - 1]);

            calculateTransform(false, breakPoints[breakPoints[breakPoints.length - 1]]);

        }


    }

    function mousedown(e) {

        slider.style.cursor = 'move';

        if (lastClickPosition) {
            firstClickPosition = e.clientX - lastClickPosition;
        } else {
            firstClickPosition = e.clientX;
        }

        slider.addEventListener('mousemove', calculateTransform);

        return false;

    }

    function mouseup(e) {

        slider.style.cursor = 'pointer';

        lastClickPosition = -(firstClickPosition - e.clientX);

        slider.removeEventListener('mousemove', calculateTransform);

        toFixedPosition();

        return false;

    }

    function mouseleave(e) {

        slider.style.cursor = 'pointer';

        lastClickPosition = -(firstClickPosition - e.clientX);

        slider.removeEventListener('mousemove', calculateTransform);

        toFixedPosition();

        return false;

    }

    toFixedPosition();

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

    slider.addEventListener('touchstart', mousedown);
    slider.addEventListener('touchend', mouseup);
    slider.addEventListener('touchmove', calculateTransform);

}


var imageArray = [
                  './img/unsplash.jpg',
                  './img/unsplash-2.jpg',
                  './img/unsplash-3.jpg',
                  './img/unsplash-4.jpg',
                  './img/unsplash-5.jpg',
                  './img/unsplash-6.jpg'
                 ];

setRate();
initGallery(imageArray);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzZXRSYXRlKHJhdGUpIHtcblxuICAgIHZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG4gICAgdmFyIGFsbFJhdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmF0ZScpO1xuXG4gICAgcmF0ZSA9IHJhdGUgfHwgYWxsUmF0ZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXJhdGUnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3JztcbiAgICB9XG5cbn1cbiIsImZ1bmN0aW9uIGluaXRHYWxsZXJ5KHNsaWRlcykge1xuXG4gICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKTtcblxuICAgIChmdW5jdGlvbiBhZGRTbGlkZXMoKSB7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW0nKTtcbiAgICAgICAgICAgIHNsaWRlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBzbGlkZXNbaV0gKyAnKSBuby1yZXBlYXQgY2VudGVyIC8gY292ZXInO1xuXG4gICAgICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgICAgICB9XG5cbiAgICB9KSgpO1xuXG4gICAgdmFyIGJhbm5lcldpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKSkud2lkdGgpO1xuICAgIHZhciBiYW5uZXJQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5uZXInKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIHZhciBzbGlkZVdpZHRoID0gcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKS5jaGlsZHJlblswXSkud2lkdGgpO1xuXG4gICAgdmFyIGdldFNsaWRlck9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzbGlkZXIuc3R5bGUubGVmdCk7XG4gICAgfVxuXG4gICAgdmFyIGluaXREaXNwbGFjZSA9IChiYW5uZXJXaWR0aCAvIDIpIC0gKHNsaWRlV2lkdGggLyAyKSAqIChzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC8gMikgKyA1NTtcblxuICAgIHZhciBmaXJzdENsaWNrUG9zaXRpb247XG4gICAgdmFyIGxhc3RDbGlja1Bvc2l0aW9uID0gaW5pdERpc3BsYWNlO1xuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNmb3JtKGUsIHgpIHtcblxuICAgICAgICBpZiAoeCkge1xuICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSB4IC0gMTAgKyAncHgnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAtKChmaXJzdENsaWNrUG9zaXRpb24gfHwgMCkgIC0gKGUuY2xpZW50WCB8fCBlLnRvdWNoZXMuY2xpZW50WCkpIC0gMjUgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24oc2xpZGVOdW1iZXIpIHtcblxuICAgICAgICAgICAgdmFyIHNsaWRlT2Zmc2V0ID0gc2xpZGVyLmNoaWxkcmVuW3NsaWRlTnVtYmVyXS5vZmZzZXRQYXJlbnQub2Zmc2V0TGVmdCArIChzbGlkZVdpZHRoICogc2xpZGVOdW1iZXIpIC0gNDAgKiBzbGlkZU51bWJlciAtIDEyNTtcblxuICAgICAgICAgICAgcmV0dXJuIHNsaWRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICAgICAgdmFyIGRlZyA9IC1kaXN0YW5jZSAvIDU7XG5cbiAgICAgICAgICAgIGlmIChkZWcgPCAtNDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTQwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGVnID4gLTQwICYmIGRlZyA8IDQwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRlZyA+IDQwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDQwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHZhciBkZXB0aCA9IDMyMDtcblxuICAgICAgICAgICAgdmFyIHpEaXNwbGFjZSA9ICtkaXN0YW5jZSArIGRlcHRoIC8gMjtcblxuICAgICAgICAgICAgaWYgKHpEaXNwbGFjZSA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXB0aCAtIHpEaXNwbGFjZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHpEaXNwbGFjZTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FsY3VsYXRlU2xpZGVMYXllcihkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICB2YXIgZGVwdGggPSA0MDA7XG5cbiAgICAgICAgICAgIHZhciB6SW5kZXggPSAtZGlzdGFuY2UgKyBkZXB0aCAvIDI7XG5cbiAgICAgICAgICAgIGlmICh6SW5kZXggPiBkZXB0aCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVwdGggLSB6SW5kZXg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB6SW5kZXg7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdkZWcpJyArXG4gICAgICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAncHgpJztcblxuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnpJbmRleCA9IGNhbGN1bGF0ZVNsaWRlTGF5ZXIoY2FsY3VsYXRlRGlzdGFuY2UoaSkpO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0b0ZpeGVkUG9zaXRpb24oKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0QnJlYWtQb2ludHMoKSB7XG5cbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwb2ludHNbaV0gPSAtMjAwICogaSArIDIyMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBvaW50cztcblxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJyZWFrUG9pbnRzID0gZ2V0QnJlYWtQb2ludHMoKTtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPiAxNTApIHtcblxuICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCAxNTApO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGJyZWFrUG9pbnRzW3ldIC0gc2xpZGVXaWR0aCAvIDIpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoeSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGJyZWFrUG9pbnRzW3ldIC0gc2xpZGVXaWR0aCAvIDIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnd3d3Jyk7XG4gICAgICAgICAgICAgICAgfSwgNDAwLCB5KTtcblxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlblt6XS5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICB9LCA3MDApO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKTtcblxuICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBicmVha1BvaW50c1ticmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXV0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2Vkb3duKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuXG4gICAgICAgIGlmIChsYXN0Q2xpY2tQb3NpdGlvbikge1xuICAgICAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYIC0gbGFzdENsaWNrUG9zaXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFg7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlVHJhbnNmb3JtKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZXVwKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gLShmaXJzdENsaWNrUG9zaXRpb24gLSBlLmNsaWVudFgpO1xuXG4gICAgICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlbGVhdmUoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtKGZpcnN0Q2xpY2tQb3NpdGlvbiAtIGUuY2xpZW50WCk7XG5cbiAgICAgICAgc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbiAgICAgICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VsZWF2ZSk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2V1cCk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbn1cbiIsIi8vPXJlcXVpcmUgYmxvY2tzL3JhdGUvcmF0ZS5qc1xuLy89cmVxdWlyZSBibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzXG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5zZXRSYXRlKCk7XG5pbml0R2FsbGVyeShpbWFnZUFycmF5KTtcbiJdfQ==
