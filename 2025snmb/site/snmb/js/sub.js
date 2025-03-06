//컨텐츠 영역 프린트 함수(마크업 onclick 직접사용) 시작
function printURL() {
    // 프린트 할 영역 선언
    var $printSubHead = $('.sub_head');
    var $printContents = $('#contents');

    // 프린트 할 영역 css 선언 위함
    var $head = $('head').clone();

    // 프린트 할 영역 복사
    var $PrintSubHeadClone = $printSubHead.clone();
    var $PrintContentsClone = $printContents.clone();

    // html 변환
    var headHtml = $head[0].innerHTML;
    var PrintSubHeadHtml = $PrintSubHeadClone[0].innerHTML;
    var PrintContentsHtml = $PrintContentsClone[0].innerHTML;
    console.log(PrintContentsHtml);

    // 새창 브라우저 너비 , 높이 ,가운데 위치 값 선언
    // ( ★주의★ 모니터 두개 이상 사용시 메인 모니터 에서만 가운데 정렬 됨 )
    var printWindowWidth = 1000;
    var printWindowHeight = 700;
    var printWindowTop = (window.screen.height / 2) - (printWindowHeight / 2);
    var printWindowLeft = (window.screen.width / 2) - (printWindowWidth / 2);

    // 새창으로 띄울 브라우저 변수에 담은 후 너비 , 높이 , 가운데 위치 값 지정
    var printWindow = window.open("/", "_blank", 'width=' + printWindowWidth + ', height=' + printWindowHeight + ', top=' + printWindowTop + ', left=' + printWindowLeft + '');

    // 새창으로 띄울 브라우저 문서 doctype 작성
    printWindow.document.write(
        '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        headHtml +
        '</head>' +
        '<body id="body" class="print_body">' +
        '<div class="sub_head">'+
        PrintSubHeadHtml +
        '</div>'+
        '<div id="contents">'+
        PrintContentsHtml +
        '</div>'+
        '</body>' +
        '</html>'
    );
    printWindow.focus();
    setTimeout(function () {
        printWindow.print();
        //printWindow.close();
    }, 1000);
}
//컨텐츠 영역 프린트 함수(마크업 onclick 직접사용) 끝

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
                } else {
                    $(this).siblings('.depth2').slideUp();
                }
            }
        });
        //와이드 4차메뉴 상단 3차메뉴 렌더링
        $('.side .side_menu .menu .depth2 .depth2_list .depth2_item .depth2_text').each(function () {
            if ($(this)) {
                var $thisClone = $(this).clone();
                $(this).siblings('.depth3').prepend($thisClone.removeClass('depth_text depth2_text').addClass('depth2_link').attr('title', '이전메뉴 보기'));
            }
        });
        //와이드 3차메뉴 클릭시 포커스
        $('.side .side_menu .menu .depth2 .depth2_list .depth2_item.has .depth2_text').on('click', function () {
            if ($(this).parent('.depth2_item').find('.spy')) {
                $('.side .side_menu .menu').find('.depth1_item').addClass('visible_none');
                $('.side .side_menu .menu').find('.depth2_item').addClass('visible_none');
            }
            var $depth2Link = $(this).siblings('.depth3').find('.depth2_link');
            setTimeout(function () {
                $depth2Link.focus();
            }, 500);
        });
        //와이드 4차메뉴 상단 3차메뉴 클릭
        $('.side .side_menu .menu .depth3 .depth2_link').on('click', function (e) {
            e.preventDefault();
            $('.side .side_menu .menu').find('.visible_none').removeClass('visible_none');
            $(this).parent('.depth3').siblings('.depth2_text').parent('.depth2_item.has').removeClass('active');
            $(this).parent('.depth3').siblings('.depth2_text').attr('title', '하위메뉴 열기');
            var $depth2TextFocus = $(this).parent('.depth3').siblings('.depth2_text');
            setTimeout(function () {
                $depth2TextFocus.focus();
            }, 500);
        });
        //와이드 4차메뉴 spy 있을 시
        var $loadingSpy = $('.side .side_menu .menu').find('.spy:last');
        if ($loadingSpy.hasClass('depth3_text')) {
            $loadingSpy.parents('.depth1').find('.depth1_item').addClass('visible_none');
            $loadingSpy.parents('.depth2').find('.depth2_item').addClass('visible_none');
        }
        //사이드 메뉴 UI/UX(와이드) 커스텀 종료

        //현재 URL 복사 시작
        function UrlCopy(url) {
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(url).select();
            document.execCommand('copy');
            $temp.remove();
            alert('현재 URL이 복사되었습니다.');
        }

        $('.url_link').on('click', function (e) {
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        //현재 URL 복사 종료

        //공유하기 레이어 열기 시작
        $('.share_link').on('click', function (e) {
            e.preventDefault();
            if (!($(this).parent('.share_etc').is('.active'))) {
                $(this).attr('title', '공유하기 리스트 열림');
                $(this).parent('.share_etc').addClass('active');
            } else {
                $(this).attr('title', '공유하기 리스트 열기');
                $(this).parent('.share_etc').removeClass('active');
            }
        });
        $(document).on('click', '.list_layer .share_close', function (e) {
            e.preventDefault();
            $('.share_link').attr('title', '공유하기 리스트 열기');
            $('.share_link').focus();
            $(this).parents('.share_etc').removeClass('active');
        });
        $(document).on('keydown', '.share_list .share_item:last-child .share_in_link', function (key) {
            if (key.keyCode == 9) {
                if (key.shiftKey) {

                } else {
                    setTimeout(function () {
                        $('.list_layer .share_close').focus();
                    }, 1);
                }
            }
        });
        //공유하기 레이어 열기 종료

    });
})(jQuery);