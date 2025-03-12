// 탭메뉴 공통적으로 사용
function tabOn(tab, num, img) {
    var $tab, $tab_btn;
    var tabid = tab, n = num - 1, btn_img = img;

    $tab = $(tabid + '> ul > li');
    $tab_btn = $(tabid + '> ul > li > a');

    $tab_btn.siblings().hide();
    $tab.eq(n).addClass('active');
    $tab.eq(n).children('a').siblings().show();

    if (btn_img == 'img') {
        var btn = $tab.eq(n).children('a').find("img");
        btn.attr("src", btn.attr("src").replace("_off", "_on"));
    }

    $tab_btn.on("click", function (event) {
        var realTarget = $(this).attr('href');

        if (realTarget != "#") {
            return
        }
        if (btn_img == 'img') {
            for (var i = 0; i < $tab.size(); i++) {
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src", btn.attr("src").replace("_on", "_off"));
            }
            var active = $(this).parent().attr('class');
            if (active != 'active') {
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src = btn_img_off.src.replace('_off', '_on');
            }
        }
        $tab_btn.siblings().hide();
        $tab_btn.parent().removeClass('active');

        $(this).siblings().show();
        $(this).parent().addClass('active');

        event.preventDefault();
    });
}

function tabOrg(tabid, a, img) {
    var $tab, $tab_btn, $obj, $obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid + ' .tab_item  > li');
    $tab_btn = $(tabid + ' .tab_item > li > a');
    $obj = $(tabid + ' .tab_obj');
    $obj_view = $(tabid + ' .tab_obj.n' + num);

    $tab.eq(num - 1).addClass('active');
    $obj_view.show();

    if (btn_img == 'img') {
        var btn = $tab.eq(num - 1).children('a').find("img");
        btn.attr("src", btn.attr("src").replace("_off", "_on"));
    }

    $tab.bind("click", function (event) {
        if (btn_img == 'img') {
            for (var i = 0; i < $tab.size(); i++) {
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src", btn.attr("src").replace("_on", "_off"));
            }
            var active = $(this).parent().attr('class');
            if (active != 'active') {
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src = btn_img_off.src.replace('_off', '_on');
            }
        }

        var this_eq = $tab.index($(this));
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid + ' .tab_obj.n' + (this_eq + 1)).show();

        event.preventDefault();
    });
}

$(function () {
    //이미지 롤오버
    $('.overimg').on('mouseover', function (event) {
        var file = $(this).attr('src').split('/');
        var filename = file[file.length - 1];
        var path = '';
        for (i = 0; i < file.length - 1; i++) {
            path = (i == 0) ? path + file[i] : path + '/' + file[i];
        }
        $(this).attr('src', path + '/' + filename.replace('_off.', '_on.'));
    }).on('mouseout', function (event) {
        var file = $(this).attr('src').split('/');
        var filename = file[file.length - 1];
        var path = '';
        for (i = 0; i < file.length - 1; i++) {
            path = (i == 0) ? path + file[i] : path + '/' + file[i];
        }
        $(this).attr('src', path + '/' + filename.replace('_on.', '_off.'));
    });
});

