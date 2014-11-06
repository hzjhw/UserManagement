var gulp = require('gulp');

/** 项目发布相关 */
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rev = require('gulp-rev');
var del = require('del');


var coffee = require('gulp-coffee');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var yuidoc = require("gulp-yuidoc");
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;

/** 辅助相关 */
var connect = require('gulp-webserver');
var livereload = require('gulp-livereload');

/** ==================================================== 项目发布 ====================================================*/

var SRCDIR = './app',
    TMPDIR = './.tmp',
    DISTDIR = './dist',
    src = {
        all: [SRCDIR + '/**', TMPDIR + '/**'],
        html: [SRCDIR + '/**/*.html'],
        scripts: [SRCDIR + '/**/*.js', TMPDIR + '/**/*.js'],
        styles: [SRCDIR + '/**/*.css', TMPDIR + '/**/*.css']
    },
    dist = {
        all: DISTDIR + '/**',
        html: DISTDIR + '/**/*.html',
        scripts: DISTDIR + '/**',
        styles: DISTDIR + '/**',
        images: DISTDIR + '/images',
        font: DISTDIR + '/font',
        source: DISTDIR + '/vendor'
    };

var paths = {
    global : {
        scripts: {
            source: src.scripts,
            dist: dist.scripts
        }
    }
};

gulp.task('usemin', function() {
    return gulp.src(src.html)
        .pipe(usemin({
            css: [minifyCSS(), 'concat',rev()],
            html: [htmlmin({empty: true})],
            js: [uglify(), rev()]
        }))
        .pipe(gulp.dest(DISTDIR));
});

// 清除dist目录
gulp.task('dist-clean', function (callback) {
    del(dist.all, callback);
});

// 压缩文件
gulp.task('compress', function(){
    doTask('global', false);
});
gulp.task('compressmin', function(){
    doTask('global', true);
});

// 移动文件
gulp.task('moveFiles', function(){
    return gulp.src(src.all).pipe(gulp.dest(DISTDIR));
});
// 项目发布
gulp.task('publish',['dist-clean'],
    function(){
        return [gulp.start('moveFiles'),
            gulp.start('compress'), gulp.start('usemin')];
    });
gulp.task('debug', ['dist-clean'], function(){
    return [gulp.start('moveFiles'), gulp.start('compressmin'), gulp.start('usemin')]
});


/** ========================================== 辅助开发 ==============================================================*/

gulp.task('livereload', function () {
    var server = livereload();
    gulp.watch('app/**/*.*', function (file) {
        server.changed(file.path);
    });
});

gulp.task('connect', function () {
    console.log('启动浏览器');
    gulp.src(['test'])
        .pipe(connect({
            host: 'example.com',
            port: 9004,
            livereload: true,
            directoryListing: true,
            open: true
        }));

    console.log('启动浏览器自动刷新');
    gulp.start('livereload');
});

gulp.task('html', function () {
    gulp.src('./test/*.html')
        .pipe(connect.reload());
});



/** ========================================== 压缩打包 ==============================================================*/
function doTask(item, debug){
    for (var key in paths[item]) {
        switch (key) {
            case 'scripts':
                try {
                    gulp.task(item + key, function () {
                        if (debug) {
                            return gulp.src(paths[item].scripts.source)
                                .pipe(gulp.dest(paths[item].scripts.dist));
                        }
                        return gulp.src(paths[item].scripts.source)
                            .pipe(uglify())
                            .pipe(gulp.dest(paths[item].scripts.dist));
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;

            case 'styles':
                try {
                    gulp.task(item + key, function () {
                        return gulp.src(paths[item].styles.source)
                            .pipe(minifyCSS({keepBreaks: true}))
                            .pipe(gulp.dest(paths[item].styles.dist));
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;

            case 'doc':
                try {
                    gulp.task(item + key, function () {
                        return gulp.src(paths[item].doc.source)
                            .pipe(yuidoc())
                            .pipe(gulp.dest(paths[item].doc.dist))
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;

            case 'images':
                try {
                    gulp.task(item + key, function () {
                        return gulp.src(paths[item].images.source)
                            .pipe(imagemin({optimizationLevel: 5}))
                            .pipe(gulp.dest(paths[item].images.dist));
                    });
                    gulp.start(item + key);
                } catch (e) {
                    console.error(item + key + e);
                }
                break;
            default:
        }
    }
}
