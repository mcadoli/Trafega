var gulp = require('gulp');

gulp.task('copiar', ['limpar'], function(){
    return gulp.src([
    './app/*',
    './app/*.config', // arquivos .config da raiz /src
    './app/*.html', // arquivos .html da raiz /src
    './app/**/*.html', // arquivos .html de subdiretórios
    './app/**/*.js', // arquivos .js de subdiretórios
    './app/**/*.css', // arquivos .css de subdiretórios
    './app/**/*.png', // arquivos .png de subdiretórios
    './app/**/*.jpg', // arquivos .jpg de subdiretórios
    './app/**/*.eot',
    './app/**/*.svg',
    './app/**/*.ttf',
    './app/**/*.woff',
    './app/**/*.otf',
    './app/**/*.woff2',
    '!./app/**/*-spec.js' // ignorar arquivos -spec.js (testes) de subdiretórios
    ]).pipe(gulp.dest('./wwwroot'));
});

var del = require('del');
gulp.task('limpar', function () {
  del.sync( './wwwroot/**');
});

var inject = require('gulp-inject');
gulp.task('inject:project', function() {
 
    var resources = gulp.src('./wwwroot/*/**', {read: false});
 
    return gulp.src('./wwwroot/meio.html')
      .pipe(inject(resources, {
        ignorePath: './wwwroot'
      }))
      .pipe(gulp.dest('./wwwroot'));
});

var runSequence = require('run-sequence');
gulp.task('build', function (done) {
    return runSequence('copiar', 'inject:project', done);
});