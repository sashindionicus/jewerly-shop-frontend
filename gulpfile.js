let projectFolder = "build";
let sourceFolder = "src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/",
    },
    src: {
        html: sourceFolder + "/pages/*.html",
        css: sourceFolder + "/assets/sass/main.scss",
        js: sourceFolder + "/assets/javascript/src/main.js",
        img: sourceFolder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/assets/fonts/*.ttf",
    },
    watch: {
        html: sourceFolder + "/pages/**/*.html",
        css: sourceFolder + "/assets/**/*.scss",
        js: sourceFolder + "/assets/javascript/**/*.js",
        img: sourceFolder + "/assets/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    clean_css = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify-es').default,
    replace = require('gulp-string-replace'),
    gutil = require('gulp-util');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
    })
}

function replaceHost() {
    var host = gutil.env.env === 'prod' ? 'http://silverrain-jewelry.com:8000' : 'http://silverrain-jewelry.com:8001'

    return replace(new RegExp('@api_host@', 'g'), host)
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function img() {
    return src(path.src.img)
        .pipe(fileinclude())
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(replaceHost())
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(scss())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(fileinclude())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

let build = gulp.series(gulp.parallel(js, css, html, img));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.css = css;
exports.img = img;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

//https://www.youtube.com/watch?v=stFOy0Noahg&t=673s