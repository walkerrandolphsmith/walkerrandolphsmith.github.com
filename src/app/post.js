import base from './base';
import disqus from './disqus';
import $ from 'jquery';

export default (() => {
    const HERO_HEIGHT = 527;
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

        const $background = $('.background');
        const $title = $('.post-title');

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

                if (lastScrollTop > HERO_HEIGHT) {
                    $header.toggleClass('hidden', lastScrollTop > prev);
                    prev = lastScrollTop;
                } else {
                    $header.addClass('hidden');
                    const opacity = (lastScrollTop / HERO_HEIGHT) + 0.3;
                    $background.css({ opacity: opacity });
                    $title.css({ opacity: 1 - opacity });
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