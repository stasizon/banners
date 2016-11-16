setTimeout(function () {

    document.getElementById('startAnimation').remove();

}, 5500);

var __adKernelBanner = {

    initGallery: function(slides, parent) {

        //=require blocks/gallery/gallery.js

    },

    setRate: function functionName() {

        //=require blocks/rate/rate.js

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
