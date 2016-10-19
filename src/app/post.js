import base from './base';
import disqus from './disqus';
import $ from 'jquery';

export default (() => {
    $(function () {
        backToTop();
        commentsStream();

        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;

        var $window = $(window);

        const $meter = $('.meter .amount');

        const $postBottom = $('.post-bottom');
        const $default = $('footer .default');
        const $relatedPosts = $('footer .related-posts');

        const $header = $($('header.blog-info')[0]);
        let prev = 0;
        let lastScrollTop = 0;

        if (location.pathname.match(/post/)) {
            $window.scroll(() => {
                lastScrollTop = $window.scrollTop();

                const currentPosition = lastScrollTop + windowHeight;
                const percentComplete = currentPosition / documentHeight;
                $meter.css({width: (percentComplete * 100) + "%"});

                if ($postBottom[0].getBoundingClientRect().bottom < (window.innerHeight / 2)) {
                    $default.hide();
                    $relatedPosts.fadeIn('slow')
                }
                else {
                    $default.fadeIn('slow');
                    $relatedPosts.hide();
                }

                if (lastScrollTop > 527) {
                    $header.toggleClass('hidden', lastScrollTop > prev);
                    prev = lastScrollTop;
                } else {
                    $header.addClass('hidden');
                }
            });
        }
    });

    const backToTop = () => {
        $('.back-to-top').on('click', () => {
            $("html, body").animate({scrollTop: 0}, 1000);
        });
    };

    const commentsStream = () => {
        $('#comments').on('click', () => {
            $('.comment-steam').show();
            const current = $(document).scrollTop();
            const windowHeight = window.innerHeight;
            $('body,html').animate({scrollTop: current + windowHeight}, 800);
        });
    };
})()