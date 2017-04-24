//--------------------------
//Dependências
//--------------------------
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    runSequence = require('gulp-run-sequence'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    bower = require('bower'),
    inject = require('gulp-inject'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    gulpNgConfig = require('gulp-ng-config');

//--------------------------
//Configuração dos diretórios
//--------------------------
var paths = {};
paths.base = '.';

paths.dist = paths.base + '/wwwroot';

//App
paths.app = {};
paths.app.base = paths.base + '/app';
paths.app.dist = paths.dist + '/app';

//CSS
paths.css = {};
paths.css.base = paths.base + '/css';
paths.css.dist = paths.dist + '/css';
paths.css.mainFile = paths.css.base + '/app.scss';

//Templates
paths.templates = {};
paths.templates.base = paths.app.base;
paths.templates.dist = paths.app.dist;
paths.templates.mainFile = paths.app.base + '/index.html';
paths.templates.distMainFile = paths.dist + '/index.html';

//Javascript
paths.js = {};
paths.js.base = paths.base + '/bower_components';
paths.js.dist = paths.dist + '/bower_components';

//Javascript do Template Travello
paths.jsTemplate = {};
paths.jsTemplate.base = paths.base + '/js';
paths.jsTemplate.dist = paths.dist + '/js';

//Imagens
paths.images = {};
paths.images.base = paths.base + '/images';
paths.images.dist = paths.dist + '/images';

//Components do Template Travello
paths.components = {};
paths.components.base = paths.base + '/components';
paths.components.dist = paths.dist + '/components';

//Fonts Template Travello
paths.fonts = {};
paths.fonts.base = paths.base + '/fonts';
paths.fonts.dist = paths.dist + '/fonts';

//--------------------------
//CLEAN
//--------------------------

//Limpa as pastas de destino (distribuição)
gulp.task('clean:templates', function () {
    return del([
        paths.templates.dist + '/**/.html'
    ]);
});

gulp.task('clean', function () {
    return del([
        paths.dist + '/**/*'
    ]);
});

//--------------------------
//COMPILE
//--------------------------
gulp.task('compile:css', function () {
    return gulp
        .src([paths.css.mainFile])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css.dist))
        .pipe(browserSync.stream());
});

gulp.task('compile:templates:baseFile', function () {
    return gulp
        .src(paths.templates.distMainFile)
        .pipe(inject(gulp.src([paths.templates.base + '/**/*.js'], { read: false })))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('compile:templates', function () {
    runSequence(['copy:templates:baseFile', 'compile:templates:baseFile']);
});

gulp.task('compile', ['compile:css', 'compile:templates']);

//--------------------------
//MIN
//--------------------------
gulp.task('min:css', function () {
    return gulp
        .src([
            paths.css.dist + '/**/*.css',
            '!' + paths.css.dist + '/**/*.min.css',
        ])
        .pipe(concat('main.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(paths.css.dist));

});


gulp.task('min', ['min:css']);

//--------------------------
//WATCH
//--------------------------
gulp.task('watch:css', function () {
    return gulp.watch([
        paths.css.base + '/**/*.scss'
    ], ['compile:css']);
});

gulp.task('watch:templates', function () {
    return gulp.watch([
        paths.templates.base + '/**/*.html'
    ], function () {
        runSequence(['clean:templates', 'copy:templates', 'compile:templates']);
    });
});

gulp.task('watch:app', function () {
    return gulp.watch([
        paths.app.base + '/**/*.js'
    ], function () {
        runSequence(['copy:app']);
    });
});

gulp.task('watch', function () {
    gulp.run('watch:css');
    gulp.run('watch:templates');
    gulp.run('watch:app');
});

//--------------------------
//SERVE
//--------------------------
gulp.task('run:server', function () {
    browserSync.init({
        open: 'external',
        host: 'app.nibo.com.br',
        proxy: 'app.nibo.com.br',
        port: '80'
    });
});


//--------------------------
//COPY
//--------------------------
gulp.task('copy:lib', function () {
    return gulp
        .src([paths.js.base + '/**/*'])
        .pipe(gulp.dest(paths.js.dist));
});

gulp.task('copy:images', function () {
    return gulp
        .src([paths.images.base + '/**/*'])
        .pipe(gulp.dest(paths.images.dist));
});

gulp.task('copy:components', function () {
    return gulp
        .src([paths.components.base + '/**/*'])
        .pipe(gulp.dest(paths.components.dist));
});

gulp.task('copy:fonts', function () {
    return gulp
        .src([paths.fonts.base + '/**/*'])
        .pipe(gulp.dest(paths.fonts.dist));
});

gulp.task('copy:templates', function () {
    gulp
        .src([paths.templates.base + '/**/*.html', '!' + paths.templates.mainFile])
        .pipe(gulp.dest(paths.app.dist));

    gulp.run('copy:templates:baseFile');
});

gulp.task('copy:templates:baseFile', function () {
    return gulp
        .src([paths.templates.mainFile])
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:app', function () {
    gulp
        .src([paths.app.base + '/**/*.js'])
        .pipe(gulp.dest(paths.app.dist));
    return gulp
        .src([paths.base + '/**/*.config'])
        .pipe(gulp.dest(paths.dist));
});

gulp.task('copy', ['copy:lib', 'copy:app', 'copy:templates', 'copy:images', 'copy:components', 'copy:fonts']);

//--------------------------
//BUILD
//--------------------------
gulp.task('build:release', function () {
    runSequence('clean', 'copy', 'compile', 'min', function () {
        return gulp.src("config.json")
            .pipe(gulpNgConfig('gameFareApp', {
                environment: 'production',
                createModule: false
            }))
            .pipe(gulp.dest('./wwwroot/app/'))
    });
});

gulp.task('build', function () {
    runSequence('clean', 'copy', 'compile', function () {
        return gulp.src("config.json")
            .pipe(gulpNgConfig('gameFareApp', {
                environment: 'dev',
                createModule: false
            }))
            .pipe(gulp.dest('./wwwroot/app/'))
    });
});