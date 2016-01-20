var gulp = require('gulp'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    insert = require('gulp-insert'),
    replace = require('gulp-replace'),
    less = require('gulp-less'),
    gulpsmith = require('gulpsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    gulp_front_matter = require('gulp-front-matter'),
    assign = require('lodash.assign'),
    marked = require('marked'),
    renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return '<h' + level + ' id="' +
                escapedText +
                 '">' +
                 text +
                 '<a class="anchor" href="#' +
                 escapedText +
                 '"><span class="glyphicon glyphicon-link header-link"></span></a>' +
                 '</h' + level + '>';
};

gulp.task('less', function() {
    return gulp.src('assets/style.less')
        .pipe(less())
        .pipe(gulp.dest('./assets'));
});

gulp.task('site', ['less'], function() {
    return gulp.src("README.markdown")
        .pipe(replace(/\<span\ class="github-only"\>(\n|.)*\<\/span\>/gm, ''))
        .pipe(insert.prepend('---\ntemplate: index.hbt\n---\n\n'))
        .pipe(gulp_front_matter()).on("data", function(file) {
            assign(file, file.frontMatter);
            delete file.frontMatter;
        }).pipe(
            gulpsmith()
            .use(markdown({
                "gfm": true,
                "renderer": renderer
            }))
            .use(templates('handlebars'))
    )
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('connect', function() {
    connect.server();
});

