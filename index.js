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

    var initDisplace = -375;

    var slider = document.getElementById('slider');
        slider.style.left = initDisplace + 'px';

    for (var i = 0; i < slides.length; i++) {
        var slide = document.createElement('div');
        slide.classList.add('gallery__item');
        slide.style.background = 'url(' + slides[i] + ') no-repeat center / cover';

        slider.appendChild(slide);
    }

    var firstClick;
    var lastClick = initDisplace;

    (function setFirstRotate() {

        toFixedPosition();

        for (var i = 0; i < slider.children.length / 2 - 1; i++) {
            slider.children[i].style.transform = 'rotateY(40deg)';
        }

        for (var y = slider.children.length / 2; y < slider.children.length; y++) {
            slider.children[y].style.transform = 'rotateY(-40deg)';
        }

    })();

    function swipe(e) {

        slider.style.left = -(firstClick - (e.clientX || e.touches.clientX)) + 'px';

        console.log(e.clientX || e.touches.clientX);

        function rotateSlide(distance) {

            var deg = -distance / 5;

            if (deg > -40 && deg < 40) {
                return deg;
            }

        }

        function scaleSlide(distance) {

            if (distance > -80 && distance < 80) {

                if (distance > 0) {
                    distance = -distance;
                }


                return distance + 80
            }

            return 0;


        }

        for (var i = 0; i < slider.children.length; i++) {
            slider.children[i].style.transform =
            'rotateY(' + rotateSlide(parseFloat(slider.style.left) - 125 + (250 * i)) + 'deg)' +
            'translateZ(' + scaleSlide(parseFloat(slider.style.left) - 125 + (250 * i)) + 'px)';
        }

    }

    function toFixedPosition() {

        var distance = -parseFloat(slider.style.left);

        function getBreakPoints() {

            var points = [];

            for (var i = 0; i < slider.children.length; i++) {
                points[i] = i * 250;
            }

            return points;

        }

        var breakpoints = getBreakPoints();

        if (distance <= breakpoints[0]) {
            slider.style.transition = 'all 0.5s';
            slider.style.left = (breakpoints[1] / 2) + 'px';
            slider.children[0].style.transform = 'rotateY(0deg)';

            setTimeout(function() {
                slider.style.transition = 'none';
            }, 500);

            lastClick = breakpoints[1] / 2;
        }

        for (var i = 0; i < breakpoints.length; i++) {

            if (distance >= breakpoints[i] && distance <= breakpoints[i + 1] && breakpoints[i + 2]) {

                slider.style.left = -(breakpoints[i + 1]  - 125) + 'px';

                slider.style.transition = 'all 0.5s';
                slider.children[i].style.transform = 'rotateY(40deg)';
                slider.children[i + 1].style.transform = 'rotateY(0deg)';
                slider.children[i + 1].style.transform = 'translateZ(80px)';
                slider.children[i + 2].style.transform = 'rotateY(-40deg)';

                lastClick = -(breakpoints[i + 1]  - 125);

                setTimeout(function() {
                    slider.style.transition = 'none';
                }, 500);

            }

        }

        if (distance >= breakpoints[breakpoints.length - 1]) {

            slider.style.transition = 'all 0.5s';

            slider.style.left = -1125 + 'px';
            slider.children[0].style.transform = 'rotateY(0deg)';

            setTimeout(function() {
                slider.style.transition = 'none';
            }, 500);

            lastClick = breakpoints[breakpoints.length - 1] - 125;
        }

    }

    function mousedown(e) {

        slider.style.cursor = 'move';

        if (lastClick) {
            firstClick = e.clientX - lastClick;
        } else {
            firstClick = e.clientX;
        }

        slider.addEventListener('mousemove', swipe);
        slider.addEventListener('touchmove', swipe);

    }

    function mouseup(e) {

        slider.style.cursor = 'pointer';

        lastClick = -(firstClick - e.clientX);

        slider.removeEventListener('mousemove', swipe);
        slider.removeEventListener('touchmove', swipe);

        toFixedPosition();

    }

    function mouseleave(e) {

        slider.style.cursor = 'pointer';

        lastClick = -(firstClick - e.clientX);

        slider.removeEventListener('mousemove', swipe);

        toFixedPosition();

    }

    slider.addEventListener('mousedown', mousedown);
    slider.addEventListener('mouseup', mouseup);
    slider.addEventListener('mouseleave', mouseleave);

    slider.addEventListener('touchstart', mousedown);
    slider.addEventListener('touchend', mouseup);
    slider.addEventListener('touchmove', swipe);

    function test(e) {
        console.log(e);
    }


}


