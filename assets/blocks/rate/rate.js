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
