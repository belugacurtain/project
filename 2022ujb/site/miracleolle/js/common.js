// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
    var $tab,$tab_btn;
    var tabid=tab, n=num-1, btn_img=img;

    $tab = $(tabid+'> ul > li');
    $tab_btn = $(tabid+'> ul > li > a');

    $tab_btn.siblings().hide();
    $tab.eq(n).addClass('active');
    $tab.eq(n).children('a').siblings().show();

    if(btn_img =='img'){
        var btn = $tab.eq(n).children('a').find("img");
        btn.attr("src",btn.attr("src").replace("_off","_on"));
    }

    $tab_btn.on("click",function(event){
        var realTarget = $(this).attr('href');

        if(realTarget != "#"){
            return
        }
        if(btn_img =='img'){
            for(var i=0;i<$tab.size();i++){
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src",btn.attr("src").replace("_on","_off"));
            }
            var active = $(this).parent().attr('class');
            if(active != 'active'){
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src =  btn_img_off.src.replace('_off','_on');
            }
        }
        $tab_btn.siblings().hide();
        $tab_btn.parent().removeClass('active');

        $(this).siblings().show();
        $(this).parent().addClass('active');

        event.preventDefault();
    });
}

function tabOrg(tabid,a,img) {
    var $tab, $tab_btn,$obj,$obj_view;
    var tabid = tabid, num = a, btn_img = img;

    $tab = $(tabid+' .tab_item  > li');
    $tab_btn = $(tabid+' .tab_item > li > a');
    $obj = $(tabid+' .tab_obj');
    $obj_view = $(tabid+' .tab_obj.n'+num);

    $tab.eq(num-1).addClass('active');
    $obj_view.show();

    if(btn_img =='img'){
        var btn = $tab.eq(num-1).children('a').find("img");
        btn.attr("src",btn.attr("src").replace("_off","_on"));
    }

    $tab.bind("click",function(event){
        if(btn_img =='img'){
            for(var i=0;i<$tab.size();i++){
                var btn = $tab.eq(i).children('a').find("img");
                btn.attr("src",btn.attr("src").replace("_on","_off"));
            }
            var active = $(this).parent().attr('class');
            if(active != 'active'){
                var btn_img_off = $(this).find('img')[0];
                btn_img_off.src =  btn_img_off.src.replace('_off','_on');
            }
        }

        var this_eq = $tab.index( $(this) );
        $tab.removeClass('active');
        $tab.eq(this_eq).addClass('active');

        $obj.hide();
        $(tabid+' .tab_obj.n'+(this_eq+1)).show();

        event.preventDefault ();
    });
}

$(document).ready(function(){
    //이미지 롤오버
    $('.overimg').mouseover(function (){
        var file = $(this).attr('src').split('/');
        var filename = file[file.length-1];
        var path = '';
        for(i=0 ; i < file.length-1 ; i++){
            path = ( i == 0 )?path + file[i]:path + '/' + file[i];
        }
        $(this).attr('src',path+'/'+filename.replace('_off.','_on.'));
    }).mouseout(function(){
        var file = $(this).attr('src').split('/');
        var filename = file[file.length-1];
        var path = '';
        for(i=0 ; i < file.length-1 ; i++){
            path = ( i == 0 )?path + file[i]:path + '/' + file[i];
        }
        $(this).attr('src',path+'/'+filename.replace('_on.','_off.'));
    });
});

