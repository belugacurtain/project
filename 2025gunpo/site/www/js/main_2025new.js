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

        // 통합검색 텍스트 애니메이션 시작
        $('.search_type .search_type_inner .search_input .input_box input[type="text"]').on('input', function() {
            if ($(this).val().trim().length > 0) {
                $('.search_type .search_type_inner .search_input').addClass('active');
            }
            else {
                $('.search_type .search_type_inner .search_input').removeClass('active');
            }
        });
        // 통합검색 텍스트 애니메이션 종료

        // 비주얼 팝업 시작
        var $visualSlideWrap = $('.visual_slide_wrap');
        $visualSlideWrap.each(function(){
            var $this = $(this),
                $visualSlideList = $this.find('.visual_slide_list'),
                $visualSlidePrev = $this.find('.visual_slide_control .prev'),
                $visualSlideNext = $this.find('.visual_slide_control .next'),
                $visualSlideAuto = $this.find('.visual_slide_control .auto'),
                $visualSlideCurrent = $this.find('.visual_slide_control .current'),
                $visualSlideTotal = $this.find('.visual_slide_control .total');

            $visualSlideList.on('init', function(event, slick, currentSlide){
                $this.find('.visual_slide_control').addClass('bar');
            });
            $visualSlideList.slick({
                autoplay : true,
                autoplaySpeed : 3000,
                speed : 1500,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 1,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : true,
                autoArrow : $visualSlideAuto,
                pauseText : '정지',
                playText : '재생',
                prevArrow : $visualSlidePrev,
                nextArrow : $visualSlideNext,
                current : $visualSlideCurrent,
                total : $visualSlideTotal,
                customState : function(state) {
                    if(state.current < 10) {
                        state.current = '0' + state.current;
                    }
                    if(state.total < 10) {
                        state.total = '0' + state.total;
                    }
                    return state;
                },
                zIndex : 1,
                fade : false,
                pauseOnHover : true,
                pauseOnFocus : true,
                pauseOnArrowClick : true,
                pauseOnSwipe : true,
                pauseOnClick : true,
                pauseOnDotsHover : true
            });
            $visualSlideList.on('beforeChange', function(event, slick, currentSlide) {
                setTimeout(function(){
                    $this.find('.visual_slide_control').removeClass('bar');
                }, 100);
            });
            $visualSlideList.on('afterChange', function(event, slick, currentSlide) {
                setTimeout(function(){
                    $this.find('.visual_slide_control').addClass('bar');
                }, 1);
            });
            $visualSlideAuto.on('click', function(){
                var $StopBar = $this.find('.visual_slide_control .dash i'),
                    IsPlay = $(this).is('.slick-pause');
                if(IsPlay){
                    $StopBar.css('animation-play-state', 'running');
                }
                else{
                    $StopBar.css('animation-play-state', 'paused');
                }
            });
        });
        $('button.visual_tab_btn').on('click', function(){
            if(!($(this).parent('.visual_tab_item').is('.active'))){
                $('.visual_tab').attr('data-visual', $(this).parent('.visual_tab_item').attr('data-visual'));
                $('.visual_tab_item').removeClass('active');
                $('.visual_tab_btn').removeAttr('title');
                $('.visual_cts_item').removeClass('active');
                $(this).parent('.visual_tab_item').addClass('active');
                $(this).attr('title', '선택됨');
                $('.visual_cts_item[data-visual="'+$(this).parent('.visual_tab_item').attr('data-visual')+'"]').addClass('active');
                $('.visual_cts_item[data-visual="'+$(this).parent('.visual_tab_item').attr('data-visual')+'"]').find('.visual_slide_list').slick('setPosition');
            }
        });
        // 비주얼 팝업 종료

        // 소식 모아보기 시작
        var boardSlideLinkArray = [];
        boardSlideLinkArray.push($('.board_slide_link'));
        for(var i=0; i<$('.board_slide_link').length; i++){
            $('.board_slide_link').eq(i).prepend(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 363 290">'+
                    '<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="strokeGradient'+i+'">'+
                        '<stop offset="0%" style="stop-color:#4f5bc7;"></stop>'+
                        '<stop offset="100%" style="stop-color:#26b8dc;"></stop>'+
                    '</linearGradient>'+
                    '<g>'+
                        '<path d="M 1 40 Q 1 1 40 1 L 323 1 Q 362 1 362 40 L 362 250 Q 362 289 323 289 L 40 289 Q 1 289 1 250 L 1 40" stroke="url(#strokeGradient'+i+')" stroke-width="2" fill="rgba(0, 0, 0, 0)" stroke-linecap="round" />'+
                    '</g>'+
                '</svg>'
            );
        }
        var graStartD = 'M 1 40 Q 1 1 40 1 L 323 1 Q 362 1 362 40 L 362 250 Q 362 289 323 289 L 40 289 Q 1 289 1 250 L 1 40';
        var graEnterD = 'M 1 40 Q 1 1 40 1 L 323 1 Q 362 1 362 40 L 362 228 Q 352 279 301 289 L 40 289 Q 1 289 1 250 L 1 40';
        $('.board_slide_item').each(function(){
            var $this = $(this),
                $thisLink = $this.find('.board_slide_link'),
                $thisSVG = $thisLink.find('svg'),
                $thisPATH = $thisSVG.find('path');
            $this.on('mouseenter', function(){
                $thisSVG.css({
                    'visibility' : 'visible',
                    'opacity' : '1'
                });
                $thisPATH.attr({
                    'd' : graEnterD
                });
            });
            $this.on('mouseleave', function(){
                $thisSVG.css({
                    'visibility' : 'hidden',
                    'opacity' : '0'
                });
                setTimeout(function(){
                    $thisPATH.attr({
                        'd' : graStartD
                    });
                }, 200);
            });

        });
        var $boardTotalSlideWrap = $('.board_slide_wrap');
        $boardTotalSlideWrap.each(function(){
            var $this = $(this),
                $boardTotalSlideList = $this.find('.board_slide_list'),
                $boardTotalSlidePrev = $this.find('.board_slide_control .prev'),
                $boardTotalSlideNext = $this.find('.board_slide_control .next');
            $boardTotalSlideList.slick({
                autoplay : false,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 4,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : false,
                arrows : true,
                prevArrow : $boardTotalSlidePrev,
                nextArrow : $boardTotalSlideNext,
                zIndex : 1,
                fade : false,
                pauseOnHover : true,
                pauseOnFocus : true,
                pauseOnArrowClick : true,
                pauseOnSwipe : true,
                pauseOnClick : true,
                pauseOnDotsHover : true,
                vertical : false,
                verticalSwiping : false,
                responsive : [{
                    breakpoint : 1281,
                    settings : {
                        slidesToShow : 3,
                        vertical : false,
                        verticalSwiping : false
                    }
                },{
                    breakpoint : 801,
                    settings : {
                        slidesToShow : 2,
                        vertical : false,
                        verticalSwiping : false
                    }
                },{
                    breakpoint : 641,
                    settings : {
                        slidesToShow : 4,
                        vertical : true,
                        verticalSwiping : false
                    }
                }]
            });
        });
        $('button.board_total_tab_btn').on('click', function(){
            var $aniActive = $('.board_total_cts_item[data-board="'+$(this).parent('.board_total_tab_item').attr('data-board')+'"]');
            if(!($(this).parent('.board_total_tab_item').is('.active'))){
                $('.board_total_tab_item').removeClass('active');
                $('.board_total_tab_btn').removeAttr('title');
                $('.board_total_cts_item').removeClass('active active_ani');
                $(this).parent('.board_total_tab_item').addClass('active');
                $(this).attr('title', '선택됨');
                $('.board_total_cts_item[data-board="'+$(this).parent('.board_total_tab_item').attr('data-board')+'"]').addClass('active');
                setTimeout(function(){
                    $aniActive.addClass('active_ani');
                }, 100);
                $('.board_total_cts_item[data-board="'+$(this).parent('.board_total_tab_item').attr('data-board')+'"]').find('.board_slide_list').slick('setPosition');
            }
        });
        // 소식 모아보기 종료

        // 즐겨찾는 메뉴 시작
        $('button.my_menu_open_btn').on('click', function(){
            $(this).parents('#wrapper').addClass('my_menu_open');
            setTimeout(function(){
                $('.my_menu_layer_wrap button.my_menu_layer_close').focus();
            }, 100);
        });
        $('button.my_menu_layer_close').on('click', function(){
            if(($(this).parents('#wrapper').is('.my_menu_open'))){
                $(this).parents('#wrapper').removeClass('my_menu_open');
                setTimeout(function(){
                    $('button.my_menu_open_btn').focus();
                }, 100);
            }
        });

        $(document).on('click', 'button.my_menu_layer_slide_btn', function(){
            if(!($(this).parent('.my_menu_layer_slide_item').is('.active'))){
                $(this).parent('.my_menu_layer_slide_item').addClass('active');
                $(this).attr('title', '선택됨');
            }
            else{
                $(this).parent('.my_menu_layer_slide_item').removeClass('active');
                $(this).removeAttr('title');
            }
        });
        $(document).on('click', 'button.layer_btn.reset', function(){
            $('.my_menu_layer_slide_item').removeClass('active').removeAttr('title');
            $('button.my_menu_layer_slide_btn').removeAttr('title');
        });

        var $myMenuLayerSlideList = $('.my_menu_layer_slide_list');
        $myMenuLayerSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            rows : 2,
            slidesPerRow : 9,
            variableWidth : true,
            infinite : false,
            arrows : false,
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
                    rows : 3,
                    slidesPerRow : 7,
                    variableWidth : true
                }
            },{
                breakpoint : 1001,
                settings : {
                    rows : 4,
                    slidesPerRow : 5,
                    variableWidth : true
                }
            },{
                breakpoint : 641,
                settings : {
                    rows : 6,
                    slidesPerRow : 3,
                    variableWidth : false
                }
            }]
        });


        var $myMenuSlideList = $('.my_menu_slide_list'),
            $myMenuSlidePrev = $('.my_menu_slide_control .prev'),
            $myMenuSlideNext = $('.my_menu_slide_control .next');
        $myMenuSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 8,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : true,
            arrows : true,
            prevArrow : $myMenuSlidePrev,
            nextArrow : $myMenuSlideNext,
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1281,
                settings : {
                    slidesToShow : 6
                }
            },{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 7
                }
            },{
                breakpoint : 901,
                settings : {
                    slidesToShow : 6
                }
            },{
                breakpoint : 801,
                settings : {
                    slidesToShow : 5
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        // 즐겨찾는 메뉴 종료

        // 군포 생활안내 시작
        var $gunpoInfoSlideList = $('.info_slide_wrap .info_slide_list'),
            $gunpoInfoSlidePrev = $('.info_slide_wrap .info_slide_control .prev'),
            $gunpoInfoSlideNext = $('.info_slide_wrap .info_slide_control .next');
        $gunpoInfoSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            rows : 2,
            variableWidth : false,
            infinite : true,
            arrows : true,
            prevArrow : $gunpoInfoSlidePrev,
            nextArrow : $gunpoInfoSlideNext,
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1281,
                settings : {
                    slidesToShow : 1,
                    rows : 2
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    rows : 6
                }
            }]
        });
        // 군포 생활안내 종료

        // 알림존 시작
        var $popupSlideList = $('.popup_slide_wrap .popup_slide_list'),
            $popupSlidePrev = $('.popup_slide_wrap .popup_slide_control .prev'),
            $popupSlideNext = $('.popup_slide_wrap .popup_slide_control .next'),
            $popupSlideAuto = $('.popup_slide_wrap .popup_slide_control .auto'),
            $popupSlideCurrent = $('.popup_slide_wrap .popup_slide_control .current'),
            $popupSlideTotal = $('.popup_slide_wrap .popup_slide_control .total');
        if($popupSlideList.find('.popup_slide_item').length > 9){
            $popupSlideTotal.text($popupSlideList.find('.popup_slide_item').length);
        }
        else if($popupSlideList.find('.popup_slide_item').length <= 9){
            $popupSlideTotal.text('0'+$popupSlideList.find('.popup_slide_item').length);
        }

        $popupSlideList.on('init', function(event, slick, currentSlide){
            $('.popup_slide_wrap .popup_slide_control').addClass('bar');
        });
        $popupSlideList.slick({
            autoplay : true,
            autoplaySpeed : 3000,
            speed : 1500,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : true,
            arrows : true,
            autoArrow : $popupSlideAuto,
            pauseText : '정지',
            playText : '재생',
            prevArrow : $popupSlidePrev,
            nextArrow : $popupSlideNext,
            current : $popupSlideCurrent,
            customState : function(state) {
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                return state;
            },
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1001,
                settings : {
                    slidesToShow : 1,
                    variableWidth : false
                }
            },{
                breakpoint : 641,
                settings : {
                    slidesToShow : 1,
                    variableWidth : true
                }
            }]
        });
        $popupSlideList.on('beforeChange', function(event, slick, currentSlide) {
            setTimeout(function(){
                $('.popup_slide_wrap .popup_slide_control').removeClass('bar');
            }, 100);
        });
        $popupSlideList.on('afterChange', function(event, slick, currentSlide) {
            setTimeout(function(){
                $('.popup_slide_wrap .popup_slide_control').addClass('bar');
            }, 1);
        });
        $popupSlideAuto.on('click', function(){
            var $StopBar = $this.find('.popup_slide_control .dash i'),
                IsPlay = $(this).is('.slick-pause');
            if(IsPlay){
                $StopBar.css('animation-play-state', 'running');
            }
            else{
                $StopBar.css('animation-play-state', 'paused');
            }
        });
        // 알림존 종료

        // 분야별 정보 시작
        var $fieldSlideList = $('.field_slide_list'),
            $fieldSlidePrev = $('.field_slide_control .prev'),
            $fieldSlideNext = $('.field_slide_control .next');
        $fieldSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            rows : 2,
            slidesPerRow : 7,
            variableWidth : false,
            infinite : false,
            arrows : true,
            prevArrow : $fieldSlidePrev,
            nextArrow : $fieldSlideNext,
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
                    rows : 3,
                    slidesPerRow : 5
                }
            },{
                breakpoint : 1001,
                settings : {
                    rows : 3,
                    slidesPerRow : 3
                }
            },{
                breakpoint : 641,
                settings : {
                    rows : 2,
                    slidesPerRow : 4
                }
            },{
                breakpoint : 481,
                settings : {
                    rows : 2,
                    slidesPerRow : 3
                }
            }]
        });
        // 분야별 정보 종료

        // 군포소식지 시작
        var $bookSlideList = $('.book_slide_list');
        $bookSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : false,
            arrows : false,
            zIndex : 1,
            fade : true,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true
        });
        // 군포소식지 종료

        // SNS 시작
        var $snsSlideList = $('.sns_type_slide_list'),
            $snsSlidePrev = $('.sns_type_slide_control .prev'),
            $snsSlideNext = $('.sns_type_slide_control .next');
        $snsSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            variableWidth : false,
            infinite : false,
            arrows : true,
            prevArrow : $snsSlidePrev,
            nextArrow : $snsSlideNext,
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true
        });
        // SNS 종료

    });
})(jQuery);