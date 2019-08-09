var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var browserSync = require('browser-sync').create();


/* compile .scss > .css  */
gulp.task('sass', () => {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

/* Minify */
gulp.task('minify', () =>{
    return gulp.src('app/css/styles.css')
    .pipe(minify())
    .pipe(gulp.dest('dist/styles-minified'))
});

/* browserSync */
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    });
});



/* Watchers */
gulp.task('watch',function(){
    gulp.watch('app/scss/styles.scss', gulp.parallel('sass','minify'));
    gulp.watch('dist/styles-minified/styles.css').on('change', browserSync.reload);
});



gulp.task('default', gulp.parallel('sass','minify','watch'));


// gulp.parallel() or gulp.series() to enqueue tasks.