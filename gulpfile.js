var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync'); 
var reload = browserSync.reload;
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'src/js/main.js',
    'src/js/other.js'

    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', function () {  
    gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./css'))
        .pipe(minifycss());
});
gulp.task('html', function () {  
    gulp.src('./*.html')
        .pipe(gulp.dest('./'));
});
gulp.task('browser-sync', function() {  
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {  
    gulp.watch("src/scss/**/*.scss", ['sass']).on("change", reload);
    gulp.watch("./*.html", ['html']).on("change", reload);
    gulp.watch("src/js/*.js", ['scripts']).on("change", reload);
});
