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

        //퀵메뉴 스크립트 시작
        $('.oc_quick_menu .quick_wrap').navScroll({
            mobileDropdown: false,
            mobileBreakpoint: 1001,
            scrollTime: 150,
            scrollSpy: true,
            activeParent: true,
            navHeight:'82'
        });
        $window.on('scroll', function(){
            var $this = $(this),
                WindowScrollTop = $this.scrollTop(),
                WindowScrollBottom = WindowScrollTop + $window.height(),
                $OcQuickMenu = $('.oc_quick_menu'),
                $Footer = $('#footer'),
                FooterTop = $Footer.offset().top;
            setTimeout(function(){
                if(WindowScrollBottom >= FooterTop+208){
                    $OcQuickMenu.addClass('active');
                }
                else{
                    $OcQuickMenu.removeClass('active');
                }
            }, 0.001);
        });
        //퀵메뉴 스크립트 끝

        //디데이 날짜 구하기 시작
        function VisualCounter(){
            var Dday = new Date("Aug 25, 2022").getTime(), //디데이
                NowTime = new Date(), //현재 날짜 가져오기
                Distance = Dday - NowTime,
                LimitDay = Math.floor(Distance / (1000 * 60 * 60 * 24)),
                RealDay = LimitDay+1;
            $('.main_visual .count_time .d_day').empty().html(Math.abs(RealDay));
            $('.main_visual .count_time .d_day').attr('data-count', Math.abs(RealDay));
            if(LimitDay > -1){
                $('.main_visual .count_time').addClass('prev');
                $('.main_visual .count_time .plus_minus').empty().html('D -');
                $('.main_visual .count_time .top_inner .text').empty().html('대회 개최까지 남은시간');
            }
            else if(LimitDay === -1){
                $('.main_visual .count_time').addClass('today');
                $('.main_visual .count_time .plus_minus').empty().html('D -');
                $('.main_visual .count_time .top_inner .text').empty().html('도민체전의 성공적인 개최를 기원합니다!');
            }
            else{
                $('.main_visual .count_time').addClass('next');
                $('.main_visual .count_time .plus_minus').empty().html('D +');
                $('.main_visual .count_time .top_inner .text').empty().html('충북도민체전 대회 '+Math.abs(RealDay)+'일차');
            }
        }
        VisualCounter();
        //디데이 구하기 끝
        //디데이 날짜 카운팅 효과 시작
        $('.count_time .d_day').each(function(){
            var $this = $(this),
                end = $this.attr('data-count');
            setTimeout(function(){
                $({start:0}).animate({
                    start : end
                },{
                    duration:1200,
                    step : function(){
                        if(end < 10){
                            $this.text('0'+Math.floor(this.start));
                        }
                        else{
                            $this.text(Math.floor(this.start));
                        }
                    },
                    complete : function(){
                        if(end < 10){
                            $this.text('0'+this.start);
                        }
                        else{
                            $this.text(this.start);
                        }
                    }
                });
            }, 1600);
        });
        //디데이 날짜 카운팅 효과 끝

        //경기정보 슬라이드 시작
        var $InfoSlideList = $('.info .info_wrap .info_slide_wrap .info_slide_list');
        $InfoSlideList.slick({
            autoplay : true,
            dots : false,
            arrows : false,
            slidesToShow : 1,
            slidesToScroll : 1,
            infinite : false,
            swipe : false,
            swipeToSlide : false,
            draggable : false,
            rows : 4, //여러줄
            slidesPerRow : 7, //여러줄 일 때 한줄의 몇개 출력
            variableWidth : true, //width를 css로 제어
            responsive: [{
                breakpoint : 1001,
                settings : {
                    arrows : true,
                    rows : 2, //여러줄
                    slidesPerRow : 6, //여러줄 일 때 한줄의 몇개 출력
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    infinite: true
                }
            },{
                breakpoint : 641,
                settings : {
                    arrows : true,
                    rows : 2, //여러줄
                    slidesPerRow : 3, //여러줄 일 때 한줄의 몇개 출력
                    swipe : true,
                    swipeToSlide : true,
                    draggable : true,
                    infinite: true
                }
            }]
        });
        //경기정보 슬라이드 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);