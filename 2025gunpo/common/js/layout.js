
(function($) {

    'use strict';

    window.element = {};

    var $window = element.$window = $(window),
        $document = element.$document = $(document),
        $html = element.$html = $('html'),
        $screen = $.screen,
        $isArray = $.isArray;

    //사이트
    var site = window.site,
        id = site.id,
        key = site.key,
        href = location.href;

    //아이디가 없을 때
    if(!id || id.substring(0, 2) === '@@' || id[0] === '$') {
        site.id = id = getParam(href, 'id') || href.split('/')[4];
    }

    //키가 없을 때
    if(!key || key.substring(0, 2) === '@@' || key[0] === '$') {
        site.key = key = getParam(href, 'key');
    }

    //screen
    $document.on('ready.layout', function(event) {
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1300
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1280,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    $(function() {

        var $html = element.$html = $('html'),
            $header = element.$header = $('#header'),
            $container = element.$container = $('#container'),
            $footer = element.$footer = $('#footer');

        /* 메뉴 */
        var $lnb = $header.find('.lnb'),
            $depthList = $lnb.find('.depth_list');

        $depthList.each(function(index, element){
            var $element = $(element);
            $element.find('> li').each(function(index, element){
                var $element = $(element);
                $element.addClass('n' + (index + 1));
            });
        });

        /* 언어 */
        var $language = $header.find('.language');
        $language.on('click', function(event) {
            var $this = $(this);
            $this.toggleClass('active');
            //$this.find('.language_panel').stop(false, true).slideToggle('250', 'easeOutExpo');
        });

        /* 검색 */
        var $search = $header.find('.search'),
            $searchOpen = $search.find('.search_open'),
            $searchClose = $search.find('.search_close');

        $searchOpen.on('click', function(event) {
            $search.toggleClass('active');
            $html.addClass('search_show');
        });
        $searchClose.on('click', function(event) {
            $search.removeClass('active');
            $html.removeClass('search_show');
        });

        /* 패밀리사이트 */
        var $family = $header.find('.family'),
            $familyOpen = $header.find('.family_open'),
            $familyHide = $header.find('.family_hide');

        $familyOpen.on('click', function(event) {
            $family.addClass('active');
            $html.addClass('dimded').removeClass('lnb_show lnb_open');
        });
        $familyHide.on('click', function(event) {
            $family.removeClass('active');
            $html.removeClass('dimded');
        });

        /* 사이트 */
        var $site = $footer.find('.site'),
            $siteItem = $site.find('.site_item');

        $siteItem.on('click', function () {
            var $this = $(this);

            $site.find('.site_panel').slideUp('250', 'easeOutExpo');

            if($this.hasClass('active') === true){
                $this.removeClass('active');
                $this.find('.site_panel').slideUp('250', 'easeOutExpo');
                $this.find('.site_panel:before').slideUp('250', 'easeOutExpo');
            }else{
                $this.addClass('active').siblings().removeClass('active');
                $this.find('.site_panel').slideDown('250', 'easeOutExpo');
                $this.find('.site_panel:before').slideUp('250', 'easeOutExpo');
            }
        });

        /* 공유 */
        var $share = $container.find('.share');
        $share.on('click', function(event) {
            $share.toggleClass('active');
        });

        /* 배너모음 */
        var $banner = $footer.find('.banner'),
            $bannerList = $banner.find('.banner_list'),
            $bannerPrev = $banner.find('.banner_prev'),
            $bannerAuto = $banner.find('.banner_auto'),
            $bannerNext = $banner.find('.banner_next');

        $bannerList.slick({
            infinite: true,
            variableWidth: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            playText : '재생',
            pauseText : '정지',
            autoArrow : $bannerAuto,
            prevArrow : $bannerPrev,
            nextArrow : $bannerNext,
        });

        $bannerList.find(".slick-slide").removeAttr('tabindex');
        $bannerList.on('afterChange', function () {
            setTimeout( function(){ $bannerList.find('.slick-slide').removeAttr('tabindex'); }, 100);
        });

        /* 맨위로 */
        var $htmlBody = $('html, body'),
            $wrapper = $('#wrapper'),
            $up = $footer.find('.up'),
            $upButton = $up.find('.up_button');

        $upButton.on('click', function(event) {
            $htmlBody.animate({
                scrollTop : $wrapper.offset().top
            },{
                duration : 250,
                easing : 'easeOutExpo'
            });
            //event.preventDefault();
        });

        function upShowHide(){
            if($window.scrollTop() < 100){
                $up.addClass('top');
            }else{
                $up.removeClass('top');
            }
        }
        upShowHide();

        $window.scroll(function(){
            upShowHide();
        });


    });
})(window.jQuery);