var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    minifycss    = require('gulp-minify-css'),
    jshint       = require('gulp-jshint'),
    exec         = require('child_process').exec;

var jshintrcPath = '../.jshintrc';

var paths = {
  scripts : ['src/js/define.js', 'src/**/*.js', '!src/js/app.js'],
  styles : ['src/partials/**/*.css', 'src/partials/**/**/*.css', 'src/css/*.css', 'src/css/**/*.css', '!src/css/*.min.css'],
  assets : ['src/assets/**/*'],
  static : ['src/index.html', 'src/login.html', 'src/error.html', 'src/project.html', 'src/js/app.js', 'src/i18n/*', 'src/partials/**/*.html'],
  vendor : ['vendor/angular/*', 'vendor/angular-translate/*', 'vendor/*.js'],
  jqueryui : ['vendor/jquery-ui/*.js']
};

var destPath = 'dest/';

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat('js/bhima_installer.min.js'))
    .pipe(gulp.dest(destPath));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(minifycss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(destPath + 'css/'));
});

gulp.task('assets', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(destPath + 'assets/'));
});

gulp.task('vendor', function () {
  return gulp.src(paths.vendor)
    .pipe(gulp.dest(destPath + 'lib/'));
});

gulp.task('minjquery', function () {
  return gulp.src(paths.jqueryui)
    .pipe(uglify())
    .pipe(concat('jquery.ui.min.js'))
    .pipe(gulp.dest(destPath+'lib/'));
});

gulp.task('static', function () {
  return gulp.src(paths.static, { base : './src/' })
    .pipe(gulp.dest(destPath));
});

gulp.task('watch', function () {
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.static, ['static']);
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint(jshintrcPath))
    .pipe(jshint.reporter('default'));
});

gulp.task('comptrans', function () {
  // Compare the English and French for missing tokens
  var progPath   = '../utilities/translation/tfcomp.js',
      enPath     = 'src/i18n/en.json',
      frPath     = 'src/i18n/fr.json';
  exec('node ' + [progPath, enPath, frPath].join(' '), function(err, _, warning) {
	  if (warning) {
	   console.error(warning);
	  }
 	});
  return;
});

gulp.task('default', [], function () {
  gulp.start('lint', 'comptrans', 'scripts', 'styles', 'assets', 'vendor', 'minjquery', 'static');
});
