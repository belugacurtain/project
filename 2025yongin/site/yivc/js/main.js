(function ($) {
    'use strict';

    // 비주얼 텍스트 효과 시작
    function splittingTextDelay (object, speed, delay_speed) {
        var splitLength = $(object).find('.char').length;
        for (var i=0; i<splitLength; i++) {
            if (  $(object).data('css-property') == 'animation' ) {
                $(object).find('.char').eq(i).css('animation-delay',delay_speed+(i*speed)+'s');
            }else if( $(object).data('css-property') == 'transition' ) {
                $(object).find('.char').eq(i).css('transition-delay',delay_speed+(i*speed)+'s');
            }
        }
    }
    // 비주얼 텍스트 효과 종료

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //여기서부터 코드 작성해주세요

        // 비주얼 시작
        var $visualWrap = $('.visual_wrap'),
            $visualSlideList = $visualWrap.find('.visual_slide_list'),
            $visualSlideNav = $visualWrap.find('.nav_box'),
            $visualSlidePrev = $visualWrap.find('.prev'),
            $visualSlideNext = $visualWrap.find('.next'),
            $visualSlideAuto = $visualWrap.find('.auto');
        $visualSlideList.on('init', function(event, slick, currentSlide){
            $visualWrap.addClass('active_ani');

            //텍스트 에니메이션 플러그인 시작
            Splitting({target : '[data-splitting]', by : 'chars', key : null});
            var $splittingTxt = $('.word-split');
            $($splittingTxt).each(function  () {
                splittingTextDelay($(this),$(this).data('speed'),$(this).data('speed-delay'));
            });
            //텍스트 에니메이션 플러그인 끝
        });
        $visualSlideList.slick({
            autoplay : true,
            autoplaySpeed : 5000,
            speed : 2000,
            dots : true,
            appendDots: $visualSlideNav,
            dotsClass:'slick-dots clearfix',
            customPaging : function(slider, i) {
                return '<button type="button">'+(i + 1)+'<span class="skip">번 보기</span></button>';
            },
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
            zIndex : 1,
            fade : true,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1641,
                settings : {

                }
            }]
        });
        // 비주얼 종료

        // sns 시작
        var $snsSlideWrap = $('.sns_story_slide_wrap'),
            $snsSlideList = $snsSlideWrap.find('.sns_story_slide_list'),
            $snsSlideControlBtn = $snsSlideWrap.find('.control_btn'),
            $snsSlidePrev = $snsSlideWrap.find('.prev'),
            $snsSlideNext = $snsSlideWrap.find('.next');
        $snsSlideControlBtn.on('mouseover', function(){
            $(this).addClass('over');
        });
        $snsSlideControlBtn.on('click', function(){
            $(this).addClass('click');
        });
        $snsSlideControlBtn.on('mouseleave', function(){
            $(this).removeClass('over click');
        });
        $snsSlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
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
            pauseOnDotsHover : true,
            responsive : [{
                breakpoint : 1221,
                settings : {
                    slidesToShow : 1,
                    fade : true
                }
            }]
        });
        // sns 종료

        // 공지/소식 or 보도자료 공통 시작
        var $sectionSlideWrap = $('.section_slide_wrap');
        $sectionSlideWrap.each(function(){
            var $this = $(this),
                $sectionSlideList = $this.find('.section_slide_list');
            $sectionSlideList.slick({
                autoplay : false,
                dots : false,
                draggable : true,
                swipe : true,
                swipeToSlide : true,
                slidesToShow : 3,
                slidesToScroll : 1,
                variableWidth : false,
                infinite : true,
                arrows : false,
                zIndex : 1,
                fade : false,
                pauseOnHover : true,
                pauseOnFocus : true,
                pauseOnArrowClick : true,
                pauseOnSwipe : true,
                pauseOnClick : true,
                pauseOnDotsHover : true,
                vertical : true,
                verticalSwiping : true
            });
        });
        // 공지/소식 or 보도자료 공통 종료

        // 봉사활동 스토리 시작
        var $storySlideWrap = $('.story_slide_wrap'),
            $storySlideList = $storySlideWrap.find('.story_slide_list'),
            $storySlideItem = $storySlideList.find('.story_slide_item'),
            $storySlideControlBtn = $storySlideWrap.find('.control_btn'),
            $storySlidePrev = $storySlideWrap.find('.prev'),
            $storySlideNext = $storySlideWrap.find('.next'),
            $storySlideCloneWrap = $('.story_clone_slide_wrap'),
            $storySlideCloneList = $storySlideCloneWrap.find('.story_clone_slide_list');
        $storySlideControlBtn.on('mouseover', function(){
            $(this).addClass('over');
        });
        $storySlideControlBtn.on('click', function(){
            $(this).addClass('click');
        });
        $storySlideControlBtn.on('mouseleave', function(){
            $(this).removeClass('over click');
        });
        $storySlideCloneList.append($storySlideItem.clone());
        $storySlideList.append($storySlideList.find('.story_slide_item:first-child'));
        // front
        $storySlideList.slick({
            autoplay : false,
            dots : false,
            draggable : true,
            swipe : true,
            swipeToSlide : true,
            slidesToShow : 2,
            slidesToScroll : 1,
            variableWidth : true,
            infinite : false,
            arrows : true,
            prevArrow : $storySlidePrev,
            nextArrow : $storySlideNext,
            zIndex : 1,
            fade : false,
            pauseOnHover : true,
            pauseOnFocus : true,
            pauseOnArrowClick : true,
            pauseOnSwipe : true,
            pauseOnClick : true,
            pauseOnDotsHover : true,
            asNavFor : $storySlideCloneList,
            responsive : [{
                breakpoint : 1571,
                settings : {
                    slidesToShow : 1
                }
            },{
                breakpoint : 1321,
                settings : {
                    slidesToShow : 2
                }
            },{
                breakpoint : 1181,
                settings : {
                    slidesToShow : 1
                }
            }]
        });
        // back
        $storySlideCloneList.slick({
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
            pauseOnDotsHover : true,
            asNavFor : $storySlideList
        });
        // 봉사활동 스토리 종료


        // 데코 gsap 시작
        setTimeout(function(){
            $('#wrapper').addClass('active_ani');
        }, 1);
        function gsapInit(){
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                '(min-width:1001px)' : function () {
                    /* ---------- rowgroup2 시작 ---------- */
                    gsap.to($('.service_wrap'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 3
                        },
                        ease : 'ease.in(1,0.3)',
                        y : '0px'
                    });
                    gsap.to($('.service_title_box'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-950px 0%',
                            end : '-850px 0%',
                            markers : false,
                            scrub : 3
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1
                    });
                    gsap.to($('.service_title_box .deco'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 3
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : '-720deg',
                        bottom : '0px',
                        left : '0px'
                    });
                    gsap.to($('.service_title_box .deco i'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 3
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : '720deg'
                    });
                    gsap.to($('.service_count_item[data-count="1"]'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-850px 0%',
                            end : '-800px 0%',
                            markers : false,
                            scrub : 3.3,
                            onUpdate : function(self) {
                                var path = 433 - (self.progress * 433);
                                $('.service_count_item[data-count="1"] path').css({
                                    'stroke-dashoffset':''+path+'px'
                                });
                            },
                            onEnter : function() {
                                // 봉사 카운팅 현황 시작
                                $('.service_count_item[data-count="1"] .count_number').each(function(){
                                    var $this = $(this),
                                        end = parseInt($this.attr('data-number'), 10); // 숫자로 변환
                                    $({start:0}).animate({
                                        start : end
                                    },{
                                        duration:1200,
                                        step : function(){
                                            var current = Math.floor(this.start);
                                            var text = current.toLocaleString(); // 천 단위 콤마 추가
                                            if(end < 10){
                                                text = '0' + text;
                                            }
                                            $this.text(text);
                                        },
                                        complete : function(){
                                            var final = end.toLocaleString();
                                            if(end < 10){
                                                final = '0' + final;
                                            }
                                            $this.text(final);
                                        }
                                    });
                                });
                                // 봉사 카운팅 현황 종료
                            }
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        filter : 'blur(0px)'
                    });
                    gsap.to($('.service_count_item[data-count="2"]'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-750px 0%',
                            end : '-700px 0%',
                            markers : false,
                            scrub : 3.3,
                            onUpdate : function(self) {
                                var path = 866 - (self.progress * 866);
                                $('.service_count_item[data-count="2"] path').css({
                                    'stroke-dashoffset':''+path+'px'
                                });
                            },
                            onEnter : function() {
                                // 봉사 카운팅 현황 시작
                                $('.service_count_item[data-count="2"] .count_number').each(function(){
                                    var $this = $(this),
                                        end = parseInt($this.attr('data-number'), 10); // 숫자로 변환
                                    $({start:0}).animate({
                                        start : end
                                    },{
                                        duration:1200,
                                        step : function(){
                                            var current = Math.floor(this.start);
                                            var text = current.toLocaleString(); // 천 단위 콤마 추가
                                            if(end < 10){
                                                text = '0' + text;
                                            }
                                            $this.text(text);
                                        },
                                        complete : function(){
                                            var final = end.toLocaleString();
                                            if(end < 10){
                                                final = '0' + final;
                                            }
                                            $this.text(final);
                                        }
                                    });
                                });
                                // 봉사 카운팅 현황 종료
                            }
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        filter : 'blur(0px)'
                    });
                    gsap.to($('.service_count_item[data-count="3"]'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-650px 0%',
                            end : '-600px 0%',
                            markers : false,
                            scrub : 3.3,
                            onUpdate : function(self) {
                                var path = 1299 - (self.progress * 1299);
                                $('.service_count_item[data-count="3"] path').css({
                                    'stroke-dashoffset':''+path+'px'
                                });
                            },
                            onEnter : function() {
                                // 봉사 카운팅 현황 시작
                                $('.service_count_item[data-count="3"] .count_number').each(function(){
                                    var $this = $(this),
                                        end = parseInt($this.attr('data-number'), 10); // 숫자로 변환
                                    $({start:0}).animate({
                                        start : end
                                    },{
                                        duration:1200,
                                        step : function(){
                                            var current = Math.floor(this.start);
                                            var text = current.toLocaleString(); // 천 단위 콤마 추가
                                            if(end < 10){
                                                text = '0' + text;
                                            }
                                            $this.text(text);
                                        },
                                        complete : function(){
                                            var final = end.toLocaleString();
                                            if(end < 10){
                                                final = '0' + final;
                                            }
                                            $this.text(final);
                                        }
                                    });
                                });
                                // 봉사 카운팅 현황 종료
                            }
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        filter : 'blur(0px)'
                    });
                    gsap.to($('.sns_story_wrap'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        y : '0px'
                    });
                    gsap.to($('.sns_story_slide_list'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 3
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        filter : 'blur(0px)'
                    });
                    gsap.to($('.sns_story_slide_wrap .prev'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 2
                        },
                        ease : 'ease.in(1,0.3)',
                        left : '-25px'
                    });
                    gsap.to($('.sns_story_slide_wrap .next'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup2'),
                            start : '-800px 0%',
                            end : '-650px 0%',
                            markers : false,
                            scrub : 2
                        },
                        ease : 'ease.in(1,0.3)',
                        right : '-25px'
                    });
                    /* ---------- rowgroup2 종료 ---------- */

                    /* ---------- rowgroup3 시작 ---------- */
                    gsap.to($('.section_title'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-1000px 0%',
                            end : '-800px 0%',
                            markers : false,
                            scrub : 2.5
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        y : '0px',
                        filter : 'blur(0px)'
                    });
                    gsap.to($('.section_slide_wrap'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup3'),
                            start : '-1000px 0%',
                            end : '-800px 0%',
                            markers : false,
                            scrub : 2
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        y : '0px',
                        filter : 'blur(0px)'
                    });
                    /* ---------- rowgroup3 종료 ---------- */

                    /* ---------- rowgroup4 시작 ---------- */
                    gsap.to($('.story_slide_list'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup4'),
                            start : '-1000px 0%',
                            end : '-600px 0%',
                            markers : false,
                            scrub : 3
                        },
                        ease : 'ease.in(1,0.3)',
                        paddingTop : '80px',
                        paddingBottom : '130px',
                        opacity : 1
                    });
                    gsap.to($('.story_slide_control'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup4'),
                            start : '-1000px 0%',
                            end : '-600px 0%',
                            markers : false,
                            scrub : 3.5
                        },
                        ease : 'ease.in(1,0.3)',
                        y : '0px',
                        opacity : 1
                    });
                    gsap.to($('.story_title_box *'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup4'),
                            start : '-900px 0%',
                            end : '-800px 0%',
                            markers : false,
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 1,
                        filter : 'blur(0px)'
                    });
                    gsap.to($('.story_clone_slide_wrap'), {
                        scrollTrigger : {
                            trigger : $('.rowgroup4'),
                            start : '-900px 0%',
                            end : '-700px 0%',
                            markers : false,
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        bottom : '194px',
                        opacity : 1,
                        filter : 'blur(0px)'
                    });
                    /* ---------- rowgroup4 종료 ---------- */

                },
                '(max-width:1000px)' : function () {

                }
            });
            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();
        // 데코 gsap 종료



        $window.on('screen:tablet screen:phone', function (event) {
            console.log('카운팅 현황 시작');
            // 봉사 카운팅 현황 시작
            $('.service_count_item .count_number').each(function(){
                var $this = $(this),
                    end = parseInt($this.attr('data-number'), 10); // 숫자로 변환
                $({start:0}).animate({
                    start : end
                },{
                    duration:1200,
                    step : function(){
                        var current = Math.floor(this.start);
                        var text = current.toLocaleString(); // 천 단위 콤마 추가
                        if(end < 10){
                            text = '0' + text;
                        }
                        $this.text(text);
                    },
                    complete : function(){
                        var final = end.toLocaleString();
                        if(end < 10){
                            final = '0' + final;
                        }
                        $this.text(final);
                    }
                });
            });
            // 봉사 카운팅 현황 종료
        });



    });
})(jQuery);