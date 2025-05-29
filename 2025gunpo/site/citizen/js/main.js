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

        // 로딩 애니메이션 시작
        $('#wrapper').addClass('load_ani');
        // 로딩 애니메이션 종료

        // 비주얼 팝업 슬라이드 시작
        var $popupSlideWrap = $('.popup_slide_wrap'),
            $popupSlideList = $popupSlideWrap.find('.popup_slide_list'),
            $popupSlidePrev = $popupSlideWrap.find('.prev'),
            $popupSlideNext = $popupSlideWrap.find('.next'),
            $popupSlideAuto = $popupSlideWrap.find('.auto'),
            $popupSlideCurrent = $popupSlideWrap.find('.current'),
            $popupSlideTotal = $popupSlideWrap.find('.total');
        $popupSlideList.slick({
            autoplay : false,
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
            autoArrow : $popupSlideAuto,
            pauseText : '정지',
            playText : '재생',
            prevArrow : $popupSlidePrev,
            nextArrow : $popupSlideNext,
            current : $popupSlideCurrent,
            total : $popupSlideTotal,
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true
        });
        // 비주얼 팝업 슬라이드 종료

        // 설문조사 영역 시작

        // 슬라이드 시작
        var surveyArray = [];
        var $surveySlideWrap = $('.survey_slide_wrap'),
            $surveySlideCategory = $surveySlideWrap.find('.survey_slide_category'),
            $surveySlideCategoryTotal = $surveySlideWrap.find('.survey_slide_category[data-category="0"]');
        for(var i=0; i<$surveySlideCategoryTotal.find('.survey_slide_item').length; i++){
            surveyArray.push({
                'cloneItem' : $surveySlideCategoryTotal.find('.survey_slide_item').eq(i).clone(),
                'dataCategory' : $surveySlideCategoryTotal.find('.survey_slide_item').eq(i).clone().attr('data-category')
            });
        }
        for(var i=0; i<surveyArray.length; i++) {
            if (surveyArray[i].dataCategory == "1") {
                $surveySlideWrap.find('.survey_slide_category[data-category="1"] .front_slide_inner .front_slide_list').append(
                    surveyArray[i].cloneItem
                );
            }
        }
        for(var i=0; i<surveyArray.length; i++) {
            if (surveyArray[i].dataCategory == "2") {
                $surveySlideWrap.find('.survey_slide_category[data-category="2"] .front_slide_inner .front_slide_list').append(
                    surveyArray[i].cloneItem
                );
            }
        }
        for(var i=0; i<surveyArray.length; i++) {
            if (surveyArray[i].dataCategory == "3") {
                $surveySlideWrap.find('.survey_slide_category[data-category="3"] .front_slide_inner .front_slide_list').append(
                    surveyArray[i].cloneItem
                );
            }
        }
        $surveySlideCategory.each(function(){
            var $this = $(this),
                $surveySlidePrev = $this.find('.survey_slide_control .prev'),
                $surveySlideNext = $this.find('.survey_slide_control .next'),
                $surveyBackSlideList = $this.find('.back_slide_list'),
                $surveyFrontSlideList = $this.find('.front_slide_list'),
                $surveyFrontSlideItem = $surveyFrontSlideList.find('.survey_slide_item'),
                $surveyFrontSlideItemClone = $surveyFrontSlideItem.clone();

            // back 슬라이드 시작
            if($surveyFrontSlideItem.length >= 4){
                for(var i=3; i<$surveyFrontSlideItem.length; i++){
                    $surveyBackSlideList.append($surveyFrontSlideItemClone.eq(i));
                    $surveyBackSlideList.append($surveyFrontSlideItemClone.eq(0));
                    $surveyBackSlideList.append($surveyFrontSlideItemClone.eq(1));
                    $surveyBackSlideList.append($surveyFrontSlideItemClone.eq(2));
                }
            }
            if($surveyFrontSlideItem.length < 4){
                for(var i=3; i<$surveyFrontSlideItem.length; i++){
                    $surveyBackSlideList.append($surveyFrontSlideItemClone.eq(i));
                }
            }
            $surveyBackSlideList.slick({
                autoplay : false,
                speed : 1200,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 2,
                slidesToScroll : 1,
                variableWidth : true,
                infinite : true,
                arrows : false,
                zIndex : -1,
                fade : false,
                pauseOnHover : true,
                pauseOnFocus : true,
                pauseOnArrowClick : true,
                pauseOnSwipe : true,
                pauseOnClick : true,
                pauseOnDotsHover : true,
                asNavFor : $surveyFrontSlideList
            });
            $surveyBackSlideList.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                setTimeout(function(){
                    $surveyBackSlideList.find('.slick-active').attr('tabindex', '-1');
                    $surveyBackSlideList.find('.slick-active a').attr('tabindex', '-1');
                }, 500);
            });
            $surveyBackSlideList.on('afterChange', function(event, slick, currentSlide, nextSlide) {
                setTimeout(function(){
                    $surveyBackSlideList.find('.slick-active').attr('tabindex', '-1');
                    $surveyBackSlideList.find('.slick-active a').attr('tabindex', '-1');
                }, 500);
            });
            setTimeout(function(){
                $surveyBackSlideList.find('.slick-active').attr('tabindex', '-1');
                $surveyBackSlideList.find('.slick-active a').attr('tabindex', '-1');
            }, 500);
            // back 슬라이드 종료

            // front 슬라이드 시작
            $surveyFrontSlideList.slick({
                autoplay : false,
                speed : 1200,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : true,
                prevArrow : $surveySlidePrev,
                nextArrow : $surveySlideNext,
                zIndex : 1,
                fade : false,
                pauseOnHover : true,
                pauseOnFocus : true,
                pauseOnArrowClick : true,
                pauseOnSwipe : true,
                pauseOnClick : true,
                pauseOnDotsHover : true,
                asNavFor : $surveyBackSlideList
            });
            // front 슬라이드 종료
        });
        // 슬라이드 종료

        // 탭 버튼 시작
        var $surveyTabWrap = $('.survey_tab_wrap'),
            $surveyTabBtn = $surveyTabWrap.find('button.survey_tab_btn');
        $surveyTabBtn.on('click', function(){
            if( !($(this).parent('.survey_tab_item').is('.active'))){
                $surveyTabWrap.find('.survey_tab_item').removeClass('active');
                $surveyTabBtn.removeAttr('title');
                $(this).parent('.survey_tab_item').addClass('active');
                $(this).attr('title', '선택됨');
                $surveySlideWrap.find('.survey_slide_category').removeClass('active active_ani');
                $surveySlideWrap.find('.survey_slide_category[data-category="'+$(this).parent('.survey_tab_item').attr('data-category')+'"]').addClass('active');
                setTimeout(function(){
                    $surveySlideWrap.find('.survey_slide_category.active').addClass('active_ani');
                }, 100);
                $surveySlideWrap.find('.survey_slide_category[data-category="'+$(this).parent('.survey_tab_item').attr('data-category')+'"] .front_slide_list').slick('setPosition');
                $surveySlideWrap.find('.survey_slide_category[data-category="'+$(this).parent('.survey_tab_item').attr('data-category')+'"] .back_slide_list').slick('setPosition');
            }
        });
        // 탭 버튼 종료

        // 설문조사 영역 종료

        // 데코 gsap 시작
        function gsapInit(){
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                '(min-width:1001px)' : function () {

                    /* ---------- rowgroup1 시작 ---------- */
                    gsap.to($('.service_popup'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '400px 0%',
                            end : '680px 0%',
                            scrub : 2.4
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : -50,
                        opacity : 0
                    });
                    gsap.to($('.popup_slide_control'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '400px 0%',
                            end : '680px 0%',
                            scrub : 3.6
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : 500
                    });
                    gsap.to($('.service_quick'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '400px 0%',
                            end : '680px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : 100,
                        opacity : 0
                    });
                    gsap.to($('.service_quick_link .quick_title'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '405px 0%',
                            end : '810px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        yPercent : -400
                    });
                    gsap.to($('.service_quick_link .quick_desc'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '405px 0%',
                            end : '810px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -100
                    });
                    gsap.to($('.service_quick_link .more_deco'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '405px 0%',
                            end : '810px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        transformOrigin : '100% 100%',
                        scale : 0,
                        xPercent : 100,
                        opacity : 0
                    });
                    /* ---------- rowgroup1 종료 ---------- */

                    /* ---------- rowgroup2 시작 ---------- */
                    gsap.from($('.survey_tab_wrap .survey_title'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '110px 0%',
                            end : '330px 0%',
                            scrub : 1.02
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0
                    });
                    gsap.from($('.survey_tab_wrap .survey_tab_list'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '350px 0%',
                            scrub : 1.02
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0
                    });
                    gsap.from($('.survey_slide_item[data-category="3"]'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '350px 0%',
                            scrub : 1.3
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 0,
                        yPercent : 50
                    });
                    gsap.from($('.survey_slide_item[data-category="2"]'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '350px 0%',
                            scrub : 2.5
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 0,
                        yPercent : 50
                    });
                    gsap.from($('.survey_slide_item[data-category="1"]'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '350px 0%',
                            scrub : 3.7
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 0,
                        yPercent : 50
                    });
                    gsap.to($('.survey_deco i.hand svg path'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '400px 0%',
                            end : '800px 0%',
                            scrub : 1.01,
                            onUpdate : function(self) {
                                var path = 6231 - (self.progress * 6231);
                                $('.survey_deco i.hand svg path').css({'stroke-dashoffset':''+path+'px'});
                            }
                        }
                    });
                    gsap.from($('.survey_deco i.cloud01'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '500px 0%',
                            end : '700px 0%',
                            scrub : 2
                        },
                        ease : 'ease.in(1,0.3)',
                        bottom : '-100%',
                        left : '-30%'
                    });
                    gsap.from($('.survey_deco i.cloud02'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '500px 0%',
                            end : '700px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        bottom : '-100%',
                        left : '-30%'
                    });
                    gsap.from($('.survey_deco i.cloud03'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '500px 0%',
                            end : '700px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        bottom : '-100%',
                        right : '-30%'
                    });
                    gsap.from($('.survey_deco i.star_rotate'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '720px 0%',
                            scrub : 4.5
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        rotate : 1080,
                        right : '100%',
                        bottom : '120%'
                    });
                    gsap.from($('.survey_deco i.star_rotate i.star'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '0% 0%',
                            end : '720px 0%',
                            scrub : 4.5
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : -1080
                    });
                    gsap.from($('.survey_slide_control'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '110px 0%',
                            end : '330px 0%',
                            scrub : 1.02
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0
                    });
                    /* ---------- rowgroup2 종료 ---------- */

                    /* ---------- rowgroup3 시작 ---------- */
                    gsap.set($('.city_quick_link[data-city="1"]'), {
                        transformOrigin : '0% 100%'
                    });
                    gsap.set($('.city_quick_link[data-city="2"]'), {
                        transformOrigin : '100% 100%'
                    });
                    gsap.from($('.city_quick_link[data-city="1"]'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '850px 0%',
                            end : '1000px 0%',
                            scrub : 2.6
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : 90,
                        scale : 0,
                        xPercent : 50,
                        yPercent : -150
                    });
                    gsap.from($('.city_quick_link[data-city="2"]'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '850px 0%',
                            end : '1000px 0%',
                            scrub : 2.6
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : -90,
                        scale : 0,
                        xPercent : -50,
                        yPercent : -150
                    });
                    gsap.from($('.city_quick_link .link_box'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '850px 0%',
                            end : '1000px 0%',
                            scrub : 1.3
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : 80
                    });
                    /* ---------- rowgroup3 종료 ---------- */
                },
                '(max-width:1000px)' : function () {

                }
            });
            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();
        // 데코 gsap 종료

    });
})(jQuery);