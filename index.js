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
                points[i] = -150 * i + 190;
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
        
                    setSlide(slideNumber, true);
        
                }
        
                document.getElementById('controlerContainer').appendChild(controller);
        
            }
        
            document.getElementById('controlerContainer').style.width = slides.length * 25 + 'px';
        
        })();
        
        var slideWidth = parseFloat(getComputedStyle(document.getElementById('slider').children[0]).width);
        
        var getSliderOffset = function() {
            return parseFloat(slider.style.left);
        }
        
        var firstClickPosition = 0;
        var lastClickPosition = 0;
        
        function calculateTransform() {
        
            var calculateDistance = function(slideNumber) {
        
                return slider.children[slideNumber].offsetParent.offsetLeft + ((slideWidth - 100) * slideNumber) - 115;
        
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
        
        
        }
        
        function checkCurrentSlide() {
        
            if (getSliderOffset() > breakPoints[0]) {
                setSlide(0, true);
            }
        
            for (var y = 0; y < slider.children.length; y++) {
        
                if (getSliderOffset() < breakPoints[y] && getSliderOffset() > breakPoints[y + 1]) {
        
                    for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                        document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                    }
        
                    document.getElementById('controlerContainer').children[y].classList.add('controller__item--active')
        
                    setSlide(y, true);
        
                }
        
            }
        
            if (getSliderOffset() < breakPoints[breakPoints.length - 1]) {
        
                for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                    document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                }
        
                document.getElementById('controlerContainer').children[document.getElementById('controlerContainer').children.length - 1].classList.add('controller__item--active')
        
                setSlide(slider.children.length - 1, true);
        
            }
        
        
        }
        
        function setOffset(offset) {
        
            slider.style.left = offset + 'px';
        
            calculateTransform();
        
        }
        
        var timer;
        
        function setSlide(slideId, enableScroll) {
        
            if (enableScroll) {
        
                clearInterval(timer);
        
                let i = 0;
        
                let positionOnMouseOut = getSliderOffset();
        
                timer = setInterval(function () {
        
                    let offset = Math.round((positionOnMouseOut - (breakPoints[slideId] - 75)) / 5);
        
                    if (offset > 0) {
                        i++;
                        setOffset( getSliderOffset() - 5 );
                    } else if(offset < 0) {
                        i--;
                        setOffset( getSliderOffset() + 5 );
                    }
        
                    if (i === offset) {
                        clearInterval(timer);
                        lastClickPosition = -90 - (375 * (slideId - 1));
                        for (let z = 0; z < document.getElementById('controlerContainer').children.length; z++) {
                            document.getElementById('controlerContainer').children[z].classList.remove('controller__item--active');
                        }
        
                        document.getElementById('controlerContainer').children[slideId].classList.add('controller__item--active')
                    }
        
                }, 4);
        
            } else {
        
                if (slideId === 0) {
                    setOffset( breakPoints[0] - 75 );
                    lastClickPosition = 285;
                } else {
                    setOffset( breakPoints[slideId] - 75 );
                    lastClickPosition = -90 - (375 * (slideId - 1));
                }
        
            }
        
        }
        
        function mouseDown(e) {
        
            firstClickPosition = e.clientX - lastClickPosition;
        
            clearInterval(timer);
            checkCurrentSlide();
            document.getElementById('gallery').addEventListener('mousemove', mouseMove);
        
            return false;
        
        }
        
        function mouseMove(e) {
        
            var offset = Math.ceil((e.clientX - firstClickPosition) / 2.5);
        
            setOffset(offset);
        
        }
        
        function mouseUp(e) {
        
            checkCurrentSlide();
        
            document.getElementById('gallery').removeEventListener('mousemove', mouseMove);
        
        }
        
        function mouseLeave(e) {
        
            clearInterval(timer);
            checkCurrentSlide();
        
            document.getElementById('gallery').removeEventListener('mousemove', mouseMove);
        
        }
        
        setSlide(3, false);
        
        document.getElementById('gallery').addEventListener('mousedown', mouseDown);
        document.getElementById('gallery').addEventListener('mouseup', mouseUp);
        document.getElementById('banner').addEventListener('mouseleave', mouseLeave);
        
        // document.getElementById('gallery').addEventListener('touchstart', mousedown);
        // document.getElementById('gallery').addEventListener('touchend', toFixedPosition);
        // document.getElementById('gallery').addEventListener('touchmove', touchmove);
        // document.getElementById('gallery').addEventListener('touchstart', touchstart);
        

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIiwiYmxvY2tzL2dhbGxlcnkvZ2FsbGVyeS5qcyIsImJsb2Nrcy9yYXRlL3JhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7UUNIQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FEdlFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7UUVUQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO0FGTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYWRLZXJuZWxCYW5uZXIgPSB7XG5cbiAgICBpbml0R2FsbGVyeTogZnVuY3Rpb24oc2xpZGVzLCBwYXJlbnQpIHtcblxuICAgICAgICAvLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxuICAgIH0sXG5cbiAgICBzZXRSYXRlOiBmdW5jdGlvbiBmdW5jdGlvbk5hbWUoKSB7XG5cbiAgICAgICAgLy89cmVxdWlyZSBibG9ja3MvcmF0ZS9yYXRlLmpzXG5cbiAgICB9XG5cbn07XG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5fX2FkS2VybmVsQmFubmVyLmluaXRHYWxsZXJ5KGltYWdlQXJyYXksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKSk7XG5cbl9fYWRLZXJuZWxCYW5uZXIuc2V0UmF0ZSgpO1xuIiwidmFyIHNsaWRlciA9IHBhcmVudDtcblxuKGZ1bmN0aW9uIGFkZFNsaWRlcygpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScpO1xuICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcblxuICAgICAgICBzbGlkZXIuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgIH1cblxufSkoKTtcblxuZnVuY3Rpb24gZ2V0QnJlYWtQb2ludHMoKSB7XG5cbiAgICB2YXIgcG9pbnRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBwb2ludHNbaV0gPSAtMTUwICogaSArIDE5MDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9pbnRzO1xuXG59XG5cbnZhciBicmVha1BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbihmdW5jdGlvbiBpbml0Q29udHJvbGxlcnMoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgIHZhciBjb250cm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRyb2xsZXIuY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbScpO1xuICAgICAgICBjb250cm9sbGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInLCBpKTtcblxuICAgICAgICBjb250cm9sbGVyLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIHZhciBzbGlkZU51bWJlciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1udW1iZXInKTtcblxuICAgICAgICAgICAgc2V0U2xpZGUoc2xpZGVOdW1iZXIsIHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuYXBwZW5kQ2hpbGQoY29udHJvbGxlcik7XG5cbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGggPSBzbGlkZXMubGVuZ3RoICogMjUgKyAncHgnO1xuXG59KSgpO1xuXG52YXIgc2xpZGVXaWR0aCA9IHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGVyJykuY2hpbGRyZW5bMF0pLndpZHRoKTtcblxudmFyIGdldFNsaWRlck9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KTtcbn1cblxudmFyIGZpcnN0Q2xpY2tQb3NpdGlvbiA9IDA7XG52YXIgbGFzdENsaWNrUG9zaXRpb24gPSAwO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVUcmFuc2Zvcm0oKSB7XG5cbiAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihzbGlkZU51bWJlcikge1xuXG4gICAgICAgIHJldHVybiBzbGlkZXIuY2hpbGRyZW5bc2xpZGVOdW1iZXJdLm9mZnNldFBhcmVudC5vZmZzZXRMZWZ0ICsgKChzbGlkZVdpZHRoIC0gMTAwKSAqIHNsaWRlTnVtYmVyKSAtIDExNTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgdmFyIGRlZyA9IC1kaXN0YW5jZSAvIDU7XG5cbiAgICAgICAgaWYgKGRlZyA8IC00MCkge1xuICAgICAgICAgICAgcmV0dXJuIC00MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWcgPiAtNDAgJiYgZGVnIDwgNDApIHtcbiAgICAgICAgICAgIHJldHVybiBkZWc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVnID4gNDApIHtcbiAgICAgICAgICAgIHJldHVybiA0MDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2NhbGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtZGlzdGFuY2UgKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlICogMjtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVNsaWRlTGF5ZXIoZGlzdGFuY2UpIHtcblxuICAgICAgICB2YXIgZGVwdGggPSA0MDA7XG5cbiAgICAgICAgdmFyIHpJbmRleCA9IC1kaXN0YW5jZSArIGRlcHRoIC8gMjtcblxuICAgICAgICBpZiAoekluZGV4ID4gZGVwdGggLyAyKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVwdGggLSB6SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gekluZGV4O1xuXG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICBzbGlkZXIuY2hpbGRyZW5baV0uc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdkZWcpJyArXG4gICAgICAgICd0cmFuc2xhdGVaKCcgKyBzY2FsZVNsaWRlKGNhbGN1bGF0ZURpc3RhbmNlKGkpKSArICdweCknO1xuXG4gICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS56SW5kZXggPSBjYWxjdWxhdGVTbGlkZUxheWVyKGNhbGN1bGF0ZURpc3RhbmNlKGkpKTtcblxuICAgIH1cblxuXG59XG5cbmZ1bmN0aW9uIGNoZWNrQ3VycmVudFNsaWRlKCkge1xuXG4gICAgaWYgKGdldFNsaWRlck9mZnNldCgpID4gYnJlYWtQb2ludHNbMF0pIHtcbiAgICAgICAgc2V0U2xpZGUoMCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyB5KyspIHtcblxuICAgICAgICBpZiAoZ2V0U2xpZGVyT2Zmc2V0KCkgPCBicmVha1BvaW50c1t5XSAmJiBnZXRTbGlkZXJPZmZzZXQoKSA+IGJyZWFrUG9pbnRzW3kgKyAxXSkge1xuXG4gICAgICAgICAgICBmb3IgKGxldCB6ID0gMDsgeiA8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3ldLmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpXG5cbiAgICAgICAgICAgIHNldFNsaWRlKHksIHRydWUpO1xuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlmIChnZXRTbGlkZXJPZmZzZXQoKSA8IGJyZWFrUG9pbnRzW2JyZWFrUG9pbnRzLmxlbmd0aCAtIDFdKSB7XG5cbiAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlblt6XS5jbGFzc0xpc3QucmVtb3ZlKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbltkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoIC0gMV0uY2xhc3NMaXN0LmFkZCgnY29udHJvbGxlcl9faXRlbS0tYWN0aXZlJylcblxuICAgICAgICBzZXRTbGlkZShzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoIC0gMSwgdHJ1ZSk7XG5cbiAgICB9XG5cblxufVxuXG5mdW5jdGlvbiBzZXRPZmZzZXQob2Zmc2V0KSB7XG5cbiAgICBzbGlkZXIuc3R5bGUubGVmdCA9IG9mZnNldCArICdweCc7XG5cbiAgICBjYWxjdWxhdGVUcmFuc2Zvcm0oKTtcblxufVxuXG52YXIgdGltZXI7XG5cbmZ1bmN0aW9uIHNldFNsaWRlKHNsaWRlSWQsIGVuYWJsZVNjcm9sbCkge1xuXG4gICAgaWYgKGVuYWJsZVNjcm9sbCkge1xuXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuXG4gICAgICAgIGxldCBpID0gMDtcblxuICAgICAgICBsZXQgcG9zaXRpb25Pbk1vdXNlT3V0ID0gZ2V0U2xpZGVyT2Zmc2V0KCk7XG5cbiAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBNYXRoLnJvdW5kKChwb3NpdGlvbk9uTW91c2VPdXQgLSAoYnJlYWtQb2ludHNbc2xpZGVJZF0gLSA3NSkpIC8gNSk7XG5cbiAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIHNldE9mZnNldCggZ2V0U2xpZGVyT2Zmc2V0KCkgLSA1ICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgICBzZXRPZmZzZXQoIGdldFNsaWRlck9mZnNldCgpICsgNSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaSA9PT0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtOTAgLSAoMzc1ICogKHNsaWRlSWQgLSAxKSk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgeiA9IDA7IHogPCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udHJvbGVyQ29udGFpbmVyJykuY2hpbGRyZW4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRyb2xlckNvbnRhaW5lcicpLmNoaWxkcmVuW3pdLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbnRyb2xsZXJfX2l0ZW0tLWFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250cm9sZXJDb250YWluZXInKS5jaGlsZHJlbltzbGlkZUlkXS5jbGFzc0xpc3QuYWRkKCdjb250cm9sbGVyX19pdGVtLS1hY3RpdmUnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sIDQpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoc2xpZGVJZCA9PT0gMCkge1xuICAgICAgICAgICAgc2V0T2Zmc2V0KCBicmVha1BvaW50c1swXSAtIDc1ICk7XG4gICAgICAgICAgICBsYXN0Q2xpY2tQb3NpdGlvbiA9IDI4NTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldE9mZnNldCggYnJlYWtQb2ludHNbc2xpZGVJZF0gLSA3NSApO1xuICAgICAgICAgICAgbGFzdENsaWNrUG9zaXRpb24gPSAtOTAgLSAoMzc1ICogKHNsaWRlSWQgLSAxKSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5mdW5jdGlvbiBtb3VzZURvd24oZSkge1xuXG4gICAgZmlyc3RDbGlja1Bvc2l0aW9uID0gZS5jbGllbnRYIC0gbGFzdENsaWNrUG9zaXRpb247XG5cbiAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICBjaGVja0N1cnJlbnRTbGlkZSgpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYWxsZXJ5JykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcblxuICAgIHJldHVybiBmYWxzZTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZU1vdmUoZSkge1xuXG4gICAgdmFyIG9mZnNldCA9IE1hdGguY2VpbCgoZS5jbGllbnRYIC0gZmlyc3RDbGlja1Bvc2l0aW9uKSAvIDIuNSk7XG5cbiAgICBzZXRPZmZzZXQob2Zmc2V0KTtcblxufVxuXG5mdW5jdGlvbiBtb3VzZVVwKGUpIHtcblxuICAgIGNoZWNrQ3VycmVudFNsaWRlKCk7XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XG5cbn1cblxuZnVuY3Rpb24gbW91c2VMZWF2ZShlKSB7XG5cbiAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICBjaGVja0N1cnJlbnRTbGlkZSgpO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuXG59XG5cbnNldFNsaWRlKDMsIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFubmVyJykuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNlTGVhdmUpO1xuXG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZWRvd24pO1xuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbGxlcnknKS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRvRml4ZWRQb3NpdGlvbik7XG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRvdWNobW92ZSk7XG4vLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FsbGVyeScpLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0b3VjaHN0YXJ0KTtcbiIsInZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgIHN0YXIuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMnKTtcbiAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG52YXIgYWxsUmF0ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyYXRlJyk7XG5cbnJhdGUgPSBhbGxSYXRlc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmF0ZScpO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbn1cblxuZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3Jztcbn1cbiJdfQ==
