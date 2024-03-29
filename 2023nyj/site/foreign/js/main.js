(function ($) {
    'use strict';

    function splittingTextDelay(object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i = 0; i < splitLength; i++) {
            if ($(object).data('css-property') == 'animation') {
                $(object).find('.char').eq(i).css('animation-delay', delay_speed + (i * speed) + 's');
            } else if ($(object).data('css-property') == 'transition') {
                $(object).find('.char').eq(i).css('transition-delay', delay_speed + (i * speed) + 's');
            }
        }
    }

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;
    $(function () {

        //여기서부터 코드 작성해주세요

        //슬라이드 이미지 스크롤 애니메이션 시작
        function foreign_ani() {
            if($window.scrollTop() > 115) {
                $('body').addClass('foreign_ani');
            }
            else{
                $('body').removeClass('foreign_ani');
            }
        }
        $window.scroll(function(){
            foreign_ani();
        });
        foreign_ani();
        //슬라이드 이미지 스크롤 애니메이션 끝

        //rowgroup 스크롤 애니메이션 시작
        var $RowgroupAni = $('.rowgroup_ani');
        $window.on('scroll', function(event) {
            $RowgroupAni.each(function () {
                var $this = $(this),
                    WindowTop = $window.scrollTop(),
                    WindowBottom = WindowTop + $window.height(),
                    WindowMiddle = (WindowTop + WindowBottom) / 2,
                    ThisOffSet = $this.offset(),
                    ThisOffSetTop = ThisOffSet.top;
                if (ThisOffSetTop < WindowMiddle + 400) {
                    $this.addClass('row_ani');
                } else {
                    $this.removeClass('row_ani');
                }
            });
        });
        //rowgroup 스크롤 애니메이션 끝

        //텍스트 에니메이션 플러그인 시작
        Splitting({
            target:'[data-splitting]',
            by:'chars',
            key:null
        });
        var $splittingTxt = $('.word-split');
        $($splittingTxt).each(function () {
            splittingTextDelay($(this), $(this).data('speed'), $(this).data('speed-delay'));
        });
        if(!$('html').is('.ie11')){
            console.log('not ie11');
            var $LastChar = $('.img_text_box .img_text_inner .title .word:last-child .char:last-child'),
                LastCharDelay = $LastChar.attr('style'),
                SemiColonLastCharDelay = LastCharDelay.split(';'),
                ColonLastCharDelay = SemiColonLastCharDelay[1].split(':'),
                SecLastCharDelay = ColonLastCharDelay[1].split('s'),
                DescDelay = Number(SecLastCharDelay[0]) + 0.5,
                $Desc = $('.img_text_box .img_text_inner .desc');
            $Desc.attr('style', 'animation-delay:'+DescDelay+'s');
        }
        //텍스트 에니메이션 플러그인 끝
        
        //비주얼 슬라이드 시작
        var $VisualImgSlideList = $('.visual_wrap .img_slide_wrap .img_slide_list'),
            $VisualImgPrev = $('.visual_wrap .img_slide_wrap .control_box .prev'),
            $VisualImgNext = $('.visual_wrap .img_slide_wrap .control_box .next'),
            $VisualImgCountBox = $('.visual_wrap .img_slide_wrap .count_box'),
            $VisualImgAuto = $('.visual_wrap .img_slide_wrap .count_box .auto'),
            $VisualImgTotal = $('.visual_wrap .img_slide_wrap .count_box .total'),
            $VisualImgCurrent = $('.visual_wrap .img_slide_wrap .count_box .current');
        $VisualImgSlideList.on('init', function(event, slick, currentSlide) {
            var $crtSlide = $(slick.$slides[0]),
                $crtRows = $crtSlide.find('.slick-rows'),
                $crtImgSlideItem = $crtRows.find('.img_slide_item'),
                crtDataImgType = $crtImgSlideItem.attr('data-img-type'),
                $crtImgBackItem = $('.visual_wrap .img_back_list .img_back_item[data-img-back-type="'+crtDataImgType+'"]'),
                $otherImgBackItem = $('.visual_wrap .img_back_list').find('.img_back_item').not($crtImgBackItem);
            setTimeout(function(){
                $VisualImgCountBox.addClass('active');
                $otherImgBackItem.removeClass('active');
                $crtImgBackItem.addClass('active');
            }, 1);
        });
        $VisualImgSlideList.slick({
            //기본
            autoplay : true,
            speed : 2500,
            autoplaySpeed : 4000,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            fade : true,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite: true,
            arrows : true,
            prevArrow : $VisualImgPrev,
            nextArrow : $VisualImgNext,
            autoArrow : $VisualImgAuto,
            pauseText : 'stop',
            playText : 'play',
            total : $VisualImgTotal,
            current : $VisualImgCurrent,
            customState : function(state) {
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            isRunOnLowIE : false,
            pauseOnHover : false,
            pauseOnSwipe : false,
            pauseOnArrowClick : false,
            zIndex : 0,
            responsive : [{}]
        });
        $VisualImgSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var $nextSlide = $(slick.$slides[nextSlide]),
                $nextRows = $nextSlide.find('.slick-rows'),
                $nextImgSlideItem = $nextRows.find('.img_slide_item'),
                nextDataImgType = $nextImgSlideItem.attr('data-img-type'),
                $nextImgBackItem = $('.visual_wrap .img_back_list .img_back_item[data-img-back-type="'+nextDataImgType+'"]'),
                $otherImgBackItem = $('.visual_wrap .img_back_list').find('.img_back_item').not($nextImgBackItem);
            $VisualImgCountBox.removeClass('active');
            $otherImgBackItem.removeClass('active');
            $nextImgBackItem.addClass('active');
        });
        $VisualImgSlideList.on('afterChange', function(event, slick, currentSlide, nextSlide) {
            $VisualImgCountBox.addClass('active');
        });
        $VisualImgAuto.on('click', function(){
            var $this = $(this),
                $Gage = $('.visual_wrap .img_slide_wrap .count_box .bar .gage'),
                IsPlay = $this.is('.slick-pause');
            if(IsPlay){
                $Gage.css('animation-play-state', 'running');
            }
            else{
                $Gage.css('animation-play-state', 'paused');
            }
        });
        //비주얼 슬라이드 끝

        //비주얼 퀵메뉴 슬라이드 시작
        var $QuickSlideList = $('.visual_wrap .quick_slide_wrap .quick_slide_list');
        $QuickSlideList.slick({
            //기본
            autoplay : true,
            dots : false,
            draggable : false,
            swipe : false,
            swipeToSlide : false,
            slidesToShow : 5,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: false,
            arrows : false,
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            zIndex : 0,
            responsive : [{
                breakpoint : 641,
                settings : {
                    draggable : true,
                    swipe : true,
                    swipeToSlide : true,
                    slidesToShow : 3,
                    infinite : true
                }
            }]
        });
        //비주얼 퀵메뉴 슬라이드 끝

        //카테고리 탭, 슬라이드 시작
        var $cgSlideBoxItem = $('.cg_total .cg_slide_box .cg_slide_box_item');
        $cgSlideBoxItem.each(function(){
            var $this = $(this),
                IsActive = $this.is('.active'),
                $cgSlideList = $this.find('.cg_slide_list');
            if(IsActive){
                setTimeout(function(){
                    $this.addClass('tab_ani');
                }, 1)
            }
            $cgSlideList.slick({
                //기본
                autoplay : true,
                autoplaySpeed : 2300,
                speed : 1200,
                dots : false,
                draggable : false,
                swipe : false,
                swipeToSlide : false,
                slidesToShow : 4,
                slidesToScroll : 1,
                variableWidth : true,
                infinite: false,
                arrows : false,
                isRunOnLowIE : true,
                pauseOnHover : true,
                pauseOnSwipe : true,
                pauseOnArrowClick : true,
                zIndex : 0,
                responsive : [{
                    breakpoint : 801,
                    settings : {
                        speed : 1000,
                        draggable : true,
                        swipe : true,
                        swipeToSlide : true,
                        slidesToShow : 2,
                        infinite: true
                    }
                }]
            });
        });
        $('.cg_total .cg_tab_box .cg_tab_list .cg_tab_item button.cg_tab_btn').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.cg_tab_item'),
                MyDataBtnType = $MyItem.attr('data-btn-type'),
                $OtherItem = $MyItem.siblings('.cg_tab_item'),
                $OtherBtn = $OtherItem.find('button.cg_tab_btn'),
                IsActive = $MyItem.is('.active'),
                $cgTotal = $this.parents('.cg_total'),
                $MySlideBoxItem = $cgTotal.find('.cg_slide_box_item[data-slide-type="'+MyDataBtnType+'"]'),
                $OtherSlideBoxItem = $MySlideBoxItem.siblings('.cg_slide_box_item'),
                $MySlideList = $MySlideBoxItem.find('.cg_slide_list');
            if(!IsActive){
                $OtherItem.removeClass('active');
                $OtherSlideBoxItem.removeClass('active tab_ani');
                $OtherBtn.removeAttr('title');
                $MyItem.addClass('active');
                $MySlideBoxItem.addClass('active');
                setTimeout(function(){
                    $MySlideBoxItem.addClass('tab_ani');
                }, 1)
                $this.attr('title', 'category select');
                $MySlideList.slick('setPosition');
            }
        });
        $('.cg_total .cg_tab_box .cg_tab_list .cg_tab_item button.cg_tab_btn').on('mouseover', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.cg_tab_item'),
                MyTabItemType = $MyTabItem.attr('data-btn-type'),
                $MyTabList = $MyTabItem.parent('.cg_tab_list');
            $MyTabList.attr('data-deco-type', MyTabItemType);
        });
        $('.cg_total .cg_tab_box .cg_tab_list .cg_tab_item button.cg_tab_btn').on('mouseout', function(){
            var $this = $(this),
                $MyTabItem = $this.parent('.cg_tab_item'),
                $OtherTabItem = $MyTabItem.siblings('.cg_tab_item'),
                IsActive = $MyTabItem.is('.active'),
                MyTabItemType = $MyTabItem.attr('data-btn-type'),
                OtherTabItemType = $OtherTabItem.attr('data-btn-type'),
                $MyTabList = $MyTabItem.parent('.cg_tab_list');
            if(!IsActive){
                $MyTabList.attr('data-deco-type', OtherTabItemType);
            }
            else{
                $MyTabList.attr('data-deco-type', MyTabItemType);
            }
        });
        //카테고리 탭, 슬라이드 끝

        //투어리즘 슬라이드 시작
        var TourSlideItemLength = $('.tour .tour_wrap .tour_slide_wrap .tour_slide_list').find('.tour_slide_item').length,
            $TourSlideTotal = $('.tour .tour_wrap .tour_slide_wrap .total');
        if(TourSlideItemLength < 10) {
            TourSlideItemLength = '0' + TourSlideItemLength;
        }
        $TourSlideTotal.text(TourSlideItemLength);

        var $TourSlideList = $('.tour .tour_wrap .tour_slide_wrap .tour_slide_list'),
            $TourSlideLastItem = $TourSlideList.find('.tour_slide_item:last-child'),
            $TourSlidePrev = $('.tour .tour_wrap .tour_slide_wrap .prev'),
            $TourSlideNext = $('.tour .tour_wrap .tour_slide_wrap .next'),
            $TourSlideAuto = $('.tour .tour_wrap .tour_slide_wrap .auto'),
            $TourSlideCurrent = $('.tour .tour_wrap .tour_slide_wrap .current'),
            $TourSlideCountBox = $('.tour .tour_wrap .tour_slide_wrap .count_box');
        $TourSlideList.prepend($TourSlideLastItem);

        $TourSlideList.on('init', function(event, slick, currentSlide) {
            $TourSlideCountBox.addClass('active');
        });
        $TourSlideList.slick({
            //기본
            autoplay : true,
            autoplaySpeed : 2300,
            speed : 1200,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 3,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            arrows : true,
            prevArrow : $TourSlidePrev,
            nextArrow : $TourSlideNext,
            autoArrow : $TourSlideAuto,
            pauseText : 'pause',
            playText : 'play',
            current : $TourSlideCurrent,
            customState : function(state) {
                if(state.current < 10) {
                    state.current = '0' + state.current;
                }
                if(state.total < 10) {
                    state.total = '0' + state.total;
                }
                return state;
            },
            isRunOnLowIE : true,
            pauseOnHover : true,
            pauseOnSwipe : true,
            pauseOnArrowClick : true,
            zIndex : 0,
            responsive : [{}]
        });
        $TourSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $TourSlideCountBox.removeClass('active');
        });
        $TourSlideList.on('afterChange', function(event, slick, currentSlide, nextSlide) {
            $TourSlideCountBox.addClass('active');
        });
        $TourSlideAuto.on('click', function(){
            var $this = $(this),
                $Gage = $('.tour .tour_wrap .tour_slide_wrap .gage'),
                IsPlay = $this.is('.slick-pause');
            if(IsPlay){
                $Gage.css('animation-play-state', 'running');
            }
            else{
                $Gage.css('animation-play-state', 'paused');
            }
        });
        //투어리즘 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);