(function($) {
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
    if(_browser.indexOf('msie 7.0') > -1) {
        _browser = 'ie7';

        //ie8일 때
    }else if(_browser.indexOf('msie 8.0') > -1) {
        _browser = 'ie8';

        //ie9일 때
    }else if(_browser.indexOf('msie 9.0') > -1) {
        _browser = 'ie9';

        //ie10일 때
    }else if(_browser.indexOf('msie 10.0') > -1) {
        _browser = 'ie10';

        //ie11일 때
    }else if(_browser.indexOf('trident/7.0') > -1) {
        _browser = 'ie11';

        //edge일 때
    }else if(_browser.indexOf('edge') > -1) {
        _browser = 'edge';

        //opera일 때
    }else if(_browser.indexOf('opr') > -1) {
        _browser = 'opera';

        //chrome일 때
    }else if(_browser.indexOf('chrome') > -1) {
        _browser = 'chrome';

        //firefox일 때
    }else if(_browser.indexOf('firefox') > -1) {
        _browser = 'firefox';

        //safari일 때
    }else if(_browser.indexOf('safari') > -1) {
        _browser = 'safari';
    }else{
        _browser = 'unknown';
    }

    /**
     * @name 브라우저 얻기
     * @since 2017-12-06
     * @return {string}
     */
    window.getBrowser = function() {
        return _browser;
    };

    //브라우저 클래스 추가
    $html.addClass(_browser);

    $(function() {
        var $body = $('body'),
            $htmlAndBody = $html.add($body),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $container = $('#container'),
            $footer = $('#footer');


        $window.on('screen:wide screen:web', function(event) {
            window.mode = 'pc';
        });

        $window.on('screen:tablet screen:phone', function(event) {
            window.mode = 'mobile';
        });

        //lnb
        var $lnb = $header.find('.lnb'),
            $lnbShow = $header.find('.menu_show'),
            $lnbShowBtn = $lnbShow.find('.menu_button'),
            $lnbHide = $lnb.find('.menu_hide'),
            $lnbHideBtn = $lnbHide.find('.menu_button'),
            $lnbDepthItem = $lnb.find('.depth_item'),
            $lnbMenu = $lnb.find('.menu'),
            $lnbDepth2FirstChild = $lnbMenu.find('.depth2 > :first-child'),
            $lnbSpy = $lnbMenu.find('.spy:last'),
            lnbHeight;

        $lnbSpy.parents('.depth_item').addClass('actived');

        function refreshLnbHeight() {
            lnbHeight = $lnbMenu.css('transition-property', 'none').outerHeight() || '';

            $lnbMenu.css('transition-property', '');
        }

        $lnbShowBtn.on('click', function(event) {
            //클래스 토글
            $html.toggleClass('lnb_show');
        });

        $lnbHideBtn.on('click', function(event) {
            //클래스 토글
            $html.removeClass('lnb_show');
        });
        $('.lnb_curtain button').on('click', function(event) {
            $html.removeClass('lnb_show');
        });

        $lnbDepthItem.on('mouseover focusin', function(event) {
            if(mode === 'pc') {
                var $this = $(this),
                    $depth1Item = ($this.hasClass('depth1_item')) ? $this : $this.parents('.depth1_item');

                if($lnbMenu.hasClass('pulldown')) {
                    var maxHeight = 0;

                    $lnbDepth2FirstChild.each(function(index, element) {
                        var $element = $(element),
                            outerHeight = $element.outerHeight() || 0;

                        //기존 값 보다 얻은 값이 초과일 때
                        if(outerHeight > maxHeight) {
                            maxHeight = outerHeight;
                        }
                    });

                    $lnbMenu.height(lnbHeight + maxHeight);
                }else if($lnbMenu.hasClass('eachdown')) {
                    $lnbMenu.height(lnbHeight + ($depth1Item.find('.depth_list').outerHeight() || ''));
                }

                $html.addClass('lnb_open');
                $lnbDepthItem.removeClass('active');
                $this.addClass('active').parents('li').addClass('active');
            }
            event.stopPropagation();
        }).on('click', function(event) {
            if(mode === 'mobile') {
                var $this = $(this),
                    $depthText = $this.children('.depth_text'),
                    eventTarget = event.target;

                /*
                if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                    if($this.hasClass('depth1_item')) {
                        if($this.hasClass('active')) {
                            $html.removeClass('lnb_open');
                        }else{
                            $html.addClass('lnb_open');
                        }
                    }

                    if($this.children('.depth').length) {
                        $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                        //2022.03.22. 변경해도 되는지 물어볼 부분 //$this.toggleClass('active').find('.depth_item').removeClass('active');
                        event.preventDefault();
                    }
                }
                */
                if($this.hasClass('depth1_item')){
                    if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
                        if($this.hasClass('depth1_item')) {
                            if($this.hasClass('active')) {
                                $html.removeClass('lnb_open');
                            }else{
                                $html.addClass('lnb_open');
                            }
                        }

                        if($this.children('.depth').length) {
                            $this.toggleClass('active').siblings('.depth_item').removeClass('active');
                            //2022.03.22. 변경해도 되는지 물어볼 부분 //$this.toggleClass('active').find('.depth_item').removeClass('active');
                            event.preventDefault();
                        }
                    }
                }
            }

            event.stopPropagation();
        }).each(function(index, element) {
            var $element = $(element);

            if($element.children('.depth').length) {
                $element.addClass('has');
            }else{
                $element.addClass('solo');
            }
        });

        $lnbMenu.on('mouseleave', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });
        $lnb.find('.depth1_item:last-child .depth2 .depth2_list .depth2_item:last-child .depth2_text').on('focusout', function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });



        //여기서부터 코드 작성해주세요
        $window.on('screen:wide screen:web', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.removeClass('lnb_open');
                $lnbSpy.parents('.depth_item').removeClass('active');
            }
        });
        $window.on('screen:tablet screen:phone', function(event) {
            refreshLnbHeight();

            if($lnbSpy.length) {
                $html.addClass('lnb_open');
                $lnbSpy.parents('.depth_item').addClass('active');
            }
        });

        //접근성 고려 lnb 1차 포커스 초점 시작
        $lnbMenu.focusout(function(event) {
            if(mode === 'pc') {
                $lnbMenu.height('');
                $html.removeClass('lnb_open');
                $lnbDepthItem.removeClass('active');
            }
        });
        //접근성 고려 lnb 1차 포커스 초점 끝

        //footer 배너 슬라이드 시작
        var $BannerList = $('.footer_banner .banner_slide_wrap .banner_list');
        $BannerList.slick({
            //기본
            autoplay : true,
            dots : false,
            swipe : true,
            swipeToSlide : true,
            draggable : true,
            slidesToShow : 8,
            slidesToScroll : 1,
            variableWidth : true,
            infinite: true,
            prevArrow : $('.footer_banner .banner_slide_wrap .banner_control .prev'),
            nextArrow : $('.footer_banner .banner_slide_wrap .banner_control .next'),

            //추가 기능
            autoArrow : $('.footer_banner .banner_slide_wrap .banner_control .auto'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            pauseText : '정지',
            playText : '재생',
            responsive : [{
                breakpoint : 1401,
                settings : {
                    slidesToShow : 5
                }
            },{
                breakpoint : 881,
                settings : {
                    slidesToShow : 4
                }
            },{
                breakpoint : 721,
                settings : {
                    slidesToShow : 3
                }
            },{
                breakpoint : 482,
                settings : {
                    slidesToShow : 2
                }
            }]
        });
        //footer 배너 슬라이드 끝

    });

    $document.on('ready', function(event) {
        $screen({
            state : [{
                name : 'wide',
                horizontal : {
                    from : 9999,
                    to : 1401
                }
            }, {
                name : 'web',
                horizontal : {
                    from : 1400,
                    to : 1001
                }
            }, {
                name : 'tablet',
                horizontal : {
                    from : 1000,
                    to : 641
                }
            }, {
                name : 'phone',
                horizontal : {
                    from : 640,
                    to : 0
                }
            }]
        });
    });

    $window.on('load', function(event) {

        $window.on('screen:resize', function(event) {

        }).triggerHandler('screen:resize');
    });
})(jQuery);