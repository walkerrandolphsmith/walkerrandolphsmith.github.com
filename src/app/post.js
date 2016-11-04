import base from './base';
import loadDisqus from './disqus';
import $ from 'jquery';

let commentsHaveBeenOpened = false;

const openComments = ($comments) => {
    if(!commentsHaveBeenOpened) {
        loadDisqus();
    }
    commentsHaveBeenOpened = true;
    $comments.show();
};

export default (() => {
    const HERO_HEIGHT = 527;
    const END_OF_POST_DIVIDER_PADDING = 90;
    const FOOTER_HEIGHT = 80;
    $(function () {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;

        var $window = $(window);
        const $entirePage = $('html, body');

        const $meter = $('.meter .amount');

        const $stick = $('aside');

        const $postBottom = $('.post-bottom');
        const $default = $('footer .default');
        const $relatedPosts = $('footer .related-posts');

        const $header = $($('header.blog-info')[0]);

        const $background = $('.background');
        const $title = $('.post-title');

        const $comments = $('.comment-stream');
        let prev = 0;
        let lastScrollTop = 0;

        $window.scroll(() => {
            lastScrollTop = $window.scrollTop();
            const goingDown = lastScrollTop > prev;

            const currentPosition = lastScrollTop + windowHeight;
            const total = $postBottom.position().top + END_OF_POST_DIVIDER_PADDING;
            console.log(total, $postBottom);
            const percentComplete = currentPosition / total;

            $meter.css({width: (percentComplete * 100) + "%"});

            const endOfArticle = $postBottom[0].getBoundingClientRect().top;

            if (endOfArticle < (windowHeight)) {
                $default.hide();
                $relatedPosts.fadeIn('slow')
            }
            else {
                $default.fadeIn('slow');
                $relatedPosts.hide();
            }

            if (lastScrollTop > HERO_HEIGHT) {
                $header.toggleClass('hidden', goingDown);
                prev = lastScrollTop;
            }
            else {
                $header.addClass('hidden');
                const opacity = (lastScrollTop / HERO_HEIGHT) + 0.3;
                $background.css({ opacity: opacity });
                $title.css({ opacity: 1 - opacity });

            }

            const pastTitle = lastScrollTop > (HERO_HEIGHT + 160);

            if(goingDown) {
                if (pastTitle) {
                    $stick.addClass('fixed');
                    $stick.css({marginTop: '0px' });
                }
                else {
                    $stick.removeClass('fixed');
                }
            }
            else {
                if (!pastTitle) {
                    $stick.removeClass('fixed');
                }
                else {
                    $stick.addClass('fixed');
                }
                $stick.css({marginTop: 80 });
            }

            if(endOfArticle < windowHeight) {
                $stick.removeClass('fixed');
                $stick.css({
                    'top': $postBottom.offset().top - ($postBottom.height() + $stick.height() + 90),
                    'marginTop': 0
                });
            } else {
                $stick.css('top', 0);
            }

            if(lastScrollTop + windowHeight > documentHeight - FOOTER_HEIGHT) {
                openComments($comments);
            }
        });

        $('.back-to-top').on('click', () => {
            $entirePage.animate({scrollTop: 0}, 1000);
        });

        $('#comments').on('click', () => {
            openComments($comments);
            const current = $(document).scrollTop();
            $entirePage.animate({scrollTop: current + windowHeight}, 800);
        });

        $('#comment').on('click', () => {
            openComments($comments);
            $entirePage.animate({scrollTop: documentHeight }, 2000);
        });

        $("#share").on('click', () => {
            const $buttons = $('.share-buttons li:not(:first-child)');
            $entirePage.animate(
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