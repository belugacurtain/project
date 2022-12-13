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
        setTimeout(function(){
            $html.addClass('hsg_reserve');
        }, 100);

        //비주얼 가짜 셀렉트 시작
        //초기 옵션값에 텍스트 밀어넣기
        var Index,
            $ReserveFormSelectType = $('.search_inner .reserve_form.select_type');
        $ReserveFormSelectType.each(function(){
            var $this = $(this),
                $SelectInner = $this.find('.select_inner'),
                $FakeSelectBox = $SelectInner.find('.fake_select_box'),
                $FakeSelectList = $FakeSelectBox.find('.fake_select_list'),
                $FakeSelectItem = $FakeSelectList.find('.fake_select_item'),
                $FakeSelectItemActive = $FakeSelectItem.siblings('.fake_select_item.active'),
                StartFakeSelectItemActiveIndex = $FakeSelectItemActive.index(),
                FakeSelectLength = $FakeSelectItem.length,
                $RealSelect = $FakeSelectBox.find('select'),
                $RealOption = $RealSelect.find('option'),
                $StartRealOption = $RealSelect.find('option').eq(StartFakeSelectItemActiveIndex);
            $StartRealOption.attr('selected', 'selected');
            setTimeout(function(){
                for(Index=0; Index<=FakeSelectLength; Index++){
                    $RealOption.eq(Index).empty().append($FakeSelectItem.eq(Index).text());
                }
            }, 1);
        });
        //가짜 셀렉트 목록 열기
        $('.search_inner .reserve_form.select_type .select_inner .fake_select_box button.fake_select_btn').on('click', function(){
            var $this = $(this),
                $ThisFakeSelectBox = $this.parent('.fake_select_box'),
                $ThisFakeSelectList = $ThisFakeSelectBox.find('.fake_select_list'),
                IsActive = $ThisFakeSelectBox.is('.active');
            if(!IsActive){
                $ThisFakeSelectBox.addClass('active');
                $ThisFakeSelectList.slideDown(250);
                $this.attr('title', '목록닫기');
            }
            else{
                $ThisFakeSelectBox.removeClass('active');
                $ThisFakeSelectList.slideUp(250);
                $this.attr('title', '목록열기');
            }
        });
        //가짜 셀렉트 목록 열린 버튼 클릭시
        $(document).on('click', '.search_inner .reserve_form.select_type .select_inner .fake_select_box .fake_select_list .fake_select_item button.fake_select_choice', function(){
            var $this = $(this),
                $ThisText = $this.text(),
                $MySelectItem = $this.parent('.fake_select_item'),
                MySelectItemIndex = $MySelectItem.index(),
                IsActive = $MySelectItem.is('.active'),
                $OtherSelectItem = $MySelectItem.siblings('.fake_select_item'),
                $OtherSelectChoice = $OtherSelectItem.find('button.fake_select_choice'),
                $FakeSelectList = $MySelectItem.parent('.fake_select_list'),
                $OpenFakeSelectBox = $FakeSelectList.parent('.fake_select_box'),
                $FakeSelectBtn = $FakeSelectList.siblings('button.fake_select_btn'),
                $FakeSelectBtnText = $FakeSelectBtn.find('em'),
                $MyTagSelect = $OpenFakeSelectBox.find('select'),
                $MyTagOption = $MyTagSelect.find('option').eq(MySelectItemIndex),
                $OtherTagOption = $MyTagOption.siblings('option');
            if(!IsActive){
                $OtherTagOption.removeAttr('selected');
                $MyTagOption.attr('selected', 'selected');
                $OtherSelectItem.removeClass('active');
                $MySelectItem.addClass('active');
                $OtherSelectChoice.removeAttr('title');
                $this.attr('title', '선택됨');
                $OpenFakeSelectBox.removeClass('active');
                $FakeSelectList.slideUp(250);
                $FakeSelectBtn.attr('title', '목록열기');
                $FakeSelectBtnText.empty().text($ThisText);
            }
        });
        //비주얼 가짜 셀렉트 끝


        //빠른예약서비스 탭 및 슬라이드 시작
        var $SpeedConItem = $('.speed .speed_wrap .speed_con_box .con_list .con_item');
        $SpeedConItem.each(function(){
            var $this = $(this),
                $SpeedSlideWrap = $this.find('.speed_slide_wrap'),
                $SpeedSlideList = $SpeedSlideWrap.find('.speed_slide_list');
            $SpeedSlideList.slick({
                autoplay : true,
                autoplaySpeed : 3500,
                speed : 800,
                dots : false,
                arrows : false,
                slidesToShow : 4,
                slidesToScroll : 1,
                infinite : true,
                swipe : true,
                swipeToSlide : true,
                draggable : true,
                zIndex : 1,
                pauseOnHover : true,
                pauseOnFocus : true,
                variableWidth : true,
                responsive: [{}]
            });
        });
        $('.speed .speed_wrap .speed_tab_box .tab_list .tab_item button.tab_btn').on('click', function(){
            var $this = $(this),
                $MySpeedTabItem = $this.parent('.tab_item'),
                IsActive = $MySpeedTabItem.is('.active'),
                MySpeedTabItemIndex = $MySpeedTabItem.index(),
                $OtherSpeedTabItem = $MySpeedTabItem.siblings('.tab_item'),
                $OtherSpeedTabBtn = $OtherSpeedTabItem.find('button.tab_btn'),
                $SpeedTabList = $MySpeedTabItem.parent('.tab_list'),
                $SpeedTabBox = $SpeedTabList.parent('.speed_tab_box'),
                $SpeedConBox = $SpeedTabBox.siblings('.speed_con_box'),
                $SpeedConList = $SpeedConBox.find('.con_list'),
                $MySpeedConItem = $SpeedConList.find('.con_item').eq(MySpeedTabItemIndex),
                $OtherSpeedConItem = $MySpeedConItem.siblings('.con_item'),
                $MySpeedSlideWrap = $MySpeedConItem.find('.speed_slide_wrap'),
                $MySpeedSlideList = $MySpeedSlideWrap.find('.speed_slide_list');
            if(!IsActive){
                $OtherSpeedTabItem.removeClass('active');
                $MySpeedTabItem.addClass('active');
                $OtherSpeedTabBtn.removeAttr('title');
                $this.attr('title', '선택됨');
                $OtherSpeedConItem.removeClass('active');
                $MySpeedConItem.addClass('active');
                $MySpeedSlideList.slick('setPosition');
            }
        });
        //빠른예약서비스 탭 및 슬라이드 끝


        $window.on('screen:tablet screen:phone', function (event) {

        });
    });
})(jQuery);