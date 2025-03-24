const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprite');
const sort = require('gulp-sort');
const path = require('path');

// SVG 스프라이트를 만들기 위한 설정
const svgSpriteConfig = {
    mode : {
        view : {
            sprite : 'sprite.svg' // 스프라이트 파일 이름 설정
        }
    },
    shape : {
        spacing : {
            padding : 0 // 아이콘 간의 패딩 조정
        }
    },
    variables : {
        // 추가적으로 스프라이트에서 사용하는 변수를 설정 가능
        spriteWidth : 'auto',
        spriteHeight : 'auto'
    }
};

// SVG 파일들을 스프라이트로 묶고 내림차순으로 정렬하는 Gulp 작업
gulp.task('svg-sprite', function () {
    return gulp.src('sprite/*.svg') // SVG 파일이 위치한 폴더
        .pipe(sort({
            compare: (a, b) => {
                return path.basename(b.path).localeCompare(path.basename(a.path)); // 파일명 내림차순 정렬
            }
        }))
        .pipe(svgSprite(svgSpriteConfig))
        .pipe(gulp.dest('dist/')); // 결과물 저장 디렉토리
});

// 기본 Gulp 작업
gulp.task('default', gulp.series('svg-sprite'));
