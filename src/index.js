console.log("main js is loaded");

$(function() {
    var $drawer = $('.drawer');

    $('.close').on('click', function() {
        $drawer.removeClass('show');
    });

    $('.open').on('click', function() {
        $drawer.addClass('show');
    });
});

