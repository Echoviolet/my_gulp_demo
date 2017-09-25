/*-------------------------------------------------------------------
 Required plugins
 -------------------------------------------------------------------*/
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var  plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');


var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var supervisor = require("gulp-supervisor");
var config = require('../../config/app.json');
var app = require('../../app');
var ejs = require("gulp-ejs");
console.log(config.port);

/*-------------------------------------------------------------------
 Configuration
 -------------------------------------------------------------------*/
var AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 4',
    'opera >= 23',
    'ios >= 4',
    'android >= 4.0',
    'bb >= 10'
];

var path = {
    js: './src/javascript',
    images: './src/images',
    css: './src/css',
    scss: './src/scss',
    html: './views',
    // chtml: './views/components'
    dist:"./dist",
    bin:"./bin",
    public:'./public'
};
var watch = {
    js: path.js + '/**/*.*',
    images: path.images + '/**/*.*',
    css: path.css + '/*.css',
    scss: path.scss + '/*.scss',
    html: path.html + '/**/*.html',
    chtml: path.public + '/website/*.html'

};


/*-------------------------------------------------------------------
 DEVELOP
 -------------------------------------------------------------------*/
gulp.task("default",['serve','node','compile-html','images','scripts','css','sass'] ,function (callback) {

});


gulp.task('serve', function(){

    browserSync.init({
        proxy:"localhost:"+config.port
        // port:config.port,
        //   server: {
        //       baseDir: "./"
        //   }
    });
    gulp.watch(watch.scss, ['sass']);
    gulp.watch([watch.js,watch.css,watch.scss,watch.html,watch.chtml]).on('change', browserSync.reload);

});
//将ejs拼接好(header+content+footer)的html文件输出到/dist /bin, 并压缩html文件
function compileHtml(cdnUrl){
    return gulp.src(watch.html)
        .pipe(ejs({
            relativePath:cdnUrl,
            version: Date.now()
        }))
        // .pipe(gulp.dest("public/website"));
        .pipe(plumber())
        .pipe(gulp.dest(path.bin))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.dist))
        .pipe(notify("minify html computed!"))
}
gulp.task("compile-html",function(){
    return compileHtml('.');
});


//process for images
gulp.task('images', function() {
    return gulp.src(watch.images)
        .pipe(plumber())
        .pipe(gulp.dest(path.bin+'/images'))
        //.pipe(cache(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
        .pipe(gulp.dest(path.dist+'/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

//uglify for javascript
gulp.task('scripts', function() {
    return gulp.src(watch.js)
        .pipe(plumber())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(path.bin+'/javascript'))
        // .pipe(uglify())
        .pipe(gulp.dest(path.dist+'/javascript'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

//minify for css files
gulp.task('css', function () {
    return gulp.src(watch.css)
        .pipe(gulp.dest(path.dist+'/css'))
        .pipe(gulp.dest(path.bin+'/css'))
        .pipe(notify("copy css complete"))
})

//minify for sass files
gulp.task('sass', function(){

    return gulp.src(watch.scss)
        .pipe(sass({
            style:'expanded',
            precision:10
        }).on('error',sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(path.bin+'/css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.dist+'/css'))
        .pipe(notify("less computed!"))

});

//minify for sass files
// gulp.task('sass', function(){
//
//     return gulp.src(watch.scss)
//         .pipe(sass({
//             style:'expanded',
//             precision:10
//         }).on('error',sass.logError))
//         .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
//         .pipe(gulp.dest(path.css))
//         .pipe(browserSync.stream());
// });

gulp.task('node', function (complete) {

    supervisor("app.js",{
        args: ["--dev"],
        watch: ["app",'routes'],
        ignore: ["tasks", "src", "node_modules", "public", "views"],
        pollInterval: 500,
        extensions: ["js"],
        exec: "node",
        debug: false,
        debugBrk: false,
        harmony: true,
        noRestartOn: "exit",
        forceWatch: true,
        quiet: false
    });
    complete();
});

