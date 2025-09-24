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

        var $fixedQuick = $('.fixed_quick');
        var $fixedQuickList = $('.fixed_quick .quick_layer .quick_list');
        var $fixedQuickItem = $fixedQuickList.find('.quick_item');
        var $links = $fixedQuickItem.find('.quick_link');
        var fixedQuickItemCount = $fixedQuickItem.length || 1;
        var stepDeg = 360 / fixedQuickItemCount;
        var dragInstance = null;
        var wasDragging = false;
        
        function isMobileMode() {
            return window.innerWidth <= 1000;
        }

        function updateUpright(rotation) {
            // 부모 회전만큼 링크를 역회전시켜 항상 같은 방향으로 보이게 처리
            gsap.set($links, {rotation : -rotation});
        }

        function snapToNearest(currentRotation) {
            var target = Math.round(currentRotation / stepDeg) * stepDeg;
            gsap.to($fixedQuickList, {
                rotation: target,
                duration: 0.25,
                ease: 'power2.out',
                onUpdate: function () {
                    var r = gsap.getProperty($fixedQuickList[0], 'rotation');
                    updateUpright(r);
                }
            });
        }

        function ensureDraggable() {
            if (dragInstance) {
                return;
            }
            dragInstance = Draggable.create($fixedQuickList[0], {
                type: 'rotation',
                dragClickables: true,
                minimumMovement: 6,
                onPress: function () {
                    wasDragging = false;
                },
                onDrag: function () {
                    wasDragging = true;
                    updateUpright(this.rotation);
                },
                onRelease: function () {
                    snapToNearest(this.rotation);
                    // 드래그 종료 후 클릭 허용 복귀
                    setTimeout(function () {
                        wasDragging = false;
                    }, 0);
                }
            })[0];
        }

        function killDraggable() {
            if (!dragInstance) {
                return;
            }
            dragInstance.kill();
            dragInstance = null;
        }

        //
        $(document).on('click', 'button.quick_open_btn', function () {
            $fixedQuick.addClass('active');
            // 초기 회전 0deg로 고정 후 역회전 적용
            gsap.set($fixedQuickList, {rotation : 0});
            updateUpright(0);
            if (isMobileMode()) {
                ensureDraggable();
            } else {
                killDraggable();
            }
        });

        //
        $(document).on('click', 'button.quick_close_btn', function () {
            $fixedQuick.removeClass('active');
        });

        // 링크 클릭 보장: 드래그가 아닌 경우에는 수동 네비게이션 처리
        $(document).on('pointerup touchend mouseup', '.quick_layer .quick_list .quick_link', function (e) {
            if (wasDragging) {
                e.preventDefault();
                return;
            }
            var href = this.getAttribute('href');
            if (!href) {
                return;
            }
            e.preventDefault();
            var target = this.getAttribute('target');
            if (target === '_blank') {
                window.open(href, '_blank');
            } else {
                window.location.href = href;
            }
        });

        // 반응형 임계값 감시 : 모바일에서만 드래그 활성화
        $window.on('resize', function () {
            if ($fixedQuick.hasClass('active')) {
                if (isMobileMode()) {
                    ensureDraggable();
                } else {
                    killDraggable();
                }
            }
        });
        //

    });
})(jQuery);