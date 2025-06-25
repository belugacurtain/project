(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //여기서부터 코드 작성해주세요

        // lnb custom 시작
        var $depth3List = $('.depth3_list');
        $depth3List.each(function(){
            var $this = $(this),
                $thisDepth3 = $this.parent('.depth3'),
                $thisDepth2Item = $thisDepth3.parent('.depth2_item'),
                $thisDepth3Item = $this.find('.depth3_item');
            if($thisDepth3Item.length > 10){
                $thisDepth2Item.addClass('over_item_type');
            }
        });
        // lnb custom 종료

        // 언어선택 레이어 시작
        $('.language_layer button.etc_layer_btn').on('click', function(){
            if(!($(this).parent('.language_layer').is('.active'))){
                $(this).parent('.language_layer').addClass('active');
                $(this).attr('title', '언어선택 레이어창 닫기');
            }
            else{
                $(this).parent('.language_layer').removeClass('active');
                $(this).attr('title', '언어선택 레이어창 열기');
            }
        });
        // 언어선택 레이어 종료

        // 주요사이트 레이어 시작
        $('.major_layer button.etc_layer_btn').on('click', function(){
            if(!($(this).parents('#wrapper').is('.major_open'))){
                $(this).parents('#wrapper').addClass('major_open');
                $(this).parent('.major_layer').addClass('active');
                setTimeout(function(){
                    $('.major_layer_wrap button.major_layer_close').focus();
                }, 100);
            }
        });

        $('.major_layer_wrap button.major_layer_close').on('click', function(){
            if(($(this).parents('#wrapper').is('.major_open'))){
                $(this).parents('#wrapper').removeClass('major_open');
                $('.header_top .major_layer').removeClass('active');
                setTimeout(function(){
                    $('.header_top .major_layer button.etc_layer_btn').focus();
                }, 100);
            }
        });
        // 주요사이트 레이어 종료
        
        // 모바일 lnb 열기 시작
        $('.etc_quick_item.menu_show button.menu_button').on('click.menu', function(event) {
            $html.toggleClass('lnb_show');
        });
        // 모바일 lnb 열기 종료

        // 모바일 lnb 닫기 시작
        $('.lnb .menu_hide button.menu_button').on('click.menu', function(event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
        $('.lnb_curtain button').on('click.menu', function(event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
        // 모바일 lnb 닫기 종료

        // 푸터 배너 슬라이드 시작
        var $footerSlideWrap = $('.footer_slide_wrap'),
            $footerSlideList = $footerSlideWrap.find('.footer_slide_list'),
            $footerSlidePrev = $footerSlideWrap.find('.prev'),
            $footerSlideNext = $footerSlideWrap.find('.next'),
            $footerSlideAuto = $footerSlideWrap.find('.auto');
        $footerSlideList.slick({
            autoplay : true,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 9,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : true,
            autoArrow : $footerSlideAuto,
            pauseText : '정지',
            playText : '재생',
            prevArrow : $footerSlidePrev,
            nextArrow : $footerSlideNext,
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1561,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        // 푸터 배너 슬라이드 종료
        
        // 푸터 바로가기 시작
        $('.footer_quick_wrap button.footer_quick_open').on('click', function(){
            if( !($(this).parent('.footer_quick_item').is('.active')) ){
                $('.footer_quick_wrap .footer_quick_item').removeClass('active');
                $('.footer_quick_wrap button.footer_quick_open').attr('title', '관련 링크 레이어 열기');
                $(this).parent('.footer_quick_item').addClass('active');
                $(this).attr('title', '관련 링크 레이어 닫기');
            }
            else{
                $(this).parent('.footer_quick_item').removeClass('active');
                $(this).attr('title', '관련 링크 레이어 열기');
            }
        });
        // 푸터 바로가기 종료

        // 푸터 민원콜센터 시작
        $('.footer_floating_wrap button.civil_btn').on('click', function(){
            if(!($(this).parent('.civil_go_inner').is('.active'))){
                $(this).parent('.civil_go_inner').addClass('active');
            }
        });
        $('.footer_floating_wrap button.civil_close').on('click', function(){
            $('.footer_floating_wrap .civil_go_inner').removeClass('active');
        });
        // 푸터 민원콜센터 종료

        // 푸터 상단이동 시작
        $('.footer_floating_wrap .top_go_btn').on('click', function() {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 1000);
        });
        // 푸터 상단이동 종료

    });
})(jQuery);