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
                                lastClickPosition = lastClickPosition + 5 * 2.5;
        
                            } else if (firstPosition > secondPosition) {
        
                                calculateTransform(false, firstPosition - 5);
                                lastClickPosition = lastClickPosition - 5 * 2.5;
        
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
        
            if (e.clientX > 470) {
                toFixedPosition(e);
            }
        
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
        
                    lastClickPosition = (e.clientX - firstClickPosition - count * 2.5);
        
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
        // document.getElementById('banner').addEventListener('mouseleave', toFixedPosition);
        
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7UUNIQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FEblVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUVUQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FGTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYWRLZXJuZWxCYW5uZXIgPSB7XG5cbiAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oc2xpZGVzLCBwYXJlbnQpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxuICAgIH0sXG5cbiAgICBzZXRSYXRlOiBmdW5jdGlvbiBmdW5jdGlvbk5hbWUoKSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvcmF0ZS9yYXRlLmpzXG5cbiAgICB9XG5cbn07XG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5fX2FkS2VybmVsQmFubmVyLmluaXRHYWxsZXJ5KGltYWdlQXJyYXksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuc2V0UmF0ZSgpO1xuIiwidmFyIHNsaWRlciA9IHBhcmVudDtcblxuKGZ1bmN0aW9uIGFkZFNsaWRlcygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScpO1xuICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcblxuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgIH1cblxufSkoKTtcblxuZnVuY3Rpb24gZ2V0QnJlYWtQb2ludHMoKSB7XG5cbiAgICB2YXIgcG9pbnRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBwb2ludHNbaV0gPSAtMTU1ICogaSArIDIyMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xuXG59XG5cbnZhciBicmVha1BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbihmdW5jdGlvbiBpbml0Q29udHJvbGxlcnMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRyb2xsZXIuY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbScpO1xuICAgICAgICBjb250cm9sbGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInLCBpKTtcblxuICAgICAgICBjb250cm9sbGVyLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZU51bWJlciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInKTtcblxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gdGltZXIoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGltZXMgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZpcnN0UG9zaXRpb24gPSBnZXRTbGlkZXJPZmZzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlY29uZFBvc2l0aW9uID0gYnJlYWtQb2ludHNbc2xpZGVOdW1iZXJdIC0gc2xpZGVXaWR0aCAvIDIgKyAzMCArIDUgKiBzbGlkZU51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RQb3NpdGlvbiA8IHNlY29uZFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZmlyc3RQb3NpdGlvbiArIDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSBsYXN0Q2xpY2tQb3NpdGlvbiArIDUgKiAyLjU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaXJzdFBvc2l0aW9uID4gc2Vjb25kUG9zaXRpb24pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBmaXJzdFBvc2l0aW9uIC0gNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IGxhc3RDbGlja1Bvc2l0aW9uIC0gNSAqIDIuNTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0UG9zaXRpb24gIT09IHNlY29uZFBvc2l0aW9uICYmIGZpcnN0UG9zaXRpb24gIT09IHNlY29uZFBvc2l0aW9uIC0gNSAmJiBmaXJzdFBvc2l0aW9uICE9PSBzZWNvbmRQb3NpdGlvbiArIDUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZXIoKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9LCA0KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aW1lcigpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQoY29udHJvbGxlcik7XG5cbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGggPSBzbGlkZXMubGVuZ3RoICogMjUgKyAncHgnO1xuXG59KSgpO1xuXG52YXIgc2xpZGVXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykuY2hpbGRyZW5bMF0pLndpZHRoKTtcblxudmFyIGdldFNsaWRlck9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KTtcbn1cblxudmFyIGluaXREaXNwbGFjZSA9IC0yNTtcblxudmFyIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IDA7XG52YXIgbGFzdENsaWNrUG9zaXRpb24gPSAwO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVUcmFuc2Zvcm0oZSwgeCkge1xuXG4gICAgaWYgKGUuY2xpZW50WCA+IDQ3MCkge1xuICAgICAgICB0b0ZpeGVkUG9zaXRpb24oZSk7XG4gICAgfVxuXG4gICAgaWYgKHggfHwgeCA9PT0gMCkge1xuICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IHggKyAncHgnO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSBNYXRoLmNlaWwoKGUuY2xpZW50WCAtIGZpcnN0Q2xpY2tQb3NpdGlvbikgLyAyLjUpICsgJ3B4JztcbiAgICB9XG5cbiAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihzbGlkZU51bWJlcikge1xuXG4gICAgICAgIHZhciBzbGlkZU9mZnNldCA9IHNsaWRlci5jaGlsZHJlbltzbGlkZU51bWJlcl0ub2Zmc2V0UGFyZW50Lm9mZnNldExlZnQgKyAoc2xpZGVXaWR0aCAqIHNsaWRlTnVtYmVyKSAtIDEwMCAqIHNsaWRlTnVtYmVyIC0gMTI1O1xuXG4gICAgICAgIHJldHVybiBzbGlkZU9mZnNldDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgIHZhciBkZWcgPSAtZGlzdGFuY2UgLyA1O1xuXG4gICAgICAgIGlmIChkZWcgPCAtNDApIHtcbiAgICAgICAgICAgIHJldHVybiAtNDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVnID4gLTQwICYmIGRlZyA8IDQwKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZyA+IDQwKSB7XG4gICAgICAgICAgICByZXR1cm4gNDA7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjYWxlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICBpZiAoZGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLWRpc3RhbmNlICogMjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSAqIDI7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVTbGlkZUxheWVyKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIGRlcHRoID0gNDAwO1xuXG4gICAgICAgIHZhciB6SW5kZXggPSAtZGlzdGFuY2UgKyBkZXB0aCAvIDI7XG5cbiAgICAgICAgaWYgKHpJbmRleCA+IGRlcHRoIC8gMikge1xuICAgICAgICAgICAgcmV0dXJuIGRlcHRoIC0gekluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHpJbmRleDtcblxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9XG4gICAgICAgICdyb3RhdGVZKCcgKyByb3RhdGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAnZGVnKScgK1xuICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShjYWxjdWxhdGVEaXN0YW5jZShpKSkgKyAncHgpJztcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUuekluZGV4ID0gY2FsY3VsYXRlU2xpZGVMYXllcihjYWxjdWxhdGVEaXN0YW5jZShpKSk7XG5cbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHkrKykge1xuXG4gICAgICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW3ldICYmIGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbeSArIDFdKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5beV0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGZvciAobGV0IHogPSAwOyB6IDwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aDsgeisrKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW5bZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuLmxlbmd0aCAtIDFdLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpXG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIHRvRml4ZWRQb3NpdGlvbihlKSB7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGNhbGN1bGF0ZVRyYW5zZm9ybSk7XG5cbiAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPiBicmVha1BvaW50c1swXSkge1xuXG4gICAgICAgIGxldCBjb3VudCA9IGdldFNsaWRlck9mZnNldCgpIC0gKGJyZWFrUG9pbnRzWzBdIC0gc2xpZGVXaWR0aCAvIDIgKyAyMCk7XG5cbiAgICAgICAgbGV0IHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoY291bnQgPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgLSAxKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LCA0KTtcblxuICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IGUuY2xpZW50WCAtIGZpcnN0Q2xpY2tQb3NpdGlvbiAtIGNvdW50ICogMi41O1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuXG4gICAgICAgICAgICBsZXQgY291bnQgPSBnZXRTbGlkZXJPZmZzZXQoKSAtIChicmVha1BvaW50c1t5XSAtIHNsaWRlV2lkdGggLyAyICsgMzAgKyA1ICogeSk7XG5cbiAgICAgICAgICAgIGxldCB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBjb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZmFsc2UsIGdldFNsaWRlck9mZnNldCgpIC0gMSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50IDwgMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZVRyYW5zZm9ybShmYWxzZSwgZ2V0U2xpZGVyT2Zmc2V0KCkgKyAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sIDQpO1xuXG4gICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IChlLmNsaWVudFggLSBmaXJzdENsaWNrUG9zaXRpb24gLSBjb3VudCAqIDIuNSk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKGdldFNsaWRlck9mZnNldCgpIDwgYnJlYWtQb2ludHNbYnJlYWtQb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICBsZXQgY291bnQgPSBnZXRTbGlkZXJPZmZzZXQoKSAtIChicmVha1BvaW50c1ticmVha1BvaW50cy5sZW5ndGggLSAxXSAtIHNsaWRlV2lkdGggLyAyICsgMzAgKyA1ICogKGJyZWFrUG9pbnRzLmxlbmd0aCAtIDEpKTtcblxuICAgICAgICBsZXQgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA8IDApIHtcblxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBnZXRTbGlkZXJPZmZzZXQoKSArIDEpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA+IDApIHtcblxuICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCBnZXRTbGlkZXJPZmZzZXQoKSAtIDEpO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIDQpO1xuXG4gICAgICAgIGxhc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYIC0gZmlyc3RDbGlja1Bvc2l0aW9uIC0gY291bnQgKiAyLjU7XG5cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gbW91c2Vkb3duKGUpIHtcblxuICAgIGlmIChsYXN0Q2xpY2tQb3NpdGlvbikge1xuICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFggLSBsYXN0Q2xpY2tQb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmaXJzdENsaWNrUG9zaXRpb24gPSBlLmNsaWVudFg7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBjYWxjdWxhdGVUcmFuc2Zvcm0pO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuXG59XG5cbmZ1bmN0aW9uIHRvdWNoc3RhcnQoZSkge1xuXG4gICAgaWYgKGxhc3RDbGlja1Bvc2l0aW9uKSB7XG4gICAgICAgIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gbGFzdENsaWNrUG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS50b3VjaGVzWzBdLmNsaWVudFg7XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHRvdWNobW92ZShlKSB7XG5cbiAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oZSk7XG5cbn1cblxuY2FsY3VsYXRlVHJhbnNmb3JtKGZhbHNlLCAtMjUpO1xuXG50b0ZpeGVkUG9zaXRpb24oe2NsaWVudFg6IC01MH0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlZG93bik7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0b0ZpeGVkUG9zaXRpb24pO1xuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jhbm5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0b0ZpeGVkUG9zaXRpb24pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZWRvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvRml4ZWRQb3NpdGlvbik7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0KTtcbiIsInZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG52YXIgYWxsUmF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyYXRlJyk7XG5cbnJhdGUgPSBhbGxSYXRlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmF0ZScpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbn1cblxuZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3Jztcbn1cbiJdfQ==
