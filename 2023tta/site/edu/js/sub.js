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

        //공유하기 시작
        $('.add_box .add_item.share button.share_btn').on('click', function(){
            var $this = $(this),
                $MyItem = $this.parent('.add_item.share'),
                IsActive = $MyItem.is('.active'),
                $ShareList = $this.siblings('.share_list');
            if(!IsActive){
                $MyItem.addClass('active');
                $this.attr('공유리스트 닫기');
                $ShareList.slideDown(200, 'linear');
            }
            else{
                $MyItem.removeClass('active');
                $this.attr('공유리스트 열기');
                $ShareList.slideUp(200, 'linear');
            }
        });
        //공유하기 끝

        //링크복사 시작
        function UrlCopy(url){
            var $CopyTemp = $('<input>');
            $('body').append($CopyTemp);
            $CopyTemp.val(url).select();
            document.execCommand('copy');
            $CopyTemp.remove();
            alert('URL이 복사되었습니다.');
        }
        $(document).on('click', '.add_box .share_list .share_item.copy a.share_link', function(e){
            e.preventDefault();
            var link = location.href;
            UrlCopy(link);
        });
        //링크복사 끝

        //CMS 3차 메뉴 개수 파악 시작
        var $CmsDepth3 = $('.cms_depth3');
        $CmsDepth3.each(function(){
            var $this = $(this),
                $CmsDepth3List = $this.find('.cms_depth3_list'),
                $CmsDepth3Item = $CmsDepth3List.find('.cms_depth3_item'),
                CmsDepth3ItemLength = $CmsDepth3Item.length;
            $this.addClass('cms_divide'+CmsDepth3ItemLength+'');
        });
        //CMS 3차 메뉴 개수 파악 끝

        //반응형 테이블 시작
        $('table.table.responsive').not($('.prettyprint').children()).each(function () {
            var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
                TheadExist = $(this).find('thead').length;
            if ((RowSpanExist == false) && (TheadExist != 0)) {//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
                $(this).children('tbody').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
                $(this).children('tfoot').children('tr').find('th, td').each(function () {
                    var ThisIndex = $(this).index(),
                        TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
                    $(this).attr('data-content', TheadText);
                });
            };
        });
        //반응형 테이블 끝

        //2024. 1. 19. cms_depth2 의 depth2_nav 추가 시작
        var $Depth2Nav = $('.cms_depth2 .depth2_nav');
        $Depth2Nav.each(function(){
            var $this = $(this),
                $Depth2NavList = $this.find('.depth2_nav_list'),
                $Depth2NavItem = $Depth2NavList.find('.depth2_nav_item'),
                Depth2NavItemLength = $Depth2NavItem.length;
            $('.cms_depth2').addClass('nav_divide'+Depth2NavItemLength+'');

            $Depth2NavItem.each(function(){
                var $thisItem = $(this),
                    $thisLinkText = $thisItem.find('.depth2_nav_text');
                if($thisItem.is('.has')){
                    $thisLinkText.on('click', function(){
                        var $thisLink = $(this),
                            $MyParent = $thisLink.parent('.depth2_nav_item'),
                            IsActive = $MyParent.is('.active'),
                            $MyDepth3Nav = $MyParent.find('.depth3_nav'),
                            $OtherParent = $MyParent.siblings('.depth2_nav_item'),
                            $OtherDepth3Nav = $OtherParent.find('.depth3_nav');
                        if(!IsActive){
                            $OtherParent.removeClass('active');
                            $OtherDepth3Nav.slideUp(200, 'linear');
                            $MyParent.addClass('active');
                            $MyDepth3Nav.slideDown(200, 'linear');
                        }
                        else{
                            $MyParent.removeClass('active');
                            $MyDepth3Nav.slideUp(200, 'linear');
                        }
                    });
                }
            });
        });
        //2024. 1. 19. cms_depth2 의 depth2_nav 추가 끝

        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);