var __adKernelBanner = {

    initGallery: function(slides, parent) {

        var slider = parent;
        
        (function addSlides() {
        
            for (var i = 0; i < slides.length; i++) {
        
                var slide = document.createElement('div');
        
                slide.classList.add('gallery__item');
                slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';
        
                slider.appendChild(slide);
            }
        
        })();
        
        function getBreakPoints() {
        
            var points = [];
        
            for (var i = 0; i < slider.children.length; i++) {
                points[i] = -155 * i + 220;
            }
        
            return points;
        
        }
        
        var breakPoints = getBreakPoints();
        
        (function initControllers() {
        
            for (var i = 0; i < slides.length; i++) {
        
                var controller = document.createElement('div');
                controller.classList.add('controller__item');
                controller.setAttribute('data-number', i);
        
                controller.onclick = function(e) {
        
                    var slideNumber = e.target.getAttribute('data-number');
        
                    let count = 0;
        
                    function timer() {
        
                        var times = setTimeout(function() {
        
                            count++;
        
                            let firstPosition = getSliderOffset();
                            let secondPosition = breakPoints[slideNumber] - slideWidth / 2 + 30 + 5 * slideNumber;
        
                            if (firstPosition < secondPosition) {
        
                                calculateTransform(false, firstPosition + 5);
        
                                lastClickPosition = lastClickPosition + 5;
        
                            } else if (firstPosition > secondPosition) {
        
                                calculateTransform(false, firstPosition - 5);
        
                                lastClickPosition = lastClickPosition + 5;
        
                            }
        
                            if (firstPosition !== secondPosition && firstPosition !== secondPosition - 5 && firstPosition !== secondPosition + 5) {
        
                                timer();
        
                            }
        
                        }, 4);
        
                    }
        
                    timer();
        
                }
        
                document.getElementById('controlerContainer').appendChild(controller);
        
            }
        
            document.getElementById('controlerContainer').style.width = slides.length * 25 + 'px';
        
        })();
        
        var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);
        
        var getSliderOffset = function() {
            return parseFloat(slider.style.left);
        }
        
        var initDisplace = -25;
        
        var firstClickPosition = 0;
        var lastClickPosition = 0;
        
        function calculateTransform(e, x) {
        
            if (x || x === 0) {
                slider.style.left = x + 'px';
        
            } else {
                slider.style.left = Math.ceil((e.clientX - firstClickPosition) / 2.5) + 'px';
            }
        
            var calculateDistance = function(slideNumber) {
        
                var slideOffset = slider.children[slideNumber].offsetParent.offsetLeft + (slideWidth * slideNumber) - 100 * slideNumber - 125;
        
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
        
                if (distance > 0) {
                    return -distance * 2;
                }
        
                return distance * 2;
        
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
        
            for (var y = 0; y < slider.children.length; y++) {
        
                if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {
        
                    for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                        document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                    }
        
                    document.getElementById('controlerContainer').children[y].classList.add('controller__item--active')
        
                }
        
                if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {
                    for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                        document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                    }
        
                    document.getElementById('controlerContainer').children[document.getElementById('controlerContainer').children.length - 1].classList.add('controller__item--active')
                }
        
            }
        
        
        }
        
        function toFixedPosition(e) {
        
            document.getElementById('gallery').removeEventListener('mousemove', calculateTransform);
        
            if (getSliderOffset() > breakPoints[0]) {
        
                let count = getSliderOffset() - (breakPoints[0] - slideWidth / 2 + 20);
        
                let timer = setInterval(function () {
        
                    if (count > 0) {
        
                        count--;
                        calculateTransform(false, getSliderOffset() - 1);
        
                    }
        
                    if (count === 0) {
                        clearInterval(timer);
                    }
        
                }, 4);
        
                lastClickPosition = e.clientX - firstClickPosition - count * 2.5;
        
            }
        
            for (var y = 0; y < slider.children.length; y++) {
        
                if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {
        
                    let count = getSliderOffset() - (breakPoints[y] - slideWidth / 2 + 30 + 5 * y);
        
                    let timer = setInterval(function () {
        
                        if (count > 0) {
        
                            count--;
                            calculateTransform(false, getSliderOffset() - 1);
        
                        } else if (count < 0) {
        
                            count++;
                            calculateTransform(false, getSliderOffset() + 1);
        
                        }
        
                        if (count === 0) {
                            clearInterval(timer);
                        }
        
                    }, 4);
        
                    lastClickPosition = e.clientX - firstClickPosition - count * 2.5;
        
                }
        
            }
        
            if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {
        
                let count = getSliderOffset() - (breakPoints[breakPoints.length - 1] - slideWidth / 2 + 30 + 5 * (breakPoints.length - 1));
        
                let timer = setInterval(function () {
        
                    if (count < 0) {
        
                        count++;
                        calculateTransform(false, getSliderOffset() + 1);
        
                    }
        
                    if (count > 0) {
        
                        count--;
                        calculateTransform(false, getSliderOffset() - 1);
        
                    }
        
                    if (count === 0) {
                        clearInterval(timer);
                    }
        
                }, 4);
        
                lastClickPosition = e.clientX - firstClickPosition - count * 2.5;
        
            }
        
        }
        
        function mousedown(e) {
        
            console.log(firstClickPosition, lastClickPosition);
        
            if (lastClickPosition) {
                firstClickPosition = e.clientX - lastClickPosition;
            } else {
                firstClickPosition = e.clientX;
            }
        
            document.getElementById('gallery').addEventListener('mousemove', calculateTransform);
        
            return false;
        
        }
        
        function touchstart(e) {
        
            if (lastClickPosition) {
                firstClickPosition = e.touches[0].clientX - lastClickPosition;
            } else {
                firstClickPosition = e.touches[0].clientX;
            }
        
        }
        
        function touchmove(e) {
        
            calculateTransform(e);
        
        }
        
        calculateTransform(false, -25);
        
        toFixedPosition({clientX: -50});
        
        document.getElementById('gallery').addEventListener('mousedown', mousedown);
        document.getElementById('gallery').addEventListener('mouseup', toFixedPosition);
        document.getElementById('gallery').addEventListener('mouseleave', toFixedPosition);
        
        document.getElementById('gallery').addEventListener('touchstart', mousedown);
        document.getElementById('gallery').addEventListener('touchend', toFixedPosition);
        document.getElementById('gallery').addEventListener('touchmove', touchmove);
        document.getElementById('gallery').addEventListener('touchstart', touchstart);
        

    },

    setRate: function functionName() {

        var star = document.createElement('i');
            star.classList.add('material-icons');
            star.style.color = '#694E00';
            star.innerHTML = 'star';
        
        var allRates = document.getElementsByClassName('rate');
        
        rate = allRates[0].getAttribute('data-rate');
        
        for (var i = 0; i < 5; i++) {
            allRates[0].appendChild(star.cloneNode(true));
        }
        
        for (var y = 0; y < rate; y++) {
            allRates[0].children[y].style.color = '#FFC107';
        }
        

    }

};

