var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    rigger = require('gulp-rigger'),
    autoprefixer = require('gulp-autoprefixer'),
    svgSprite = require('gulp-svg-sprites'),
    cheerio = require('gulp-cheerio'),
    rigger = require('gulp-rigger');
    
/* --------------------- */

gulp.task('sass', function(){ 

  return gulp.src('app/scss/*.scss')
    .pipe(sass()) 
    .on('error', swallowError)
    .pipe(autoprefixer(['last 25 versions', '> 1%', 'ie 8', 'ie 9', 'IE 10'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    .pipe(cssnano({zindex: false}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
});

/* --------------------- */

gulp.task('browser-sync', function() { 

  browserSync({ 
    server: {
      baseDir: 'app'
    },
    notify: false // Notification in browser
  });
});

/* --------------------- */

function swallowError (error) { // Dont stop when error

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}

/* --------------------- */

// gulp.task('scripts', function(){
  
//   return gulp.src([
//     // Libs:
//     'app/js/libs/jquery-3.2.1.min.js'
//   ])

//   .pipe(concat('main.js')) 
//   .pipe(uglify())
//   .on('error', swallowError)
//   .pipe(rename({suffix: '.min'}))
//   .pipe(gulp.dest('app/js'));
// });

/* --------------------- */

gulp.task('default', ['browser-sync', 'sass'], function() {

  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/scss/**/*.scss', browserSync.reload);

  // gulp.watch('app/html/**/*.html', ['rigger']);
  gulp.watch('app/**/*.html', browserSync.reload);
  
  // gulp.watch('app/js/pages/*.js', ['scripts']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});


/* --------------------- */
/* -------- SVG -------- */
/* --------------------- */

// gulp.task('svg:sprite-generator:index', function () {

//   return gulp.src('app/img/svg/index-page/*.svg')
//     .pipe(cheerio({
//       run: function ($, file) {
//         $('[fill]').removeAttr('fill');
//         $('[style]').removeAttr('style');
//     }}))
//     // build svg sprite
//     .pipe(svgSprite({mode: "symbols"}))
//     .pipe(gulp.dest('app/img/sprites/main-page'))
// });

/* ---------------------------- */
/* -------- BUILD HTML -------- */
/* ---------------------------- */

// var path = {
//   html: {
//     html: 'app/html/*.html'
//   },
//   view: {
//     html: 'app/'
//   }
// };

// gulp.task('rigger', function () {
//   gulp.src(path.html.html)
//       .pipe(rigger())
//       .pipe(gulp.dest(path.view.html));
// });


