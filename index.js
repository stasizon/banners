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
        slide.style.zIndex = slides.length - i;

        slider.appendChild(slide);
    }

    var firstClick;
    var lastClick = initDisplace;

    (function setFirstRotate() {

        toFixedPosition();

        for (var i = 0; i < slider.children.length / 2 - 1; i++) {
            slider.children[i].style.transform = 'rotateY(40deg) translateZ(-80px)';
        }

        for (var y = slider.children.length / 2; y < slider.children.length; y++) {
            slider.children[y].style.transform = 'rotateY(-40deg) translateZ(-80px)';
        }

        for (var z = 0; z < slider.children.length; z++) {
            slider.children[z].style.left = -50 * z;
            console.log(slider.children[z].style.left);
        }

    })();

    function swipe(e) {

        slider.style.left = -(firstClick - (e.clientX || e.touches.clientX)) + 'px';

        function rotateSlide(distance) {

            var deg = -distance / 5;

            if (deg > -40 && deg < 40) {
                return deg;
            }

        }

        function scaleSlide(distance) {

            if (distance > -160 && distance < 160) {

                if (distance > 0) {
                    distance = -distance;
                }


                return distance + 80
            }

            return -80;


        }

        for (var i = 0; i < slider.children.length; i++) {
            slider.children[i].style.transform =
            'rotateY(' + rotateSlide(parseFloat(slider.style.left) - 125 + (200 * i)) + 'deg)' +
            'translateZ(' + scaleSlide(parseFloat(slider.style.left) - 125 + (200 * i)) + 'px)';
        }

        console.log(slider.children[2].style.transform);

    }

    function toFixedPosition() {

        var distance = -parseFloat(slider.style.left);

        function getBreakPoints() {

            var points = [];

            for (var i = 0; i < slider.children.length; i++) {
                points[i] = i * 200;
            }

            return points;

        }

        var breakpoints = getBreakPoints();

        if (distance <= breakpoints[0]) {
            slider.style.transition = 'all 0.5s';
            slider.style.left = (breakpoints[1] / 2) + 'px';
            slider.children[0].style.transition = 'all 0.5s';
            slider.children[0].style.transform = 'translateZ(80px) rotateY(0deg)';

            setTimeout(function() {
                slider.style.transition = 'none';
                slider.children[0].style.transition = 'none';
            }, 500);

            lastClick = breakpoints[1] / 2;
        }

        for (var i = 0; i < breakpoints.length; i++) {

            if (distance >= breakpoints[i] && distance <= breakpoints[i + 1] && breakpoints[i + 2]) {

                slider.style.left = -(breakpoints[i + 1]  - 125) + 'px';

                slider.style.transition = 'all 0.5s';
                slider.children[i].style.transform = 'rotateY(40deg) translateZ(-80px)';
                slider.children[i + 1].style.transform = 'rotateY(0deg) translateZ(80px)';
                slider.children[i + 2].style.transform = 'rotateY(-40deg) translateZ(-80px)';

                lastClick = -(breakpoints[i + 1]  - 125);

            }

        }

        for (var t = 0; t < slider.children.length; t++) {
            slider.children[t].style.transition = 'all 0.5s';
        }

        setTimeout(function() {

            slider.style.transition = 'none';

            for (var i = 0; i < slider.children.length; i++) {
                slider.children[i].style.transition = 'none';
            }

        }, 500);

        if (distance >= breakpoints[breakpoints.length - 2]) {

            slider.style.transition = 'all 0.5s';

            slider.style.left = -910 + 'px';
            slider.children[slider.children.length - 1].style.transform = 'translateZ(80px) rotateY(0deg)';

            setTimeout(function() {
                slider.style.transition = 'none';
            }, 500);
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

    }

    function mouseup(e) {

        slider.style.cursor = 'pointer';

        lastClick = -(firstClick - e.clientX);

        slider.removeEventListener('mousemove', swipe);

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
                  './img/unsplash.jpg',
                  './img/unsplash-2.jpg',
                  './img/unsplash-3.jpg',
                  './img/unsplash-4.jpg',
                  './img/unsplash-5.jpg',
                  './img/unsplash-6.jpg'
                 ];

setRate();
initGallery(imageArray);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2Nrcy9yYXRlL3JhdGUuanMiLCJibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzZXRSYXRlKHJhdGUpIHtcblxuICAgIHZhciBzdGFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBzdGFyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zJyk7XG4gICAgICAgIHN0YXIuc3R5bGUuY29sb3IgPSAnIzY5NEUwMCc7XG4gICAgICAgIHN0YXIuaW5uZXJIVE1MID0gJ3N0YXInO1xuXG4gICAgdmFyIGFsbFJhdGVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmF0ZScpO1xuXG4gICAgcmF0ZSA9IHJhdGUgfHwgYWxsUmF0ZXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLXJhdGUnKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIGFsbFJhdGVzWzBdLmFwcGVuZENoaWxkKHN0YXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHJhdGU7IHkrKykge1xuICAgICAgICBhbGxSYXRlc1swXS5jaGlsZHJlblt5XS5zdHlsZS5jb2xvciA9ICcjRkZDMTA3JztcbiAgICB9XG5cbn1cbiIsImZ1bmN0aW9uIGluaXRHYWxsZXJ5KHNsaWRlcykge1xuXG4gICAgdmFyIGluaXREaXNwbGFjZSA9IC0zNzU7XG5cbiAgICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlcicpO1xuICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IGluaXREaXNwbGFjZSArICdweCc7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc2xpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZCgnZ2FsbGVyeV9faXRlbScpO1xuICAgICAgICBzbGlkZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgc2xpZGVzW2ldICsgJykgbm8tcmVwZWF0IGNlbnRlciAvIGNvdmVyJztcbiAgICAgICAgc2xpZGUuc3R5bGUuekluZGV4ID0gc2xpZGVzLmxlbmd0aCAtIGk7XG5cbiAgICAgICAgc2xpZGVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3RDbGljaztcbiAgICB2YXIgbGFzdENsaWNrID0gaW5pdERpc3BsYWNlO1xuXG4gICAgKGZ1bmN0aW9uIHNldEZpcnN0Um90YXRlKCkge1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aCAvIDIgLSAxOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSg0MGRlZykgdHJhbnNsYXRlWigtODBweCknO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgeSA9IHNsaWRlci5jaGlsZHJlbi5sZW5ndGggLyAyOyB5IDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5beV0uc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoLTQwZGVnKSB0cmFuc2xhdGVaKC04MHB4KSc7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW3pdLnN0eWxlLmxlZnQgPSAtNTAgKiB6O1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2xpZGVyLmNoaWxkcmVuW3pdLnN0eWxlLmxlZnQpO1xuICAgICAgICB9XG5cbiAgICB9KSgpO1xuXG4gICAgZnVuY3Rpb24gc3dpcGUoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gLShmaXJzdENsaWNrIC0gKGUuY2xpZW50WCB8fCBlLnRvdWNoZXMuY2xpZW50WCkpICsgJ3B4JztcblxuICAgICAgICBmdW5jdGlvbiByb3RhdGVTbGlkZShkaXN0YW5jZSkge1xuXG4gICAgICAgICAgICB2YXIgZGVnID0gLWRpc3RhbmNlIC8gNTtcblxuICAgICAgICAgICAgaWYgKGRlZyA+IC00MCAmJiBkZWcgPCA0MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNjYWxlU2xpZGUoZGlzdGFuY2UpIHtcblxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gLTE2MCAmJiBkaXN0YW5jZSA8IDE2MCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpc3RhbmNlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZSA9IC1kaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSArIDgwXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAtODA7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXIuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlbltpXS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgJ3JvdGF0ZVkoJyArIHJvdGF0ZVNsaWRlKHBhcnNlRmxvYXQoc2xpZGVyLnN0eWxlLmxlZnQpIC0gMTI1ICsgKDIwMCAqIGkpKSArICdkZWcpJyArXG4gICAgICAgICAgICAndHJhbnNsYXRlWignICsgc2NhbGVTbGlkZShwYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KSAtIDEyNSArICgyMDAgKiBpKSkgKyAncHgpJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHNsaWRlci5jaGlsZHJlblsyXS5zdHlsZS50cmFuc2Zvcm0pO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9GaXhlZFBvc2l0aW9uKCkge1xuXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IC1wYXJzZUZsb2F0KHNsaWRlci5zdHlsZS5sZWZ0KTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRCcmVha1BvaW50cygpIHtcblxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHBvaW50c1tpXSA9IGkgKiAyMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwb2ludHM7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBicmVha3BvaW50cyA9IGdldEJyZWFrUG9pbnRzKCk7XG5cbiAgICAgICAgaWYgKGRpc3RhbmNlIDw9IGJyZWFrcG9pbnRzWzBdKSB7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC41cyc7XG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IChicmVha3BvaW50c1sxXSAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlblswXS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjVzJztcbiAgICAgICAgICAgIHNsaWRlci5jaGlsZHJlblswXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWig4MHB4KSByb3RhdGVZKDBkZWcpJztcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5bMF0uc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgIH0sIDUwMCk7XG5cbiAgICAgICAgICAgIGxhc3RDbGljayA9IGJyZWFrcG9pbnRzWzFdIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJlYWtwb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlID49IGJyZWFrcG9pbnRzW2ldICYmIGRpc3RhbmNlIDw9IGJyZWFrcG9pbnRzW2kgKyAxXSAmJiBicmVha3BvaW50c1tpICsgMl0pIHtcblxuICAgICAgICAgICAgICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gLShicmVha3BvaW50c1tpICsgMV0gIC0gMTI1KSArICdweCc7XG5cbiAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC41cyc7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDQwZGVnKSB0cmFuc2xhdGVaKC04MHB4KSc7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2kgKyAxXS5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSB0cmFuc2xhdGVaKDgwcHgpJztcbiAgICAgICAgICAgICAgICBzbGlkZXIuY2hpbGRyZW5baSArIDJdLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKC00MGRlZykgdHJhbnNsYXRlWigtODBweCknO1xuXG4gICAgICAgICAgICAgICAgbGFzdENsaWNrID0gLShicmVha3BvaW50c1tpICsgMV0gIC0gMTI1KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHNsaWRlci5jaGlsZHJlbi5sZW5ndGg7IHQrKykge1xuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW3RdLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVyLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW2ldLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICBpZiAoZGlzdGFuY2UgPj0gYnJlYWtwb2ludHNbYnJlYWtwb2ludHMubGVuZ3RoIC0gMl0pIHtcblxuICAgICAgICAgICAgc2xpZGVyLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuNXMnO1xuXG4gICAgICAgICAgICBzbGlkZXIuc3R5bGUubGVmdCA9IC05MTAgKyAncHgnO1xuICAgICAgICAgICAgc2xpZGVyLmNoaWxkcmVuW3NsaWRlci5jaGlsZHJlbi5sZW5ndGggLSAxXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWig4MHB4KSByb3RhdGVZKDBkZWcpJztcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzbGlkZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlZG93bihlKSB7XG5cbiAgICAgICAgc2xpZGVyLnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcblxuICAgICAgICBpZiAobGFzdENsaWNrKSB7XG4gICAgICAgICAgICBmaXJzdENsaWNrID0gZS5jbGllbnRYIC0gbGFzdENsaWNrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmlyc3RDbGljayA9IGUuY2xpZW50WDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3VzZXVwKGUpIHtcblxuICAgICAgICBzbGlkZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuXG4gICAgICAgIGxhc3RDbGljayA9IC0oZmlyc3RDbGljayAtIGUuY2xpZW50WCk7XG5cbiAgICAgICAgc2xpZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHN3aXBlKTtcblxuICAgICAgICB0b0ZpeGVkUG9zaXRpb24oKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlbGVhdmUoZSkge1xuXG4gICAgICAgIHNsaWRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cbiAgICAgICAgbGFzdENsaWNrID0gLShmaXJzdENsaWNrIC0gZS5jbGllbnRYKTtcblxuICAgICAgICBzbGlkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgc3dpcGUpO1xuXG4gICAgICAgIHRvRml4ZWRQb3NpdGlvbigpO1xuXG4gICAgfVxuXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlZG93bik7XG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBtb3VzZXVwKTtcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIG1vdXNlbGVhdmUpO1xuXG4gICAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZWRvd24pO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNldXApO1xuICAgIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBzd2lwZSk7XG5cbiAgICBmdW5jdGlvbiB0ZXN0KGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuXG5cbn1cbiIsIi8vPXJlcXVpcmUgYmxvY2tzL3JhdGUvcmF0ZS5qc1xuLy89cmVxdWlyZSBibG9ja3MvZ2FsbGVyeS9nYWxsZXJ5LmpzXG5cbnZhciBpbWFnZUFycmF5ID0gW1xuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtMi5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTMuanBnJyxcbiAgICAgICAgICAgICAgICAgICcuL2ltZy91bnNwbGFzaC00LmpwZycsXG4gICAgICAgICAgICAgICAgICAnLi9pbWcvdW5zcGxhc2gtNS5qcGcnLFxuICAgICAgICAgICAgICAgICAgJy4vaW1nL3Vuc3BsYXNoLTYuanBnJ1xuICAgICAgICAgICAgICAgICBdO1xuXG5zZXRSYXRlKCk7XG5pbml0R2FsbGVyeShpbWFnZUFycmF5KTtcbiJdfQ==
