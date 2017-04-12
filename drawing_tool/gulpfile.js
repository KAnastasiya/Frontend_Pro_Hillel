const gulp = require('gulp');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const gulpsync = require('gulp-sync')(gulp);
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const webpackConfig = require('./webpack.config.js');
const path = require('path');

const reload = browserSync.reload;
const publicDir = './';

gulp.task('pug', () => {
  gulp
    .src('src/index.pug')
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError(),
    }))
    .pipe(plugins.pug({
      pretty: true,
    }))
    .pipe(gulp.dest(publicDir));
});


gulp.task('scss', () => {
  gulp
    .src('src/style.scss')
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError(),
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer(
      ['last 2 versions', '> 1%'],
      { cascade: false }
    ))
    .pipe(plugins.cssnano())
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(publicDir));
});


gulp.task('js', () => {
  gulp
    .src('src/script.js')
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError(err => ({
        title: 'Webpack',
        message: err.message,
      })),
    }))
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(plugins.rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest(publicDir));
});


gulp.task('img', () => {
  gulp
  .src('src/img/*')
  .pipe(plugins.imagemin([
    imageminJpegRecompress({
      loops: 4,
      min: 50,
      max: 80,
      quality: 'high',
      strip: true,
      progressive: true,
    }),
    imageminPngquant({ quality: '50-80' }),
    plugins.imagemin.svgo({ removeViewBox: true }),
  ]))
  .pipe(gulp.dest(path.resolve(publicDir, 'img')));
});


gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: publicDir,
      index: 'index.html',
    },
    port: '8080',
    open: false,
  });
});


gulp.task('default', gulpsync.sync(['img', 'pug', 'scss', 'js', 'server']), () => {
  gulp.watch('./src/img/*', ['img']).on('change', reload);
  gulp.watch('./src/index.pug', ['pug']).on('change', reload);
  gulp.watch('./src/**/*.scss', ['scss']).on('change', reload);
  gulp.watch('./src/**/*.js', ['js']).on('change', reload);
});
