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
                IsActive = $this.is('.active');
            if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                if ($this.hasClass('depth1_item')) {
                    if ($this.hasClass('active')) {
                        $html.removeClass('side_open');
                    } else {
                        $html.addClass('side_open');
                    }
                }
                if ($this.children('.depth').length) {
                    var $Depth = $this.children('.depth'),
                        DepthDisplay = $Depth.css('display');
                    if (DepthDisplay !== 'none') {//하위메뉴가 display:none이 아니면 실행
                        if (!IsActive) {
                            $this.removeClass('active_prev active_next');
                            $this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next').children('.depth_text').attr('title', '하위메뉴 열기');
                            $this.prev('.depth_item').addClass('active_prev');
                            $this.next('.depth_item').addClass('active_next');
                            $this.children('.depth_text').attr('title', '하위메뉴 닫기');
                        } else {
                            $this.removeClass('active');
                            $this.siblings('.depth_item').removeClass('active_prev active_next');
                            $this.children('.depth_text').attr('title', '하위메뉴 열기');
                        }
                        event.preventDefault();
                    }
                }
            }
            event.stopPropagation();
        });
        $sideDepthItem.each(function (index, element) {
            var $element = $(element);
            if ($element.children('.depth').length) {
                $element.addClass('has').children('.depth_text').attr('title', '하위메뉴 열기');
            } else {
                $element.addClass('solo');
            }
        });

        if ($sideSpy.length) {
            $html.addClass('side_open');
            $sideSpy.parents('.depth_item').addClass('active');
            $sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
            $sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
            $side.find('.spy').each(function (index, element) {
                var $this = $(this);
                if ($this.siblings('.depth').length) {
                    $this.attr('title', '하위메뉴 닫기');
                }
                //
                $('.side .side_menu .menu .depth1 .depth1_list .depth1_item.has').find('.depth2').slideUp();
                $this.parents('.depth1_item.has').find('.depth1_text').attr('title', '하위메뉴 닫기');
                $this.parents('.depth1_item.has').find('.depth1_text').siblings('.depth2').slideDown();
            });
        }

        //여기서부터 코드 작성해주세요

        //사이드 메뉴 UI/UX(와이드) 커스텀 시작
        //와이드 2차 클릭시 3차 슬라이드 동작
        $('.side .side_menu .menu .depth1 .depth1_list .depth1_item.has .depth1_text').on('click', function (e) {
            if ($('body').attr('data-mobile-lnb-slide') === 'Y') {
                if (!($(this).parent('.depth1_item.has').is('.active'))) {
                    e.preventDefault();
                    $('.side .side_menu .menu .depth1 .depth1_list .depth1_item.has').find('.depth1_text').attr('title', '하위메뉴 열기');
                    $('.side .side_menu .menu .depth1 .depth1_list .depth1_item.has').find('.depth2').slideUp();
                    $(this).attr('title', '하위메뉴 닫기');
                    $(this).siblings('.depth2').slideDown();
                }
                else{
                    $(this).siblings('.depth2').slideUp();
                }
            }
        });
        //사이드 메뉴 UI/UX(와이드) 커스텀 종료
    });
})(jQuery);