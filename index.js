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

    calculateTransform(false, -300);

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

        // function getBreakPoints() {
        //
        //     var points = [];
        //
        //     for (var i = 0; i < slider.children.length; i++) {
        //         points[i] = -200 * i + 220;
        //     }
        //
        //     return points;
        //
        // }
        //
        // var breakPoints = getBreakPoints();
        //
        // if (getSliderOffset() > 150) {
        //
        //     calculateTransform(false, 150);
        //
        // }
        //
        // for (var y = 0; y < slider.children.length; y++) {
        //
        //     if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {
        //
        //         for (var i = 0; i < slider.children.length; i++) {
        //             slider.children[i].style.transition = 'all 0.5s';
        //
        //             slider.style.transition = 'all 0.5s';
        //         }
        //
        //         calculateTransform(false, breakPoints[y] - slideWidth / 2);
        //
        //         setTimeout(function (y) {
        //             calculateTransform(false, breakPoints[y] - slideWidth / 2);
        //             console.log('www');
        //         }, 400, y);
        //
        //
        //         setTimeout(function () {
        //
        //             for (var z = 0; z < slider.children.length; z++) {
        //                 slider.children[z].style.transition = 'none';
        //             }
        //
        //             slider.style.transition = 'none';
        //
        //         }, 700);
        //
        //     }
        //
        // }
        //
        // if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {
        //
        //     console.log(breakPoints[breakPoints.length - 1]);
        //
        //     calculateTransform(false, breakPoints[breakPoints[breakPoints.length - 1]]);
        //
        // }


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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0UmF0ZShyYXRlKSB7XG5cbiAgICB2YXIgc3RhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgICAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgICAgICBzdGFyLmlubmVySFRNTCA9ICdzdGFyJztcblxuICAgIHZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxuICAgIHJhdGUgPSByYXRlIHx8IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5hcHBlbmRDaGlsZChzdGFyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICAgICAgYWxsUmF0ZXNbMF0uY2hpbGRyZW5beV0uc3R5bGUuY29sb3IgPSAnI0ZGQzEwNyc7XG4gICAgfVxuXG59XG4iLCJmdW5jdGlvbiBpbml0R2FsbGVyeShzbGlkZXMpIHtcblxuICAgIHZhciBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJyk7XG5cbiAgICAoZnVuY3Rpb24gYWRkU2xpZGVzKCkge1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdnYWxsZXJ5X19pdGVtJyk7XG4gICAgICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcblxuICAgICAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgfSkoKTtcblxuICAgIHZhciBiYW5uZXJXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykpLndpZHRoKTtcbiAgICB2YXIgYmFubmVyUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICB2YXIgc2xpZGVXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykuY2hpbGRyZW5bMF0pLndpZHRoKTtcblxuICAgIHZhciBnZXRTbGlkZXJPZmZzZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpO1xuICAgIH1cblxuICAgIHZhciBpbml0RGlzcGxhY2UgPSAoYmFubmVyV2lkdGggLyAyKSAtIChzbGlkZVdpZHRoIC8gMikgKiAoc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIDIpICsgNTU7XG5cbiAgICB2YXIgZmlyc3RDbGlja1Bvc2l0aW9uO1xuICAgIHZhciBsYXN0Q2xpY2tQb3NpdGlvbiA9IGluaXREaXNwbGFjZTtcblxuICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgLTMwMCk7XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVUcmFuc2Zvcm0oZSwgeCkge1xuXG4gICAgICAgIGlmICh4KSB7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IHggLSAxMCArICdweCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC0oKGZpcnN0Q2xpY2tQb3NpdGlvbiB8fCAwKSAgLSAoZS5jbGllbnRYIHx8IGUudG91Y2hlcy5jbGllbnRYKSkgLSAyNSArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihzbGlkZU51bWJlcikge1xuXG4gICAgICAgICAgICB2YXIgc2xpZGVPZmZzZXQgPSBzbGlkZXIuY2hpbGRyZW5bc2xpZGVOdW1iZXJdLm9mZnNldFBhcmVudC5vZmZzZXRMZWZ0ICsgKHNsaWRlV2lkdGggKiBzbGlkZU51bWJlcikgLSA0MCAqIHNsaWRlTnVtYmVyIC0gMTI1O1xuXG4gICAgICAgICAgICByZXR1cm4gc2xpZGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICAgICAgaWYgKGRlZyA8IC00MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtNDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkZWcgPiAtNDAgJiYgZGVnIDwgNDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGVnID4gNDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNjYWxlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICAgICAgdmFyIGRlcHRoID0gMzIwO1xuXG4gICAgICAgICAgICB2YXIgekRpc3BsYWNlID0gK2Rpc3RhbmNlICsgZGVwdGggLyAyO1xuXG4gICAgICAgICAgICBpZiAoekRpc3BsYWNlID4gZGVwdGggLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekRpc3BsYWNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gekRpc3BsYWNlO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYWxjdWxhdGVTbGlkZUxheWVyKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIHZhciBkZXB0aCA9IDQwMDtcblxuICAgICAgICAgICAgdmFyIHpJbmRleCA9IC1kaXN0YW5jZSArIGRlcHRoIC8gMjtcblxuICAgICAgICAgICAgaWYgKHpJbmRleCA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXB0aCAtIHpJbmRleDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHpJbmRleDtcblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAncm90YXRlWSgnICsgcm90YXRlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ2RlZyknICtcbiAgICAgICAgICAgICd0cmFuc2xhdGVaKCcgKyBzY2FsZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdweCknO1xuXG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUuekluZGV4ID0gY2FsY3VsYXRlU2xpZGVMYXllcihjYWxjdWxhdGVEaXN0YW5jZShpKSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRvRml4ZWRQb3NpdGlvbigpIHtcblxuICAgICAgICAvLyBmdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgcG9pbnRzW2ldID0gLTIwMCAqIGkgKyAyMjA7XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICByZXR1cm4gcG9pbnRzO1xuICAgICAgICAvL1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHZhciBicmVha1BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA+IDE1MCkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCAxNTApO1xuICAgICAgICAvL1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZvciAodmFyIHkgPSAwOyB5IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzJztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGJyZWFrUG9pbnRzW3ldIC0gc2xpZGVXaWR0aCAvIDIpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKHkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBicmVha1BvaW50c1t5XSAtIHNsaWRlV2lkdGggLyAyKTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3d3dycpO1xuICAgICAgICAvLyAgICAgICAgIH0sIDQwMCwgeSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5bel0uc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgICB9LCA3MDApO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhicmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdXSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIH1cblxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2Vkb3duKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuXG4gICAgICAgIGlmIChsYXN0Q2xpY2tQb3NpdGlvbikge1xuICAgICAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYIC0gbGFzdENsaWNrUG9zaXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFg7XG4gICAgICAgIH1cblxuICAgICAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlVHJhbnNmb3JtKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZXVwKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gLShmaXJzdENsaWNrUG9zaXRpb24gLSBlLmNsaWVudFgpO1xuXG4gICAgICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlbGVhdmUoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtKGZpcnN0Q2xpY2tQb3NpdGlvbiAtIGUuY2xpZW50WCk7XG5cbiAgICAgICAgc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbiAgICAgICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VsZWF2ZSk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2V1cCk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbn1cbiIsIi8vPXJlcXVpcmUgYmxvY2tzL3JhdGUvcmF0ZS5qc1xuLy89cmVxdWlyZSBibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzXG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5zZXRSYXRlKCk7XG5pbml0R2FsbGVyeShpbWFnZUFycmF5KTtcbiJdfQ==
