import base from './base';
import $ from 'jquery';

const HERO_HEIGHT = 527;
$(function () {
    const $window = $(window);
    const $header = $($('header.blog-info')[0]);
    let prev = 0;
    let lastScrollTop = 0;
    $window.scroll(() => {
        lastScrollTop = $window.scrollTop();

        if (lastScrollTop > HERO_HEIGHT) {
            $header.toggleClass('hidden', lastScrollTop > prev);
            prev = lastScrollTop;
        } else {
            $header.addClass('hidden');
        }
    })
});