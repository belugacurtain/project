//컨텐츠 영역 프린트 함수(마크업 onclick 직접사용) 시작
function publicPrint(){
    // 프린트 할 영역 선언
    var $printContents = $('#contents');

    // 프린트 할 영역 css 선언 위함
    var $head = $('head').clone();

    // 프린트 할 영역 복사
    var $PrintContentsClone = $printContents.clone();

    // html 변환
    var headHtml = $head[0].innerHTML;
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
        PrintContentsHtml +
        '</body>' +
        '</html>'
    );
    printWindow.focus();
    setTimeout(function(){
        printWindow.print();
        printWindow.close();
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

        // CMS 탭메뉴 시작
        $('.sub_head .temp_tab_box button.temp_tab_btn').on('click', function(){
            if( !($(this).parent('.temp_tab_item').is('.active'))){
                $(this).parent('.temp_tab_item').addClass('active');
                $(this).attr('title', '하위메뉴 닫기');
            }
            else{
                $(this).parent('.temp_tab_item').removeClass('active');
                $(this).attr('title', '하위메뉴 열기');
            }
        });
        // CMS 탭메뉴 종료
        
        // fixed 메뉴 시작
        
        // 공유하기
        $('.share_type button.fix_btn').on('click', function(){
            if(!($(this).parent('.share_type').is('.active'))){
                $(this).parent('.share_type').addClass('active');
            }
        });
        $('.share_type button.share_layer_close').on('click', function(){
            if(($(this).parents('.share_type').is('.active'))){
                $(this).parents('.share_type').removeClass('active');
            }
        });

        // 인쇄하기
        $('.print_type button.fix_btn').on('click', function(){
            publicPrint();
        });

        // 위로가기
        $('.top_type button.fix_btn').on('click', function() {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 400);
        });

        // 주소복사
        function UrlCopy(url){
            var $temp = $('<input>');
            $('body').append($temp);
            $temp.val(url).select();
            document.execCommand('copy');
            $temp.remove();
            alert('현재 URL이 복사되었습니다.');
        }
        $('.copy a').on('click', function(e){
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        // fixed 메뉴 종료

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);