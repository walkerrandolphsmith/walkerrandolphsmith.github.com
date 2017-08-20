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

const END_OF_POST_DIVIDER_PADDING = 90;
const FOOTER_HEIGHT = 80;

export default (() => {
    $(function () {
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.clientHeight;

        const $window = $(window);
        const $entirePage = $('html, body');

        const $hero = $('.hero');

        const $meter = $('.meter .amount');
        const $stick = $('aside');
        const $toc = $('#toc');
        const $tocExpander = $toc.find('header');
        const $icon = $tocExpander.find('i');


        const $postBottom = $('.post-bottom');
        const $default = $('footer .default');
        const $relatedPosts = $('footer .related-posts');

        const $header = $($('header.blog-info')[0]);

        const $background = $('.background');
        const $title = $('.post-title');

        const $comments = $('.comment-stream');
        let prev = 0;
        let lastScrollTop = 0;

        const event = () => {
            lastScrollTop = $window.scrollTop();
            const heroHeight = $hero.height();
            const goingDown = lastScrollTop > prev;

            const currentPosition = lastScrollTop + windowHeight;
            const total = $postBottom.position().top + END_OF_POST_DIVIDER_PADDING;
            const percentComplete = currentPosition / total;

            $meter.css({width: (percentComplete * 100) + "%"});

            const endOfArticle = $postBottom[0].getBoundingClientRect().top;

            if (endOfArticle < windowHeight) {
                $default.hide();
                $relatedPosts.fadeIn('slow')
            }
            else {
                $default.fadeIn('slow');
                $relatedPosts.hide();
            }

            if (lastScrollTop > heroHeight) {
                $header.toggleClass('hidden', goingDown);
                prev = lastScrollTop;
            }
            else {
                $header.addClass('hidden');
                const opacity = (lastScrollTop / heroHeight) + 0.3;
                $background.css({ opacity: opacity });
                $title.css({ opacity: lastScrollTop === 0 ? 1 : 1 - opacity });

            }

            const pastTitle = lastScrollTop > (heroHeight + 80);
            $stick.toggleClass('fixed', pastTitle);
            $stick.css({ 'marginTop': pastTitle ? '0px' : '80px' });

            if(goingDown) {
                $stick.css({ 'top': '0px' });
            } else {
                $stick.css({ 'top': '80px' });
                $stick.css({ 'marginTop': '0px' });
            }

            const bottomOfArticle = $('#article').offset().top + $('#article').height();
            const bottomOfToc = $stick.offset().top + $stick.height();

            if(bottomOfArticle <= bottomOfToc) {
                console.log($('#article').height(), lastScrollTop);
                $stick.removeClass('fixed');
                $stick.css({ 'top': $('#article').height() - $stick.height() });
            }

            if(lastScrollTop + windowHeight > documentHeight - FOOTER_HEIGHT) {
                openComments($comments);
            }
        };

        event();

        $window.scroll(event);

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

        $tocExpander.on('click', () => {
            $stick.toggleClass('expanded');
            if($stick.hasClass('expanded')) {
                $icon.removeClass().addClass('fa fa-minus expander');
                const curHeight = $stick.height();
                const autoHeight = $stick.css('height', 'auto').height();
                $stick.height(curHeight).animate({height: autoHeight + 20}, 500);
            } else {
                $stick.animate({height: '80px'}, 500);
                $icon.removeClass().addClass('fa fa-plus expander');
            }
        });
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