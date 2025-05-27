(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function () {

        //사이드
        var $container = $('#container'),
            $side = $container.find('.side'),
            $sideDepthItem = $side.find('.depth_item'),
            $sideSpy = $side.find('.spy:last');
        $sideDepthItem.on('click.menu', function (event) {
            var $this = $(this),
                $depthText = $this.children('.depth_text'),
                eventTarget = event.target,
                IsActive = $this.is('.active'),
                ThisIsLink = $this.is('.link');

            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }

                if ($this.children('.depth').length) {
                    if (!ThisIsLink) {
                        var $Depth = $this.children('.depth'),
                            DepthDisplay = $Depth.css('display');
                        if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
                            if (!IsActive) {
                                $this.removeClass('active_prev active_next');
                                $this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
                                $this.prev('.depth_item').addClass('active_prev');
                                $this.next('.depth_item').addClass('active_next');
                            } else {
                                $this.removeClass('active');
                                $this.siblings('.depth_item').removeClass('active_prev active_next');
                            }
                            event.preventDefault();
                        }
                    }
                }
            }

            event.stopPropagation();
        }).each(function (index, element) {
            var $element = $(element);
            if ($element.children('.depth').length) {
                $element.addClass('has');
            } else {
                $element.addClass('solo');
            }
        });
        if ($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
            $sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
            $sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
        }

        //여기서부터 코드 작성해주세요

        // 디자인 시연 위해 임시 시작
        $('.lnb .depth1_item:nth-child(2) .depth2_text').on('click', function(e){
            e.preventDefault();
            location.href = '../citizen/sub.html';
        });
        $('.lnb .depth1_item:nth-child(4) .depth2_text').on('click', function(e){
            e.preventDefault();
            location.href = '../citizen/sub-4.html';
        });
        $('.lnb .depth1_item:nth-child(5) .depth2_text').on('click', function(e){
            e.preventDefault();
            location.href = '../citizen/sub-5.html';
        });
        $('.lnb .depth1_item:nth-child(6) .depth2_text').on('click', function(e){
            e.preventDefault();
            location.href = '../citizen/sub-6.html';
        });
        // 디자인 시연 위해 임시 종료

        // 데코 gsap 시작
        $('.sub_head').addClass('deco_active');
        function gsapInit(){
            gsap.registerPlugin(ScrollTrigger);
            ScrollTrigger.matchMedia({
                '(min-width:1001px)' : function () {
                    // .deco_box[data-depth1-number="2"] 시작
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(1)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : 45,
                        yPercent : 100
                    });
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(2)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        rotate : 45,
                        xPercent : 80,
                        yPercent : 100
                    });
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(3)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        xPercent : -50,
                        yPercent : 300
                    });
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(4)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        rotate : -45,
                        xPercent : -80,
                        yPercent : 100
                    });
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(5)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        yPercent : -1000
                    });
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(6)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        yPercent : -1000
                    });
                    gsap.to($('.deco_box[data-depth1-number="2"] i:nth-child(7)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 0,
                        yPercent : -1000
                    });
                    // .deco_box[data-depth1-number="2"] 종료

                    // .deco_box[data-depth1-number="4"] 시작
                    gsap.to($('.deco_box[data-depth1-number="4"] i:nth-child(1)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.01
                        },
                        ease : 'ease.in(1,0.3)',
                        opacity : 0,
                    });
                    gsap.to($('.deco_box[data-depth1-number="4"] i:nth-child(2)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1
                        },
                        ease : 'ease.in(1,0.3)',
                        scale : 1.5
                    });
                    gsap.to($('.deco_box[data-depth1-number="4"] i:nth-child(3)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        yPercent : -200,
                        scale : 0,
                        rotateY : 360
                    });
                    gsap.to($('.deco_box[data-depth1-number="4"] i:nth-child(4)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.6
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -200,
                        rotateY : 360
                    });
                    // .deco_box[data-depth1-number="4"] 종료

                    // .deco_box[data-depth1-number="5"] 시작
                    gsap.to($('.deco_box[data-depth1-number="5"] i:nth-child(1)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : -30,
                        xPercent : -10,
                        yPercent : 100
                    });
                    gsap.to($('.deco_box[data-depth1-number="5"] i:nth-child(2)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : 30,
                        xPercent : 10,
                        yPercent : 100
                    });
                    gsap.to($('.deco_box[data-depth1-number="5"] i:nth-child(3)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.01
                        },
                        ease : 'ease.in(1,0.3)',
                        rotateY : 360,
                        yPercent : 600,
                        scale : 0
                    });
                    gsap.to($('.deco_box[data-depth1-number="5"] i:nth-child(4)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.01
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : 200
                    });
                    gsap.to($('.deco_box[data-depth1-number="5"] i:nth-child(5)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.01
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -200
                    });
                    gsap.to($('.deco_box[data-depth1-number="5"] i:nth-child(6)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.01
                        },
                        ease : 'ease.in(1,0.3)',
                        rotateY : 360,
                        xPercent : -500,
                        yPercent : 600,
                        scale : 0
                    });
                    // .deco_box[data-depth1-number="5"] 종료

                    // .deco_box[data-depth1-number="6"] 시작
                    gsap.to($('.deco_box[data-depth1-number="6"] i:nth-child(1)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.2
                        },
                        ease : 'ease.in(1,0.3)',
                        rotate : -30,
                        xPercent : -10,
                        yPercent : 100
                    });
                    gsap.to($('.deco_box[data-depth1-number="6"] i:nth-child(2)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        rotateY : 360,
                        xPercent : 100,
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.to($('.deco_box[data-depth1-number="6"] i:nth-child(3)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.5
                        },
                        ease : 'ease.in(1,0.3)',
                        rotateY : 360,
                        xPercent : -100,
                        yPercent : -150,
                        scale : 0
                    });
                    gsap.to($('.deco_box[data-depth1-number="6"] i:nth-child(4), .deco_box[data-depth1-number="6"] i:nth-child(5), .deco_box[data-depth1-number="6"] i:nth-child(6), .deco_box[data-depth1-number="6"] i:nth-child(7), .deco_box[data-depth1-number="6"] i:nth-child(8), .deco_box[data-depth1-number="6"] i:nth-child(9)'), {
                        scrollTrigger : {
                            trigger : $('#wrapper'),
                            start : '130px 0%',
                            end : '470px 0%',
                            scrub : 1.01
                        },
                        ease : 'ease.in(1,0.3)',
                        xPercent : -100,
                        yPercent : -500,
                        rotate : -90,
                        scale : 0
                    });
                    // .deco_box[data-depth1-number="6"] 종료
                },
                '(max-width:1000px)' : function () {

                }
            });
            window.addEventListener('resize', ScrollTrigger.update);
        }
        gsapInit();
        // 데코 gsap 종료

        // CMS Tab 시작
        $('.sub_head .cms_tab .cms_tab_list .cms_tab_item').each(function(){
            // 초기 active 텍스트 부여 시작
            $(this).find('.cms_tab_btn span em').text($(this).find('.menu_item.active').text());
            // 초기 active 텍스트 부여 종료

            // 레이어창 활성화 시작
            $(this).find('button.cms_tab_btn').on('click', function(){
                if( !($(this).parent('.cms_tab_item').is('.active')) ){
                    $(this).parent('.cms_tab_item').siblings('.cms_tab_item').removeClass('active');
                    $(this).parent('.cms_tab_item').siblings('.cms_tab_item').find('button.cms_tab_btn').attr('title', '메뉴 리스트 열기');
                    $(this).parent('.cms_tab_item').addClass('active');
                    $(this).attr('title', '메뉴 리스트 닫기');
                }
                else{
                    $(this).parent('.cms_tab_item').removeClass('active');
                    $(this).attr('title', '메뉴 리스트 열기');
                }
            });
            // 레이어창 활성화 종료
        });
        // CMS Tab 종료

        // 브레드스크럽 로딩 시작
        var breadcrumbArray = [];
        $('.menu_item.active .menu_link span em').each(function(){
            breadcrumbArray.push($(this).text());
        });
        for(var i=0; i<breadcrumbArray.length; i++){
            $('.breadcrumb_list').append(
                '<div class="breadcrumb_item">'+
                    '<div class="breadcrumb_link">' +
                        '<span>' +
                            '<em>' + breadcrumbArray[i] + '</em>' +
                        '</span>' +
                    '</div>    <!--//breadcrumb_link-->' +
                '</div>    <!--//breadcrumb_item-->'
            );
        }
        // 브레드스크럽 로딩 종료

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);