import base from './base';
import disqus from './disqus';
import $ from 'jquery';

export default (() => {
    const HERO_HEIGHT = 527;
    $(function () {
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

        $window.scroll(() => {
            lastScrollTop = $window.scrollTop();

            const currentPosition = lastScrollTop + windowHeight;
            const percentComplete = currentPosition / documentHeight;

            $meter.css({width: (percentComplete * 100) + "%"});

            if ($postBottom[0].getBoundingClientRect().top < (windowHeight)) {
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
            }
            else {
                $header.addClass('hidden');
                const opacity = (lastScrollTop / HERO_HEIGHT) + 0.3;
                $background.css({ opacity: opacity });
                $title.css({ opacity: 1 - opacity });
            }
        });

        $('.back-to-top').on('click', () => {
            $("html, body").animate({scrollTop: 0}, 1000);
        });

        $('#comments').on('click', () => {
            $('.comment-steam').show();
            const current = $(document).scrollTop();
            $('body,html').animate({scrollTop: current + windowHeight}, 800);
        });

        $('#comment').on('click', () => {
            $('.comment-steam').show();
            $('body,html').animate({scrollTop: documentHeight }, 2000);
        });

        $("#share").click(function() {
            const $buttons = $('.share-buttons li:not(:first-child)');
            $('html, body').animate(
                { scrollTop: $(".share-buttons").offset().top - (windowHeight /2) },
                2000,
                () => {
                    $buttons.addClass('wiggle');
                    setTimeout(() => $buttons.removeClass('wiggle'), 2000);
                }
            );
        });

        $('.fa-copy').on('click', copy);
    });
})()

var copy = (event) => {
    const $copier = $(event.target);
    const $pre = $copier.parent().find('pre');
    selectText($pre[0]);
    try {
        document.execCommand('copy');
    }
    catch (err) {  }
};

var selectText = (element) => {
    var doc = document;
    var text = element;
    var range;
    var selection;

    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
};