var imageArray = [
                  './img/unsplash.jpg',
                  './img/unsplash-2.jpg',
                  './img/unsplash-3.jpg',
                  './img/unsplash-4.jpg',
                  './img/unsplash-5.jpg',
                  './img/unsplash-6.jpg'
                 ];

__adKernelBanner.initGallery(imageArray, document.getElementById('slider'));

__adKernelBanner.setRate();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7UUNIQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FEblVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUVUQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FGTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYWRLZXJuZWxCYW5uZXIgPSB7XG5cbiAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oc2xpZGVzLCBwYXJlbnQpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxuICAgIH0sXG5cbiAgICBzZXRSYXRlOiBmdW5jdGlvbiBmdW5jdGlvbk5hbWUoKSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvcmF0ZS9yYXRlLmpzXG5cbiAgICB9XG5cbn07XG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5fX2FkS2VybmVsQmFubmVyLmluaXRHYWxsZXJ5KGltYWdlQXJyYXksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuc2V0UmF0ZSgpO1xuIiwidmFyIHNsaWRlciA9IHBhcmVudDtcblxuKGZ1bmN0aW9uIGFkZFNsaWRlcygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScpO1xuICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcblxuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgIH1cblxufSkoKTtcblxuZnVuY3Rpb24gZ2V0QnJlYWtQb2ludHMoKSB7XG5cbiAgICB2YXIgcG9pbnRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBwb2ludHNbaV0gPSAtMTU1ICogaSArIDIyMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xuXG59XG5cbnZhciBicmVha1BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbihmdW5jdGlvbiBpbml0Q29udHJvbGxlcnMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRyb2xsZXIuY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbScpO1xuICAgICAgICBjb250cm9sbGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInLCBpKTtcblxuICAgICAgICBjb250cm9sbGVyLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZU51bWJlciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInKTtcblxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZXIoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGltZXMgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0UG9zaXRpb24gPSBnZXRTbGlkZXJPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlY29uZFBvc2l0aW9uID0gYnJlYWtQb2ludHNbc2xpZGVOdW1iZXJdIC0gc2xpZGVXaWR0aCAvIDIgKyAzMCArIDUgKiBzbGlkZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RQb3NpdGlvbiA8IHNlY29uZFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZmlyc3RQb3NpdGlvbiArIDUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IGxhc3RDbGlja1Bvc2l0aW9uICsgNTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0UG9zaXRpb24gPiBzZWNvbmRQb3NpdGlvbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGZpcnN0UG9zaXRpb24gLSA1KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSBsYXN0Q2xpY2tQb3NpdGlvbiArIDU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdFBvc2l0aW9uICE9PSBzZWNvbmRQb3NpdGlvbiAmJiBmaXJzdFBvc2l0aW9uICE9PSBzZWNvbmRQb3NpdGlvbiAtIDUgJiYgZmlyc3RQb3NpdGlvbiAhPT0gc2Vjb25kUG9zaXRpb24gKyA1KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGltZXIoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmFwcGVuZENoaWxkKGNvbnRyb2xsZXIpO1xuXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gc2xpZGVzLmxlbmd0aCAqIDI1ICsgJ3B4JztcblxufSkoKTtcblxudmFyIHNsaWRlV2lkdGggPSBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpLmNoaWxkcmVuWzBdKS53aWR0aCk7XG5cbnZhciBnZXRTbGlkZXJPZmZzZXQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzbGlkZXIuc3R5bGUubGVmdCk7XG59XG5cbnZhciBpbml0RGlzcGxhY2UgPSAtMjU7XG5cbnZhciBmaXJzdENsaWNrUG9zaXRpb24gPSAwO1xudmFyIGxhc3RDbGlja1Bvc2l0aW9uID0gMDtcblxuZnVuY3Rpb24gY2FsY3VsYXRlVHJhbnNmb3JtKGUsIHgpIHtcblxuICAgIGlmICh4IHx8IHggPT09IDApIHtcbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gTWF0aC5jZWlsKChlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24pIC8gMi41KSArICdweCc7XG4gICAgfVxuXG4gICAgdmFyIGNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24oc2xpZGVOdW1iZXIpIHtcblxuICAgICAgICB2YXIgc2xpZGVPZmZzZXQgPSBzbGlkZXIuY2hpbGRyZW5bc2xpZGVOdW1iZXJdLm9mZnNldFBhcmVudC5vZmZzZXRMZWZ0ICsgKHNsaWRlV2lkdGggKiBzbGlkZU51bWJlcikgLSAxMDAgKiBzbGlkZU51bWJlciAtIDEyNTtcblxuICAgICAgICByZXR1cm4gc2xpZGVPZmZzZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICBpZiAoZGVnIDwgLTQwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTQwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiA0MCkge1xuICAgICAgICAgICAgcmV0dXJuIDQwO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC1kaXN0YW5jZSAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgKiAyO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlU2xpZGVMYXllcihkaXN0YW5jZSkge1xuXG4gICAgICAgIHZhciBkZXB0aCA9IDQwMDtcblxuICAgICAgICB2YXIgekluZGV4ID0gLWRpc3RhbmNlICsgZGVwdGggLyAyO1xuXG4gICAgICAgIGlmICh6SW5kZXggPiBkZXB0aCAvIDIpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXB0aCAtIHpJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB6SW5kZXg7XG5cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAncm90YXRlWSgnICsgcm90YXRlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ2RlZyknICtcbiAgICAgICAgJ3RyYW5zbGF0ZVooJyArIHNjYWxlU2xpZGUoY2FsY3VsYXRlRGlzdGFuY2UoaSkpICsgJ3B4KSc7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnpJbmRleCA9IGNhbGN1bGF0ZVNsaWRlTGF5ZXIoY2FsY3VsYXRlRGlzdGFuY2UoaSkpO1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuXG4gICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3ldLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGggLSAxXS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuICAgICAgICB9XG5cbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiB0b0ZpeGVkUG9zaXRpb24oZSkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgaWYgKGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbMF0pIHtcblxuICAgICAgICBsZXQgY291bnQgPSBnZXRTbGlkZXJPZmZzZXQoKSAtIChicmVha1BvaW50c1swXSAtIHNsaWRlV2lkdGggLyAyICsgMjApO1xuXG4gICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24gLSBjb3VudCAqIDIuNTtcblxuICAgIH1cblxuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeSsrKSB7XG5cbiAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbeV0gJiYgZ2V0U2xpZGVyT2Zmc2V0KCkgPiBicmVha1BvaW50c1t5ICsgMV0pIHtcblxuICAgICAgICAgICAgbGV0IGNvdW50ID0gZ2V0U2xpZGVyT2Zmc2V0KCkgLSAoYnJlYWtQb2ludHNbeV0gLSBzbGlkZVdpZHRoIC8gMiArIDMwICsgNSAqIHkpO1xuXG4gICAgICAgICAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBnZXRTbGlkZXJPZmZzZXQoKSAtIDEpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA8IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpICsgMSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCA0KTtcblxuICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24gLSBjb3VudCAqIDIuNTtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXSkge1xuXG4gICAgICAgIGxldCBjb3VudCA9IGdldFNsaWRlck9mZnNldCgpIC0gKGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdIC0gc2xpZGVXaWR0aCAvIDIgKyAzMCArIDUgKiAoYnJlYWtQb2ludHMubGVuZ3RoIC0gMSkpO1xuXG4gICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgaWYgKGNvdW50IDwgMCkge1xuXG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpICsgMSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgY291bnQtLTtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgNCk7XG5cbiAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24gLSBjb3VudCAqIDIuNTtcblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBtb3VzZWRvd24oZSkge1xuXG4gICAgY29uc29sZS5sb2coZmlyc3RDbGlja1Bvc2l0aW9uLCBsYXN0Q2xpY2tQb3NpdGlvbik7XG5cbiAgICBpZiAobGFzdENsaWNrUG9zaXRpb24pIHtcbiAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYIC0gbGFzdENsaWNrUG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgY2FsY3VsYXRlVHJhbnNmb3JtKTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufVxuXG5mdW5jdGlvbiB0b3VjaHN0YXJ0KGUpIHtcblxuICAgIGlmIChsYXN0Q2xpY2tQb3NpdGlvbikge1xuICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGxhc3RDbGlja1Bvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgIH1cblxufVxuXG5mdW5jdGlvbiB0b3VjaG1vdmUoZSkge1xuXG4gICAgY2FsY3VsYXRlVHJhbnNmb3JtKGUpO1xuXG59XG5cbmNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgLTI1KTtcblxudG9GaXhlZFBvc2l0aW9uKHtjbGllbnRYOiAtNTB9KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZWRvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdG9GaXhlZFBvc2l0aW9uKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvRml4ZWRQb3NpdGlvbik7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdG9GaXhlZFBvc2l0aW9uKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdG91Y2htb3ZlKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQpO1xuIiwidmFyIHN0YXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgc3Rhci5pbm5lckhUTUwgPSAnc3Rhcic7XG5cbnZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxucmF0ZSA9IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbmZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgYWxsUmF0ZXNbMF0uYXBwZW5kQ2hpbGQoc3Rhci5jbG9uZU5vZGUodHJ1ZSkpO1xufVxuXG5mb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgIGFsbFJhdGVzWzBdLmNoaWxkcmVuW3ldLnN0eWxlLmNvbG9yID0gJyNGRkMxMDcnO1xufVxuIl19