(function ($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    //브라우저
    var _browser = navigator.userAgent.toLowerCase();
    //ie7일 때
    if (_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie ie7';
        //ie8일 때
    } else if (_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie ie8';
        //ie9일 때
    } else if (_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie ie9';
        //ie10일 때
    } else if (_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie ie10';
        //ie11일 때
    } else if (_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie ie11';
        //edge일 때
    } else if (_browser.indexOf('edge') > -1) {
        _browser = 'edge MS';
    } else if (_browser.indexOf('edg/') > -1) {
        _browser = 'edge chromium_based';
        //opera일 때
    } else if (_browser.indexOf('opr') > -1) {
        _browser = 'opera';
        //chrome일 때
    } else if (_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';
        //firefox일 때
    } else if (_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';
        //safari일 때
    } else if (_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    } else {
        _browser = 'unknown';
    }
    //브라우저 클래스 추가
    window.getBrowser = function () {
        return _browser;
    };
    $html.addClass(_browser);

    //iPhone 여부 확인
    if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
        $html.addClass('iphone');
    }

    //화면 사이즈 리사이징 구간 지정 시작
    $document.on('ready', function (event) {
        $screen({
            state: [{
                name: 'wide',
                horizontal: {
                    from: 9999,
                    to: 1281
                }
            }, {
                name: 'web',
                horizontal: {
                    from: 1280,
                    to: 1001
                }
            }, {
                name: 'tablet',
                horizontal: {
                    from: 1000,
                    to: 641
                }
            }, {
                name: 'phone',
                horizontal: {
                    from: 640,
                    to: 0
                }
            }]
        });
    });
    //화면 사이즈 리사이징 구간 지정 종료

    $(function () {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');

        $window.on('screen:wide screen:web', function (event) {
            window.mode = 'pc';
        });
        $window.on('screen:tablet screen:phone', function (event) {
            window.mode = 'mobile';
        });

        //lnb 시작
        var $lnb = $header.find('.lnb'),
            $lnbShow = $header.find('.menu_show'),
            $lnbShowBtn = $lnbShow.find('.menu_button'),
            $lnbHide = $lnb.find('.menu_hide'),
            $lnbHideBtn = $lnbHide.find('.menu_button'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbDepth1Item = $lnb.find('.depth1_item'),
            $lnbDepth1Text = $lnb.find('.depth1_text'),
            $lnbDepth2Text = $lnb.find('.depth2_text'),
            $lnbMenu = $lnb.find('.menu'),
            IsMouse = $lnbMenu.is('.mouse'),
            IsClick = $lnbMenu.is('.click'),
            IsMouseleave = $lnbMenu.is('.mouseleave'),
            $lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            $lnbSpy = $lnbMenu.find('.spy:last'),
            lnbHeight;

        if (!$lnb.find('.depth2').length) {
            $header.attr('data-depth', 'none');
        }

        if (IsClick) {
            $lnbMenu.find('.depth1_text').attr('title', '하위메뉴열기');
        }

        function refreshLnbHeight() {
            $lnbMenu.height('');
            lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';
            $lnbMenu.css('transition-property', '');
        }

        $lnbShowBtn.on('click', function (event) {
            //클래스 토글
            $html.toggleClass('lnb_show');
        });

        $lnbHideBtn.on('click', function (event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });

        $('.lnb_curtain button').on('click', function (event) {
            if (mode === 'mobile') {
                $html.removeClass('lnb_show');
            } else {
                closeMenu();
            }
        });

        function closeMenu() {
            //메뉴닫기
            $lnbMenu.height('');
            $html.removeClass('lnb_open');
            $lnbDepthItem.removeClass('active active_prev active_next');
            $lnbDepth1Text.each(function () {
                if (!$(this).parent('.solo').length) {
                    $(this).attr('title', '하위메뉴열기');
                }
            });
            $lnbDepth2Text.each(function () {
                if (!$(this).parent('.solo').length) {
                    $(this).attr('title', '하위메뉴열기');
                }
            });
        }

        $lnbDepthItem.on('mouseover focusin', function (event) {
            if (mode === 'pc') {
                if (IsMouse) {
                    var $this = $(this),
                        $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');
                    if (!$header.is('[data-depth="none"]')) {
                        if ($lnbMenu.hasClass('pulldown')) {
                            var maxHeight = 0;
                            $lnbDepth2FirstChild.each(function (index, element) {
                                var $element = $(element),
                                    outerHeight = $element.outerHeight() || 0;
                                //기존 값 보다 얻은 값이 초과일 때
                                if (outerHeight > maxHeight) {
                                    maxHeight = outerHeight;
                                }
                            });
                            $lnbMenu.height(lnbHeight + maxHeight);
                        } else if ($lnbMenu.hasClass('eachdown')) {
                            $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight() || ''));
                        }
                    }
                    $html.addClass('lnb_open');
                    $lnbDepthItem.removeClass('active active_prev active_next');
                    $this.addClass('active');
                    $this.prev('.depth_item').addClass('active_prev');
                    $this.next('.depth_item').addClass('active_next');
                    $this.parents('li').addClass('active');
                    $this.parents('li').prev('.depth_item').addClass('active_prev');
                    $this.parents('li').next('.depth_item').addClass('active_next');
                }
            }
            event.stopPropagation();
        });

        $lnbDepthItem.on('click', function (event) {
            if (mode === 'pc') {
                if (IsClick) {
                    var $this = $(this),
                        IsDepth1 = $this.is('.depth1_item'),
                        IsActive = $this.is('.active'),
                        IsHas = $this.is('.has'),
                        $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item'),
                        $depth1Text = $this.find('.depth1_text'),
                        $OtherItems = $depth1Item.siblings('.depth1_item'),
                        $OtherTexts = $OtherItems.find('.depth1_text');
                    if (IsDepth1 && IsHas) {
                        if (!IsActive) {
                            if (!$header.is('[data-depth="none"]')) {
                                if ($lnbMenu.hasClass('pulldown')) {
                                    var maxHeight = 0;

                                    $lnbDepth2FirstChild.each(function (index, element) {
                                        var $element = $(element),
                                            outerHeight = $element.outerHeight() || 0;

                                        //기존 값 보다 얻은 값이 초과일 때
                                        if (outerHeight > maxHeight) {
                                            maxHeight = outerHeight;
                                        }
                                    });

                                    $lnbMenu.height(lnbHeight + maxHeight);
                                } else if ($lnbMenu.hasClass('eachdown')) {
                                    $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight() || ''));
                                }
                            }
                            $html.addClass('lnb_open');
                            $lnbDepthItem.removeClass('active active_prev active_next');
                            $this.addClass('active');
                            $this.prev('.depth_item').addClass('active_prev');
                            $this.next('.depth_item').addClass('active_next');
                            $this.parents('li').addClass('active');
                            $this.parents('li').prev('.depth_item').addClass('active_prev');
                            $this.parents('li').next('.depth_item').addClass('active_next');
                            $OtherTexts.each(function () {
                                if (!$(this).parent('.solo').length) {
                                    $(this).attr('title', '하위메뉴열기');
                                }
                            });
                            $depth1Text.each(function () {
                                if (!$(this).parent('.solo').length) {
                                    $(this).attr('title', '하위메뉴닫기');
                                }
                            });
                            //2차메뉴 부분 시작
                            $this.siblings('.depth1_item').find('.depth2_item').removeClass('active');
                            $this.find('.depth2_item.has').find('.depth2_text').attr('title', '하위메뉴열기');
                            setTimeout(function () {
                                $this.find('.depth2_item:first-child').click();
                                $this.find('.depth2_item.solo:first-child').addClass('active');
                            }, 1);
                            $this.find('.depth2_item.has').on('click', function (event) {
                                if (!($(this).is('.active'))) {
                                    $this.find('.depth2_item').removeClass('active');
                                    $this.find('.depth2_item.has .depth2_text').attr('title', '하위메뉴열기');
                                    $(this).addClass('active');
                                    $(this).find('.depth2_text').attr('title', '하위메뉴열림');
                                    event.preventDefault();
                                } else {
                                    event.preventDefault();
                                }
                            });
                            //2차메뉴 부분 종료
                        } else if (IsActive) {
                            closeMenu();
                        }
                        event.preventDefault();
                    }
                }
            }
            if (mode === 'mobile') {
                var $this = $(this),
                    $depthText = $this.children('.depth_text'),
                    eventTarget = event.target,
                    IsActive = $this.is('.active');
                if ($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if ($this.hasClass('depth1_item')) {
                        if ($this.hasClass('active')) {
                            $html.removeClass('lnb_open');
                        } else {
                            $html.addClass('lnb_open');
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
            }
            event.stopPropagation();
        });

        $lnbDepthItem.each(function (index, element) {
            var $element = $(element);
            if ($element.children('.depth').find('>.depth_list > .depth_item').length) {
                $element.addClass('has');
            } else {
                $element.addClass('solo');
                if ($element.is('.solo')) {
                    $element.find('.depth1_text').removeAttr('title');
                    if ($element.find('.depth1_text').attr('target') === '_blank') {
                        $element.find('.depth1_text').attr('title', '새창');
                    }
                }
            }
        });

        $lnbMenu.on('mouseleave', function (event) {
            if (mode === 'pc') {
                if (IsMouse || IsMouseleave) {
                    closeMenu();
                }
            }
        });

        var $Depth1ItemLast = $lnb.find('.depth1_item:last-child'),
            Depth1ItemIsSolo = $Depth1ItemLast.is('.solo');

        if (IsMouse) {
            if (Depth1ItemIsSolo) {
                $Depth1ItemLast.find('>.depth_text').on('focusout', function (event) {
                    if (mode === 'pc') {
                        closeMenu();
                    }
                });
            } else {
                var $Depth2ItemLast = $Depth1ItemLast.find('.depth2_item:last-child'),
                    Depth2ItemIsSolo = $Depth2ItemLast.is('.solo');
                if (Depth2ItemIsSolo) {
                    $Depth2ItemLast.find('>.depth_text').on('focusout', function (event) {
                        if (mode === 'pc') {
                            closeMenu();
                        }
                    });
                } else {
                    $lnb.find('.depth1_item:last-child .depth:visible:last').find('> .depth_list > .depth_item:last-child .depth_text').on('focusout', function (event) {
                        if (mode === 'pc') {
                            closeMenu();
                        }
                    });
                }
            }
        } else if (IsClick) {
            $lnbDepth1Item.each(function (index, element) {
                var $this = $(this),
                    $Depth2ItemLast = $this.find('.depth2_item:last-child'),
                    Depth2ItemIsSolo = $Depth2ItemLast.is('.solo');
                if (Depth2ItemIsSolo) {
                    $Depth2ItemLast.find('>.depth_text').keydown(function (key) {
                        if (mode === 'pc') {
                            if (key.keyCode == 9) {
                                if (key.shiftKey) {

                                } else {
                                    closeMenu();
                                }
                            }
                        }
                    });
                } else {
                    $Depth2ItemLast.find('>.depth_text:visible:last').keydown(function (key) {
                        if (!($Depth2ItemLast.is('.active'))) {
                            if (mode === 'pc') {
                                if (key.keyCode == 9) {
                                    if (key.shiftKey) {

                                    } else {
                                        closeMenu();
                                    }
                                }
                            }
                        }
                    });
                    $Depth2ItemLast.find('.depth:visible:last').find('> .depth_list > .depth_item:last-child .depth_text').keydown(function (key) {
                        if (mode === 'pc') {
                            if (key.keyCode == 9) {
                                if (key.shiftKey) {

                                } else {
                                    closeMenu();
                                }
                            }
                        }
                    });
                }
            });
        }
        //lnb 종료

        //화면 사이즈 리사이징 구간 LNB 변화 시작
        $window.on('screen:wide screen:web', function (event) {
            refreshLnbHeight();
            if ($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
                $lnbDepthItem.removeClass('active_prev active_next');
                //
                $lnbSpy.parents('.depth_item').removeClass('slide_on');
                $('.depth3').removeAttr('style');
            }
        });
        $window.on('screen:tablet screen:phone', function (event) {
            refreshLnbHeight();
            if ($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
                $lnbSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
                $lnbSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
                //
                $lnbSpy.parents('.depth1').find('.depth_item').removeClass('slide_on');
                $lnbSpy.parents('.depth3').siblings('.depth2_text').parent('.depth2_item').addClass('slide_on');
                $lnbSpy.parents('.depth3').slideDown();
            }
        });
        //화면 사이즈 리사이징 구간 LNB 변화 종료

        //여기서부터 코드 작성해주세요

        //상단 정부 UI/UX(와이드,모바일) LNB 커스텀 시작
        //와이드 1차메뉴 첫번째 포커스 처리 동작
        $('.lnb .menu .depth1 .depth1_list .depth1_item:first-child .depth1_text').keydown(function (key) {
            if (key.keyCode == 9) {
                if (key.shiftKey) {
                    closeMenu();
                }
            }
        });
        //와이드 3차메뉴 상단 2차메뉴 렌더링
        $('.lnb .menu .depth2 .depth2_list .depth2_item .depth2_text').each(function () {
            if ($(this)) {
                var $thisClone = $(this).clone();
                $(this).siblings('.depth3').prepend($thisClone.removeClass('depth_text depth2_text').addClass('depth2_link'));
            }
        });
        $('.lnb .menu .depth3 .depth2_link').on('click', function () {
            location.href = this.href;
        });
        //모바일 1차메뉴 좌측 앵커 렌더링
        $('.lnb .menu .depth1').prepend('<div class="left_depth1"><ul class="left_depth1_list"></ul></div>');
        for (var i = 1; i <= $('.lnb .menu .depth1 .depth1_list .depth1_item').length; i++) {
            $('.left_depth1 .left_depth1_list').append($('.lnb .menu .depth1 .depth1_list .depth1_item:nth-child(' + i + ')').clone().removeClass('depth_item depth1_item').addClass('left_depth1_item'));
        }
        $('.left_depth1 .left_depth1_list .left_depth1_item').find('.depth1_text').removeClass('depth_text depth1_text').addClass('left_depth1_text');
        $('.left_depth1 .left_depth1_list .left_depth1_item').find('.depth2').remove();
        //모바일 1차메뉴 좌측 앵커 동작
        $('.left_depth1 .left_depth1_list .left_depth1_item .left_depth1_text').each(function () {
            if ($(this).parent('.left_depth1_item').is('.has')) {
                $(this).attr('href', '#anchor_' + $(this).parent('.left_depth1_item').index() + '');
                $('.lnb .menu .depth1 .depth1_list .depth1_item').eq($(this).parent('.left_depth1_item').index()).attr('id', 'anchor_' + $(this).parent('.left_depth1_item').index() + '');
            }
        });
        $('.left_depth1 .left_depth1_list .left_depth1_item .left_depth1_text').on('click', function (e) {
            $('.left_depth1 .left_depth1_list .left_depth1_item').removeClass('active');
            $(this).parent('.left_depth1_item').addClass('active');
        })
        $('.menu_show button.menu_button').on('click', function () {
            if (mode === 'mobile') {
                var $spyLastItem = $('.lnb .menu').find('.spy:last').parents('.depth1_item'),
                    clickIndex = $spyLastItem.index();
                if ($spyLastItem.is('.solo')) {
                    var $targetItem = $('.lnb .menu .left_depth1 .left_depth1_list .left_depth1_item').eq(clickIndex);
                    var $targetText = $targetItem.find('.left_depth1_text');
                    if ($targetText.length) {
                        // 비동기 로딩 문제 해결을 위해 setTimeout 사용
                        setTimeout(function () {
                            $targetItem.addClass('active'); // active 클래스 추가
                        }, 1);
                    }
                }
                if ($spyLastItem.is('.has')) {
                    var $targetItem = $('.lnb .menu .left_depth1 .left_depth1_list .left_depth1_item').eq(clickIndex);
                    var $targetText = $targetItem.find('.left_depth1_text');
                    if ($targetText.length) {
                        // 비동기 로딩 문제 해결을 위해 setTimeout 사용
                        setTimeout(function () {
                            $targetItem.addClass('active'); // active 클래스 추가
                            $targetText.get(0).click();
                        }, 1);
                    }
                }
            }
        });
        $('.lnb .menu').on('scroll', function () {
            var thisScrollTop = $(this).scrollTop();
            var $depthList = $(this).find('.depth1_list');
            if (mode === 'mobile') {
                $depthList.find('.depth1_item').each(function () {
                    if (thisScrollTop >= $(this).offset().top) {
                        $('.left_depth1_item').removeClass('scroll_active');
                        $('.left_depth1_item').eq($(this).index()).addClass('scroll_active');
                    }
                });
            }
        });
        //모바일 2차 클릭시 3차 슬라이드 동작
        $('.lnb .menu .depth2 .depth2_list .depth2_item.has .depth2_text').on('click', function (e) {
            if ($body.attr('data-mobile-lnb-slide') === 'Y') {
                if (mode === 'mobile') {
                    if (!($(this).parent('.depth2_item.has').is('.slide_on'))) {
                        e.preventDefault();
                        $(this).parent('.depth2_item.has').addClass('slide_on');
                        $(this).siblings('.depth3').slideDown();
                    } else {
                        e.preventDefault();
                        $(this).parent('.depth2_item.has').removeClass('slide_on');
                        $(this).siblings('.depth3').slideUp();
                    }
                }
            }
        });
        //모바일 3차메뉴 클릭시 4차메뉴 동작
        $('.lnb .menu .depth3 .depth3_list .depth3_item.has .depth3_text').on('click', function () {
            if (mode === 'mobile') {
                if ($html.is('.iphone')) {
                    $html.addClass('iphone_ltb');
                }
            }
        });
        $('.menu_show button.menu_button').on('click', function () {
            if (mode === 'mobile') {
                if ($('.depth4').find('.spy:last').length > 0) {
                    if ($('.depth4').find('.spy:last').parent('.depth4_item').parent('.depth4_list').parent('.depth4').parent('.depth3_item').is('.active')) {
                        if ($html.is('.iphone')) {
                            $html.addClass('iphone_ltb');
                        }
                    }
                }
            }
        });
        $('.lnb .menu .depth3 .depth3_list .depth3_item.has .depth3_text').each(function () {
            if ($(this)) {
                var $thisClone = $(this).clone();
                $(this).siblings('.depth4').prepend($thisClone.removeClass('depth_text depth3_text').addClass('depth3_link'));
                $(this).siblings('.depth4').prepend('<div class="top_depth4_btn_box"><button type="button" class="active_close type01">닫기</button><button type="button" class="active_close type02">닫기</button></div>');
            }
        });
        //모바일 4차메뉴 상단 버튼 박스 동작
        $('.top_depth4_btn_box button.active_close').on('click', function () {
            $(this).parent('.top_depth4_btn_box').parent('.depth4').parent('.depth3_item').removeClass('active');
            $(this).parent('.top_depth4_btn_box').parent('.depth4').parent('.depth3_item').find('.depth3_text').focus();
            if ($html.is('.iphone')) {
                $html.removeClass('iphone_ltb');
            }
        });
        //상단 정부 UI/UX(와이드,모바일) LNB 커스텀 종료

        //상단 정부 UI/UX(와이드,모바일) 헤더 scroll 시작
        var lastScrollTop = 0;
        $(window).on('scroll', function () {
            var currentScroll = $(this).scrollTop();
            if (currentScroll > lastScrollTop) {
                if (currentScroll > 0) {
                    $html.addClass('wheel');
                    if (currentScroll > 800) {
                        $html.addClass('add_wheel');
                    }
                }
            } else if (currentScroll < lastScrollTop) {
                $html.removeClass('add_wheel');
                if (currentScroll < $('#container').offset().top + 200) {
                    $html.removeClass('wheel');
                }
            }
            lastScrollTop = currentScroll;
        });
        //상단 정부 UI/UX(와이드,모바일) 헤더 scroll 종료

        //상단 정부 UI/UX(와이드) 화면 크기 시작
        $(document).on('click', '.drop_list li button', function () {
            $('.drop_list li button').removeClass('active').removeAttr('title');
            $(this).addClass('active').attr('title', '선택됨');
            if ($(this).hasClass('xsm')) {
                $body.attr('data-zoom', '0.9');
            }
            if ($(this).hasClass('sm')) {
                $body.attr('data-zoom', '1');
            }
            if ($(this).hasClass('md')) {
                $body.attr('data-zoom', '1.1');
            }
            if ($(this).hasClass('lg')) {
                $body.attr('data-zoom', '1.2');
            }
            if ($(this).hasClass('xlg')) {
                $body.attr('data-zoom', '1.3');
            }
        });
        $(document).on('click', '.drop_btn button', function () {
            $('.drop_list li button').removeClass('active').removeAttr('title');
            $body.attr('data-zoom', '1');
        });
        //상단 정부 UI/UX(와이드) 화면 크기 종료

        //상단 정부 UI/UX(와이드) 드랍 메뉴 시작
        $('.type_drop > button').on('click', function (e) {
            if (!($(this).parent('.type_drop').is('.active'))) {
                $('.type_drop').removeClass('active');
                if ($(this).attr('title') === '화면크기 레이어창 열기') {
                    $(this).attr('title', '화면크기 레이어창 닫기');
                }
                if ($(this).attr('title') === '언어선택 레이어창 열기') {
                    $(this).attr('title', '언어선택 레이어창 닫기');
                }
                $(this).parent('.type_drop').addClass('active');
            } else {
                $('.type_drop').removeClass('active');
                if ($(this).attr('title') === '화면크기 레이어창 닫기') {
                    $(this).attr('title', '화면크기 레이어창 열기');
                }
                if ($(this).attr('title') === '언어선택 레이어창 닫기') {
                    $(this).attr('title', '언어선택 레이어창 열기');
                }
            }
        });
        $('.type_drop').on('focusout', function (e) {
            if ($(this).has(e.relatedTarget).length === 0) {
                $('.type_drop').removeClass('active');
                if ($(this).find('> button').attr('title') === '화면크기 레이어창 닫기') {
                    $(this).find('> button').attr('title', '화면크기 레이어창 열기');
                }
                if ($(this).find('> button').attr('title') === '언어선택 레이어창 닫기') {
                    $(this).find('> button').attr('title', '언어선택 레이어창 열기');
                }
            }
        });
        //상단 정부 UI/UX(와이드) 드랍 메뉴 종료

        //상단 정부 UI/UX(와이드,모바일) 통합검색 레이어 시작
        $(document).on('click', '.gnb button.sch', function () {
            $html.addClass('sch_open');
            $('.sch_layer > button.sch_layer_close:first-child').focus();
            if (($('.sch_layer .sch_wrap .sch_desc').outerHeight() + $('.sch_layer .sch_wrap .sch_form').outerHeight()) > $('.sch_layer .sch_wrap').height()) {
                $('.sch_layer .sch_wrap').attr('tabindex', 0);
            } else {
                $('.sch_layer .sch_wrap').removeAttr('tabindex');
            }
        });
        $(document).on('click', '.sch_layer > button.sch_layer_close', function () {
            $html.removeClass('sch_open');
            $('.sch_layer .sch_wrap').removeAttr('tabindex');
            $('.gnb button.sch').focus();
        });
        //상단 정부 UI/UX(와이드,모바일) 통합검색 레이어 종료

        //상단 정부 UI/UX(와이드,모바일) 통합검색 레이어 input search 닫기버튼 시작
        $('input.sch_input[type="search"]').each(function () {
            var $schInput = $(this);
            $schInput.on('input', function () {
                if ($schInput.val().length > 0) {
                    $schInput.parent('.input_box').addClass('active');
                } else {
                    $schInput.parent('.input_box').removeClass('active');
                }
            });
            $schInput.parent('.input_box').find('button.sch_input_close').on('click', function () {
                $schInput.val('').focus();
                $schInput.parent('.input_box').removeClass('active');
            });
        });
        //상단 정부 UI/UX(와이드,모바일) 통합검색 레이어 input search 닫기버튼 종료

        //하단 정부 UI/UX(와이드,모바일) 모달 레이어 시작
        $('.footer_layer_wrap button.layer_open').on('click', function () {
            $('.footer_layer_wrap').find('.layer_item').removeClass('active');
            $(this).parent('.layer_item').addClass('active');
            var $modalList = $(this).siblings('.modal_list').clone();
            $wrapper.after('<div class="modal_layer"><button type="button" class="modal_layer_close start">닫기</button><div class="modal_wrap"><div class="modal_title">' + $(this).text() + '</div></div><button type="button" class="modal_layer_close end">닫기</button></div>');
            $html.addClass('modal_open');
            setTimeout(function () {
                if (($('.modal_layer .modal_wrap .modal_list').outerHeight() + $('.modal_layer .modal_wrap .modal_title').outerHeight()) > $('.modal_layer .modal_wrap').height()) {
                    $('.modal_layer .modal_wrap').attr('tabindex', 0);
                } else {
                    $('.modal_layer .modal_wrap').removeAttr('tabindex');
                }
            }, 1);
            $('.modal_layer .modal_wrap').append($modalList);
            $('.modal_layer > button.modal_layer_close:first-child').focus();
        });
        $(document).on('click', '.modal_layer > .modal_layer_close', function () {
            $html.removeClass('modal_open');
            $('.modal_layer').remove();
            $('.footer_layer_wrap .layer_list .active button.layer_open').focus();
        });
        //하단 정부 UI/UX(와이드,모바일) 모달 레이어 종료
    });
})(jQuery);