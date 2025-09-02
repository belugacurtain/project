$(function () {
    var today = new Date();

    function formatDate(date) {
        var y = date.getFullYear();
        var m = ('0' + (date.getMonth() + 1)).slice(-2);
        var d = ('0' + date.getDate()).slice(-2);
        return y + '-' + m + '-' + d;
    }

    // === 각 .gunamiDate 마다 초기화 ===
    $('.gunamiDate').each(function () {
        var $wrapper = $(this); // 현재 gunamiDate 그룹
        var $startInput = $wrapper.find('.startDate');
        var $endInput = $wrapper.find('.endDate');
        var $calendarContainer = $wrapper.find('.gunamiCalendar');

        var startDefault = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        var endDefault = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var rangeStart = null;

        $startInput.val(formatDate(startDefault));
        $endInput.val(formatDate(endDefault));

        // === cal-top 생성 ===
        function renderCalTop($container) {
            var topHtml = '<div class="cal-top">';
            var ranges = ['오늘', '전일', '주간', '1분기', '2분기', '3분기', '4분기', '상반기', '하반기'];
            topHtml += '<div class="top-item">';
            ranges.forEach(function (txt) {
                topHtml += '<button type="button" class="range-btn">' + txt + '</button>';
            });
            topHtml += '</div>';
            topHtml += '<div class="top-item">';
            for (var i = 1; i <= 12; i++) {
                topHtml += '<button type="button" class="month-btn">' + i + '월</button>';
            }
            topHtml += '</div>';
            topHtml += '</div>';
            $container.prepend(topHtml);

            // === 버튼 기능 ===
            $container.find('.range-btn').on('click', function () {
                $container.find('.cal-top .top-item button').removeClass('active');
                $(this).addClass('active');
                var txt = $(this).text();
                var s, e;

                switch (txt) {
                    case '오늘':
                        s = e = new Date(today);
                        break;
                    case '전일':
                        s = e = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
                        break;
                    case '주간':
                        s = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
                        e = new Date(today);
                        break;
                    case '1분기':
                        s = new Date(today.getFullYear(), 0, 1);
                        e = new Date(today.getFullYear(), 2, 31);
                        break;
                    case '2분기':
                        s = new Date(today.getFullYear(), 3, 1);
                        e = new Date(today.getFullYear(), 5, 30);
                        break;
                    case '3분기':
                        s = new Date(today.getFullYear(), 6, 1);
                        e = new Date(today.getFullYear(), 8, 30);
                        break;
                    case '4분기':
                        s = new Date(today.getFullYear(), 9, 1);
                        e = new Date(today.getFullYear(), 11, 31);
                        break;
                    case '상반기':
                        s = new Date(today.getFullYear(), 0, 1);
                        e = new Date(today.getFullYear(), 5, 30);
                        break;
                    case '하반기':
                        s = new Date(today.getFullYear(), 6, 1);
                        e = new Date(today.getFullYear(), 11, 31);
                        break;
                }

                $startInput.val(formatDate(s));
                $endInput.val(formatDate(e));
                renderCalendar($calendarContainer.find('.start-cal'), s, 'start');
                renderCalendar($calendarContainer.find('.end-cal'), e, 'end');
                rangeStart = null;
                $calendarContainer.find('.date-btn').removeClass('rangecheck').removeAttr('title');
            });

            $container.find('.month-btn').on('click', function () {
                $container.find('.cal-top .top-item button').removeClass('active');
                $(this).addClass('active');
                var month = parseInt($(this).text());
                var year = today.getFullYear();
                var s = new Date(year, month - 1, 1);
                var e = new Date(year, month, 0);

                $startInput.val(formatDate(s));
                $endInput.val(formatDate(e));
                renderCalendar($calendarContainer.find('.start-cal'), s, 'start');
                renderCalendar($calendarContainer.find('.end-cal'), e, 'end');
                rangeStart = null;
                $calendarContainer.find('.date-btn').removeClass('rangecheck').removeAttr('title');
            });
        }

        // === 캘린더 출력 ===
        function renderCalendar($container, dateObj, type) {
            var year = dateObj.getFullYear();
            var month = dateObj.getMonth();
            var firstDay = new Date(year, month, 1);
            var lastDay = new Date(year, month + 1, 0);
            var startDate = new Date(year, month, 1 - firstDay.getDay());
            var endDate = new Date(year, month + 1, 6 - lastDay.getDay() + lastDay.getDate());

            var html = '<div class="calendar-head">' +
                '<button type="button" class="prev-year">이전연도</button>' +
                '<button type="button" class="prev-month">이전달</button>' +
                '<span class="currentYM">' + year + '.' + ('0' + (month + 1)).slice(-2) + '</span>' +
                '<button type="button" class="next-month">다음달</button>' +
                '<button type="button" class="next-year">다음연도</button>' +
                '</div>';

            html += '<div class="calendar-body">' +
                '<div class="week day-header">' +
                '<span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>' +
                '</div>';

            var d = new Date(startDate);
            while (d <= endDate) {
                if (d.getDay() === 0) html += '<div class="week">';

                var dateStr = formatDate(d);
                var isCurrentMonth = (d.getMonth() === month);

                if (isCurrentMonth) {
                    html += '<button type="button" data-date="' + dateStr + '" class="date-btn current">' + d.getDate() + '</button>';
                } else {
                    // 다른 달 날짜도 data-date 달아줌
                    html += '<button type="button" data-date="' + dateStr + '" class="date-btn other">' + d.getDate() + '</button>';
                }

                if (d.getDay() === 6) html += '</div>';
                d.setDate(d.getDate() + 1);
            }
            html += '</div>';
            $container.html(html);

            // prev/next
            $container.find('.prev-month').on('click', function () {
                renderCalendar($container, new Date(year, month - 1, 1), type);
            });
            $container.find('.next-month').on('click', function () {
                renderCalendar($container, new Date(year, month + 1, 1), type);
            });
            $container.find('.prev-year').on('click', function () {
                renderCalendar($container, new Date(year - 1, month, 1), type);
            });
            $container.find('.next-year').on('click', function () {
                renderCalendar($container, new Date(year + 1, month, 1), type);
            });

            // === other 날짜 클릭 시 해당 월로 이동 ===
            $container.find('.date-btn.other').on('click', function () {
                var dateStr = $(this).data('date');
                var newDate = new Date(dateStr);
                renderCalendar($container, new Date(newDate.getFullYear(), newDate.getMonth(), 1), type);
            });

            // 날짜 클릭 (기존 로직 유지)
            $container.find('.date-btn.current').on('click', function () {
                var dateStr = $(this).data('date');
                var clickedDate = new Date(dateStr);

                if (!rangeStart) {
                    $calendarContainer.find('.date-btn').removeClass('rangecheck').removeAttr('title');
                    rangeStart = clickedDate;
                    $(this).addClass('rangecheck').attr('title', '기간선택됨');
                    $startInput.val(dateStr);
                    $endInput.val(dateStr);
                } else {
                    var startD = rangeStart <= clickedDate ? rangeStart : clickedDate;
                    var endD = rangeStart <= clickedDate ? clickedDate : rangeStart;

                    if (clickedDate < rangeStart) {
                        alert("처음 선택한 날짜보다 이전 날짜는 선택할 수 없습니다.");
                        $calendarContainer.find('.date-btn').removeClass('rangecheck').removeAttr('title');
                        $calendarContainer.find('[data-date="' + formatDate(rangeStart) + '"]').addClass('rangecheck').attr('title', '기간선택됨');
                        $startInput.val(formatDate(rangeStart));
                        $endInput.val(formatDate(rangeStart));
                    } else {
                        $calendarContainer.find('.date-btn').removeClass('rangecheck').removeAttr('title');
                        $calendarContainer.find('.date-btn.current').each(function () {
                            var d = new Date($(this).data('date'));
                            if (d >= startD && d <= endD) {
                                $(this).addClass('rangecheck').attr('title', '기간선택됨');
                            }
                        });
                        $startInput.val(formatDate(startD));
                        $endInput.val(formatDate(endD));
                    }
                    rangeStart = null;
                }
            });

            // 초기 range 표시 (기존 유지)
            var sVal = $startInput.val();
            var eVal = $endInput.val();
            if (sVal && eVal) {
                var sDate = new Date(sVal);
                var eDate = new Date(eVal);
                $container.find('.date-btn.current').each(function () {
                    var d = new Date($(this).data('date'));
                    if (d >= sDate && d <= eDate) {
                        $(this).addClass('rangecheck').attr('title', '기간선택됨');
                    }
                });
            }
        }

        // === 초기 렌더링 ===
        $calendarContainer.hide().html(
            '<div class="cal-wrap"><div class="start-cal"></div><div class="end-cal"></div></div>'
        );

        renderCalTop($calendarContainer);
        renderCalendar($calendarContainer.find('.start-cal'), startDefault, 'start');
        renderCalendar($calendarContainer.find('.end-cal'), endDefault, 'end');

        // === cal-bottom 추가 ===
        var bottomHtml = `
            <div class="cal-bottom">
                <div class="bottom-item">
                    <button type="button" class="reset-btn">초기화</button>
                </div>
                <div class="bottom-item">
                    <button type="button" class="done-btn">완료</button>
                </div>
            </div>`;
        $calendarContainer.append(bottomHtml);

        // 초기화 버튼
        $calendarContainer.find('.reset-btn').on('click', function () {
            var s = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            var e = today;

            $startInput.val(formatDate(s));
            $endInput.val(formatDate(e));
            renderCalendar($calendarContainer.find('.start-cal'), s, 'start');
            renderCalendar($calendarContainer.find('.end-cal'), e, 'end');

            rangeStart = null;
            $calendarContainer.find('.date-btn').removeClass('rangecheck').removeAttr('title');
            $calendarContainer.find('.date-btn.current').each(function () {
                var d = new Date($(this).data('date'));
                if (d >= s && d <= e) {
                    $(this).addClass('rangecheck').attr('title', '기간선택됨');
                }
            });
        });

        // 완료 버튼
        $calendarContainer.find('.done-btn').on('click', function () {
            $calendarContainer.hide();
        });

        $startInput.add($endInput).on('focus', function () {
            $calendarContainer.show();
        });
    });

    $(document).on('click', function (e) {
        // 캘린더 컨테이너
        var $calendar = $('.gunamiCalendar');
        // 클릭된 요소가 .gunamiCalendar 또는 그 자식이면 패스
        if ($(e.target).closest('.calendar-head, .calendar-body, .gunamiCalendar, .gunamiDate .startDate, .gunamiDate .endDate').length) {
            return;
        }
        // 그 외 영역 클릭시 캘린더 닫기
        $calendar.hide();
    });

});