var imageArray = [
                  'https://unsplash.it/270/173',
                  'https://unsplash.it/270/172',
                  'https://unsplash.it/270/171',
                  'https://unsplash.it/270/170',
                  'https://unsplash.it/270/169',
                  'https://unsplash.it/270/168'
                 ];

setRate();
initGallery(imageArray);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0UmF0ZShyYXRlKSB7XG5cbiAgICB2YXIgc3RhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1pY29ucycpO1xuICAgICAgICBzdGFyLnN0eWxlLmNvbG9yID0gJyM2OTRFMDAnO1xuICAgICAgICBzdGFyLmlubmVySFRNTCA9ICdzdGFyJztcblxuICAgIHZhciBhbGxSYXRlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JhdGUnKTtcblxuICAgIHJhdGUgPSByYXRlIHx8IGFsbFJhdGVzWzBdLmdldEF0dHJpYnV0ZSgnZGF0YS1yYXRlJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5hcHBlbmRDaGlsZChzdGFyLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCByYXRlOyB5KyspIHtcbiAgICAgICAgYWxsUmF0ZXNbMF0uY2hpbGRyZW5beV0uc3R5bGUuY29sb3IgPSAnI0ZGQzEwNyc7XG4gICAgfVxuXG59XG4iLCJmdW5jdGlvbiBpbml0R2FsbGVyeShzbGlkZXMpIHtcblxuICAgIHZhciBpbml0RGlzcGxhY2UgPSAtMzc1O1xuXG4gICAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKTtcbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSBpbml0RGlzcGxhY2UgKyAncHgnO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2dhbGxlcnlfX2l0ZW0nKTtcbiAgICAgICAgc2xpZGUuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIHNsaWRlc1tpXSArICcpIG5vLXJlcGVhdCBjZW50ZXIgLyBjb3Zlcic7XG5cbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RDbGljaztcbiAgICB2YXIgbGFzdENsaWNrID0gaW5pdERpc3BsYWNlO1xuXG4gICAgKGZ1bmN0aW9uIHNldEZpcnN0Um90YXRlKCkge1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIDIgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSg0MGRlZyknO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLyAyOyB5IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5beV0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoLTQwZGVnKSc7XG4gICAgICAgIH1cblxuICAgIH0pKCk7XG5cbiAgICBmdW5jdGlvbiBzd2lwZShlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmxlZnQgPSAtKGZpcnN0Q2xpY2sgLSAoZS5jbGllbnRYIHx8IGUudG91Y2hlcy5jbGllbnRYKSkgKyAncHgnO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGUuY2xpZW50WCB8fCBlLnRvdWNoZXMuY2xpZW50WCk7XG5cbiAgICAgICAgZnVuY3Rpb24gcm90YXRlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICAgICAgdmFyIGRlZyA9IC1kaXN0YW5jZSAvIDU7XG5cbiAgICAgICAgICAgIGlmIChkZWcgPiAtNDAgJiYgZGVnIDwgNDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzY2FsZVNsaWRlKGRpc3RhbmNlKSB7XG5cbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+IC04MCAmJiBkaXN0YW5jZSA8IDgwKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlzdGFuY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlID0gLWRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlICsgODBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIDA7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpIC0gMTI1ICsgKDI1MCAqIGkpKSArICdkZWcpJyArXG4gICAgICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShwYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KSAtIDEyNSArICgyNTAgKiBpKSkgKyAncHgpJztcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9GaXhlZFBvc2l0aW9uKCkge1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IC1wYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcblxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBvaW50c1tpXSA9IGkgKiAyNTA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwb2ludHM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBicmVha3BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGJyZWFrcG9pbnRzWzBdKSB7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC41cyc7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IChicmVha3BvaW50c1sxXSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlblswXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICAgICBsYXN0Q2xpY2sgPSBicmVha3BvaW50c1sxXSAvIDI7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJyZWFrcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmIChkaXN0YW5jZSA+PSBicmVha3BvaW50c1tpXSAmJiBkaXN0YW5jZSA8PSBicmVha3BvaW50c1tpICsgMV0gJiYgYnJlYWtwb2ludHNbaSArIDJdKSB7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC0oYnJlYWtwb2ludHNbaSArIDFdICAtIDEyNSkgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSg0MGRlZyknO1xuICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpICsgMV0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMGRlZyknO1xuICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpICsgMV0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooODBweCknO1xuICAgICAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpICsgMl0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoLTQwZGVnKSc7XG5cbiAgICAgICAgICAgICAgICBsYXN0Q2xpY2sgPSAtKGJyZWFrcG9pbnRzW2kgKyAxXSAgLSAxMjUpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGlzdGFuY2UgPj0gYnJlYWtwb2ludHNbYnJlYWtwb2ludHMubGVuZ3RoIC0gMV0pIHtcblxuICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuXG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC0xMTI1ICsgJ3B4JztcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlblswXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICB9LCA1MDApO1xuXG4gICAgICAgICAgICBsYXN0Q2xpY2sgPSBicmVha3BvaW50c1ticmVha3BvaW50cy5sZW5ndGggLSAxXSAtIDEyNTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2Vkb3duKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuXG4gICAgICAgIGlmIChsYXN0Q2xpY2spIHtcbiAgICAgICAgICAgIGZpcnN0Q2xpY2sgPSBlLmNsaWVudFggLSBsYXN0Q2xpY2s7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrID0gZS5jbGllbnRYO1xuICAgICAgICB9XG5cbiAgICAgICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHN3aXBlKTtcbiAgICAgICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHN3aXBlKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNldXAoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgbGFzdENsaWNrID0gLShmaXJzdENsaWNrIC0gZS5jbGllbnRYKTtcblxuICAgICAgICBzbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGUpO1xuICAgICAgICBzbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgc3dpcGUpO1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW91c2VsZWF2ZShlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcblxuICAgICAgICBsYXN0Q2xpY2sgPSAtKGZpcnN0Q2xpY2sgLSBlLmNsaWVudFgpO1xuXG4gICAgICAgIHNsaWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZSk7XG5cbiAgICAgICAgdG9GaXhlZFBvc2l0aW9uKCk7XG5cbiAgICB9XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgbW91c2Vkb3duKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNldXApO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgbW91c2VsZWF2ZSk7XG5cbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIG1vdXNlZG93bik7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgbW91c2V1cCk7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHN3aXBlKTtcblxuICAgIGZ1bmN0aW9uIHRlc3QoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG5cblxufVxuIiwiLy89cmVxdWlyZSBibG9ja3MvcmF0ZS9yYXRlLmpzXG4vLz1yZXF1aXJlIGJsb2Nrcy9nYWxsZXJ5L2dhbGxlcnkuanNcblxudmFyIGltYWdlQXJyYXkgPSBbXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly91bnNwbGFzaC5pdC8yNzAvMTczJyxcbiAgICAgICAgICAgICAgICAgICdodHRwczovL3Vuc3BsYXNoLml0LzI3MC8xNzInLFxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vdW5zcGxhc2guaXQvMjcwLzE3MScsXG4gICAgICAgICAgICAgICAgICAnaHR0cHM6Ly91bnNwbGFzaC5pdC8yNzAvMTcwJyxcbiAgICAgICAgICAgICAgICAgICdodHRwczovL3Vuc3BsYXNoLml0LzI3MC8xNjknLFxuICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vdW5zcGxhc2guaXQvMjcwLzE2OCdcbiAgICAgICAgICAgICAgICAgXTtcblxuc2V0UmF0ZSgpO1xuaW5pdEdhbGxlcnkoaW1hZ2VBcnJheSk7XG4iXX0=
