import $ from 'jquery';

export default $(function() {

    var prev = 0;
    var $window = $(window);
    var $header = $($('header.blog-info')[0]);
    var lastScrollTop = 0;

    $window.on('scroll', function(){
        lastScrollTop = $window.scrollTop();
        if(lastScrollTop > 527) {
            $header.toggleClass('hidden', lastScrollTop > prev);
            prev = lastScrollTop;
        } else {
            $header.addClass('hidden');
        }
    });


    setInterval(function () {
        //if (didScroll) {
            //hasScrolled();
            //didScroll = false;
        //}
    }, 250);
});