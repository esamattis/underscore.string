var gulp = require('gulp-param')(require('gulp'), process.argv),
    bump = require('gulp-bump'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    install = require('gulp-install'),
    rimraf = require('gulp-rimraf'),
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

gulp.task('clear', function() {
    return gulp.src('./dist')
        .pipe(rimraf({
            force: true
        }));
});

gulp.task('install', ['clear'], function() {
    return gulp.src('./bower.json')
        .pipe(install());
});

gulp.task('bump-in-html', function(semver) {
    return gulp.src('index.html')
        .pipe(replace(/(\(\d\.\d\.\d\))/gi, '(' + semver + ")"))
        .pipe(gulp.dest('./'));
});

// usage: gulp bump -s <% Version %>
// usage: gulp bump --semver <% Version %>
gulp.task('bump', ['bump-in-html', 'install', 'site'], function(semver) {
    if (typeof semver !== 'string' || semver.length <= 0) {
        console.error('pass a new version `gulp bump --semver 2.4.1`');
        process.exit(1);
    }

    return gulp.src('package.json')
        .pipe(bump({
            version: semver
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('less', function(semver) {
    return gulp.src('assets/style.less')
        .pipe(less())
        .pipe(gulp.dest('./assets'));
});

gulp.task('site', ['less'], function() {
    return gulp.src("dist/underscore.string/README.markdown")
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

