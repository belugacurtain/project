
(function($) {
    'use strict';

    $(function() {

        var $window = element.$window = $(window),
            $html = element.$html = $('html'),
            $header = element.$header = $('#header'),
            $footer = element.$footer = $('#footer');

        /* cookie */
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        /* 이슈팝업 */
        var $issue = $header.find('.issue'),
            $issueCheckbox = $issue.find('.issue_checkbox'),
            $issueClose = $issue.find('.issue_close');

        $window.on('load', function(event) {
            //쿠기 체크
            if(~document.cookie.indexOf("close=Y")){
                //쿠키가 있을떄(닫기)
                $issue.slideUp('250', 'easeOutExpo');
            }else{
                //쿠키가 없을떄(열기)
                $issue.slideDown('250', 'easeOutExpo');
            }
        });

        $issueClose.on('click', function () {
            if($issueCheckbox.is(":checked")) {
                //checked일때 쿠기 생성
                setCookie("close","Y",1);
            }
            $issue.slideUp('250', 'easeOutExpo');
        });


        /* 맞춤검색 */
        var $fit = $header.find('.fit'),
            $fitOpen = $header.find('.fit_open'),
            $fitHide = $header.find('.fit_hide'),
            $fitSelect = $fit.find('.fit_select'),
            $fitButton = $fit.find('.fit_button'),
            $fitReset = $fit.find('.fit_reset'),
            $fitItem = $fit.find('.fit_item'),
            $fitStep2 = $fit.find('.fit_step2'),
            $fitStep2List = $fit.find('.fit_step2 .fit_list'),
            $fitStep2Item = $fit.find('.fit_step2 .fit_item');

        $fitOpen.on('click', function(event) {
            $fit.addClass('active');
            $html.addClass('dimded').removeClass('lnb_show lnb_open');
        });
        $fitHide.on('click', function(event) {
            $fit.removeClass('active');
            $html.removeClass('dimded');
        });

        //맞춤서비스 선택
        $fitSelect.on('click', function(event) {
            var $this = $(this),
                fitSelectIndex = $this.index() + 1,
                data = $this.data();

            $fitSelect.removeClass('active');
            $this.addClass('active');

            $fitButton.removeAttr('title');
            $this.children().attr('title', '선택됨');

            $fit.removeClass('type1 type2 type3').addClass('type' + fitSelectIndex);

            $fitStep2Item.remove();
            $fitStep2List.append($fitStep2Item.filter('[data-fit-category="' + data.fitCategory + '"]'));

            $fit.find('.fit_item:last-child').addClass('last');

        }).filter('.active').triggerHandler('click');

        //맞춤서비스 초기화
        $fitReset.on('click', function(event) {
            $('input').prop('checked', false);
        });

        /* 검색 */
        var $search = $header.find('.search'),
            $searchForm = $search.find('.search_form'),
            $searchQuery = $search.find('.search_query');

        if($searchQuery.val()){
            $searchForm.addClass('active');
        }

        $searchQuery.on('focus blur', function() {
            if(!$searchForm.hasClass('active')){
                $searchForm.addClass('active');
            }else{
                if($(this).val()){
                    $searchForm.addClass('active');
                }else{
                    $searchForm.removeClass('active');
                }
            }
        });

    });
})(window.jQuery);